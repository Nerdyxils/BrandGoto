import type { KnowledgeItem } from './retriever';

// Comprehensive knowledge base for BrandGoto - Complete website information
// Keep each item small (2-6 sentences) and focused on a single topic.
export const knowledgeBase: KnowledgeItem[] = [
  // === SERVICES ===
  {
    id: 'services-branding',
    title: 'BrandGoto Services - Brand Identity & Logo Design',
    text:
      'BrandGoto delivers complete brand identity solutions including logo design, visual identity systems, brand strategy, messaging, and comprehensive brand guidelines. We create memorable brands that stand out and stick, helping businesses establish a strong, memorable presence that resonates with their target audience.',
    tags: ['branding', 'identity', 'logo design', 'strategy', 'visual identity', 'brand guidelines'],
  },
  {
    id: 'services-web',
    title: 'BrandGoto Services - Website Design & Development',
    text:
      'We design and build responsive, high-performance websites that convert with clean, fast, mobile-first design. From stunning landing pages to complex e-commerce platforms, our sites are optimized for speed, SEO, and conversion with seamless user experiences across all devices.',
    tags: ['web design', 'web development', 'react', 'seo', 'responsive', 'ux', 'ecommerce', 'landing pages'],
  },
  {
    id: 'services-mobile',
    title: 'BrandGoto Services - Mobile App Development',
    text:
      'BrandGoto offers comprehensive mobile app development for iOS & Android apps that customers love. We build native and cross-platform mobile applications that deliver exceptional user experiences, solve real problems, engage users, and scale with your business growth.',
    tags: ['mobile apps', 'ios', 'android', 'app development', 'native apps', 'cross-platform'],
  },
  {
    id: 'services-marketing',
    title: 'BrandGoto Services - Digital Marketing & Growth',
    text:
      'Our digital marketing services include data-driven strategies that drive traffic, generate leads, and increase conversions. From social media campaigns to email marketing, we create campaigns that deliver measurable ROI and marketing that actually gets results.',
    tags: ['digital marketing', 'social media', 'seo', 'content marketing', 'advertising', 'growth', 'roi'],
  },
  {
    id: 'services-graphic',
    title: 'BrandGoto Services - Graphic Design & Visual Content',
    text:
      'We provide comprehensive graphic design services including print materials, digital assets, social media graphics, presentations, and marketing collateral. Our eye-catching visuals stop the scroll and maintain brand consistency while effectively communicating your message.',
    tags: ['graphic design', 'print design', 'digital assets', 'marketing materials', 'visual content'],
  },
  {
    id: 'services-strategy',
    title: 'BrandGoto Services - Creative Direction & Strategy',
    text:
      'Our creative direction and strategy services provide clear direction from scattered ideas. We help businesses define their vision, positioning, and creative approach, developing comprehensive strategies that align creative execution with business objectives.',
    tags: ['creative direction', 'strategy', 'brand strategy', 'creative strategy', 'vision', 'positioning'],
  },
  {
    id: 'services-technical',
    title: 'BrandGoto Services - Technical Setup & Infrastructure',
    text:
      'BrandGoto handles all the techy stuff for you including domain registration, DNS configuration, professional business email setup, and technical infrastructure. We ensure your domain is properly configured for optimal performance and security.',
    tags: ['technical setup', 'infrastructure', 'domain setup', 'business email', 'dns', 'email configuration'],
  },

  // === SMARTLAUNCH ===
  {
    id: 'packages-smartlaunch',
    title: 'SmartLaunch by BrandGoto - AI Automation Packages',
    text:
      'SmartLaunch is our startup-focused AI automation offering designed to accelerate business growth. Packages include lead capture systems, CRM workflows, AI-powered assistants, automated onboarding, and intelligent business process automation.',
    tags: ['smartlaunch', 'ai automation', 'startup', 'packages', 'automation', 'ai', 'lead capture', 'crm'],
  },

  // === COMPANY INFO ===
  {
    id: 'company-overview',
    title: 'BrandGoto Company Overview',
    text:
      'BrandGoto is a creative digital agency founded in 2023 with the slogan "Bold Brands. Digital Excellence." We specialize in brand identity, web design, UI/UX, and innovative tech solutions for startups and enterprises, operating from Toronto and New York.',
    tags: ['company', 'overview', 'founded', 'slogan', 'creative agency', 'digital agency'],
  },
  {
    id: 'company-locations',
    title: 'BrandGoto Locations - Toronto & New York',
    text:
      'BrandGoto operates from offices in Toronto, Ontario and New York, serving clients across North America and globally. Our dual-location presence allows us to serve both Canadian and US markets with local expertise and understanding.',
    tags: ['toronto', 'new york', 'locations', 'canada', 'usa', 'offices', 'north america'],
  },
  {
    id: 'company-expertise',
    title: 'BrandGoto Expertise & Experience',
    text:
      'BrandGoto has worked with 50+ businesses, from startups to enterprises, delivering creative digital solutions that drive growth. We have a 4.9/5 rating with 127 reviews, combining creative excellence with technical expertise to deliver results that exceed expectations.',
    tags: ['experience', 'expertise', 'clients', 'portfolio', 'results', 'rating', 'reviews'],
  },

  // === TEAM ===
  {
    id: 'team-founder',
    title: 'BrandGoto Team - Silas (Founder)',
    text:
      'Silas is the Founder & Lead Developer at BrandGoto, a full-stack developer and creative strategist with a passion for building brands that scale. He combines technical expertise with strategic vision to lead our team.',
    tags: ['silas', 'founder', 'lead developer', 'full-stack', 'strategist', 'leadership'],
  },
  {
    id: 'team-robert',
    title: 'BrandGoto Team - Robert (Senior Developer)',
    text:
      'Robert is our Senior Full Stack Developer with expertise in modern web technologies including React, Node.js, Python, and Database Design. He builds fast, scalable applications that users love.',
    tags: ['robert', 'senior developer', 'react', 'nodejs', 'python', 'database'],
  },
  {
    id: 'team-olha',
    title: 'BrandGoto Team - Olha (Product Designer)',
    text:
      'Olha is our Senior Product Designer focused on creating intuitive, beautiful interfaces that drive user engagement and conversion. Her expertise includes UI/UX Design, Prototyping, User Research, and Design Systems.',
    tags: ['olha', 'product designer', 'ui/ux', 'prototyping', 'user research', 'design systems'],
  },
  {
    id: 'team-dmytro',
    title: 'BrandGoto Team - Dmytro (Marketing Strategist)',
    text:
      'Dmytro is our Marketing Strategist, a growth-focused marketer who understands how to build campaigns that convert and scale businesses. His skills include Digital Marketing, Growth Strategy, Analytics, and Content Strategy.',
    tags: ['dmytro', 'marketing strategist', 'growth', 'digital marketing', 'analytics', 'content strategy'],
  },

  // === PROJECTS ===
  {
    id: 'project-prodex',
    title: 'BrandGoto Project - Prodex Inventory Management',
    text:
      'Prodex is a comprehensive inventory and product management system built with MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports with role-based authentication and real-time data updates.',
    tags: ['prodex', 'inventory management', 'mern stack', 'product management', 'authentication', 'real-time'],
  },
  {
    id: 'project-coinvers',
    title: 'BrandGoto Project - CoinVers Cryptocurrency Platform',
    text:
      'CoinVers is a cryptocurrency tracking and analytics platform using React frontend and Django backend. It features real-time price updates, interactive charts, user authentication, portfolio tracking, and third-party API integration for live crypto data.',
    tags: ['coinvers', 'cryptocurrency', 'react', 'django', 'trading', 'analytics', 'portfolio'],
  },
  {
    id: 'project-dala',
    title: 'BrandGoto Project - Dala Landing Page',
    text:
      'Dala is a fancy landing page developed with React + Next.js paired with GSAP ScrollTrigger. It features smooth scroll animations, modern design elements, performance optimization, and responsive layout.',
    tags: ['dala', 'landing page', 'react', 'nextjs', 'gsap', 'animations', 'smooth scroll'],
  },
  {
    id: 'project-jayo',
    title: 'BrandGoto Project - Jayo Tech Consulting',
    text:
      'Jayo is a fully functional, high-performance ReactJS website for a forward-thinking tech consulting firm based in the USA. Built with ReactJS, NextJS, Tailwind, and Framer Motion for smooth interactions.',
    tags: ['jayo', 'tech consulting', 'reactjs', 'nextjs', 'tailwind', 'framer motion', 'consulting'],
  },

  // === CASE STUDIES ===
  {
    id: 'case-nexora',
    title: 'BrandGoto Case Study - Nexora Digital Transformation',
    text:
      'Nexora underwent complete digital transformation including brand identity redesign, website development, and marketing strategy. The results: 300% increase in leads and 65% improvement in conversion rates.',
    tags: ['nexora', 'digital transformation', 'brand redesign', 'website development', 'marketing strategy', 'results'],
  },

  // === CONTACT INFO ===
  {
    id: 'contact-info',
    title: 'BrandGoto Contact Information',
    text:
      'Contact BrandGoto at +1-647-937-7031 for customer service. We serve CA-ON and US-NY regions, available in English and French. Our offices are located in Toronto, Ontario and New York, serving clients across North America.',
    tags: ['contact', 'phone', '647-937-7031', 'customer service', 'toronto', 'new york', 'support'],
  },

  // === SOCIAL MEDIA ===
  {
    id: 'social-media',
    title: 'BrandGoto Social Media Presence',
    text:
      'Follow BrandGoto on social media: Instagram @brand_goto, LinkedIn company/brandgoto, Twitter/X @brand_goto, Behance brandgoto, and Dribbble brandgoto. Stay updated with our latest work, insights, and creative resources.',
    tags: ['social media', 'instagram', 'linkedin', 'twitter', 'behance', 'dribbble', 'brand_goto'],
  },

  // === PROCESS ===
  {
    id: 'process-consultation',
    title: 'BrandGoto Process - Free Consultation',
    text:
      'We offer free consultations to understand your project needs, goals, and vision. During the consultation, we discuss scope, timeline, and investment to create a customized approach that aligns with your business objectives.',
    tags: ['consultation', 'free consultation', 'process', 'discovery', 'scope', 'timeline'],
  },
  {
    id: 'process-timeline',
    title: 'BrandGoto Process - Project Timeline',
    text:
      'Our projects typically range from 2-12 weeks depending on scope and complexity. We provide clear timelines, regular updates, and milestone-based delivery to ensure projects stay on track and meet your expectations.',
    tags: ['timeline', 'project duration', 'milestones', 'delivery', '2-12 weeks', 'updates'],
  },

  // === CALL TO ACTIONS ===
  {
    id: 'cta-schedule',
    title: 'Schedule a Call with BrandGoto',
    text:
      'Ready to start your project? Schedule a free consultation call to discuss your needs, get a custom quote, and learn how BrandGoto can help transform your business with creative digital solutions.',
    tags: ['schedule', 'call', 'consultation', 'quote', 'get started', 'book consultation'],
  },
  {
    id: 'cta-portfolio',
    title: 'View BrandGoto Portfolio',
    text:
      'Explore our portfolio to see examples of our work across branding, web design, app development, and digital marketing. Our case studies showcase the results we deliver for businesses like yours.',
    tags: ['portfolio', 'case studies', 'examples', 'work', 'results', 'things we built'],
  },

  // === GENERAL ===
  {
    id: 'fallback',
    title: 'BrandGoto General Information',
    text:
      "BrandGoto is a creative digital agency specializing in brand identity, web design, app development, digital marketing, and AI automation. We help businesses create bold digital experiences that drive growth and success.",
    tags: ['general', 'overview', 'agency', 'services', 'creative', 'digital', 'growth'],
  },
];


