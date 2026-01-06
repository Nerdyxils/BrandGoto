import { knowledgeBase } from './knowledge';

export type KnowledgeItem = {
  id: string;
  title: string;
  text: string;
  tags?: string[];
  url?: string;
};

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

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


