const { guardRequest, jsonResponse } = require('./_shared/security.cjs');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event) => {
  const guarded = guardRequest(event, {
    namespace: 'form-submit',
    maxBytes: 20 * 1024,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (guarded.response) return guarded.response;

  const { body: formData, corsHeaders } = guarded;
  if (typeof formData.email !== 'string' || !EMAIL_PATTERN.test(formData.email.trim())) {
    return jsonResponse(400, { success: false, error: 'A valid email is required' }, corsHeaders);
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    return jsonResponse(503, { success: false, error: 'Form service is not configured' }, corsHeaders);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Form webhook failed with status:', response.status);
      return jsonResponse(502, { success: false, error: 'Form delivery failed' }, corsHeaders);
    }

    return jsonResponse(200, { success: true }, corsHeaders);
  } catch (error) {
    console.error('Form submission error:', error instanceof Error ? error.message : 'Unknown error');
    return jsonResponse(500, { success: false, error: 'Form submission failed' }, corsHeaders);
  }
};
