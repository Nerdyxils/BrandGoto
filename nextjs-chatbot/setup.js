const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up BrandGoto Chatbot...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local from env.example');
    console.log('📝 Please edit .env.local and add your API keys:\n');
    console.log('   OPENAI_API_KEY=your-openai-api-key-here');
    console.log('   MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url\n');
  } else {
    console.log('❌ env.example not found');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Check if data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Created data directory');
} else {
  console.log('✅ Data directory exists');
}

console.log('\n🎯 Next steps:');
console.log('1. Edit .env.local with your API keys');
console.log('2. Run: npm run scrape');
console.log('3. Run: npm run embed');
console.log('4. Run: npm run dev');
console.log('\n✨ Setup complete!');
