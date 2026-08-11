export interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  img: string;
  width: number;
  height: number;
  description: string;
  features: string[];
  problem: string;
  infrastructure: string;
  impact: string;
  avifSrcSet?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 9,
    title: 'OddLogic – High-Performance Predictive Engine',
    category: 'Predictive Platform',
    tech: 'Real-time Data Architecture',
    img: '/images/oddlogic-960.webp',
    avifSrcSet: '/images/oddlogic-480.avif 480w, /images/oddlogic-960.avif 960w',
    width: 960,
    height: 466,
    description: 'How we architected a high-performance predictive engine for OddLogic. We designed a resilient data architecture for real-time sports feeds, mapped system logic for prediction orchestration, and deployed venture-scale infrastructure capable of handling high-traffic demand without performance degradation.',
    features: ['Real-time sports feeds', 'Prediction orchestration', 'Resilient data architecture', 'High-traffic infrastructure'],
    problem: 'High-volume live data needed reliable prediction orchestration',
    infrastructure: 'Resilient real-time data pipelines and venture-scale application infrastructure',
    impact: 'A maintainable predictive platform designed for high-traffic demand',
    featured: true,
  },
  {
    id: 1,
    title: 'Prodex – Inventory & Product Management System',
    category: 'Web Application',
    tech: 'MERN Stack',
    img: '/images/projectA.webp',
    width: 906,
    height: 649,
    description: 'Built a comprehensive inventory and product management system using the MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports.',
    features: ['Role-based authentication', 'Real-time data updates', 'CRUD operations', 'Scalable architecture'],
    problem: 'Manual inventory tracking causing errors and delays',
    infrastructure: 'MERN stack with real-time sync and role-based access',
    impact: 'Clearer inventory tracking and more efficient reporting',
  },
  {
    id: 2,
    title: 'CoinVers – Cryptocurrency Tracking Platform',
    category: 'Web Application',
    tech: 'React, Python, Django',
    img: '/images/projectB.webp',
    width: 983,
    height: 684,
    description: 'Developed a cryptocurrency tracking and analytics platform using React and Django REST Framework.',
    features: ['Real-time price updates', 'Interactive charts', 'Portfolio tracking', 'Third-party API integration'],
    problem: 'Fragmented crypto data across multiple platforms',
    infrastructure: 'React + Django REST API with real-time WebSocket updates',
    impact: 'Unified portfolio view with real-time updates',
  },
  {
    id: 3,
    title: 'Dala – Interactive Landing Page',
    category: 'Website',
    tech: 'React + Next.js, GSAP',
    img: '/images/Dala-960.webp',
    avifSrcSet: '/images/Dala-480.avif 480w, /images/Dala-960.avif 960w',
    width: 960,
    height: 598,
    description: 'Developed an interactive landing page with smooth scroll animations and responsive design elements.',
    features: ['Smooth scroll animations', 'Modern design', 'Performance optimized', 'Responsive layout'],
    problem: 'Generic landing page failing to convert',
    infrastructure: 'Next.js + GSAP animations, optimized for Core Web Vitals',
    impact: '40% increase in conversion rate, 95+ PageSpeed score',
  },
  {
    id: 4,
    title: 'Jayo – Tech Consulting Website',
    category: 'Website',
    tech: 'ReactJS, Next.js, Tailwind',
    img: '/images/projectE.webp',
    width: 1613,
    height: 688,
    description: 'Delivered a high-performance React website for JAYO, a technology consulting firm based in the USA.',
    features: ['High performance', 'Modern UI/UX', 'SEO optimized', 'Fast loading'],
    problem: 'Outdated website hurting credibility and lead generation',
    infrastructure: 'Next.js + Tailwind, HubSpot CRM integration, AI lead workflows',
    impact: 'Accelerated launch with a maintainable technical foundation and custom AI-Ops implementation',
  },
  {
    id: 5,
    title: 'Multi-featured Shopping Site',
    category: 'E-commerce',
    tech: 'Vue, Django',
    img: '/images/projectF.webp',
    width: 935,
    height: 461,
    description: 'Developed a modern e-commerce platform using Vue.js for the frontend and Django for the backend.',
    features: ['User authentication', 'Shopping cart', 'Payment integration', 'Order tracking'],
    problem: 'Legacy e-commerce platform limiting growth',
    infrastructure: 'Vue.js + Django REST API, Stripe integration, automated order processing',
    impact: 'Streamlined checkout flow with more reliable order processing',
  },
  {
    id: 6,
    title: 'BizWorld – Business News Website',
    category: 'Content Platform',
    tech: 'WordPress',
    img: '/images/projectG.webp',
    width: 940,
    height: 424,
    description: 'Designed and developed a dynamic business news and blog website using WordPress.',
    features: ['Custom theme', 'SEO optimized', 'Content management', 'Newsletter integration'],
    problem: 'Content management bottlenecks slowing publication',
    infrastructure: 'Custom WordPress theme, automated publishing workflows',
    impact: 'More efficient content publishing and a stronger SEO foundation',
  },
];

export const caseStudyProjects = projects.filter((project) => !project.featured);

export const toCarouselProject = (project: Project) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  tech: project.tech,
  img: project.img,
  description: project.description,
  width: project.width,
  height: project.height,
  avifSrcSet: project.avifSrcSet,
});

export type CarouselProject = ReturnType<typeof toCarouselProject>;
