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

function getHeader(event, name) {
  const headers = event.headers || {};
  const match = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  return match ? headers[match] : undefined;
}

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

function getCorsHeaders(event) {
  const origin = getHeader(event, 'origin');
  const host = getHeader(event, 'x-forwarded-host') || getHeader(event, 'host');
  const baseHeaders = {
    Vary: 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (!origin) return baseHeaders;

  let isSameOrigin = false;
  try {
    isSameOrigin = Boolean(host && new URL(origin).host === host);
  } catch {
    return null;
  }

  if (!isSameOrigin && !getAllowedOrigins().has(origin)) return null;

  return {
    ...baseHeaders,
    'Access-Control-Allow-Origin': origin,
  };
}

function jsonResponse(statusCode, body, corsHeaders = {}, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      ...extraHeaders,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

function getClientIp(event) {
  return (
    getHeader(event, 'x-nf-client-connection-ip') ||
    (getHeader(event, 'x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown'
  );
}

function checkRateLimit(event, namespace, limit, windowMs) {
  const now = Date.now();
  const key = `${namespace}:${getClientIp(event)}`;
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

function decodeBody(event) {
  const raw = event.body || '';
  return event.isBase64Encoded ? Buffer.from(raw, 'base64').toString('utf8') : raw;
}

function guardRequest(event, { namespace, maxBytes, limit, windowMs }) {
  const corsHeaders = getCorsHeaders(event);
  if (!corsHeaders) {
    return { response: jsonResponse(403, { error: 'Origin not allowed' }) };
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      response: {
        statusCode: 204,
        headers: corsHeaders,
        body: '',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { response: jsonResponse(405, { error: 'Method not allowed' }, corsHeaders) };
  }

  const rawBody = decodeBody(event);
  if (Buffer.byteLength(rawBody, 'utf8') > maxBytes) {
    return { response: jsonResponse(413, { error: 'Request body too large' }, corsHeaders) };
  }

  const retryAfter = checkRateLimit(event, namespace, limit, windowMs);
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

module.exports = {
  guardRequest,
  jsonResponse,
};
