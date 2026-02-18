import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import TechTicker from '../components/TechTicker';
import SEO from '../components/SEO';
import FAQ, { FAQItem } from '../components/FAQ';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/FAQ.css';
import { seoConfig } from '../seo/seoConfig';

const Launchpad: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  const timelineSteps = [
    { day: 'Days 1-3', title: 'Discovery & Strategy', desc: 'Deep dive into your business, goals, and market positioning. We define your unique value proposition and create a strategic roadmap.' },
    { day: 'Days 4-7', title: 'Brand Identity & Design', desc: 'Complete brand identity system including logo, color palette, typography, and visual guidelines that reflect your vision.' },
    { day: 'Days 8-11', title: 'Performance Web Build', desc: 'Conversion-optimized website built on Webflow or Next.js with seamless user experience and mobile-first design.' },
    { day: 'Days 12-14', title: 'Launch & Growth Stack', desc: 'Deploy your site, integrate lead capture systems, CRM setup, and analytics. You\'re ready to scale.' },
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'How can you really launch a brand and site in 14 days?',
      answer: 'We utilize a high-velocity sprint methodology developed for venture-backed startups. By focusing on "Investor-Ready" essentials and eliminating agency bloat, we move from strategy to live deployment in exactly two weeks.',
    },
    {
      question: 'What exactly is "Investor-Ready" GTM Infrastructure?',
      answer: 'It is a unified brand identity, a high-performance web presence (Webflow/Next.js), and a core growth stack (CRM/Automation) that proves to investors your startup is built on a scalable foundation.',
    },
    {
      question: 'Are your Launchpad prices fixed in USD?',
      answer: 'Yes. Launchpad is a productized offer with fixed USD tiers: Professional ($3,500), Growth ($5,500), and Ultimate ($8,500). Each tier has a defined scope and timeline, so founders get price certainty without hidden fees.',
    },
  ];

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.launchpad} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />
      <div className="main-content">
        {/* Hero Section */}
        <section className="hero-section section-standard">
          <div className="hero-background" />
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              <h1 className="sr-only">
                14-Day GTM Launchpad | Investor-Ready Brand & Web for Startups
              </h1>
              <motion.span className="section-subtitle" variants={fadeInUp}>
                The 14-Day GTM Launchpad
              </motion.span>
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>From</span>
                <span>Idea</span>
                <span>to</span>
                <span>Investor-Ready</span>
              </motion.h2>
              <motion.p className="section-description" variants={fadeInUp}>
                A complete transformation in 14 days. GTM (Go-to-Market) Infrastructure with investor-ready branding, performance Webflow and Next.js development, and AI-Ops and workflow automation.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Ticker */}
        <TechTicker />

        {/* What's Included */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>What's</span>
                  <span>Included</span>
                </motion.h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: <i className="fas fa-paint-brush text-4xl text-[#F75F0B]"></i>,
                    title: 'High-End Brand Identity',
                    desc: 'Investor-Ready Branding that positions you for venture-backed growth.',
                    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity System']
                  },
                  {
                    icon: <i className="fas fa-code text-4xl text-[#2FA0B5]"></i>,
                    title: 'Performance Web',
                    desc: 'Performance Webflow and Next.js Development built for speed and venture-scale growth.',
                    features: ['Mobile-First Design', 'SEO Optimization', 'Fast Load Times']
                  },
                  {
                    icon: <i className="fas fa-layer-group text-4xl text-[#F75F0B]"></i>,
                    title: 'Growth Stack',
                    desc: 'AI-Ops and workflow automation for lead capture, CRM, and scaling operations.',
                    features: ['Lead Forms', 'CRM Setup', 'Analytics Integration']
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all"
                    variants={fadeInUp}
                  >
                    <div className="mb-6">{item.icon}</div>
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
            </motion.div>
          </div>
        </section>

        {/* Founder Pain List */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-8" variants={fadeInUp}>
                <motion.h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Sound Familiar?
                </motion.h3>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: 'fa-tasks', text: 'You\'re buried in repetitive tasks' },
                  { icon: 'fa-palette', text: 'Your "brand" is just a Canva logo' },
                  { icon: 'fa-chart-line', text: 'Your website doesn\'t convert' },
                ].map((pain, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-6 border border-white/10 flex items-center gap-4"
                    variants={fadeInUp}
                  >
                    <i className={`fas ${pain.icon} text-2xl text-[#F75F0B]`} aria-hidden="true"></i>
                    <p className="text-white font-medium">{pain.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>The</span>
                  <span>14-Day</span>
                  <span>Journey</span>
                </motion.h2>
              </motion.div>

              <div className="mt-16 space-y-8">
                {timelineSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col md:flex-row gap-6 items-start"
                    variants={fadeInUp}
                  >
                    <div className="w-full md:w-48 flex-shrink-0">
                      <div className="bg-[#F75F0B] text-white px-6 py-3 rounded-lg text-center font-bold text-lg">
                        {step.day}
                      </div>
                    </div>
                    <div className="flex-1 bg-[#111] p-8 rounded-xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-3 uppercase">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <FAQ
                items={faqItems}
                subtitle="Common Questions"
                title="Frequently Asked Questions"
              />
            </motion.div>
          </div>
        </section>

        {/* Social Proof Banner */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              className="text-center py-6 border-t border-b border-[#F75F0B]/30"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="text-white text-lg font-semibold">
                Join <span className="text-[#F75F0B]">50+ founders</span> who've already automated their way to success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 3-Tier Pricing */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header text-center mb-12" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>Choose</span>
                  <span>Your</span>
                  <span>Launchpad</span>
                </motion.h2>
                <motion.p className="section-description">
                  Fixed USD pricing. No hidden fees. Rapid delivery.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Professional Tier */}
                <motion.div
                  className="bg-[#111] p-8 border border-white/10 flex flex-col"
                  variants={fadeInUp}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                  <div className="text-4xl font-bold text-[#F75F0B] mb-4">$3,500 <span className="text-lg text-gray-400">USD</span></div>
                  <p className="text-gray-400 text-sm mb-6">7-Day Delivery</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Logo + Brand Guide</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>1-page site</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>1 AI Lead Workflow</span>
                    </li>
                  </ul>
                  <Link to="/book-consultation">
                    <button className="w-full bg-[#111] border border-[#F75F0B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#F75F0B] transition-all">
                      Get Started
                    </button>
                  </Link>
                </motion.div>

                {/* Growth Tier */}
                <motion.div
                  className="bg-[#111] p-8 border border-[#F75F0B] flex flex-col relative"
                  variants={fadeInUp}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#F75F0B] text-white px-4 py-1 text-sm font-bold uppercase">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
                  <div className="text-4xl font-bold text-[#F75F0B] mb-4">$5,500 <span className="text-lg text-gray-400">USD</span></div>
                  <p className="text-gray-400 text-sm mb-6">14-Day Delivery</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Full Brand Suite</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>5-page site</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>2 AI Workflows</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>HubSpot CRM setup</span>
                    </li>
                  </ul>
                  <Link to="/book-consultation">
                    <button className="w-full bg-[#F75F0B] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all">
                      Get Started
                    </button>
                  </Link>
                </motion.div>

                {/* Ultimate/VC Tier */}
                <motion.div
                  className="bg-[#111] p-8 border border-[#2FA0B5] flex flex-col relative"
                  variants={fadeInUp}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2FA0B5]/80 text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    Recommended
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ultimate</h3>
                  <div className="text-4xl font-bold text-[#2FA0B5] mb-4">$8,500 <span className="text-lg text-gray-400">USD</span></div>
                  <p className="text-gray-400 text-sm mb-6">21-Day Delivery</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Everything in Growth</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Booking system</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>GPT-trained email responder</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Content automation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Launch Success Partner</span>
                    </li>
                  </ul>
                  <Link to="/book-consultation">
                    <button className="w-full bg-[#111] border border-[#2FA0B5] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2FA0B5] transition-all">
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="bg-[#111] border border-[#F75F0B] rounded-2xl p-12 text-center"
              variants={fadeInUp}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Launch Your Startup?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Book a strategic audit to choose the right fixed-USD Launchpad tier for your goals and timeline.
              </p>
              <a 
                href="https://calendar.app.google/bkuV5B26kSURz2jbA" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="bg-[#F75F0B] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ff8555] transition-all">
                  Book a Strategic Audit
                </button>
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Launchpad;
