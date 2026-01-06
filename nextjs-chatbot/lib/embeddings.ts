import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface EmbeddingChunk {
  id: string;
  content: string;
  url: string;
  title: string;
  embedding: number[];
}

// Load embeddings from local JSON file
function loadEmbeddings(): EmbeddingChunk[] {
  try {
    const embeddingsPath = path.join(process.cwd(), 'data', 'embeddings.json');
    const data = fs.readFileSync(embeddingsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading embeddings:', error);
    return [];
  }
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

// Generate embedding for a text
export async function generateEmbedding(text: string): Promise<number[]> {
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

// Retrieve most relevant chunks based on query
export async function retrieveRelevantChunks(
  query: string, 
  limit: number = 5
): Promise<EmbeddingChunk[]> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Load all embeddings
    const chunks = loadEmbeddings();
    
    if (chunks.length === 0) {
      console.warn('No embeddings found. Run the embedding generation script first.');
      return [];
    }
    
    // Calculate similarities and sort
    const similarities = chunks.map(chunk => ({
      chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));
    
    // Sort by similarity (highest first) and return top chunks
    return similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.chunk);
      
  } catch (error) {
    console.error('Error retrieving relevant chunks:', error);
    return [];
  }
}

// Store embeddings to JSON file
export function storeEmbeddings(chunks: EmbeddingChunk[]): void {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const embeddingsPath = path.join(dataDir, 'embeddings.json');
    fs.writeFileSync(embeddingsPath, JSON.stringify(chunks, null, 2));
    console.log(`Stored ${chunks.length} embeddings to ${embeddingsPath}`);
  } catch (error) {
    console.error('Error storing embeddings:', error);
    throw error;
  }
}
