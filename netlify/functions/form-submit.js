exports.handler = async (event, context) => {
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const formData = JSON.parse(event.body);
    
    // Debug logging
    console.log('📥 Received form data:', JSON.stringify(formData, null, 2));
    console.log('🔍 Form data validation - Name:', formData.firstname, 'Email:', formData.email, 'Phone:', formData.phone);

    // Forward the data to Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL || 'https://hook.us2.make.com/2jhecx0f9v8buiu1so1pwk8jc73qi5h1';
    
    console.log('📤 Forwarding to webhook:', webhookUrl);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('📥 Webhook response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Webhook error response:', errorText);
      throw new Error(`Webhook request failed with status ${response.status}: ${errorText}`);
    }

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
    };

  } catch (error) {
    console.error('Form submission error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
    };
  }
};
