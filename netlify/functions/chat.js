exports.handler = async (event) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }) 
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const messages = body.messages || [];
    const context = body.context || [];

    console.log('Chat function called with messages:', messages.length);
    console.log('Context snippets:', context.length);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY not configured');
      return { 
        statusCode: 500, 
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'OPENAI_API_KEY not configured' }) 
      };
    }

    const contextText = context.map((c, i) => `# Snippet ${i + 1}${c.title ? `: ${c.title}` : ''}\n${c.text}`).join('\n\n');
    const systemPreamble = `You are Celine, BrandGoto's AI assistant. You help visitors understand our services and guide them to the right solutions.

BrandGoto offers comprehensive creative digital services:
- Brand Identity & Logo Design: Complete brand strategy, visual identity, messaging, and brand guidelines
- Website Design & Development: Responsive, high-performance websites with exceptional UX and SEO
- Mobile App Development: Custom iOS & Android applications built with modern technologies
- Digital Marketing & Growth: Data-driven strategies that drive traffic, generate leads, and increase conversions
- Graphic Design & Visual Content: Print materials, digital assets, social media graphics, and marketing collateral
- Creative Direction & Strategy: Vision definition, positioning, and comprehensive creative strategies
- Technical Setup & Infrastructure: Domain registration, DNS configuration, and professional business email setup

SmartLaunch is our dedicated sub-brand for startup-focused AI automation packages.

Company Info: Founded in 2023, "Bold Brands. Digital Excellence." Operating from Toronto, Ontario and New York. 4.9/5 rating with 127 reviews, serving 50+ businesses.

Contact: +1-647-937-7031, available in English and French. Social media: Instagram @brand_goto, LinkedIn company/brandgoto, Twitter/X @brand_goto.

Always be professional, helpful, and conversational as Celine. If someone asks about SmartLaunch specifically, mention it's our startup-focused sub-brand. If you don't know something specific, suggest they schedule a call or contact us directly.`;

    const mergedMessages = [
      { role: 'system', content: systemPreamble + (contextText ? `\n\nContext:\n${contextText}` : '') },
      ...messages,
    ];

    const defaultModel = 'gpt-4o-mini';
    const model = process.env.OPENAI_MODEL || defaultModel;
    console.log('Calling OpenAI API with model:', model);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: mergedMessages,
        temperature: 0.3,
      }),
    });

    console.log('OpenAI response status:', response.status);
    const data = await response.json();
    console.log('OpenAI response data:', data);
    
    if (!response.ok) {
      console.error('OpenAI API error:', data);
      return { 
        statusCode: response.status, 
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: data?.error?.message || 'OpenAI error' }) 
      };
    }

    const answer = data?.choices?.[0]?.message?.content?.trim() || '';
    const suggestions = ['Schedule a Call', 'Learn More', 'Get Started'];

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer, suggestions }),
    };
  } catch (err) {
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: err?.message || 'Server error' }) 
    };
  }
};
