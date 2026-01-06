const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Load scraped content
function loadScrapedContent() {
  try {
    const contentPath = path.join(__dirname, '..', 'data', 'scraped-content.json');
    const data = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading scraped content:', error);
    return [];
  }
}

// Generate embedding for a text chunk
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: process.env.EMBEDDINGS_MODEL || 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Generate embeddings for all chunks
async function generateAllEmbeddings() {
  console.log('Loading scraped content...');
  const chunks = loadScrapedContent();
  
  if (chunks.length === 0) {
    console.error('No scraped content found. Run scrape-websites.js first.');
    return;
  }
  
  console.log(`Generating embeddings for ${chunks.length} chunks...`);
  
  const embeddings = [];
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    console.log(`Processing chunk ${i + 1}/${chunks.length}: ${chunk.title}`);
    
    try {
      const embedding = await generateEmbedding(chunk.content);
      
      embeddings.push({
        id: chunk.id,
        content: chunk.content,
        url: chunk.url,
        title: chunk.title,
        source: chunk.source,
        embedding: embedding
      });
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`Error processing chunk ${chunk.id}:`, error.message);
    }
  }
  
  // Save embeddings
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const embeddingsPath = path.join(dataDir, 'embeddings.json');
  fs.writeFileSync(embeddingsPath, JSON.stringify(embeddings, null, 2));
  
  console.log(`Embeddings generation complete! Saved ${embeddings.length} embeddings to ${embeddingsPath}`);
  return embeddings;
}

// Run if called directly
if (require.main === module) {
  generateAllEmbeddings().catch(console.error);
}

module.exports = { generateAllEmbeddings, generateEmbedding };
