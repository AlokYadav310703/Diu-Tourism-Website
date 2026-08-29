import { ChromaClient } from 'chromadb';

export const chroma = new ChromaClient({ host: 'localhost', port: 8000, ssl: false });

export async function getCollection() {
  return chroma.getOrCreateCollection({
    name: 'diu_knowledge'
    // no embeddingFunction — Chroma uses its built-in default automatically
  });
}