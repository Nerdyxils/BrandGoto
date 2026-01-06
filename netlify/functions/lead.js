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
    const { name, email, phone, interest, source } = body;
    
    // For quick email capture, only email is required
    if (!email) {
      return { 
        statusCode: 400, 
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Email is required' }) 
      };
    }
    
    // For full lead form, all fields are required
    if (source !== 'Chatbot Quick Capture' && (!name || !phone || !interest)) {
      return { 
        statusCode: 400, 
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing lead fields' }) 
      };
    }

    // Try HubSpot integration if configured
    const hubspotKey = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const hubspotPortal = process.env.HUBSPOT_PORTAL_ID;
    
    if (hubspotKey && hubspotPortal) {
      try {
        // Create contact in HubSpot
        const createContactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hubspotKey}`,
          },
          body: JSON.stringify({
            properties: {
              email,
              firstname: name,
              phone,
              service_interest: interest,
              source: 'BrandGoto Chatbot',
            },
          }),
        });

        if (!createContactRes.ok) {
          const errText = await createContactRes.text();
          console.error('HubSpot create contact failed:', errText);
        } else {
          console.log('Lead successfully added to HubSpot');
        }
      } catch (hubspotErr) {
        console.error('HubSpot integration error:', hubspotErr);
      }
    } else {
      console.log('HubSpot not configured - lead will be logged only');
    }

    // Log lead for email notification (to be sent to silas@brandgoto.com)
    console.log('=== NEW CHATBOT LEAD ===');
    console.log('Name:', name || 'Chatbot Lead');
    console.log('Email:', email);
    console.log('Phone:', phone || 'Not provided');
    console.log('Interest:', interest || 'Chatbot Inquiry');
    console.log('Source:', source || 'Contact Form');
    console.log('Timestamp:', new Date().toLocaleString());
    console.log('========================');
    
    // TODO: Set up email service (Brevo, SendGrid, or EmailJS) to send to silas@brandgoto.com
    // For now, leads are logged above and saved to HubSpot

    return { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ok: true }) 
    };
  } catch (err) {
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: err?.message || 'Server error' }) 
    };
  }
};
