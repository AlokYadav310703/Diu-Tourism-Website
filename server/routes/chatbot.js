import express from 'express';
import { answerQuestion } from '../services/chatbotService.js';

const router = express.Router();

// POST /chatbot  { "question": "What time does the Nagoa beach bus run?" }
// Public — no login required to ask the chatbot a question.
router.post('/', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'A non-empty "question" field is required.' });
    }

    const answer = await answerQuestion(question.trim());
    res.json({ answer });
  } catch (err) {
    console.error('Chatbot route error:', err);
    res.status(500).json({ error: 'Something went wrong answering your question.' });
  }
});

export default router;
