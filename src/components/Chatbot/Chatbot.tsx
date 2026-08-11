import React, { useEffect, useRef, useState } from 'react';
import './Chatbot.css';
import { faq } from './chatData';
import { 
  retrieveRelevantSnippets, 
  getSmartSuggestions, 
  getLocalBrandGotoAnswer,
  isLiveAgentIntent,
  generateId,
} from './chatLogic';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  suggestions?: string[];
  actions?: Array<{ label: string; type: 'lead' | 'schedule' | 'pdf' | 'faq' | 'email' | 'consultation' | 'liveagent'; url?: string }>;
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  interest: string;
};

type LiveAgentForm = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const BOOK_CALL_URL = 'https://calendar.app.google/uCcmuLDGudKtHW9V8';
const CONSULTATION_PAGE_URL = '/book-consultation';
const PDF_URL = '/brandgoto-overview.pdf';

function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (window.gtag) {
      window.gtag('event', eventName, params || {});
    }
  } catch {
    return;
  }
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
  } catch {
    return;
  }
}

const initialWelcome: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Celine from BrandGoto 👋 I'm here to help you discover how we can elevate your brand and grow your business. What brings you here today?",
  suggestions: ['GTM Infrastructure', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer', 'Live Agent'],
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcome]);
  const [input, setInput] = useState('');
  const [showLead, setShowLead] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showLiveAgent, setShowLiveAgent] = useState(false);
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [quickEmail, setQuickEmail] = useState('');
  const [liveAgentForm, setLiveAgentForm] = useState<LiveAgentForm>({ name: '', email: '', company: '', message: '' });
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

  function openLiveAgentForm() {
    setShowLiveAgent(true);
    appendAssistant('Absolutely — fill out this short support ticket and the BrandGoto team will get back to you by email.');
    trackEvent('chat_live_agent_requested');
    sendLog('chat_live_agent_requested');
  }

  function handleSuggestionClick(text: string) {
    if (/live agent/i.test(text)) {
      openLiveAgentForm();
      return;
    }
    if (/schedule a call/i.test(text)) {
      handleAction({ label: 'Schedule a Call', type: 'schedule', url: BOOK_CALL_URL });
      return;
    }
    if (/strategic gtm audit|get started/i.test(text)) {
      handleAction({ label: 'Strategic GTM Audit', type: 'consultation', url: CONSULTATION_PAGE_URL });
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
    sendLog('chat_user_message', { length: text.length });

    if (isLiveAgentIntent(text)) {
      openLiveAgentForm();
      return;
    }

    if (/^faq$/i.test(text) || /help|questions|common questions/i.test(text)) {
      const labels = faq.map(f => f.q).slice(0, 5);
      appendAssistant('Here are a few common questions:', { suggestions: labels, actions: [
        { label: 'Schedule a Call', type: 'schedule', url: BOOK_CALL_URL },
      ]});
      return;
    }

    const matchedFaq = faq.find(f => f.q.toLowerCase() === text.toLowerCase());
    if (matchedFaq) {
      appendAssistant(matchedFaq.a, { actions: [
        { label: 'Schedule a Call', type: 'schedule', url: BOOK_CALL_URL },
      ]});
      return;
    }

    const snippets = retrieveRelevantSnippets(text, 5);
    setIsSending(true);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
          context: snippets,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Chat request failed');

      const answer = data?.answer;

      if (!answer) throw new Error("No response from AI");

      const suggestions = getSmartSuggestions(text, answer).slice(0, 4);
      appendAssistant(answer, { 
        suggestions, 
        actions: [{ label: 'Schedule a Call', type: 'schedule', url: BOOK_CALL_URL }]
      });
      
    } catch (e) {
      console.error('Chat error:', e);
      const fallbackAnswer = getLocalBrandGotoAnswer(text);
      appendAssistant(fallbackAnswer, {
        suggestions: getSmartSuggestions(text, fallbackAnswer).slice(0, 4),
        actions: [{ label: 'Schedule a Call', type: 'schedule', url: BOOK_CALL_URL }],
      });
    } finally {
      setIsSending(false);
    }
  }

  async function submitLeadRequest(payload: Record<string, string>) {
    const response = await fetch('/.netlify/functions/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Lead submission failed');
    }
  }

  async function submitLiveAgent(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!liveAgentForm.name.trim() || !liveAgentForm.email.trim() || !liveAgentForm.message.trim()) {
      appendAssistant('Please enter your name, email address, and a short description of what you need help with.');
      return;
    }
    setIsLeadSubmitting(true);
    try {
      await submitLeadRequest({
        name: liveAgentForm.name,
        email: liveAgentForm.email,
        phone: '',
        interest: liveAgentForm.message,
        source: 'Chatbot Live Agent',
        company: liveAgentForm.company,
        message: liveAgentForm.message,
        requestType: 'live_agent_ticket',
        recipient: 'silas@brandgoto.com',
      });
      appendAssistant('Your request has been received. The BrandGoto team will review it and get back to you at the email address you provided.');
      setShowLiveAgent(false);
      setLiveAgentForm({ name: '', email: '', company: '', message: '' });
    } catch {
      appendAssistant('I could not submit the ticket right now. Please email silas@brandgoto.com or use the Schedule a Call button.');
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  async function submitQuickEmail(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!quickEmail) return;
    setIsLeadSubmitting(true);
    try {
      await submitLeadRequest({
        name: 'Chatbot Lead',
        email: quickEmail,
        phone: '',
        interest: 'Chatbot Inquiry',
        source: 'Chatbot Quick Capture',
      });
      appendAssistant('Got it! Silas will reach out to you shortly.');
      setShowEmailCapture(false);
      setQuickEmail('');
    } catch {
      appendAssistant('We could not capture your email right now. Please use the Schedule a Call button instead.');
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  async function submitLead(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!lead.name || !lead.email) return;
    setIsLeadSubmitting(true);
    try {
      await submitLeadRequest({ ...lead, source: 'Chatbot Lead Form' });
      appendAssistant('Thanks! Our team will reach out shortly.');
      setShowLead(false);
    } catch {
      appendAssistant('We could not submit your details right now. Please use the Schedule a Call button instead.');
    } finally {
      setIsLeadSubmitting(false);
    }
  }

  function handleAction(action: NonNullable<ChatMessage['actions']>[number]) {
    switch (action.type) {
      case 'lead': setShowLead(true); break;
      case 'liveagent': openLiveAgentForm(); break;
      case 'email': setShowEmailCapture(true); break;
      case 'consultation': window.open(action.url || CONSULTATION_PAGE_URL, '_blank'); break;
      case 'schedule': window.open(action.url || BOOK_CALL_URL, '_blank', 'noopener,noreferrer'); break;
      case 'pdf': window.open(action.url || PDF_URL, '_blank'); break;
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
        <section className="chatbot-window" aria-label="Chat with Celine">
          <div className="chatbot-header">
            <div className="agent-chip">
              <div className="avatar small">
                <img src="/images/Image.webp" alt="Celine" className="avatar-img" width="44" height="44" />
                <div className="status-dot online" />
              </div>
              <div className="agent-text">
                <div className="chatbot-eyebrow">BrandGoto concierge</div>
                <div className="name">Celine</div>
                <div className="role"><span aria-hidden="true" /> Online · Ask me anything</div>
              </div>
            </div>
            <button className="min-btn" onClick={toggleOpen} aria-label="Minimize chat"><X size={18} /></button>
          </div>

          <div className="chatbot-viewport" ref={viewportRef} aria-live="polite">
            {messages.map(m => (
              <React.Fragment key={m.id}>
                <div className={`msg ${m.role}`}>
                  {m.role === 'assistant' && (
                    <div className="avatar">
                      <img src="/images/Image.webp" alt="" className="avatar-img" width="44" height="44" />
                      <div className="status-dot online" />
                    </div>
                  )}
                  <div className="bubble">{m.content}</div>
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
            <div className="chatbot-composer">
              <label htmlFor="chatbot-message" className="sr-only">Message</label>
              <input
                id="chatbot-message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isSending ? 'Celine is thinking…' : 'Ask about BrandGoto…'}
                disabled={isSending}
              />
              <button type="submit" className="send-btn" disabled={isSending || !input.trim()} aria-label="Send message">
                <Send size={17} />
              </button>
            </div>
            <span className="chatbot-input-note">BrandGoto knowledge · Human follow-up available</span>
          </form>

          {/* Forms */}
          {showLead && (
            <div className="lead-form">
              <div className="lead-title">Share your contact details</div>
              <form onSubmit={submitLead}>
                <label htmlFor="chatbot-lead-name" className="sr-only">Name</label>
                <input id="chatbot-lead-name" placeholder="Name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
                <label htmlFor="chatbot-lead-email" className="sr-only">Email address</label>
                <input id="chatbot-lead-email" placeholder="Email" type="email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowLead(false)}>Cancel</button>
                  <button type="submit" disabled={isLeadSubmitting}>Submit</button>
                </div>
              </form>
            </div>
          )}

          {showEmailCapture && (
            <div className="chatbot-modal">
              <div className="chatbot-modal-content">
                <h3>Quick Email Capture</h3>
                <label htmlFor="chatbot-quick-email" className="sr-only">Email address</label>
                <input id="chatbot-quick-email" type="email" placeholder="Email address" value={quickEmail} onChange={(e) => setQuickEmail(e.target.value)} />
                <div className="lead-actions">
                  <button type="button" onClick={() => setShowEmailCapture(false)}>Cancel</button>
                  <button type="button" onClick={() => submitQuickEmail()} disabled={isLeadSubmitting}>Send</button>
                </div>
              </div>
            </div>
          )}

          {showLiveAgent && (
            <div className="chatbot-modal" role="dialog" aria-modal="true" aria-labelledby="chatbot-live-agent-title">
              <form className="chatbot-modal-content" onSubmit={submitLiveAgent}>
                <h3 id="chatbot-live-agent-title">Request a live agent</h3>
                <p>Tell us what you need and the BrandGoto team will get back to you by email.</p>
                <label htmlFor="chatbot-agent-name">Name</label>
                <input id="chatbot-agent-name" required autoComplete="name" placeholder="Your name" value={liveAgentForm.name} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, name: e.target.value })} />
                <label htmlFor="chatbot-agent-email">Email address</label>
                <input id="chatbot-agent-email" required autoComplete="email" type="email" placeholder="you@company.com" value={liveAgentForm.email} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, email: e.target.value })} />
                <label htmlFor="chatbot-agent-company">Company <span>(optional)</span></label>
                <input id="chatbot-agent-company" autoComplete="organization" placeholder="Company name" value={liveAgentForm.company} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, company: e.target.value })} />
                <label htmlFor="chatbot-agent-message">How can we help?</label>
                <textarea id="chatbot-agent-message" required rows={4} placeholder="Briefly describe your question or project" value={liveAgentForm.message} onChange={(e) => setLiveAgentForm({ ...liveAgentForm, message: e.target.value })} />
                <div className="lead-actions">
                  <button type="button" className="chatbot-cancel" onClick={() => setShowLiveAgent(false)}>Cancel</button>
                  <button type="submit" disabled={isLeadSubmitting}>{isLeadSubmitting ? 'Sending…' : 'Send request'}</button>
                </div>
              </form>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
