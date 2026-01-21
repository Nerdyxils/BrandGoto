import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import SEO from './SEO';
import ImgCo from '../assets/conversion.webp';
import ImgDi from '../assets/digital.webp';
import ImgCs from '../assets/clientS.webp';
import Arrowup from '../assets/ArrowUpRight.webp';
import BigArr from '../assets/bigarrow.webp';
import TinArr from '../assets/tinyarrow-dropdown.webp';
import './Hero.css';
import Herotwo from './Herotwo';
import ServicesSection from './ServicesSection';
import RecentProjects from './RecentProjects';
import FounderSection from './FounderSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import TechTicker from './TechTicker';
import { lazy, Suspense } from 'react';
import { seoConfig } from '../seo/seoConfig';

// Lazy load below-the-fold ContactSection to reduce initial bundle
const ContactSection = lazy(() => import('./ContactSection'));

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroImg = '/images/hero_imgg.webp';
  const CSMimg = '/images/Image.webp';

  // STATS DATA - KEEPING YOUR ORIGINAL DATA
  const leftStats = [
    {
      icon: <img src={ImgCo} alt="Brandgoto startup growth metrics icon" loading="lazy" decoding="async" />,
      label: 'Complete Solutions Delivered',
      value: '150+',
      change: '81%',
    },
    {
      icon: <img src={ImgDi} alt="Brandgoto venture-scale performance icon" loading="lazy" decoding="async" />,
      label: 'Businesses Launched & Scaled',
      value: '50+',
      change: '76%',
    },
    {
      icon: <img src={ImgCs} alt="Brandgoto client success icon for startups" loading="lazy" decoding="async" />,
      label: 'Founders Trust Us',
      value: '99.2%',
      change: '79%',
    },
  ];

  const rightStats = [
    {
      label: 'Faster Than Multiple Agencies',
      subLabel: 'Complete solution speed',
      value: '3x',
    },
    {
      label: 'Average Business Growth',
      subLabel: 'After complete rebrand',
      value: '+65%',
    },
    {
      label: 'End-to-End Success Rate',
      subLabel: 'From idea to launch',
      value: '100%',
    },
  ];

  // PREMIUM ANIMATION VARIANTS
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // PREMIUM SECTION ANIMATION
  const sectionVariants = {
    hidden: { opacity: 1, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.home} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled}/>
      <ScrollToTop />
      <div className="main-content">
        {/* HERO SECTION - ORIGINAL STRUCTURE */}
        <section className="hero-section landing-hero relative text-white px-4 sm:px-8 pt-[90px] pb-10">
          {/* BACKGROUND - KEEPING YOUR ORIGINAL BACKGROUND */}
          <div className="hero-background" />
          
          <div className="container mx-auto relative z-10">
            {/* HERO TEXT - KEEPING YOUR ORIGINAL CLASSES */}
            <motion.div
              className="hero-txt text-center max-w-4xl mx-auto mb-16"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <h1 className="sr-only">
                Brandgoto | Technical Growth Partner & Startup GTM Infrastructure
              </h1>
              <motion.span className="sm__txt block mb-3" variants={fadeInUp}>
                The Technical Growth Partner for Founders
              </motion.span>

              <motion.h2 className="hero-heading" variants={staggerContainer}>
                <motion.span variants={fadeInUp} className="orange">Bold</motion.span>
                <motion.span variants={fadeInUp} className="teal">Brands</motion.span>
                <motion.span variants={fadeInUp}>Start</motion.span>
                <motion.span variants={fadeInUp}>(and Scale)</motion.span>
                <motion.span variants={fadeInUp}>Here</motion.span>
              </motion.h2>

              <motion.p className="h__txt text-base sm:text-lg text-gray-300 max-w-2xl mx-auto" variants={fadeInUp}>
                We deploy high-end branding, performance web, and AI-driven operations that turn early-stage ideas into investor-ready infrastructure.
              </motion.p>

              {/* SOCIAL PROOF - KEEPING YOUR ORIGINAL CLASSES */}
              <motion.div className="social-proof mt-4" variants={fadeInUp}>
                <span className="proof-text text-sm text-gray-400">
                  Trusted by 50+ founders from idea to $1M+
                </span>
              </motion.div>
            </motion.div>

            {/* STATS CONTAINER - SIMPLIFIED ANIMATIONS */}
            <motion.div 
              className="stats-container"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* LEFT CARDS - SIMPLIFIED */}
              <motion.div className="left-cards" variants={fadeInUp}>
                {leftStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="left-card"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="left-card-content">
                      <div className="left_top_stats">
                        <div className="left-card-icon">
                          {stat.icon}
                        </div>
                        <p className="left-card-label">{stat.label}</p>
                      </div>
                      <div className="left-card-change">
                        <p className="left-card-value">{stat.value}</p>
                        <div className="change-group">
                          <span>{stat.change}</span>
                          <img src={Arrowup} alt="Arrow Up" loading="lazy" decoding="async" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* MIDDLE IMAGE - SIMPLIFIED */}
              <motion.div 
                className="middle-image-container"
                variants={fadeInUp}
              >
                <motion.img
                  src={HeroImg}
                  alt="Brandgoto technical growth partner profile"
                  className="middle-image"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>

              {/* RIGHT CARDS - SIMPLIFIED */}
              <motion.div className="right-cards" variants={fadeInUp}>
                {rightStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="right-card"
                    variants={fadeInUp}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="right-card-dot shadow-glow" />
                    <div className="right-card-content">
                      <div className="right-card-arrow-container">
                        <img src={BigArr} className="right-card-arrow" alt="Growth metrics arrow indicator" loading="lazy" decoding="async" />
                      </div>
                      <div className="right-card-texts">
                        <p className="right-card-label">{stat.label}</p>
                        <p className="right-card-sublabel">{stat.subLabel}</p>
                      </div>
                      <div className="right-card-change">
                        <span>{stat.value}</span>
                        <img src={TinArr} alt="Performance trend indicator" loading="lazy" decoding="async" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA - SIMPLIFIED */}
            <motion.div
              className="cta-container"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="cta-box"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="cta-image-wrapper">
                  <img 
                    src={CSMimg} 
                    alt="Client Success Manager" 
                    className="cta-image"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="cta-online-indicator"></span>
                </div>
                <div className="cta-text">
                  <span className="cta-name">Celine</span>
                  <span className="cta-role">Client Success Manager</span>
                </div>
                <div className="cta-buttons-wrapper">
                  <motion.a 
                    href="/launchpad"
                    className="cta-button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start your 14-Day Launchpad
                  </motion.a>
                  <motion.a 
                    href="/engineering"
                    className="cta-button"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Engineering Retainers
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* TECH STACK TICKER */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <TechTicker />
            </motion.div>
          </div>
        </section>

        {/* EMPATHY & PAIN BLOCK */}
        <motion.section 
          className="section-standard bg-[#0a0a0a]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto">
            <motion.div className="section-header text-center mb-12" variants={fadeInUp}>
              <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Execution is Draining Your Growth.
              </motion.h2>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { value: '80%', label: 'Time spent on admin' },
                { value: '90%', label: 'Tasks that don\'t scale' },
                { value: '95%', label: 'Manual processes' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111] p-6 border border-white/10 text-center"
                  variants={fadeInUp}
                >
                  <div className="text-4xl font-bold text-[#F75F0B] mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.p className="text-center text-gray-300 text-lg max-w-2xl mx-auto mb-12" variants={fadeInUp}>
              Most founders spend 80% of their time on tasks that don't scale. You're doing what AI should be doing.
            </motion.p>

            {/* Comparison Table */}
            <motion.div className="comparison-table" variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional Agency */}
                <div className="bg-[#111] p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase">Traditional Agency</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-400">
                      <i className="fas fa-times text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Months of development</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <i className="fas fa-times text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Multiple agencies</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <i className="fas fa-times text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Manual processes</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <i className="fas fa-times text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Hidden costs</span>
                    </li>
                  </ul>
                </div>

                {/* Brandgoto Studio */}
                <div className="bg-[#111] p-6 border border-[#2FA0B5]">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase">Brandgoto Studio</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>14-day strategic sprints</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Unified technical partner</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>AI-automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Fixed USD pricing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTIONS - SIMPLIFIED SMOOTH SCROLL-IN */}
        <motion.section 
          id="about-us"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Herotwo />
        </motion.section>

        <motion.section 
          id="services"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ServicesSection />
        </motion.section>

        <motion.section
          id="ai-systems"
          className="section-standard"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto">
            <motion.div className="section-header" variants={fadeInUp}>
              <motion.span className="section-subtitle">AI Systems</motion.span>
              <motion.h2 className="herotwo-heading">
                <span>AI</span>
                <span>Integrations</span>
                <span>That</span>
                <span>Drive</span>
                <span>Scale</span>
              </motion.h2>
              <motion.p className="section-description">
                We design and deploy practical AI systems that remove manual friction and compound growth across your business.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: 'fas fa-robot',
                  title: 'AI Assistants',
                  desc: 'Custom LLM assistants trained on your data to handle support, sales, and internal ops.',
                },
                {
                  icon: 'fas fa-cogs',
                  title: 'Workflow Automation',
                  desc: 'Automate repetitive tasks across CRM, email, and ops so your team stays focused on growth.',
                },
                {
                  icon: 'fas fa-chart-line',
                  title: 'Intelligent Insights',
                  desc: 'AI-powered analytics and reporting to surface the signals that matter most.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all"
                  variants={fadeInUp}
                >
                  <div className="mb-6">
                    <i className={`${item.icon} text-3xl text-[#F75F0B]`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Technical Walkthrough */}
            <motion.div
              className="mt-20"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12" variants={fadeInUp}>
                <motion.span className="section-subtitle">Technical Walkthrough</motion.span>
                <motion.h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  See It In Action
                </motion.h3>
                <motion.p className="section-description">
                  Watch how our AI Lead Workflow transforms form submissions into personalized, strategic responses in seconds.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
                {/* Video Container (60%) */}
                <div className="video-container">
                  <div className="video-wrapper">
                    <iframe
                      src="https://www.youtube.com/embed/_-w6CPPE7Qs"
                      title="AI Lead Workflow Technical Walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="video-iframe"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* System Logic Map (40%) */}
                <div className="system-logic-container">
                  <h4 className="system-logic-title">System Logic</h4>
                  <div className="system-logic-steps">
                    {[
                      {
                        icon: 'fa fa-wpforms',
                        label: 'Form Filled',
                        desc: 'Customer submits contact form',
                      },
                      {
                        icon: 'fa fa-bolt',
                        label: 'Trigger',
                        desc: 'Make.com activates the workflow',
                      },
                      {
                        icon: 'fab fa-hubspot',
                        label: 'CRM Sync',
                        desc: 'Lead created in HubSpot',
                      },
                      {
                        icon: 'fa fa-robot',
                        label: 'AI Personalization',
                        desc: 'GPT-4o generates a strategic response',
                      },
                      {
                        icon: 'fa fa-paper-plane',
                        label: 'Automated Send',
                        desc: 'Personalized email is delivered instantly',
                      },
                      {
                        icon: 'fa fa-bell',
                        label: 'Lead Alert',
                        desc: 'The team is notified for high-touch follow-up',
                      },
                    ].map((step, index) => (
                      <div key={index} className="system-logic-step">
                        <div className="step-icon-wrapper">
                          <i className={step.icon} aria-hidden="true" />
                        </div>
                        <div className="step-content">
                          <span className="step-label">{step.label}</span>
                          <span className="step-desc">{step.desc}</span>
                        </div>
                        {index < 5 && <div className="step-connector" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="recent-projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <RecentProjects />
        </motion.section>

        <motion.section 
          id="founder"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FounderSection />
        </motion.section>

        <motion.section 
          id="process"
          className="section-standard"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto">
            <motion.div className="section-header" variants={fadeInUp}>
              <motion.span className="section-subtitle">Our Methodology</motion.span>
              <motion.h2 className="herotwo-heading">
                <span>The</span>
                <span>Path</span>
                <span>to</span>
                <span>Digital</span>
                <span>Excellence</span>
              </motion.h2>
              <motion.p className="section-description">
                A proven four-stage process that transforms early-stage ideas into investor-ready infrastructure.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                {
                  step: '01',
                  title: 'Discovery & Research',
                  desc: 'We dive deep into your business, goals, and audience to understand what success looks like.',
                  features: ['Market Analysis', 'Goal Setting', 'Competitor Audit']
                },
                {
                  step: '02',
                  title: 'Strategy & Planning',
                  desc: 'We create a clear roadmap and strategy that aligns with your business objectives.',
                  features: ['Project Scope', 'Timeline Planning', 'Success Metrics']
                },
                {
                  step: '03',
                  title: 'Engineering & Build',
                  desc: 'We bring your vision to life with clean design and solid technology.',
                  features: ['UI/UX Design', 'Full-Stack Dev', 'Rapid Iteration']
                },
                {
                  step: '04',
                  title: 'Launch & Scaling',
                  desc: 'We launch with confidence and continue optimizing for growth.',
                  features: ['Global Launch', 'Analytics Audit', 'Post-Launch Ops']
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group"
                  variants={fadeInUp}
                >
                  <div className="w-12 h-12 bg-[#F75F0B] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    {item.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
                        <span className="w-1 h-1 bg-[#F75F0B] rounded-full"></span>
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="success-stories"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <TestimonialsSection />
        </motion.section>

        <motion.section 
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
            <ContactSection />
          </Suspense>
        </motion.section>

        <Footer />
      </div>
    </div>
  );
};

export default Hero;