const { guardRequest, jsonResponse } = require('./_shared/security.cjs');

exports.handler = async (event) => {
  const guarded = guardRequest(event, {
    namespace: 'chat',
    maxBytes: 50 * 1024,
    limit: 20,
    windowMs: 10 * 60 * 1000,
  });
  if (guarded.response) return guarded.response;

  const { body, corsHeaders } = guarded;
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const context = Array.isArray(body.context) ? body.context : [];

  if (messages.length === 0 || messages.length > 30 || context.length > 10) {
    return jsonResponse(400, { error: 'Invalid chat payload' }, corsHeaders);
  }

  const normalizedMessages = messages
    .filter((message) => message && ['user', 'assistant'].includes(message.role) && typeof message.content === 'string')
    .map((message) => ({ role: message.role, content: message.content.slice(0, 4000) }));

  if (normalizedMessages.length === 0) {
    return jsonResponse(400, { error: 'At least one valid message is required' }, corsHeaders);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;
  if (!apiKey || !model) {
    return jsonResponse(503, { error: 'Chat service is not configured' }, corsHeaders);
  }

  const contextText = context
    .filter((item) => item && typeof item.text === 'string')
    .slice(0, 10)
    .map((item, index) => `# Snippet ${index + 1}${item.title ? `: ${String(item.title).slice(0, 200)}` : ''}\n${item.text.slice(0, 4000)}`)
    .join('\n\n');

  const systemPreamble = `You are Celine, BrandGoto's AI assistant. BrandGoto is a Technical Growth Partner for Venture-Scale Startups.

Use these canonical offer names exactly:
- GTM Infrastructure: the umbrella category connecting investor-ready brand identity, performance web, lead capture, CRM, analytics, AI-Ops, and workflow automation.
- 14-Day Launchpad: the productized offer. Launch covers standard scope with a 14-day standard timeline. Launch+ covers extended scope, with timeline adjusted for complexity.
- Fractional CTO & Engineering Retainer: the recurring offer for technical strategy, architecture, roadmapping, engineering delivery, AI-Ops, and ongoing iteration.
- Strategic GTM Audit: the primary next step for assessing goals, current infrastructure, scope, timeline, and offer fit.

Timeline guidance: Most launches complete in 14 days. More complex builds may extend timeline to accommodate scope — the Strategic GTM Audit confirms the right fit.

BrandGoto is a remote-first studio serving founders in the United States and globally. Do not invent statistics, guarantees, delivery claims, client outcomes, geography coverage, or unsupported technical performance claims. If information is not in the supplied context, recommend a Strategic GTM Audit.`;

  try {
    const response = await fetch(process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPreamble + (contextText ? `\n\nContext:\n${contextText}` : '') },
          ...normalizedMessages,
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI request failed with status:', response.status);
      return jsonResponse(502, { error: 'Chat provider request failed' }, corsHeaders);
    }

    const answer = data?.choices?.[0]?.message?.content?.trim();
    if (!answer) {
      return jsonResponse(502, { error: 'Chat provider returned an empty response' }, corsHeaders);
    }

    return jsonResponse(200, {
      answer,
      suggestions: ['Strategic GTM Audit', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer'],
    }, corsHeaders);
  } catch (error) {
    console.error('Chat function error:', error instanceof Error ? error.message : 'Unknown error');
    return jsonResponse(500, { error: 'Chat service failed' }, corsHeaders);
  }
};
