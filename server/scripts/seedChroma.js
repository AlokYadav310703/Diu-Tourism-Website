import { getCollection } from '../services/chromaClient.js';

const documents = [
  // existing entries...
  { id: 'history-1', text: 'Diu was a Portuguese colony from 1535 until 1961...', metadata: { category: 'history' } },
  { id: 'place-fort-diu', text: 'Diu Fort is a 16th-century Portuguese fort...', metadata: { category: 'tourist_place' } },

  // new entries you add
  { id: 'place-nagoa-beach', text: 'Nagoa Beach is a horseshoe-shaped beach on Diu island, popular for swimming, water sports like jet-skiing and banana boat rides, and its palm-fringed shoreline. It gets crowded on weekends and is about 8 km from Diu town.', metadata: { category: 'tourist_place' } },
  { id: 'place-inbi-tower', text: 'INS Khukri Memorial is a war memorial near Ghoghla honoring the Indian Navy frigate INS Khukri, sunk during the 1971 Indo-Pak war.', metadata: { category: 'tourist_place' } },
  { id: 'festival-1', text: 'Diu celebrates the Nariyal Purnima festival in August, marking the start of the fishing season, with boats decorated and blessed.', metadata: { category: 'festival' } },
  { id: 'history-2', text: 'The Portuguese built Diu Fort to defend the harbor after signing a treaty with the Sultan of Gujarat in 1535, following naval conflicts with Ottoman-backed forces.', metadata: { category: 'history' } },
];

async function seed() {
  const collection = await getCollection();

  await collection.upsert({
    ids: documents.map(d => d.id),
    documents: documents.map(d => d.text),
    metadatas: documents.map(d => d.metadata)
  });

  console.log(`Seeded ${documents.length} documents.`);
}

seed().catch(console.error);