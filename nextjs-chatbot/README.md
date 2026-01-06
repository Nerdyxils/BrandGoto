# BrandGoto Production Chatbot

A production-ready Next.js chatbot for BrandGoto with OpenAI integration, embeddings-based training, and lead capture functionality.

## Features

- **OpenAI GPT-4 Integration**: Custom system prompts and conversation handling
- **Website Content Embeddings**: Automatic scraping and indexing of BrandGoto and SmartLaunch websites
- **SmartLaunch Detection**: Automatic redirect to SmartLaunch subdomain
- **Lead Capture**: Multi-select service interest form with Make.com webhook integration
- **Responsive Design**: Mobile-friendly chat interface with BrandGoto branding
- **Production Ready**: Error handling, rate limiting, and proper TypeScript types

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Add your credentials to `.env.local`:
   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url
   ```

3. **Scrape Website Content**
   ```bash
   npm run scrape
   ```
   This extracts content from brandgoto.com and smartlaunch.brandgoto.com

4. **Generate Embeddings**
   ```bash
   npm run embed
   ```
   This creates vector embeddings for semantic search

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   Navigate to `http://localhost:3000` and click the chat button!

## API Endpoints

### `/api/chat`
Handles chat messages and returns AI responses.

**Request:**
```json
{
  "message": "What services does BrandGoto offer?",
  "conversationHistory": [
    {"role": "user", "content": "Hello"},
    {"role": "assistant", "content": "Hi! How can I help?"}
  ]
}
```

**Response:**
```json
{
  "response": "BrandGoto offers brand identity, web design, and AI automation solutions...",
  "suggestions": ["Schedule a Call", "Learn More", "Get Started"],
  "smartLaunchRedirect": false
}
```

### `/api/leads`
Captures lead information and sends to Make.com webhook.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "services": ["Branding", "AI Automation"]
}
```

**Response:**
```json
{
  "success": true
}
```

## SmartLaunch Integration

When users ask about SmartLaunch specifically, the chatbot:
1. Detects SmartLaunch-related keywords
2. Returns a redirect message
3. Automatically opens smartlaunch.brandgoto.com in a new tab

## Lead Capture

The chatbot includes a comprehensive lead capture form:
- **Name**: Required text field
- **Email**: Required email validation
- **Services**: Multi-select checkbox for:
  - Branding
  - Web Design
  - AI Automation
  - SmartLaunch

Leads are automatically sent to your Make.com webhook with the payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "services": ["Branding", "AI Automation"],
  "source": "Chatbot",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Embeddings System

The chatbot uses OpenAI's `text-embedding-ada-002` model to:
1. **Scrape** website content into chunks
2. **Generate** vector embeddings for each chunk
3. **Store** embeddings in local JSON files
4. **Retrieve** relevant chunks based on user queries
5. **Inject** context into GPT-4 prompts

### Content Sources
- `https://brandgoto.com` - Main website
- `https://smartlaunch.brandgoto.com` - SmartLaunch subdomain

### Embedding Storage
- **File**: `data/embeddings.json`
- **Format**: Array of objects with `id`, `content`, `url`, `title`, `embedding`
- **Size**: ~1000 character chunks for optimal context

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Use Next.js build command
- **Railway**: Connect GitHub repository
- **DigitalOcean**: Use App Platform

### Environment Variables
```env
OPENAI_API_KEY=your-openai-api-key-here
MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url
OPENAI_MODEL=gpt-4o-mini
EMBEDDINGS_MODEL=text-embedding-ada-002
```

## Customization

### Brand Colors
Update `tailwind.config.js`:
```js
colors: {
  orange: {
    500: '#F75F0B',  // BrandGoto orange
    600: '#E0540A',
  },
  teal: {
    500: '#2FA0B5',  // BrandGoto teal
    600: '#1a9bb0',
  }
}
```

### System Prompt
Modify `app/api/chat/route.ts`:
```js
const SYSTEM_PROMPT = `Your custom system prompt here...`;
```

### Lead Capture Fields
Update `components/Chatbot.tsx`:
```jsx
{['Branding', 'Web Design', 'AI Automation', 'SmartLaunch'].map((service) => (
  // Add/remove services here
))}
```

## Troubleshooting

### Common Issues

1. **"No embeddings found"**
   - Run `npm run scrape` then `npm run embed`
   - Check that `data/embeddings.json` exists

2. **OpenAI API errors**
   - Verify `OPENAI_API_KEY` is correct
   - Check API key has sufficient credits
   - Ensure model access (GPT-4 requires approval)

3. **Webhook failures**
   - Test Make.com webhook URL manually
   - Check webhook payload format
   - Verify network connectivity

4. **Scraping issues**
   - Some websites block automated requests
   - Check robots.txt and terms of service
   - Consider using official APIs if available

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
```

## License

MIT License - see LICENSE file for details.

## Support

For issues or questions:
- Create a GitHub issue
- Contact BrandGoto support
- Check the troubleshooting section above
