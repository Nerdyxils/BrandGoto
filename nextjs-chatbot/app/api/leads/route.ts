import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received lead data:', body);
    
    const { name, email, services } = body;

    // Validate required fields
    if (!name || !email || !services || !Array.isArray(services)) {
      console.log('Validation failed:', { name, email, services });
      return NextResponse.json(
        { error: 'Name, email, and services are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare payload for Make.com webhook
    const payload = {
      name,
      email,
      services,
      source: 'Chatbot',
      timestamp: new Date().toISOString(),
    };

    // Send to Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    console.log('Webhook URL:', webhookUrl);
    
    if (!webhookUrl) {
      console.error('MAKE_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Lead capture not configured' },
        { status: 500 }
      );
    }

    console.log('Sending lead to webhook:', payload);
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Webhook response status:', webhookResponse.status);
    const responseText = await webhookResponse.text();
    console.log('Webhook response:', responseText);

    // Make.com webhooks typically return 200 with "Accepted" text
    if (webhookResponse.status >= 200 && webhookResponse.status < 300) {
      console.log('Lead submitted successfully');
      return NextResponse.json({ success: true });
    } else {
      console.error('Webhook failed:', webhookResponse.status, webhookResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
