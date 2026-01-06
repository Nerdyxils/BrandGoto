import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BrandGoto Chatbot Demo
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a production-ready chatbot for BrandGoto with OpenAI integration, 
            embeddings-based training, and lead capture functionality.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• OpenAI GPT-4 integration with custom system prompts</li>
              <li>• Website content embeddings for contextual responses</li>
              <li>• SmartLaunch detection and automatic redirect</li>
              <li>• Lead capture with multi-select services</li>
              <li>• Make.com webhook integration</li>
              <li>• Responsive design with BrandGoto branding</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Setup Instructions</h2>
            <ol className="space-y-3 text-gray-600">
              <li>1. Copy <code className="bg-gray-100 px-2 py-1 rounded">env.example</code> to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code></li>
              <li>2. Add your OpenAI API key and Make.com webhook URL</li>
              <li>3. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run scrape</code> to extract website content</li>
              <li>4. Run <code className="bg-gray-100 px-2 py-1 rounded">npm run embed</code> to generate embeddings</li>
              <li>5. Start the development server with <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code></li>
            </ol>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Try the Chatbot</h2>
            <p className="text-gray-600 mb-4">
              Click the orange chat button in the bottom-right corner to start a conversation. 
              Try asking about:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• "What services does BrandGoto offer?"</li>
              <li>• "Tell me about SmartLaunch"</li>
              <li>• "How can I get started?"</li>
              <li>• "I need help with branding"</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Chatbot />
    </div>
  );
}
