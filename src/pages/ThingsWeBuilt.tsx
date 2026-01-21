import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import ProjectCarousel from '../components/ProjectCarousel';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/RecentProjects.css';
import { seoConfig } from '../seo/seoConfig';

const ThingsWeBuilt: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // MENU AND SCROLL HANDLERS
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 1, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Prodex – Inventory & Product Management System',
      category: 'Web Application',
      tech: 'MERN Stack',
      image: '/images/projectA.webp',
      description: 'Built a comprehensive inventory and product management system using the MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports.',
      features: ['Role-based authentication', 'Real-time data updates', 'CRUD operations', 'Scalable architecture'],
      problem: 'Manual inventory tracking causing errors and delays',
      infrastructure: 'MERN stack with real-time sync and role-based access',
      impact: '50% reduction in inventory discrepancies, 3x faster reporting'
    },
    {
      id: 2,
      title: 'CoinVers – Cryptocurrency Tracking Platform',
      category: 'Web Application',
      tech: 'React, Python, Django',
      image: '/images/projectB.webp',
      description: 'Developed a cryptocurrency tracking and analytics platform using React for the frontend and Django with Django REST Framework for the backend.',
      features: ['Real-time price updates', 'Interactive charts', 'Portfolio tracking', 'Third-party API integration'],
      problem: 'Fragmented crypto data across multiple platforms',
      infrastructure: 'React + Django REST API with real-time WebSocket updates',
      impact: 'Unified portfolio view, 2.5s average response time'
    },
    {
      id: 3,
      title: 'Dala – Fancy Landing Page',
      category: 'Website',
      tech: 'React + Next.js, GSAP',
      image: '/images/Dala.webp',
      description: 'Developed a fancy landing page with smooth scroll animations and modern design elements.',
      features: ['Smooth scroll animations', 'Modern design', 'Performance optimized', 'Responsive layout'],
      problem: 'Generic landing page failing to convert',
      infrastructure: 'Next.js + GSAP animations, optimized for Core Web Vitals',
      impact: '40% increase in conversion rate, 95+ PageSpeed score'
    },
    {
      id: 4,
      title: 'Jayo – Tech Consulting Website',
      category: 'Website',
      tech: 'ReactJS, NextJs, Tailwind',
      image: '/images/projectE.webp',
      description: 'We proudly delivered a fully functional, high-performance ReactJS website for JAYO, a forward-thinking tech consulting firm based in the USA.',
      features: ['High performance', 'Modern UI/UX', 'SEO optimized', 'Fast loading'],
      problem: 'Outdated website hurting credibility and lead generation',
      infrastructure: 'Next.js + Tailwind, HubSpot CRM integration, AI lead workflows',
      impact: '3x faster launch than traditional agencies, 100% technical debt elimination, custom AI-Ops implementation'
    },
    {
      id: 5,
      title: 'Multi-featured Shopping Site',
      category: 'E-commerce',
      tech: 'Vue, Django',
      image: '/images/projectF.webp',
      description: 'Developed a modern e-commerce platform using Vue.js for the frontend and Django for the backend.',
      features: ['User authentication', 'Shopping cart', 'Payment integration', 'Order tracking'],
      problem: 'Legacy e-commerce platform limiting growth',
      infrastructure: 'Vue.js + Django REST API, Stripe integration, automated order processing',
      impact: '60% faster checkout, 99.9% uptime'
    },
    {
      id: 6,
      title: 'BizWorld – Business News Website',
      category: 'Content Platform',
      tech: 'WordPress',
      image: '/images/projectG.webp',
      description: 'Designed and developed a dynamic business news and blog website using WordPress.',
      features: ['Custom theme', 'SEO optimized', 'Content management', 'Newsletter integration'],
      problem: 'Content management bottlenecks slowing publication',
      infrastructure: 'Custom WordPress theme, automated publishing workflows',
      impact: '2x faster content publishing, 3x SEO traffic growth'
    }
  ];

  const carouselProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    img: project.image,
    description: project.description,
  }));

  const handleProjectClick = () => {
    // Case studies carousel is visual only on this page.
  };

  return (
    <div className="scroll-container">
      <SEO {...seoConfig.thingsWeBuilt} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />
      <motion.div
        className="main-content"
         
         
      >
        {/* Hero Section */}
        <section className="hero-section section-standard">
          <div className="hero-background" />
          
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="section-subtitle" variants={fadeInUp}>
                Things We Built
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Work</span>
                <span>That</span>
                <span>Speaks</span>
                <span>for</span>
                <span>Itself</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                Every project follows our results-first methodology: Problem → Infrastructure → Impact. See how we eliminate technical debt and deliver investor-ready assets.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Results-First Methodology */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              className="section-header mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Results-First</span>
                <span>Methodology</span>
              </motion.h2>
              <motion.p className="section-description" variants={fadeInUp}>
                Every project follows a proven framework: identify the problem, build the infrastructure, measure the impact.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Problem',
                  desc: 'We identify the core business challenge—not just symptoms, but root causes that limit growth.',
                  icon: 'fa-search',
                  color: '#F75F0B'
                },
                {
                  step: '02',
                  title: 'Infrastructure',
                  desc: 'We architect scalable solutions that eliminate technical debt and compound value over time.',
                  icon: 'fa-sitemap',
                  color: '#2FA0B5'
                },
                {
                  step: '03',
                  title: 'Impact',
                  desc: 'We measure success by business outcomes: faster launches, zero debt, measurable growth.',
                  icon: 'fa-chart-line',
                  color: '#F75F0B'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111] p-6 rounded-xl border border-white/10"
                  variants={fadeInUp}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <i className={`fas ${item.icon}`} style={{ color: item.color }} aria-hidden="true"></i>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 font-semibold">{item.step}</span>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Carousel */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Recent</span>
                <span>Projects</span>
              </motion.h2>
            </motion.div>
            
            <ProjectCarousel
              projects={carouselProjects}
              onCardClick={handleProjectClick as any}
              theme="dark"
            />
          </div>
        </section>

        {/* Featured Project Deep Dive - CoinVers */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Full-width Image */}
              <motion.div className="mb-12" variants={fadeInUp}>
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src="/images/projectB.webp" 
                    alt="CoinVers Cryptocurrency Tracking Platform" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {/* Metrics Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F75F0B] mb-1">2.5s</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Avg Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#2FA0B5] mb-1">Real-time</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">WebSocket Updates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Unified</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Portfolio View</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Strategic Breakdown */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-exclamation-triangle text-[#F75F0B]" aria-hidden="true"></i>
                    <h4 className="font-bold text-white">Problem</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Fragmented cryptocurrency data across multiple platforms making portfolio tracking inefficient and decision-making slow. Users struggled with delayed price updates and lacked a unified view of their investments.</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-[#2FA0B5]">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-sitemap text-[#2FA0B5]" aria-hidden="true"></i>
                    <h4 className="font-bold text-white">Infrastructure</h4>
                  </div>
                  <p className="text-gray-300 text-sm">React frontend with Django REST Framework backend, real-time WebSocket connections for live price updates, interactive charts via Chart.js, third-party API integration for cryptocurrency data, and secure portfolio tracking with user authentication.</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <i className="fas fa-chart-line text-[#F75F0B]" aria-hidden="true"></i>
                    <h4 className="font-bold text-white">Impact</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Unified portfolio view eliminating the need for multiple platforms, 2.5s average response time for real-time updates, seamless user experience with interactive charts, and scalable architecture supporting thousands of concurrent users.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Infrastructure Gallery */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>Inside</span>
                  <span>the</span>
                  <span>Engine</span>
                </motion.h2>
                <motion.p className="section-description">
                  Beyond the UI—see the infrastructure that powers growth: CRM setups, automation workflows, and AI systems.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'HubSpot CRM Integration',
                    desc: 'Custom property mapping, automated lead scoring, and pipeline management.',
                    icon: 'fa-hubspot',
                    color: '#2FA0B5'
                  },
                  {
                    title: 'Make.com Workflows',
                    desc: 'AI-powered lead routing, automated email sequences, and CRM sync automation.',
                    icon: 'fa-bolt',
                    color: '#F75F0B'
                  },
                  {
                    title: 'AI Lead Workflows',
                    desc: 'GPT-4o powered personalization, instant response systems, and intelligent routing.',
                    icon: 'fa-robot',
                    color: '#2FA0B5'
                  },
                  {
                    title: 'Technical Documentation',
                    desc: 'Investor-ready architecture docs, API documentation, and deployment guides.',
                    icon: 'fa-file-code',
                    color: '#F75F0B'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-6 rounded-xl border border-white/10 hover:border-opacity-50 transition-all"
                    style={{ borderColor: `${item.color}40` }}
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <i className={`fab ${item.icon === 'fa-hubspot' ? 'fa-hubspot' : `fas ${item.icon}`}`} style={{ color: item.color }} aria-hidden="true"></i>
                      </div>
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                    </div>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Studio Stats Banner */}
        <section className="section-standard bg-[#0a0a0a] border-t border-b border-white/10">
          <div className="container">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">150+</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Solutions Delivered</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#2FA0B5] mb-2">3x</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Faster Delivery</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Success Rate</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">24/7</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Global Engineering</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sophisticated CTAs */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="bg-[#111] p-8 rounded-xl border border-[#F75F0B] text-center hover:bg-[#F75F0B]/5 transition-all"
                variants={fadeInUp}
              >
                <i className="fas fa-rocket text-4xl text-[#F75F0B] mb-4" aria-hidden="true"></i>
                <h3 className="text-xl font-bold text-white mb-3">Start Your 14-Day Sprint</h3>
                <p className="text-gray-400 mb-6 text-sm">From idea to investor-ready infrastructure in 14 days.</p>
                <Link
                  to="/launchpad"
                  className="inline-block bg-[#F75F0B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all"
                >
                  View Launchpad
                </Link>
              </motion.div>

              <motion.div
                className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5] text-center hover:bg-[#2FA0B5]/5 transition-all"
                variants={fadeInUp}
              >
                <i className="fas fa-code-branch text-4xl text-[#2FA0B5] mb-4" aria-hidden="true"></i>
                <h3 className="text-xl font-bold text-white mb-3">Discuss Technical Architecture</h3>
                <p className="text-gray-400 mb-6 text-sm">Fractional CTO services and high-performance engineering.</p>
                <Link
                  to="/engineering"
                  className="inline-block bg-[#2FA0B5] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3bb0c5] transition-all"
                >
                  View Engineering
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default ThingsWeBuilt;
