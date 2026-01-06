import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { retrieveRelevantChunks } from '@/lib/embeddings';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are BrandGoto's AI assistant. You help visitors understand our services and guide them to the right solutions.

BrandGoto offers:
- Brand Identity & Strategy
- Web Design & Development  
- AI Automation Solutions

SmartLaunch is our dedicated sub-brand for startup-focused AI automation packages.

Always be professional, helpful, and concise. If someone asks about SmartLaunch specifically, redirect them to smartlaunch.brandgoto.com with a friendly message.

If you don't know something, suggest they schedule a call or contact us directly.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check for SmartLaunch intent
    const smartLaunchKeywords = ['smartlaunch', 'ai automation', 'startup package', 'automation package'];
    const isSmartLaunchQuery = smartLaunchKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isSmartLaunchQuery) {
      return NextResponse.json({
        response: "SmartLaunch is our dedicated sub-brand for startup-focused AI automation packages. Let me redirect you to more details 👉 [smartlaunch.brandgoto.com](https://smartlaunch.brandgoto.com)",
        smartLaunchRedirect: true,
        suggestions: ['Schedule a Call', 'Learn More About BrandGoto']
      });
    }

    // Retrieve relevant context using embeddings
    const relevantChunks = await retrieveRelevantChunks(message, 5);
    const contextText = relevantChunks.map(chunk => chunk.content).join('\n\n');

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT + (contextText ? `\n\nRelevant context:\n${contextText}` : '') },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return NextResponse.json({
      response,
      suggestions: ['Schedule a Call', 'Learn More', 'Get Started']
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
