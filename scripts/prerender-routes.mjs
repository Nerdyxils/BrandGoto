import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const siteUrl = 'https://www.brandgoto.com';
const routes = [
  {
    path: '/',
    title: 'Brandgoto | Technical Growth Partner for Venture-Scale Startups',
    description: 'Investor-ready branding, venture-scale web engineering, and AI-Ops infrastructure for startups, delivered through one technical growth partner.',
  },
  {
    path: '/launchpad',
    title: '14-Day Launchpad | Investor-Ready Brand & Web for Startups',
    description: 'GTM (Go-to-Market) infrastructure for startups with investor-ready branding, performance Webflow/Next.js, and AI-Ops automation.',
  },
  {
    path: '/engineering',
    title: 'Fractional CTO & Engineering Retainer | Brandgoto',
    description: 'Fractional CTO leadership, engineering delivery, AI-Ops, and workflow automation for venture-scale startups.',
  },
  {
    path: '/things-we-built',
    title: 'Case Studies | Venture-Scale Websites & Apps | Brandgoto',
    description: 'Explore venture-scale web apps, investor-ready branding, and performance builds delivered for startups worldwide.',
  },
  {
    path: '/book-consultation',
    title: 'Strategic GTM Audit | Brandgoto',
    description: 'Request a Strategic GTM Audit for GTM Infrastructure, the 14-Day Launchpad, or a Fractional CTO & Engineering Retainer.',
  },
];

const replaceAttribute = (html, selectorPattern, value) => html.replace(
  selectorPattern,
  (match) => match.replace(/content="[^"]*"/, `content="${value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`),
);

const template = await readFile('dist/index.html', 'utf8');

for (const route of routes) {
  const canonical = `${siteUrl}${route.path === '/' ? '/' : route.path}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-us" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-us" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`);

  html = replaceAttribute(html, /<meta name="title"[^>]*>/, route.title);
  html = replaceAttribute(html, /<meta name="description"[^>]*>/, route.description);
  html = replaceAttribute(html, /<meta property="og:url"[^>]*>/, canonical);
  html = replaceAttribute(html, /<meta property="og:title"[^>]*>/, route.title);
  html = replaceAttribute(html, /<meta property="og:description"[^>]*>/, route.description);
  html = replaceAttribute(html, /<meta name="twitter:title"[^>]*>/, route.title);
  html = replaceAttribute(html, /<meta name="twitter:description"[^>]*>/, route.description);

  const output = route.path === '/' ? 'dist/index.html' : join('dist', route.path.slice(1), 'index.html');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated route-specific initial metadata for ${routes.length} marketing routes.`);
