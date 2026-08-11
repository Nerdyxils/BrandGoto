import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import ImgCo from '../assets/conversion.webp';
import ImgDi from '../assets/digital.webp';
import ImgCs from '../assets/clientS.webp';
import BigArr from '../assets/bigarrow.webp';
import './Hero.css';
import Herotwo from './Herotwo';
import ServicesSection from './ServicesSection';
import RecentProjects from './RecentProjects';
import FounderSection from './FounderSection';
import TestimonialsSection from './TestimonialsSection';
import YouTubeShortsGrid from './YouTubeShortsGrid';
import AuditSlideModal from './AuditSlideModal';
import TechTicker from './TechTicker';
import YouTubeVideo from './YouTubeVideo';
import { seoConfig } from '../seo/seoConfig';
import FaIcon from './FaIcon';
import GrowthProcessSection from './home/GrowthProcessSection';

// Lazy load below-the-fold ContactSection to reduce initial bundle
const ContactSection = lazy(() => import('./ContactSection'));

const HERO_IMAGE = '/images/hero_imgg.webp';
const CLIENT_SUCCESS_IMAGE = '/images/Image.webp';

const leftStats = [
  { iconSrc: ImgCo, iconAlt: 'Brandgoto startup growth metrics icon', label: 'Integrated Delivery', value: 'Brand + Web + Systems' },
  { iconSrc: ImgDi, iconAlt: 'Brandgoto venture-scale performance icon', label: 'Built for Startup Growth', value: 'Launch and scale foundations' },
  { iconSrc: ImgCs, iconAlt: 'Brandgoto client success icon for startups', label: 'Technical Growth Partnership', value: 'Strategy through execution' },
];

const rightStats = [
  { label: 'Unified Delivery', subLabel: 'One technical growth partner', value: 'Integrated' },
  { label: 'Conversion Clarity', subLabel: 'Built around profitable growth', value: 'Focused' },
  { label: 'Technical Foundation', subLabel: 'Designed to evolve with scope', value: 'Maintainable' },
];

const fadeInUp = {
  hidden: { opacity: 1, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const sectionVariants = {
  hidden: { opacity: 1, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Hero: React.FC = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  useEffect(() => {
    const existingPreload = document.querySelector<HTMLLinkElement>('link[data-home-hero-preload]');
    if (existingPreload) return;

    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = HERO_IMAGE;
    preload.type = 'image/webp';
    preload.fetchPriority = 'high';
    preload.dataset.homeHeroPreload = 'true';
    document.head.appendChild(preload);

    return () => preload.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowAuditModal(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.home} />
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
                  Built for founders moving from idea to venture-scale infrastructure
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
                      y: -6,
                      scale: 1.012,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                  >
                    <div className="left-card-content">
                      <div className="left_top_stats">
                        <div className="left-card-icon">
                          <img src={stat.iconSrc} alt={stat.iconAlt} width="24" height="24" loading="lazy" decoding="async" />
                        </div>
                        <p className="left-card-label">{stat.label}</p>
                      </div>
                      <div className="left-card-change">
                        <p className="left-card-value">{stat.value}</p>
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
                  src={HERO_IMAGE}
                  alt="Brandgoto technical growth partner profile"
                  className="middle-image"
                  loading="eager"
                  decoding="async"
                  width="500"
                  height="500"
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
                      y: -6,
                      scale: 1.012,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                  >
                    <div className="right-card-dot shadow-glow" />
                    <div className="right-card-content">
                      <div className="right-card-arrow-container">
                        <img src={BigArr} className="right-card-arrow" alt="" aria-hidden="true" width="18" height="18" loading="lazy" decoding="async" />
                      </div>
                      <div className="right-card-texts">
                        <p className="right-card-label">{stat.label}</p>
                        <p className="right-card-sublabel">{stat.subLabel}</p>
                      </div>
                      <div className="right-card-change">
                        <span>{stat.value}</span>
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
                    src={CLIENT_SUCCESS_IMAGE}
                    alt="Client Success Manager" 
                    className="cta-image"
                    loading="eager"
                    decoding="async"
                    width="44"
                    height="44"
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
                    className="cta-button cta-button--primary"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Start your 14-Day Launchpad</span>
                    <span className="cta-button-arrow" aria-hidden="true">&#8599;</span>
                  </motion.a>
                  <motion.a 
                    href="/engineering"
                    className="cta-button cta-button--secondary"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Fractional CTO & Engineering Retainer</span>
                    <span className="cta-button-arrow" aria-hidden="true">&#8599;</span>
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

        {/* PRETTY VS. PROFITABLE — CONVERSION HOOK */}
        <motion.section
          className="section-standard bg-[#0a0a0a]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto">
            <motion.div className="section-header text-center mb-10" variants={fadeInUp}>
              <motion.span className="section-subtitle" variants={fadeInUp}>
                The Conversion Hook
              </motion.span>
              <motion.h2 className="text-2xl md:text-3xl font-bold text-white mb-4" variants={fadeInUp}>
                Pretty vs. Profitable
              </motion.h2>
              <motion.p className="section-description max-w-2xl mx-auto" variants={fadeInUp}>
                Most agencies sell aesthetics. We build GTM Infrastructure—brand, web, and systems that convert. Watch how we bridge the gap between pretty branding and profitable growth.
              </motion.p>
            </motion.div>
            <motion.div className="max-w-4xl mx-auto mb-10" variants={fadeInUp}>
              <div className="video-container video-container--custom">
                <YouTubeVideo
                  videoId="-rrCbZdHUx8"
                  title="Pretty vs. Profitable — GTM Infrastructure for Startups"
                  accent="teal"
                />
              </div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <Link
                to="/book-consultation"
                className="inline-block bg-[#023942] border border-[#CFF8FF] text-[#CFF8FF] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#CFF8FF] hover:text-[#023942] transition-all no-underline"
              >
                Strategic GTM Audit
              </Link>
            </motion.div>
          </div>
        </motion.section>

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
                { value: 'Admin', label: 'Repetitive work' },
                { value: 'Friction', label: 'Tasks that do not scale' },
                { value: 'Manual', label: 'Disconnected processes' },
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
              Repetitive admin and disconnected processes pull founders away from work that compounds growth.
            </motion.p>

            {/* Comparison Table */}
            <motion.div className="comparison-table" variants={fadeInUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traditional Agency */}
                <div className="bg-[#111] p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase">Traditional Agency</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-400">
                      <FaIcon name="times" className="text-[#F75F0B] mt-1" />
                      <span>Months of development</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <FaIcon name="times" className="text-[#F75F0B] mt-1" />
                      <span>Multiple agencies</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <FaIcon name="times" className="text-[#F75F0B] mt-1" />
                      <span>Manual processes</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-400">
                      <FaIcon name="times" className="text-[#F75F0B] mt-1" />
                      <span>Hidden costs</span>
                    </li>
                  </ul>
                </div>

                {/* Brandgoto Studio */}
                <div className="bg-[#111] p-6 border border-[#2FA0B5]">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase">Brandgoto Studio</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>14-Day Launchpad delivery</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Unified technical partner</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>AI-automated workflows</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
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
                    <FaIcon name={item.icon} className="text-3xl text-[#F75F0B]" />
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

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8">
                {/* Video Container (60%) */}
                <div className="video-container video-container--custom">
                  <YouTubeVideo
                    videoId="_-w6CPPE7Qs"
                    title="AI Lead Workflow Technical Walkthrough"
                    accent="orange"
                  />
                </div>

                {/* System Logic Map (40%) */}
                <div className="system-logic-container">
                  <h3 className="system-logic-title">System Logic</h3>
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
                          <FaIcon name={step.icon} />
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

        <GrowthProcessSection />

        <motion.section 
          id="success-stories"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <TestimonialsSection />
        </motion.section>

        <YouTubeShortsGrid showCta={true} />

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

      </div>
      <AuditSlideModal isOpen={showAuditModal} onClose={() => setShowAuditModal(false)} />
    </div>
  );
};

export default Hero;
