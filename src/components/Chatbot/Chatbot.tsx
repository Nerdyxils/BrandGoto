import React, { useEffect, useRef, useState } from 'react';
import './Chatbot.css';
import { faq } from './chatData';
import { 
  retrieveRelevantSnippets, 
  getSmartSuggestions, 
  generateId, 
  detectSmartLaunchIntent 
} from './chatLogic';
import { MessageCircle, Send, X } from 'lucide-react';

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
const CONSULTATION_PAGE_URL = '/book-a-consultation';
const PDF_URL = '/brandgoto-overview.pdf';

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
    if (window.location.hostname !== "localhost") {
      await fetch('/.netlify/functions/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload, ts: Date.now() }),
      });
    }
  } catch {}
}

const initialWelcome: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Celine from BrandGoto 👋 I'm here to help you discover how we can elevate your brand and grow your business. What brings you here today?",
  suggestions: ['Tell me about your services', 'I need branding help', 'Show me AI automation', 'Live Agent'],
};

export default function Chatbot() {
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

  async function handleSend(optionalText?: string) {
    const text = (optionalText ?? input).trim();
    if (!text) return;
    setInput('');
    const userMsg: ChatMessage = { id: generateId(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    trackEvent('chat_user_message', { length: text.length });
    sendLog('chat_user_message', { text });

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

    if (/^faq$/i.test(text) || /help|questions|common questions/i.test(text)) {
      const labels = faq.map(f => f.q).slice(0, 5);
      appendAssistant('Here are a few common questions:', { suggestions: labels, actions: [
        { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
      ]});
      return;
    }

    const matchedFaq = faq.find(f => f.q.toLowerCase() === text.toLowerCase());
    if (matchedFaq) {
      appendAssistant(matchedFaq.a, { actions: [
        { label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL },
      ]});
      return;
    }

    const snippets = retrieveRelevantSnippets(text, 5);
    setIsSending(true);

    try {
      const isLocal = window.location.hostname === "localhost";
      const endpoint = isLocal ? 'https://api.openai.com/v1/chat/completions' : '/.netlify/functions/chat';
      
      let answer = "";
      let suggestions: string[] = [];

      if (isLocal) {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) throw new Error('OpenAI API key missing in .env');

        const contextText = snippets.map((c, i) => `# Snippet ${i + 1}${c.title ? `: ${c.title}` : ''}\n${c.text}`).join('\n\n');
        const systemPreamble = `You are Celine, BrandGoto's AI assistant.
        Always be professional, helpful, and conversational.
        Context: ${contextText}`;

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPreamble },
              ...messages.map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: text },
            ],
            temperature: 0.3,
          }),
        });
        const data = await res.json();
        answer = data?.choices?.[0]?.message?.content?.trim();
      } else {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            context: snippets,
          }),
        });
        const data = await res.json();
        answer = data?.answer;
      }

      if (!answer) throw new Error("No response from AI");

      suggestions = getSmartSuggestions(text, answer).slice(0, 4);
      appendAssistant(answer, { 
        suggestions, 
        actions: [{ label: 'Schedule a Call', type: 'schedule', url: CALENDLY_URL }] 
      });
      
    } catch (e) {
      console.error('Chat error:', e);
      appendAssistant("I'm having trouble connecting right now. Please try again or schedule a call.");
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
    try {
      // Note: Replace with actual EmailJS keys if needed
      // await emailjs.send('service_id', 'template_id', {
      //   from_name: liveAgentForm.name,
      //   from_email: liveAgentForm.email,
      //   to_email: 'silas@brandgoto.com',
      //   message: `Live Agent Request from ${liveAgentForm.name} (${liveAgentForm.email})`,
      // }, 'public_key');
      appendAssistant('Perfect! I\'ve sent your request to Silas. He will reach out shortly.');
      setShowLiveAgent(false);
      setLiveAgentForm({ name: '', email: '' });
    } catch (err) {
      appendAssistant('Something went wrong. Please use the Schedule a Call button instead.');
    }
  }

  async function submitQuickEmail(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!quickEmail) return;
    appendAssistant('Got it! Silas will reach out to you shortly.');
    setShowEmailCapture(false);
    setQuickEmail('');
  }

  async function submitLead(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!lead.name || !lead.email) return;
    appendAssistant('Thanks! Our team will reach out shortly.');
    setShowLead(false);
  }

  function handleAction(action: NonNullable<ChatMessage['actions']>[number]) {
    switch (action.type) {
      case 'lead': setShowLead(true); break;
      case 'liveagent': setShowLiveAgent(true); break;
      case 'email': setShowEmailCapture(true); break;
      case 'consultation': window.open(action.url || CONSULTATION_PAGE_URL, '_blank'); break;
      case 'schedule': window.open(action.url || CALENDLY_URL, '_blank'); break;
      case 'pdf': window.open(action.url || PDF_URL, '_blank'); break;
      case 'smartlaunch': window.open(action.url || SMARTLAUNCH_URL, '_blank'); break;
      case 'faq': handleSend('FAQ'); break;
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
              <button className="min-btn" onClick={toggleOpen}>—</button>
            </div>
            <div className="agent-chip">
              <div className="avatar small">
                <img src="/images/Image.webp" alt="Celine" className="avatar-img" />
                <div className="status-dot online" />
              </div>
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
                  {m.role === 'assistant' && (
                    <div className="avatar">
                      <img src="/images/Image.webp" alt="Celine" className="avatar-img" />
                      <div className="status-dot online" />
                    </div>
                  )}
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
            <button type="submit" className="send-btn" disabled={isSending || !input.trim()}>
              <Send size={18} />
            </button>
          </form>

          {/* Forms */}
          {showLead && (
            <div className="lead-form">
              <div className="lead-title">Share your contact details</div>
              <form onSubmit={submitLead}>
                <input placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <input placeholder="Email" type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowLead(false)}>Cancel</button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          )}

          {showEmailCapture && (
            <div className="chatbot-modal">
              <div className="modal-content">
                <h3>Quick Email Capture</h3>
                <input type="email" placeholder="Email address" value={quickEmail} onChange={(e) => setQuickEmail(e.target.value)} />
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowEmailCapture(false)}>Cancel</button>
                  <button type="button" onClick={() => submitQuickEmail()}>Send</button>
                </div>
              </div>
            </div>
          )}

          {showLiveAgent && (
            <div className="chatbot-modal">
              <div className="modal-content">
                <h3>Connect with Live Agent</h3>
                <input placeholder="Your name" value={liveAgentForm.name} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, name: e.target.value })} />
                <input type="email" placeholder="Your email" value={liveAgentForm.email} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, email: e.target.value })} />
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowLiveAgent(false)}>Cancel</button>
                  <button type="button" onClick={() => submitLiveAgent()}>Connect</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
