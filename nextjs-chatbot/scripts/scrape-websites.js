const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Websites to scrape
const WEBSITES = [
  {
    url: 'https://brandgoto.com',
    name: 'BrandGoto Main',
    selectors: ['main', 'section', '.container', '.content', 'article']
  },
  {
    url: 'https://smartlaunch.brandgoto.com',
    name: 'SmartLaunch',
    selectors: ['main', 'section', '.container', '.content', 'article']
  }
];

// Clean and chunk text content
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim();
}

function chunkText(text, maxLength = 1000) {
  const chunks = [];
  const sentences = text.split(/[.!?]+/);
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += sentence + '. ';
    }
  }
  
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// Scrape a single website
async function scrapeWebsite(website) {
  try {
    console.log(`Scraping ${website.name}...`);
    
    const response = await axios.get(website.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrandGoto-Chatbot/1.0)'
      },
      timeout: 10000
    });
    
    const $ = cheerio.load(response.data);
    let content = '';
    
    // Extract content using selectors
    website.selectors.forEach(selector => {
      $(selector).each((i, element) => {
        const text = $(element).text();
        if (text && text.length > 50) {
          content += text + ' ';
        }
      });
    });
    
    // Fallback: extract all text if selectors don't work
    if (!content.trim()) {
      content = $('body').text();
    }
    
    const cleanedContent = cleanText(content);
    const chunks = chunkText(cleanedContent);
    
    console.log(`Extracted ${chunks.length} chunks from ${website.name}`);
    
    return chunks.map((chunk, index) => ({
      id: `${website.name.toLowerCase().replace(/\s+/g, '-')}-${index}`,
      content: chunk,
      url: website.url,
      title: `${website.name} - Chunk ${index + 1}`,
      source: website.name
    }));
    
  } catch (error) {
    console.error(`Error scraping ${website.name}:`, error.message);
    return [];
  }
}

// Main scraping function
async function scrapeAllWebsites() {
  console.log('Starting website scraping...');
  
  const allChunks = [];
  
  for (const website of WEBSITES) {
    const chunks = await scrapeWebsite(website);
    allChunks.push(...chunks);
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Save to JSON file
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'scraped-content.json');
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2));
  
  console.log(`Scraping complete! Saved ${allChunks.length} chunks to ${outputPath}`);
  return allChunks;
}

// Run if called directly
if (require.main === module) {
  scrapeAllWebsites().catch(console.error);
}

module.exports = { scrapeAllWebsites, scrapeWebsite };
