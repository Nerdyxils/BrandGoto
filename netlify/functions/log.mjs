import { guardRequest, jsonResponse } from './_shared/security.mjs';

export default async function handler(request) {
  const guarded = await guardRequest(request, {
    namespace: 'log',
    maxBytes: 10 * 1024,
    limit: 60,
    windowMs: 10 * 60 * 1000,
  });
  if (guarded.response) return guarded.response;

  const { body, corsHeaders } = guarded;
  const eventName = typeof body.event === 'string' ? body.event.slice(0, 100) : 'unknown';
  console.log('chat_event', { event: eventName, ts: body.ts || Date.now() });
  return jsonResponse(200, { ok: true }, corsHeaders);
}
