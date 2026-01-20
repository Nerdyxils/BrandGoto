import { knowledgeBase, KnowledgeItem } from './chatData';

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Basic keyword-based retriever for finding relevant knowledge base snippets.
 */
export function retrieveRelevantSnippets(query: string, k = 5): KnowledgeItem[] {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];

  const scored = knowledgeBase.map((item) => {
    const tokens = tokenize(item.title + ' ' + item.text + ' ' + (item.tags || []).join(' '));
    let score = 0;
    for (const qt of qTokens) {
      score += tokens.includes(qt) ? 2 : 0;
      // partial match bonus
      if (!tokens.includes(qt)) {
        const found = tokens.some(t => t.startsWith(qt) || qt.startsWith(t));
        if (found) score += 1;
      }
    }
    // small length normalization
    score = score / Math.sqrt(tokens.length + 1);
    return { item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(s => s.item)
    .filter(s => s && s.text);
}

/**
 * Intelligent suggestion generator based on user intent and response content.
 */
export function getSmartSuggestions(userText: string, aiResponse: string): string[] {
  const text = userText.toLowerCase();
  const response = aiResponse.toLowerCase();
  
  if (/services|what do you|tell me about/i.test(text)) {
    return ['I need branding help', 'Show me web design', 'Tell me about AI automation', 'Get started'];
  }
  
  if (/branding|brand|logo|identity/i.test(text)) {
    return ['Get branding quote', 'See portfolio', 'Schedule consultation', 'Learn more'];
  }
  
  if (/website|web design|web development|site/i.test(text)) {
    return ['Get website quote', 'See examples', 'Schedule consultation', 'Learn more'];
  }
  
  if (/ai|automation|smartlaunch/i.test(text)) {
    return ['Explore SmartLaunch', 'Get AI package quote', 'Schedule consultation', 'Learn more'];
  }
  
  if (/get started|ready|interested|pricing|cost|quote/i.test(text)) {
    return ['Get started', 'Schedule a Call', 'Live Agent', 'Learn more'];
  }
  
  if (/schedule|call|consultation/i.test(response)) {
    return ['Schedule a Call', 'Get started', 'Learn more', 'See portfolio'];
  }
  
  if (/smartlaunch/i.test(response)) {
    return ['Explore SmartLaunch', 'Get AI package', 'Schedule a Call', 'Learn more'];
  }
  
  return ['Get started', 'Schedule a Call', 'Live Agent', 'Learn more'];
}

export function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function detectSmartLaunchIntent(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes('smartlaunch') ||
    t.includes('ai automation') ||
    t.includes('automation package') ||
    t.includes('startup package')
  );
}
