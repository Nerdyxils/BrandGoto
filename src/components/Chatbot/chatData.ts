// Canonical, website-backed knowledge for Celine. Keep answers factual and avoid
// inventing guarantees, client outcomes, or scope that is not published onsite.
import { caseStudyProjects } from '../../data/projectData';

const caseStudyNames = caseStudyProjects
  .slice(0, 6)
  .map((project) => project.title.split(' – ')[0])
  .join(', ');

export type KnowledgeItem = {
  id: string;
  title: string;
  text: string;
  tags?: string[];
  url?: string;
};

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: 'company-overview',
    title: 'What BrandGoto is',
    text: 'BrandGoto is an AI-powered technical growth studio and Technical Growth Partner for Venture-Scale Startups. It connects conversion-focused brand strategy, performance web, GTM systems, and engineering so founders can launch and scale with one integrated partner.',
    tags: ['company', 'about', 'technical growth partner', 'venture-scale startup', 'growth studio', 'ai-powered'],
    url: '/about-us',
  },
  {
    id: 'positioning-principle',
    title: 'Pretty vs. Profitable',
    text: 'BrandGoto\'s Pretty vs. Profitable principle means design must support conversion clarity and business outcomes. Visual polish matters, but it is built around a clear offer, a useful customer journey, measurable acquisition infrastructure, and maintainable delivery.',
    tags: ['pretty vs profitable', 'conversion', 'design principle', 'business outcomes', 'clarity'],
  },
  {
    id: 'ideal-client',
    title: 'Who BrandGoto works with',
    text: 'BrandGoto is built for ambitious founders and venture-scale startups that need to move from an early-stage idea, fragmented tools, or an underperforming presence to a coherent growth and technical foundation. A Strategic GTM Audit confirms whether the scope and offer are a fit.',
    tags: ['ideal client', 'startup', 'founder', 'early-stage', 'venture-scale', 'who do you work with'],
  },
  {
    id: 'offer-gtm-infrastructure',
    title: 'GTM Infrastructure',
    text: 'GTM Infrastructure is BrandGoto\'s umbrella growth system: investor-ready brand identity, performance web, lead capture, CRM, analytics, AI-Ops, and workflow automation designed to work together instead of as disconnected deliverables.',
    tags: ['gtm infrastructure', 'brand', 'performance web', 'crm', 'analytics', 'ai-ops', 'automation', 'lead capture'],
  },
  {
    id: 'offer-launchpad',
    title: '14-Day Launchpad overview',
    text: 'The 14-Day Launchpad is BrandGoto\'s productized GTM Infrastructure offer. It moves through discovery and strategy, brand identity and design, performance web build, then launch and growth-stack setup. Most standard-scope launches complete in 14 days; more complex builds can take longer, and the Strategic GTM Audit confirms scope and timing.',
    tags: ['14-day launchpad', 'launch', 'launch+', 'productized offer', 'timeline', 'scope'],
    url: '/launchpad',
  },
  {
    id: 'launchpad-process',
    title: '14-Day Launchpad process',
    text: 'The Launchpad schedule is Days 1–3: Discovery & Strategy; Days 4–7: Brand Identity & Design; Days 8–11: Performance Web Build; Days 12–14: Launch & Growth Stack. Complex requirements may extend the schedule.',
    tags: ['launchpad process', 'days 1 3', 'days 4 7', 'days 8 11', 'days 12 14', 'schedule', 'timeline'],
    url: '/launchpad',
  },
  {
    id: 'launch-price',
    title: 'Launch package pricing',
    text: 'Launch is listed at $5,500 USD and includes a full brand suite, a five-page website, two AI workflows, and HubSpot CRM setup.',
    tags: ['launch price', 'pricing', 'cost', '$5,500', 'five page website', 'hubspot', 'ai workflows'],
    url: '/launchpad',
  },
  {
    id: 'launch-plus-price',
    title: 'Launch+ package pricing',
    text: 'Launch+ is listed at $8,500 USD. It includes everything in Launch plus a booking system, a GPT-trained email responder, content automation, and a Launch Success Partner. Final scope and timeline are confirmed in the Strategic GTM Audit.',
    tags: ['launch plus price', 'launch+', 'pricing', 'cost', '$8,500', 'booking', 'email responder', 'content automation'],
    url: '/launchpad',
  },
  {
    id: 'launchpad-platforms',
    title: 'Launchpad web platforms',
    text: 'Depending on scope, BrandGoto builds Launchpad websites in Webflow or Next.js. The package combines the site with brand identity, lead capture, CRM, and analytics rather than treating the website as a standalone asset.',
    tags: ['webflow', 'next.js', 'nextjs', 'website platform', 'launchpad technology', 'analytics'],
    url: '/launchpad',
  },
  {
    id: 'offer-retainer',
    title: 'Fractional CTO & Engineering Retainer',
    text: 'The Fractional CTO & Engineering Retainer is BrandGoto\'s ongoing technical partnership for strategy, architecture, roadmapping, engineering delivery, AI operations, maintenance, and iteration as the company and product evolve.',
    tags: ['fractional cto', 'engineering retainer', 'architecture', 'roadmap', 'engineering', 'ai-ops', 'ongoing'],
    url: '/engineering',
  },
  {
    id: 'fractional-cto-model',
    title: 'How the Fractional CTO model works',
    text: 'BrandGoto\'s Lead Architect handles technical strategy, architecture, priorities, and the roadmap. The engineering team supports implementation, delivery, and ongoing iteration, giving founders senior technical direction plus execution without building the entire function at once.',
    tags: ['lead architect', 'fractional cto model', 'engineering team', 'implementation', 'delivery', 'technical leadership'],
    url: '/engineering',
  },
  {
    id: 'engineering-services',
    title: 'Engineering services',
    text: 'BrandGoto\'s engineering work includes Fractional CTO leadership, custom product and platform development, integrations, technical infrastructure, and AI Operations. The exact team and cadence depend on the approved roadmap and scope.',
    tags: ['custom development', 'product development', 'platform', 'integration', 'technical infrastructure', 'ai operations'],
    url: '/engineering',
  },
  {
    id: 'engineering-stack',
    title: 'Technology stack',
    text: 'Technologies shown by BrandGoto include Webflow, Next.js, React, Vue, TypeScript, Node.js, Python, Django, FastAPI, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, Redis, OpenAI, LangChain, and API integrations. Technology is selected around the project requirements rather than forced into one stack.',
    tags: ['tech stack', 'technology', 'react', 'vue', 'typescript', 'node', 'python', 'aws', 'docker', 'kubernetes', 'postgresql', 'mongodb', 'redis', 'openai', 'langchain'],
    url: '/engineering',
  },
  {
    id: 'ai-operations',
    title: 'AI Operations and automation',
    text: 'BrandGoto designs practical AI workflows and automations around operating needs such as lead handling, customer communication, content operations, data movement, and connected internal processes. Recommendations depend on the workflow, data, integrations, and human review required.',
    tags: ['ai ops', 'ai operations', 'automation', 'workflow', 'openai', 'lead handling', 'content automation'],
    url: '/engineering',
  },
  {
    id: 'brand-web-services',
    title: 'Brand, web, and creative services',
    text: 'BrandGoto can support brand identity and logo systems, creative direction, performance website design and development, graphic design, digital marketing and growth, mobile application development, technical setup, and AI integrations. These capabilities are assembled around the selected growth offer.',
    tags: ['services', 'branding', 'logo', 'creative direction', 'website', 'web design', 'mobile app', 'marketing', 'graphic design'],
    url: '/how-we-help',
  },
  {
    id: 'delivery-process',
    title: 'BrandGoto delivery process',
    text: 'BrandGoto\'s broader delivery process follows four stages: Discovery & Research, Strategy & Planning, Engineering & Build, and Launch & Scaling. The detail and duration of each stage vary by offer and scope.',
    tags: ['process', 'discovery', 'research', 'strategy', 'planning', 'build', 'launch', 'scaling'],
    url: '/how-we-help',
  },
  {
    id: 'case-studies',
    title: 'Case studies and portfolio',
    text: `BrandGoto publishes case studies spanning brand, performance web, product, and technical infrastructure. Current examples include ${caseStudyNames}. Visit Things We Built for the project collection and individual case-study detail.`,
    tags: ['case studies', 'portfolio', 'things we built', 'work', 'examples', 'results'],
    url: '/things-we-built',
  },
  {
    id: 'location-collaboration',
    title: 'Location and collaboration',
    text: 'BrandGoto is remote-first and works with founders in the United States and globally. Collaboration format, meetings, access, and delivery cadence are agreed during scoping.',
    tags: ['location', 'remote', 'global', 'united states', 'collaboration', 'timezone'],
    url: '/about-us',
  },
  {
    id: 'conversion-audit',
    title: 'Strategic GTM Audit',
    text: 'The Strategic GTM Audit is the primary next step. BrandGoto reviews goals, existing infrastructure, project scope, timing, and offer fit, then identifies whether GTM Infrastructure, the 14-Day Launchpad, or the Fractional CTO & Engineering Retainer is the appropriate path.',
    tags: ['strategic gtm audit', 'consultation', 'audit', 'get started', 'scope', 'timeline', 'offer fit', 'book'],
    url: '/book-consultation',
  },
  {
    id: 'live-agent',
    title: 'Contact a live agent',
    text: 'A visitor who wants a person can request a live-agent follow-up in Celine. The visitor submits a name, email address, company, and question; the ticket is addressed to silas@brandgoto.com and the BrandGoto team follows up.',
    tags: ['live agent', 'human', 'person', 'contact', 'email', 'silas', 'ticket', 'support'],
  },
];

export const faq: Array<{ q: string; a: string }> = [
  {
    q: 'What does BrandGoto do?',
    a: 'BrandGoto is a Technical Growth Partner for Venture-Scale Startups, combining conversion-focused brand, performance web, GTM infrastructure, engineering, and AI operations.',
  },
  {
    q: 'What are BrandGoto\'s three core offers?',
    a: 'The three core paths are GTM Infrastructure, the productized 14-Day Launchpad, and the ongoing Fractional CTO & Engineering Retainer.',
  },
  {
    q: 'How much does the 14-Day Launchpad cost?',
    a: 'Launch is listed at $5,500 USD. Launch+ is listed at $8,500 USD. The Strategic GTM Audit confirms final scope, timing, and fit.',
  },
  {
    q: 'What is included in Launch?',
    a: 'Launch includes a full brand suite, a five-page website, two AI workflows, and HubSpot CRM setup.',
  },
  {
    q: 'What is included in Launch+?',
    a: 'Launch+ includes everything in Launch plus a booking system, a GPT-trained email responder, content automation, and a Launch Success Partner.',
  },
  {
    q: 'Does every Launchpad project take exactly 14 days?',
    a: 'Most standard-scope launches complete in 14 days. More complex builds can take longer; the Strategic GTM Audit confirms the realistic schedule.',
  },
  {
    q: 'What does a Fractional CTO engagement include?',
    a: 'It combines senior technical strategy, architecture, prioritization, and roadmapping with engineering implementation, delivery, AI operations, and ongoing iteration.',
  },
  {
    q: 'What technology does BrandGoto use?',
    a: 'The published stack includes Webflow, Next.js, React, Vue, TypeScript, Node.js, Python, Django, FastAPI, AWS, Docker, Kubernetes, common databases, OpenAI, LangChain, and API integrations. The final stack depends on project needs.',
  },
  {
    q: 'Can I see BrandGoto case studies?',
    a: 'Yes. Visit Things We Built for BrandGoto\'s portfolio and project case studies across brand, web, product, and infrastructure work.',
  },
  {
    q: 'Does BrandGoto work remotely?',
    a: 'Yes. BrandGoto is remote-first and works with founders in the United States and globally.',
  },
  {
    q: 'How do I get started?',
    a: 'Request a Strategic GTM Audit so BrandGoto can review your goals, current infrastructure, scope, timing, and the right offer fit.',
  },
  {
    q: 'Can I talk to a live agent?',
    a: 'Yes. Choose Live Agent or ask Celine to speak with a person. Submit the short ticket and the BrandGoto team will get back to you.',
  },
];
