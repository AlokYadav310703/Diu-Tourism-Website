/**
 * Reads rows from every tourism table, builds a human-readable blurb for
 * each, embeds it, and (re)populates knowledge_chunks for the chatbot.
 *
 * Run with: npm run seed:embeddings
 * Re-run any time restaurants/hotels/buses/flights/toilets data changes.
 */
import { supabase } from '../config/supabaseClient.js';
import { getEmbedding } from '../services/embeddingService.js';

let successCount = 0;
let failCount = 0;

// Small pause between embedding calls - gentle on free-tier rate limits.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Wraps a single embed+insert so ONE failure (rate limit, transient
// network error, etc.) logs and moves on instead of crashing the whole
// script - which previously meant a single bad call left knowledge_chunks
// empty, since clearExisting() had already run but nothing after the
// crash point ever got re-seeded.
async function seedChunk(sourceTable, sourceId, content) {
  try {
    const embedding = await getEmbedding(content);
    const { error } = await supabase.from('knowledge_chunks').insert({
      source_table: sourceTable,
      source_id: sourceId,
      content,
      embedding
    });

    if (error) throw new Error(error.message);
    successCount++;
  } catch (err) {
    failCount++;
    console.error(`  FAILED (${sourceTable}${sourceId ? `#${sourceId}` : ''}): ${err.message}`);
  }
  await delay(250);
}

async function seedGeneralInfo() {
  // Static orientational content about Diu as a destination - not pulled
  // from a database table, since it doesn't change the way restaurant or
  // bus data does. Without this, broad questions like "tell me about Diu"
  // had nothing in knowledge_chunks to match against. Sourced from Lonely
  // Planet, Holidify, and other travel guides.
  const chunks = [
    'Diu is a small island, about 40 square kilometers, off the southern coast of Gujarat, India, connected to the mainland near Veraval by a bridge. It is not part of Gujarat state - together with Daman, it forms its own union territory (Dadra and Nagar Haveli and Daman and Diu), with its own local administration and rules.',

    'Diu was a Portuguese colony for over four centuries, from 1535 until 1961, when it was integrated into India through Operation Vijay alongside Goa and Daman. Portuguese colonial architecture, including forts, churches, and old villas, remains a defining feature of the island today.',

    "Unlike the rest of Gujarat, which prohibits alcohol, Diu permits the sale and consumption of alcohol, since it is a separate union territory with its own regulations. This is one of the main reasons it's a popular weekend getaway for visitors from Gujarat.",

    "Diu's main historical landmarks include Diu Fort (built by the Portuguese in 1535, overlooking the sea, entry is free), St. Paul's Church (a Baroque-style Portuguese church), the Naida Caves, the Sea Shell Museum, and the INS Khukri Memorial near Chakratirth beach, dedicated to the Indian Navy ship sunk in 1971.",

    "Diu's beaches include Nagoa (the most popular, shaped like a horseshoe), Ghoghla, Chakratirth, Jallandhar, and Gomtimata, each offering a quieter, less crowded alternative to bigger coastal destinations.",

    'Diu is small enough to explore in two to three days, with a relaxed, quiet pace of life compared to more crowded coastal destinations like Goa. It suits travelers looking for beaches, colonial-era history and architecture, and fresh seafood, without heavy crowds.'
  ];

  console.log(`Seeding ${chunks.length} general info chunks...`);
  for (const content of chunks) {
    await seedChunk('general_info', null, content);
  }
}

async function seedTable(tableName, toText) {
  const { data: rows, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(`Failed to read ${tableName}:`, error.message);
    return;
  }

  console.log(`Seeding ${rows.length} rows from ${tableName}...`);
  for (const row of rows) {
    await seedChunk(tableName, row.id ?? null, toText(row));
  }
}

async function clearExisting() {
  const { error } = await supabase.from('knowledge_chunks').delete().neq('id', 0);
  if (error) console.error('Failed to clear knowledge_chunks:', error.message);
}

async function main() {
  await clearExisting();

  await seedGeneralInfo();

  await seedTable('restaurants', r =>
    `${r.name} is a ${r.type ?? 'restaurant'} at ${r.address}, open from ${r.open_time} to ${r.close_time}. Phone: ${r.phone ?? 'not listed'}.`
  );

  await seedTable('hotels', h =>
    `${h.name} is a hotel located at ${h.address}. Phone: ${h.phone}.${h.website ? ` Website: ${h.website}.` : ''}`
  );

  await seedTable('local_buses', b =>
    `Local bus from ${b.from_location} to ${b.to_location} at ${b.bus_time}, costing ₹${b.cost}.`
  );

  await seedTable('state_buses', b =>
    `Bus from ${b.from_location} to ${b.to_location} operated by ${b.travels}, departing ${b.start_time} and arriving ${b.end_time}, costing ₹${b.cost}.`
  );

  await seedTable('flights', f =>
    `Flight ${f.flight_name} from ${f.from_location} to ${f.to_location} departs at ${f.flight_time}.`
  );

  await seedTable('rickshaw', r =>
    `Rickshaw driver ${r.driver_name} can be reached at ${r.phone}.`
  );

  await seedTable('public_toilets', t =>
    `Public toilet "${t.name}" is located at coordinates ${t.latitude}, ${t.longitude}.`
  );

  console.log(`\nDone. ${successCount} chunks seeded, ${failCount} failed.`);
  if (failCount > 0) {
    console.log('Re-run the script to retry the failed ones - clearExisting() means each run starts clean.');
  }
}

main().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
