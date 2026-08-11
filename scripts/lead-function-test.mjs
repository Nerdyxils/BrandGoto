import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const functionsDir = resolve('netlify/functions');
const originalFetch = globalThis.fetch;
const originalEnvironment = {
  CONTEXT: process.env.CONTEXT,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  LIVE_AGENT_FROM_EMAIL: process.env.LIVE_AGENT_FROM_EMAIL,
  HUBSPOT_PRIVATE_APP_TOKEN: process.env.HUBSPOT_PRIVATE_APP_TOKEN,
  MAKE_WEBHOOK_URL: process.env.MAKE_WEBHOOK_URL,
};

process.env.CONTEXT = 'development';
process.env.RESEND_API_KEY = 'test-key';
process.env.LIVE_AGENT_FROM_EMAIL = 'BrandGoto Website <website@brandgoto.com>';
delete process.env.HUBSPOT_PRIVATE_APP_TOKEN;
delete process.env.MAKE_WEBHOOK_URL;

const outboundRequests = [];
globalThis.fetch = async (url, options) => {
  outboundRequests.push({ url: String(url), options });
  return Response.json({ id: 'email-test-id' }, { status: 200 });
};

try {
  const functionNames = ['lead', 'chat', 'form-submit', 'log'];
  const functionModules = {};

  for (const functionName of functionNames) {
    const moduleUrl = `${pathToFileURL(resolve(functionsDir, `${functionName}.mjs`)).href}?test=${Date.now()}-${functionName}`;
    const functionModule = await import(moduleUrl);
    if (typeof functionModule.default !== 'function') {
      throw new Error(`${functionName}.mjs does not export a default handler.`);
    }
    functionModules[functionName] = functionModule.default;

    const probeResponse = await functionModule.default(new Request(`http://localhost:8888/.netlify/functions/${functionName}`));
    if (probeResponse.status !== 405) {
      throw new Error(`${functionName}.mjs failed its module-load probe with status ${probeResponse.status}.`);
    }
  }

  const response = await functionModules.lead(new Request('http://localhost:8888/.netlify/functions/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://localhost:8888',
      'x-forwarded-for': '127.0.0.51',
    },
    body: JSON.stringify({
      name: 'Function Test',
      email: 'function-test@example.com',
      company: 'Example Ventures',
      message: 'Please help me choose an offer.',
      interest: 'Please help me choose an offer.',
      source: 'Chatbot Live Agent',
      requestType: 'live_agent_ticket',
      recipient: 'attacker@example.com',
    }),
  }));

  if (response.status !== 200) {
    throw new Error(`Live-agent function returned ${response.status}: ${await response.text()}`);
  }

  const emailRequest = outboundRequests.find((request) => request.url === 'https://api.resend.com/emails');
  if (!emailRequest) throw new Error('Live-agent function did not call the email provider.');

  const emailPayload = JSON.parse(emailRequest.options.body);
  if (
    emailPayload.to?.[0] !== 'silas@brandgoto.com'
    || emailPayload.reply_to !== 'function-test@example.com'
    || !emailPayload.text?.includes('Please help me choose an offer.')
  ) {
    throw new Error(`Live-agent email payload is incorrect: ${JSON.stringify(emailPayload)}`);
  }

  console.log('Netlify ESM function loading and live-agent email delivery passed.');
} finally {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}
