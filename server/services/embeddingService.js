import { pipeline } from '@xenova/transformers';

// Loaded once and reused across calls — loading it per-request would be slow.
let embedderPromise = null;

function getEmbedder() {
  if (!embedderPromise) {
    // all-MiniLM-L6-v2: fast, well-tested, 384-dimension output.
    embedderPromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return embedderPromise;
}

// NOTE: this model outputs 384 dimensions, not 1536. You MUST update
// your Postgres column: ALTER TABLE knowledge_chunks ALTER COLUMN embedding TYPE vector(384);
// (and re-embed any rows you already inserted with the old dimension)
export async function getEmbedding(text) {
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}