import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import TechTicker from '../components/TechTicker';
import '../components/Hero.css';
import '../components/Herotwo.css';

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

  return (
    <div className="scroll-container bg-black">
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
              <motion.span className="section-subtitle" variants={fadeInUp}>
                The 14-Day GTM Launchpad
              </motion.span>
              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>From</span>
                <span>Idea</span>
                <span>to</span>
                <span>Investor-Ready</span>
              </motion.h1>
              <motion.p className="section-description" variants={fadeInUp}>
                A complete transformation in 14 days. High-end branding, performance web, and AI-driven operations that turn early-stage ideas into investor-ready infrastructure.
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
                    desc: 'Strategic positioning and visual systems that make your brand unforgettable.',
                    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity System']
                  },
                  {
                    icon: <i className="fas fa-code text-4xl text-[#2FA0B5]"></i>,
                    title: 'Performance Web',
                    desc: 'Conversion-optimized sites on Webflow/Next.js built for speed and results.',
                    features: ['Mobile-First Design', 'SEO Optimization', 'Fast Load Times']
                  },
                  {
                    icon: <i className="fas fa-layer-group text-4xl text-[#F75F0B]"></i>,
                    title: 'Growth Stack',
                    desc: 'Automated lead capture and CRM integration to scale your operations.',
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

        {/* Pricing CTA */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="bg-[#111] border border-[#F75F0B] rounded-2xl p-12 text-center"
              variants={fadeInUp}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Investment starts at $7,500 USD</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Ready to transform your idea into investor-ready infrastructure?
              </p>
              <Link to="/book-consultation">
                <button className="bg-[#F75F0B] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ff8555] transition-all">
                  Start Your 14-Day Launchpad
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Launchpad;
