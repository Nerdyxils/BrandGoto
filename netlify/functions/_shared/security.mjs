const rateLimitBuckets = new Map();

const PRODUCTION_ORIGINS = new Set([
  'https://brandgoto.com',
  'https://www.brandgoto.com',
]);

const DEVELOPMENT_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8888',
  'http://127.0.0.1:8888',
]);

function getAllowedOrigins() {
  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowed = new Set([...PRODUCTION_ORIGINS, ...configured]);

  if (process.env.CONTEXT !== 'production') {
    DEVELOPMENT_ORIGINS.forEach((origin) => allowed.add(origin));
  }

  return allowed;
}

function getCorsHeaders(request) {
  const origin = request.headers.get('origin');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const requestHost = forwardedHost || new URL(request.url).host;
  const baseHeaders = {
    Vary: 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (!origin) return baseHeaders;

  let isSameOrigin = false;
  try {
    isSameOrigin = new URL(origin).host === requestHost;
  } catch {
    return null;
  }

  if (!isSameOrigin && !getAllowedOrigins().has(origin)) return null;

  return {
    ...baseHeaders,
    'Access-Control-Allow-Origin': origin,
  };
}

export function jsonResponse(status, body, corsHeaders = {}, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: {
      ...corsHeaders,
      ...extraHeaders,
      'Cache-Control': 'no-store',
    },
  });
}

function getClientIp(request) {
  return (
    request.headers.get('x-nf-client-connection-ip')
    || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
    || 'unknown'
  );
}

function checkRateLimit(request, namespace, limit, windowMs) {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(request)}`;
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (current.count >= limit) {
    return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  }

  current.count += 1;
  return null;
}

export async function guardRequest(request, { namespace, maxBytes, limit, windowMs }) {
  const corsHeaders = getCorsHeaders(request);
  if (!corsHeaders) {
    return { response: jsonResponse(403, { error: 'Origin not allowed' }) };
  }

  if (request.method === 'OPTIONS') {
    return {
      response: new Response(null, {
        status: 204,
        headers: corsHeaders,
      }),
    };
  }

  if (request.method !== 'POST') {
    return { response: jsonResponse(405, { error: 'Method not allowed' }, corsHeaders) };
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    return { response: jsonResponse(413, { error: 'Request body too large' }, corsHeaders) };
  }

  const retryAfter = checkRateLimit(request, namespace, limit, windowMs);
  if (retryAfter !== null) {
    return {
      response: jsonResponse(
        429,
        { error: 'Too many requests' },
        corsHeaders,
        { 'Retry-After': String(retryAfter) },
      ),
    };
  }

  try {
    return { body: JSON.parse(rawBody || '{}'), corsHeaders };
  } catch {
    return { response: jsonResponse(400, { error: 'Invalid JSON body' }, corsHeaders) };
  }
}
