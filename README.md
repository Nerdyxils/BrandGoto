# BrandGoto Chatbot Setup

Lightweight AI chatbot for BrandGoto with lead capture, SmartLaunch routing, and OpenAI-backed answers.

## Environment Variables

Add these in Netlify Site settings → Environment variables:

- `OPENAI_API_KEY`: Your ChatGPT API key
- `OPENAI_MODEL` (optional): default model
- `HUBSPOT_PRIVATE_APP_TOKEN`: HubSpot Private App token
- `HUBSPOT_PORTAL_ID`: Your HubSpot portal ID
- `VITE_SMARTLAUNCH_URL` (optional): SmartLaunch subdomain
- `VITE_PDF_URL` (optional): PDF overview path or URL

## Deployment

- Netlify functions are in `netlify/functions/*`.
- Build command: `npm run build`
- Publish directory: `dist`

## Local Development

1. `npm install`
2. Create `.env` with local overrides if using Netlify CLI or your own proxy
3. `npm run dev`

## Files Added

- `src/components/ChatbotWidget.tsx` + `ChatbotWidget.css`
- `src/chat/retriever.ts` and `src/chat/knowledge.ts`
- `src/chat/faq.ts`
- `netlify/functions/chat.ts` (OpenAI proxy)
- `netlify/functions/lead.ts` (HubSpot contact create)
- `netlify/functions/log.ts` (server-side logging)

## Notes

- The widget is mounted in `App.tsx`. It is responsive and designed to minimally impact page speed.
- Answers use lightweight retrieval over `src/chat/knowledge.ts` plus OpenAI context.
- On unknown questions, the assistant suggests scheduling a call.
