import OpenAI from 'openai';
import dotenv from 'dotenv';
import { retrieveContext } from './retrievalService.js';

dotenv.config();

// Groq exposes an OpenAI-compatible endpoint, so the same 'openai' package
// already used for embeddings works here too - just pointed at Groq's base
// URL with a Groq API key instead of OpenAI's.
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

// GPT-OSS-120B for the actual answer - capable enough to follow
// instructions and stay grounded in retrieved context. (llama-3.3-70b-
// versatile, used here previously, was deprecated by Groq - see note
// below on checking for this going forward.)
const CHAT_MODEL = 'openai/gpt-oss-120b';

// Smaller, faster model just for distilling the search query - this is
// a simple extraction task, doesn't need the big model's full capability.
// (llama-3.1-8b-instant, used here previously, was also deprecated.)
const REWRITE_MODEL = 'openai/gpt-oss-20b';

/**
 * Distills a user's raw message into a clean search query using the LLM
 * itself, instead of a hand-maintained list of regex patterns for
 * greetings. A fixed pattern list can only ever cover phrasings someone
 * thought to add ahead of time - this generalizes to "yo what's up with
 * diu", "quick q - diu?", or anything else, because it's using actual
 * language understanding rather than pattern matching.
 *
 * Returns null if the message is just a greeting/pleasantry with no real
 * question, so answerQuestion() can skip retrieval entirely for those.
 */
async function extractSearchQuery(question) {
  try {
    const response = await groq.chat.completions.create({
      model: REWRITE_MODEL,
      max_tokens: 50,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content:
            "Extract the core topic, place, or question from the user's message, " +
            'so it can be used as a search query. This can be as short as a ' +
            'single word, such as just a place name - that is a valid query on ' +
            "its own, not a greeting. Remove ONLY greetings and pleasantries " +
            '(hi, hello, hey, thanks, bye). Reply with ONLY the distilled query, ' +
            'nothing else - no punctuation, no explanation.\n\n' +
            'Examples:\n' +
            '"hi, tell me about diu" -> diu\n' +
            '"diu" -> diu\n' +
            '"hello" -> NONE\n' +
            '"thanks!" -> NONE\n' +
            '"suggest some best tourist spots" -> best tourist spots\n\n' +
            'Only reply with exactly NONE if the message is PURELY a greeting ' +
            'or pleasantry with no topic, name, or subject in it at all.'
        },
        { role: 'user', content: question }
      ]
    });

    const rewritten = response.choices[0]?.message?.content?.trim();
    console.log(`Query rewrite: "${question}" -> ${rewritten || '(empty)'}`);

    if (!rewritten || rewritten.toUpperCase() === 'NONE') return null;
    return rewritten;
  } catch (err) {
    // Degrade gracefully - if the rewrite call itself fails (rate limit,
    // network blip), still attempt retrieval with the raw question rather
    // than failing the whole request over a non-essential step.
    console.error('Query rewrite failed, falling back to raw question:', err.message);
    return question;
  }
}

/**
 * Full RAG pipeline: retrieve relevant Diu tourism data (restaurants,
 * hotels, buses, flights, public toilets), ground the answer in it,
 * and return a grounded response instead of a generic one.
 */
export async function answerQuestion(question) {
  const searchQuery = await extractSearchQuery(question);
  const chunks = searchQuery ? await retrieveContext(searchQuery) : [];

  const context = chunks.length > 0
    ? chunks.map(c => `- ${c.content}`).join('\n')
    : 'No specific matching data was found for this question.';

  const systemPrompt = `You are a friendly, knowledgeable tourist assistant for Diu, India.

You have two kinds of knowledge to draw on:

1. SPECIFIC DATA about Diu (below) - real restaurants, hotels, buses, flights,
and other facts pulled directly from this website's own database. For any
question that depends on this kind of specific, checkable fact (a business's
hours, a bus's departure time, a phone number, an address, a price), answer
ONLY from the data below. If the answer isn't in there, say plainly that you
don't have that specific detail rather than guessing - getting a fact like
this wrong could genuinely mislead a traveler.

2. YOUR OWN general knowledge - for everything else: general conversation,
travel tips, what to pack, safety advice, or facts about Diu/India/travel
that simply aren't the kind of thing in the data below. Answer these
normally and helpfully, the way any knowledgeable travel assistant would -
you don't need the data below to cover something before you're allowed to
discuss it.

Keep answers concise and practical either way.

Diu tourism data:
${context}`;

  const response = await groq.chat.completions.create({
    model: CHAT_MODEL,
    max_tokens: 500,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ]
  });

  return response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
}