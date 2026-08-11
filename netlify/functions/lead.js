const { guardRequest, jsonResponse } = require('./_shared/security.cjs');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event) => {
  const guarded = guardRequest(event, {
    namespace: 'lead',
    maxBytes: 20 * 1024,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (guarded.response) return guarded.response;

  const { body, corsHeaders } = guarded;
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
  const email = typeof body.email === 'string' ? body.email.trim().slice(0, 320) : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 50) : '';
  const interest = typeof body.interest === 'string' ? body.interest.trim().slice(0, 500) : '';
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 100) : 'BrandGoto Website';
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 200) : '';
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : interest;
  const requestType = body.requestType === 'live_agent_ticket' ? 'live_agent_ticket' : 'lead';
  const isLiveAgentTicket = requestType === 'live_agent_ticket';
  const liveAgentRecipient = 'silas@brandgoto.com';

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse(400, { error: 'A valid email is required' }, corsHeaders);
  }

  if (isLiveAgentTicket && (!name || !message)) {
    return jsonResponse(400, { error: 'Name and message are required for a live-agent ticket' }, corsHeaders);
  }

  const lead = { name, email, phone, interest, source, company, message, requestType };
  let delivered = false;
  let crmDelivered = false;
  let deliveryChannel = '';

  try {
    if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
      const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        },
        body: JSON.stringify({
          properties: {
            email,
            firstname: name,
            phone,
            service_interest: interest,
            source,
          },
        }),
      });
      crmDelivered = hubspotResponse.ok;
      if (!crmDelivered) console.error('HubSpot lead delivery failed with status:', hubspotResponse.status);
      if (crmDelivered && !isLiveAgentTicket) {
        delivered = true;
        deliveryChannel = 'hubspot';
      }
    }

    if (isLiveAgentTicket && process.env.RESEND_API_KEY && process.env.LIVE_AGENT_FROM_EMAIL) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.LIVE_AGENT_FROM_EMAIL,
          to: [liveAgentRecipient],
          reply_to: email,
          subject: `BrandGoto live-agent request from ${name}`,
          text: [
            'A visitor requested a live-agent follow-up through Celine.',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || 'Not provided'}`,
            '',
            'Question:',
            message,
          ].join('\n'),
        }),
      });
      delivered = emailResponse.ok;
      if (delivered) deliveryChannel = 'email';
      else console.error('Live-agent email delivery failed with status:', emailResponse.status);
    }

    if (!delivered && process.env.MAKE_WEBHOOK_URL) {
      const webhookResponse = await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lead,
          recipient: isLiveAgentTicket ? liveAgentRecipient : undefined,
          to: isLiveAgentTicket ? liveAgentRecipient : undefined,
          form_source: isLiveAgentTicket ? 'chatbot_live_agent' : 'chatbot_lead',
          form_timestamp: new Date().toISOString(),
        }),
      });
      delivered = webhookResponse.ok;
      if (delivered) deliveryChannel = 'webhook';
      if (!delivered) console.error('Lead webhook failed with status:', webhookResponse.status);
    }
  } catch (error) {
    console.error('Lead delivery error:', error instanceof Error ? error.message : 'Unknown error');
  }

  if (!delivered) {
    return jsonResponse(503, { error: 'Lead service is not configured or unavailable' }, corsHeaders);
  }

  return jsonResponse(200, { ok: true, deliveryChannel, crmDelivered }, corsHeaders);
};
