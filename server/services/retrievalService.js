import { getCollection } from './chromaClient.js';

export async function retrieveContext(query, topK = 5) {
  const collection = await getCollection();

  const results = await collection.query({
    queryTexts: [query],
    nResults: topK
  });

  return results.documents[0] || [];
}