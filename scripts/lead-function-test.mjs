import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

async function loadCommonJs(filePath, requireImpl, additions = {}) {
  const source = await readFile(filePath, 'utf8');
  const module = { exports: {} };
  const context = {
    module,
    exports: module.exports,
    require: requireImpl,
    Buffer,
    URL,
    console,
    setTimeout,
    clearTimeout,
    ...additions,
  };
  vm.runInNewContext(source, context, { filename: filePath });
  return module.exports;
}

const functionsDir = resolve('netlify/functions');
const testProcess = {
  env: {
    CONTEXT: 'development',
    RESEND_API_KEY: 'test-key',
    LIVE_AGENT_FROM_EMAIL: 'BrandGoto Website <website@brandgoto.com>',
  },
};

const security = await loadCommonJs(
  resolve(functionsDir, '_shared/security.cjs'),
  () => { throw new Error('Unexpected require in security helper'); },
  { process: testProcess },
);

const outboundRequests = [];
const leadFunction = await loadCommonJs(
  resolve(functionsDir, 'lead.js'),
  (specifier) => {
    if (specifier === './_shared/security.cjs') return security;
    throw new Error(`Unexpected require: ${specifier}`);
  },
  {
    process: testProcess,
    fetch: async (url, options) => {
      outboundRequests.push({ url: String(url), options });
      return { ok: true, status: 200 };
    },
  },
);

const response = await leadFunction.handler({
  httpMethod: 'POST',
  headers: {
    origin: 'http://localhost:8888',
    host: 'localhost:8888',
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
});

if (response.statusCode !== 200) {
  throw new Error(`Live-agent function returned ${response.statusCode}: ${response.body}`);
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

console.log('Live-agent function delivery passed: recipient, reply-to, and ticket message verified.');
