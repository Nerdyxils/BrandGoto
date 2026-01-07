import React, { useEffect, useRef, useState } from 'react';
import './ChatbotWidget.css';
import { retrieveRelevantSnippets } from '../chat/retriever';
import { faq } from '../chat/faq';
import { MessageCircle, Send, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  suggestions?: string[];
  actions?: Array<{ label: string; type: 'lead' | 'schedule' | 'pdf' | 'smartlaunch' | 'faq' | 'email' | 'consultation' | 'liveagent'; url?: string }>; 
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  interest: string;
};

const SMARTLAUNCH_URL = (import.meta as any).env?.VITE_SMARTLAUNCH_URL || 'https://smartlaunch.brandgoto.com';
const CALENDLY_URL = 'https://calendly.com/silas-brandgoto/30min';
const CONSULTATION_PAGE_URL = '/book-a-consultation'; // Update this to your actual consultation page URL
const PDF_URL = '/brandgoto-overview.pdf'; // Placeholder PDF URL

function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('event', eventName, params || {});
    }
  } catch {}
}

async function sendLog(event: string, payload?: Record<string, unknown>) {
  try {
    // Only log in production, skip logging in development
    if (window.location.hostname !== "localhost") {
      await fetch('/.netlify/functions/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload, ts: Date.now() }),
      });
    }
  } catch {}
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

  const initialWelcome: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hi! I'm Celine from BrandGoto 👋 I'm here to help you discover how we can elevate your brand and grow your business. What brings you here today?",
    suggestions: ['Tell me about your services', 'I need branding help', 'Show me AI automation', 'Live Agent'],
  };

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcome]);
  const [input, setInput] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showLiveAgent, setShowLiveAgent] = useState(false);
  const [quickEmail, setQuickEmail] = useState('');
  const [liveAgentForm, setLiveAgentForm] = useState({ name: '', email: '' });
  const [lead, setLead] = useState<LeadForm>({ name: '', email: '', phone: '', interest: '' });
  const [showTooltip, setShowTooltip] = useState(true);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (viewportRef.current) {
      // Use requestAnimationFrame to avoid forced reflow
      requestAnimationFrame(() => {
        if (viewportRef.current) {
          viewportRef.current.scrollTo({
            top: viewportRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  }, [messages, isOpen]);

  // Hide tooltip after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  function toggleOpen() {
    setIsOpen(v => !v);
    trackEvent('chat_toggle', { open: !isOpen });
    sendLog('chat_toggle', { open: !isOpen });
  }

  function appendAssistant(content: string, extras?: Partial<ChatMessage>) {
    setMessages(prev => [
      ...prev,
      { id: generateId(), role: 'assistant', content, ...extras },
    ]);
  }

  function handleSuggestionClick(text: string) {
    if (/schedule a call/i.test(text)) {
      handleAction({ label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL });
      return;
    }
    if (/get started/i.test(text)) {
      handleAction({ label: 'Get Started', type: 'consultation', url: CONSULTATION_PAGE_URL });
      return;
    }
    handleSend(text);
  }

  function detectSmartLaunchIntent(text: string): boolean {
    const t = text.toLowerCase();
    return (
      t.includes('smartlaunch') ||
      t.includes('ai automation') ||
      t.includes('automation package') ||
      t.includes('startup package')
    );
  }

  async function handleSend(optionalText?: string) {
    const text = (optionalText ?? input).trim();
    if (!text) return;
    setInput('');
    const userMsg: ChatMessage = { id: generateId(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    trackEvent('chat_user_message', { length: text.length });
    sendLog('chat_user_message', { text });

    // SmartLaunch routing hint
    if (detectSmartLaunchIntent(text)) {
      appendAssistant(
        'For our startup-focused AI automation packages, please visit SmartLaunch by BrandGoto.',
        {
          actions: [
            { label: 'Open SmartLaunch', type: 'smartlaunch', url: SMARTLAUNCH_URL },
            { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
          ],
        }
      );
      return;
    }

    // Mini FAQ entrypoint
    if (/^faq$/i.test(text) || /help|questions|common questions/i.test(text)) {
      const labels = faq.map(f => f.q).slice(0, 5);
      appendAssistant('Here are a few common questions:', { suggestions: labels, actions: [
        { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
      ]});
      return;
    }

    // If user clicked a FAQ item, answer locally
    const matchedFaq = faq.find(f => f.q.toLowerCase() === text.toLowerCase());
    if (matchedFaq) {
      appendAssistant(matchedFaq.a, { actions: [
        { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
      ]});
      return;
    }

    // Smart suggestion mapping based on user intent
    const getSmartSuggestions = (userText: string, aiResponse: string) => {
      const text = userText.toLowerCase();
      const response = aiResponse.toLowerCase();
      
      // If user asks about services, offer specific next steps
      if (/services|what do you|tell me about/i.test(text)) {
        return ['I need branding help', 'Show me web design', 'Tell me about AI automation', 'Get started'];
      }
      
      // If user mentions branding, offer branding-specific actions
      if (/branding|brand|logo|identity/i.test(text)) {
        return ['Get branding quote', 'See portfolio', 'Schedule consultation', 'Learn more'];
      }
      
      // If user mentions web design, offer web-specific actions
      if (/website|web design|web development|site/i.test(text)) {
        return ['Get website quote', 'See examples', 'Schedule consultation', 'Learn more'];
      }
      
      // If user mentions AI or automation, offer SmartLaunch actions
      if (/ai|automation|smartlaunch/i.test(text)) {
        return ['Explore SmartLaunch', 'Get AI package quote', 'Schedule consultation', 'Learn more'];
      }
      
      // If user seems ready to move forward, offer conversion actions
      if (/get started|ready|interested|pricing|cost|quote/i.test(text)) {
        return ['Get started', 'Schedule a Call', 'Live Agent', 'Learn more'];
      }
      
      // Default suggestions based on response content
      if (/schedule|call|consultation/i.test(response)) {
        return ['Schedule a Call', 'Get started', 'Learn more', 'See portfolio'];
      }
      
      if (/smartlaunch/i.test(response)) {
        return ['Explore SmartLaunch', 'Get AI package', 'Schedule a Call', 'Learn more'];
      }
      
      // Default fallback
      return ['Get started', 'Schedule a Call', 'Live Agent', 'Learn more'];
    };

    // Retrieve context from local knowledge
    const snippets = retrieveRelevantSnippets(text, 5);

    // Call OpenAI API directly in development, Netlify function in production
    setIsSending(true);
    try {
      if (window.location.hostname === "localhost") {
        // Direct OpenAI API call for local development
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.OPENAI_API_KEY;
        if (!apiKey) {
          console.log('Available env vars:', Object.keys(import.meta.env));
          throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file (Vite requires VITE_ prefix for frontend access)');
        }

        const contextText = snippets.map((c, i) => `# Snippet ${i + 1}${c.title ? `: ${c.title}` : ''}\n${c.text}`).join('\n\n');
        const systemPreamble = `You are Celine, BrandGoto's AI assistant. You help visitors understand our services and guide them to the right solutions.

BrandGoto offers comprehensive creative digital services:
- Brand Identity & Logo Design: Complete brand strategy, visual identity, messaging, and brand guidelines
- Website Design & Development: Responsive, high-performance websites with exceptional UX and SEO
- App Development: Custom mobile and web applications built with modern technologies
- Digital Marketing: Social media strategy, content marketing, SEO, and paid advertising campaigns
- Graphic Design: Print materials, digital assets, social media graphics, and marketing collateral
- Domain & Business Email Setup: Professional domain registration and email configuration
- Creative Direction & Strategy: Vision definition, positioning, and comprehensive creative strategies

SmartLaunch is our dedicated sub-brand for startup-focused AI automation packages.

Always be professional, helpful, and conversational as Celine. If someone asks about SmartLaunch specifically, mention it's our startup-focused sub-brand. If you don't know something specific, suggest they schedule a call or contact us directly.`;

        const mergedMessages = [
          { role: 'system', content: systemPreamble + (contextText ? `\n\nContext:\n${contextText}` : '') },
          ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: text },
        ];

        const defaultModel = 'gpt-4o-mini';
        const model = import.meta.env.VITE_OPENAI_MODEL || import.meta.env.OPENAI_MODEL || defaultModel;
        
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: mergedMessages,
            temperature: 0.3,
          }),
        });

        const data = await res.json();
        
        if (!res.ok) {
          console.error('OpenAI API error:', data);
          throw new Error(data?.error?.message || 'OpenAI error');
        }

        const answer = data?.choices?.[0]?.message?.content?.trim() || "I'm not sure about that, but you can schedule a call and we'll walk you through it.";
        const smartSuggestions = getSmartSuggestions(text, answer);
        const nextSteps: string[] = smartSuggestions.slice(0, 4);

        const actions: ChatMessage['actions'] = [
          { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
        ];

        appendAssistant(answer, { suggestions: nextSteps, actions });
        trackEvent('chat_assistant_message');
        sendLog('chat_assistant_message', { answer });
      } else {
        // Use Netlify function for production
        const res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'You are the BrandGoto assistant. Be concise, confident, and professional. If unsure, encourage scheduling a call.' },
              ...messages.filter(m => m.role !== 'system').map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: text },
            ],
            context: snippets,
          }),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          console.error('Chat API error:', data);
          throw new Error(data?.error || 'Chat error');
        }

        const answer: string = data?.answer || "I'm not sure about that, but you can schedule a call and we'll walk you through it.";
        const smartSuggestions = getSmartSuggestions(text, answer);
        const nextSteps: string[] = smartSuggestions.slice(0, 4);

        const actions: ChatMessage['actions'] = [
          { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
        ];

        appendAssistant(answer, { suggestions: nextSteps, actions });
        trackEvent('chat_assistant_message');
        sendLog('chat_assistant_message', { answer });
      }
    } catch (e) {
      console.error('Chat error:', e);
      appendAssistant(
        "I'm not sure about that, but you can schedule a call and we'll walk you through it.",
        { actions: [{ label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL }] }
      );
      sendLog('chat_assistant_fallback', { error: e instanceof Error ? e.message : String(e) });
    } finally {
      setIsSending(false);
    }
  }

  async function submitLiveAgent(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!liveAgentForm.name || !liveAgentForm.email) {
      appendAssistant('Please enter both your name and email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(liveAgentForm.email)) {
      appendAssistant('Please enter a valid email address.');
      return;
    }

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: liveAgentForm.name,
        from_email: liveAgentForm.email,
        to_email: 'silas@brandgoto.com',
        message: `New Live Agent Request from Chatbot\n\nName: ${liveAgentForm.name}\nEmail: ${liveAgentForm.email}\nTime: ${new Date().toLocaleString()}\nSource: BrandGoto Chatbot`,
        reply_to: liveAgentForm.email,
      };

      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );
      
      appendAssistant('Perfect! I\'ve connected you with our live agent. Silas will reach out to you shortly. Would you like to schedule a call now?', {
        actions: [
          { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
          { label: 'Get Started', type: 'consultation', url: CONSULTATION_PAGE_URL },
        ]
      });
      setShowLiveAgent(false);
      setLiveAgentForm({ name: '', email: '' });
      trackEvent('chat_live_agent_requested');
      sendLog('chat_live_agent_requested', { name: liveAgentForm.name, email: liveAgentForm.email });
    } catch (err) {
      console.error('EmailJS error:', err);
      appendAssistant('We could not connect you with our live agent right now. Please use the Schedule a Call button.');
      sendLog('chat_live_agent_failed');
    }
  }

  async function submitQuickEmail(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!quickEmail) {
      appendAssistant('Please enter your email address.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quickEmail)) {
      appendAssistant('Please enter a valid email address.');
      return;
    }

    try {
      // Only submit leads in production, skip in development
      if (window.location.hostname !== "localhost") {
        const res = await fetch('/.netlify/functions/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Chatbot Lead',
            email: quickEmail,
            phone: '',
            interest: 'Chatbot Inquiry',
            source: 'Chatbot Quick Capture'
          }),
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Email submit failed');
      }
      
      appendAssistant('Perfect! I\'ve got your email. Silas will reach out to you shortly. Would you like to schedule a call now?', {
        actions: [
          { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
          { label: 'Get Started', type: 'consultation', url: CONSULTATION_PAGE_URL },
        ]
      });
      setShowEmailCapture(false);
      setQuickEmail('');
      trackEvent('chat_email_captured');
      sendLog('chat_email_captured', { email: quickEmail });
    } catch (err) {
      appendAssistant('We could not capture your email right now. Please use the Schedule a Call button.');
      sendLog('chat_email_failed');
    }
  }

  async function submitLead(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!lead.name || !lead.email || !lead.phone || !lead.interest) {
      appendAssistant('Please complete all fields so we can get in touch.');
      return;
    }
    try {
      // Only submit leads in production, skip in development
      if (window.location.hostname !== "localhost") {
        const res = await fetch('/.netlify/functions/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Lead submit failed');
      }
      appendAssistant('Thanks! Our team will reach out shortly. Would you like to schedule a call now?');
      setShowLead(false);
      trackEvent('chat_lead_submitted');
      sendLog('chat_lead_submitted', { lead });
    } catch (err) {
      appendAssistant('We could not submit your details right now. Please use the Schedule a Call button.');
      sendLog('chat_lead_failed');
    }
  }

  function handleAction(action: NonNullable<ChatMessage['actions']>[number]) {
    switch (action.type) {
      case 'lead':
        setShowLead(true);
        break;
      case 'liveagent':
        setShowLiveAgent(true);
        break;
      case 'email':
        setShowEmailCapture(true);
        break;
      case 'consultation':
        window.open(action.url || CONSULTATION_PAGE_URL, '_blank');
        sendLog('chat_click_consultation');
        break;
      case 'schedule':
        window.open(action.url || CALENDLY_URL, '_blank');
        sendLog('chat_click_schedule');
        break;
      case 'pdf':
        window.open(action.url || PDF_URL, '_blank');
        sendLog('chat_click_pdf');
        break;
      case 'smartlaunch':
        window.open(action.url || SMARTLAUNCH_URL, '_blank');
        sendLog('chat_click_smartlaunch');
        break;
      case 'faq':
        handleSend('FAQ');
        break;
    }
  }

  return (
    <div className="bg-chatbot">
      {/* Launcher Button */}
      <div className="chatbot-launcher-container">
        <button className="chatbot-launcher" onClick={toggleOpen} aria-label={isOpen ? 'Close chat' : 'Open chat'}>
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
          {!isOpen && showTooltip && (
            <div className="chatbot-tooltip">
              <div className="tooltip-content">
                <div className="tooltip-avatar">👋</div>
                <div className="tooltip-text">
                  <strong>Hi! I'm Celine</strong><br />
                  I'm here to help you grow your business
                </div>
              </div>
              <div className="tooltip-arrow"></div>
            </div>
          )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-controls">
              <div className="dots">
                <span></span><span></span><span></span>
              </div>
              <button className="min-btn" onClick={toggleOpen} aria-label="Minimize">—</button>
            </div>
            <div className="agent-chip">
              <div className="avatar small"><img src="/images/Image.png" alt="Celine" className="avatar-img" /><div className="status-dot online" /></div>
              <div className="agent-text">
                <div className="name">Celine from BrandGoto</div>
                <div className="role">AI Assistant</div>
              </div>
            </div>
          </div>
          <div className="chatbot-viewport" ref={viewportRef}>
            {messages.map(m => (
              <React.Fragment key={m.id}>
                <div className={`msg ${m.role}`}>
                  {m.role === 'assistant' && <div className="avatar"><img src="/images/Image.png" alt="Celine" className="avatar-img" /><div className="status-dot online" /></div>}
                  <div className="bubble" dangerouslySetInnerHTML={{ __html: m.content.replace(/\n/g, '<br/>') }} />
                </div>
                {m.suggestions && (
                  <div className="suggestions">
                    {m.suggestions.map(s => (
                      <button key={s} className="suggestion" onClick={() => handleSuggestionClick(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                {m.actions && (
                  <div className="actions">
                    {m.actions.map(a => (
                      <button key={a.label} className="action" onClick={() => handleAction(a)}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <form className="chatbot-input" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isSending ? 'Thinking…' : 'Type your message…'}
              disabled={isSending}
            />
            <button type="submit" className="send-btn" disabled={isSending || !input.trim()} aria-label="Send">
              <span className="send-label">Send</span>
              <Send size={18} />
            </button>
          </form>

          {showLead && (
            <div className="lead-form">
              <div className="lead-title">Share your contact details</div>
              <form onSubmit={submitLead}>
                <div className="row">
                  <input
                    placeholder="Name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                </div>
                <div className="row">
                  <input
                    placeholder="Email"
                    type="email"
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                  />
                </div>
                <div className="row">
                  <input
                    placeholder="Phone"
                    value={lead.phone}
                    onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                  />
                </div>
                <div className="row">
                  <input
                    placeholder="Service Interest (e.g., Branding, Web, SmartLaunch)"
                    value={lead.interest}
                    onChange={(e) => setLead({ ...lead, interest: e.target.value })}
                  />
                </div>
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowLead(false)}>Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Quick Email Capture Modal */}
      {showEmailCapture && (
        <div className="chatbot-modal">
          <div className="modal-content">
            <h3>Quick Email Capture</h3>
            <p>Just drop your email and Silas will reach out to you!</p>
            <form onSubmit={submitQuickEmail}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  required
                />
              </div>
              <div className="lead-actions">
                <button type="button" onClick={() => setShowEmailCapture(false)}>Cancel</button>
                <button type="submit">Send Email</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Agent Modal */}
      {showLiveAgent && (
        <div className="chatbot-modal">
          <div className="modal-content">
            <h3>Connect with Live Agent</h3>
            <p>Just provide your name and email, and Silas will reach out to you!</p>
            <form onSubmit={submitLiveAgent}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name"
                  value={liveAgentForm.name}
                  onChange={(e) => setLiveAgentForm({ ...liveAgentForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={liveAgentForm.email}
                  onChange={(e) => setLiveAgentForm({ ...liveAgentForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="lead-actions">
                <button type="button" onClick={() => setShowLiveAgent(false)}>Cancel</button>
                <button type="submit">Connect with Agent</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


