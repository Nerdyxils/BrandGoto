import { faq, knowledgeBase, KnowledgeItem } from './chatData';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'at', 'be', 'can', 'do', 'does', 'for', 'from', 'how',
  'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our', 'the', 'to', 'we',
  'what', 'when', 'where', 'which', 'who', 'with', 'you', 'your',
]);

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9+$.\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function isLiveAgentIntent(input: string): boolean {
  return /\b(live\s+agent|human|real\s+person|representative|talk\s+to\s+(a\s+)?person|speak\s+(to|with)\s+(someone|a\s+person|silas)|contact\s+silas|support\s+ticket)\b/i.test(input);
}

/** Find relevant, website-backed knowledge. Zero-score items are never returned. */
export function retrieveRelevantSnippets(query: string, k = 5): KnowledgeItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];

  return knowledgeBase
    .map((item) => {
      const haystack = `${item.title} ${item.text} ${(item.tags || []).join(' ')}`.toLowerCase();
      const tokens = tokenize(haystack);
      let score = 0;

      for (const queryToken of qTokens) {
        if (tokens.includes(queryToken)) score += 4;
        else if (tokens.some((token) => token.startsWith(queryToken) || queryToken.startsWith(token))) score += 1;
      }

      for (const tag of item.tags || []) {
        if (normalizedQuery.includes(tag.toLowerCase())) score += 10;
      }

      if (normalizedQuery.includes(item.title.toLowerCase())) score += 12;
      return { item, score: score / Math.sqrt(tokens.length + 1) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ item }) => item);
}

/**
 * A deterministic answer path keeps Celine useful in local development and if
 * the hosted AI provider is temporarily unavailable. Answers use only the
 * canonical knowledge above.
 */
export function getLocalBrandGotoAnswer(query: string): string {
  const text = query.toLowerCase();
  const exactFaq = faq.find((item) => item.q.toLowerCase() === text.trim());
  if (exactFaq) return exactFaq.a;

  if (/\b(price|pricing|cost|budget|how much)\b/.test(text) && /\b(launch|launchpad|launch\+)\b/.test(text)) {
    return 'Launch is listed at $5,500 USD and Launch+ at $8,500 USD. Launch includes a full brand suite, five-page website, two AI workflows, and HubSpot CRM setup. Launch+ adds a booking system, GPT-trained email responder, content automation, and a Launch Success Partner. A Strategic GTM Audit confirms final scope and timing.';
  }
  if (/\b(14 day|14-day|timeline|how long|schedule|process)\b/.test(text) && /\b(launch|launchpad|project)\b/.test(text)) {
    return 'The Launchpad runs through Days 1–3 Discovery & Strategy, Days 4–7 Brand Identity & Design, Days 8–11 Performance Web Build, and Days 12–14 Launch & Growth Stack. Most standard-scope launches complete in 14 days; complex builds can take longer.';
  }
  if (/\b(three|3|core)\b.*\b(offer|service)/.test(text) || /\bwhat.*offer/.test(text)) {
    return 'BrandGoto\'s three core paths are GTM Infrastructure, the productized 14-Day Launchpad, and the ongoing Fractional CTO & Engineering Retainer. The Strategic GTM Audit identifies the best fit.';
  }

  const snippets = retrieveRelevantSnippets(query, 2);
  if (snippets.length) return snippets.map((item) => item.text).join('\n\n');

  return 'I can help with BrandGoto\'s GTM Infrastructure, 14-Day Launchpad, Fractional CTO & Engineering Retainer, services, process, pricing, technology, case studies, or Strategic GTM Audit. For a project-specific answer, request a live agent and the BrandGoto team will get back to you.';
}

export function getSmartSuggestions(userText: string, aiResponse: string): string[] {
  const text = userText.toLowerCase();
  const response = aiResponse.toLowerCase();

  if (/services|what do you|tell me about/i.test(text)) {
    return ['GTM Infrastructure', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer', 'Strategic GTM Audit'];
  }
  if (/branding|brand|logo|identity/i.test(text)) {
    return ['GTM Infrastructure', 'See portfolio', 'Strategic GTM Audit', 'Live Agent'];
  }
  if (/website|web design|web development|site/i.test(text)) {
    return ['14-Day Launchpad', 'See portfolio', 'Strategic GTM Audit', 'Live Agent'];
  }
  if (/ai|automation|ai-ops/i.test(text)) {
    return ['GTM Infrastructure', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer', 'Live Agent'];
  }
  if (/get started|ready|interested|pricing|cost|quote/i.test(text)) {
    return ['Strategic GTM Audit', 'Schedule a Call', 'Live Agent'];
  }
  if (/schedule|call|consultation/i.test(response)) {
    return ['Schedule a Call', 'Strategic GTM Audit', 'See portfolio', 'Live Agent'];
  }
  return ['Strategic GTM Audit', '14-Day Launchpad', 'Fractional CTO & Engineering Retainer', 'Live Agent'];
}

export function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
