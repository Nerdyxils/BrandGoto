export type SEOEntry = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogType?: string;
  structuredData?: Record<string, any>;
};

export const seoConfig: Record<string, SEOEntry> = {
  home: {
    title: 'Brandgoto | Technical Growth Partner & Startup GTM Infrastructure',
    description:
      'Investor-ready branding, venture-scale web, and AI-Ops systems for US startups ready to scale fast.',
    path: '/',
    keywords:
      'startup GTM infrastructure, technical growth partner, investor-ready branding, venture-scale web, AI-Ops automation',
    ogType: 'website',
  },
  launchpad: {
    title: '14-Day GTM Launchpad | Investor-Ready Brand & Web for Startups',
    description:
      'GTM (Go-to-Market) infrastructure for startups with investor-ready branding, performance Webflow/Next.js, and AI-Ops automation.',
    path: '/launchpad',
    keywords:
      'GTM infrastructure, investor-ready branding, performance Webflow and Next.js development, startup launchpad',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': '14-Day GTM Launchpad',
      'description': 'GTM (Go-to-Market) infrastructure for startups with investor-ready branding, performance Webflow and Next.js development, and AI-Ops automation.',
      'provider': {
        '@type': 'ProfessionalService',
        'name': 'Brandgoto',
        'url': 'https://www.brandgoto.com',
        'areaServed': ['United States', 'Global'],
      },
      'serviceType': ['WebDesign', 'GraphicDesign', 'SoftwareDevelopment'],
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
      },
    },
  },
  engineering: {
    title: 'Fractional CTO & High-End Engineering Studio | Brandgoto',
    description:
      'Venture-backed startup partner delivering fractional CTO services, AI-Ops and workflow automation, and scalable engineering.',
    path: '/engineering',
    keywords:
      'fractional CTO services, engineering studio, AI-Ops and workflow automation, scalable startup infrastructure',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'Fractional CTO & High-End Engineering Studio',
      'description': 'Venture-backed startup partner delivering fractional CTO services, AI-Ops and workflow automation, and scalable engineering infrastructure.',
      'provider': {
        '@type': 'ProfessionalService',
        'name': 'Brandgoto',
        'url': 'https://www.brandgoto.com',
        'areaServed': ['United States', 'Global'],
      },
      'serviceType': ['SoftwareDevelopment'],
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
      },
    },
  },
  thingsWeBuilt: {
    title: 'Case Studies | Venture-Scale Websites & Apps | Brandgoto',
    description:
      'Explore venture-scale web apps, investor-ready branding, and performance builds delivered for startups worldwide.',
    path: '/things-we-built',
    ogType: 'website',
  },
  successStories: {
    title: 'Success Stories | Startup Growth & Technical Wins | Brandgoto',
    description:
      'Real results from investor-ready branding, performance web, and AI-Ops systems that scale startup growth.',
    path: '/success-stories',
    ogType: 'website',
  },
  aboutUs: {
    title: 'About Brandgoto | Remote-First Technical Growth Studio',
    description:
      'Brandgoto is a remote-first technical studio building investor-ready brands and venture-scale infrastructure.',
    path: '/about-us',
    ogType: 'website',
  },
  howWeHelp: {
    title: 'How We Help | Startup Growth & GTM Infrastructure',
    description:
      'A proven process for GTM infrastructure, investor-ready branding, and performance web for startups.',
    path: '/how-we-help',
    ogType: 'website',
  },
  bookConsultation: {
    title: 'Book a GTM Strategy Call | Brandgoto',
    description:
      'Book a GTM strategy call to plan investor-ready branding, performance web, and AI-Ops automation.',
    path: '/book-consultation',
    ogType: 'website',
  },
  privacyPolicy: {
    title: 'Privacy Policy | Brandgoto',
    description:
      'Read the Brandgoto privacy policy for how we collect, use, and protect your data globally.',
    path: '/privacy-policy',
    ogType: 'article',
  },
};
