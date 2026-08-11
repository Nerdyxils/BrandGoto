import React from 'react';
import { motion } from 'framer-motion';
import TechTicker from '../components/TechTicker';
import SEO from '../components/SEO';
import FAQ, { FAQItem } from '../components/FAQ';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/FAQ.css';
import { seoConfig } from '../seo/seoConfig';
import FaIcon from '../components/FaIcon';
import { ExternalLinkButton, LinkButton } from '../components/ui/Button';

const Launchpad: React.FC = () => {
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
      answer: 'Most launches complete in 14 days. More complex builds may extend timeline to accommodate scope — your Strategic GTM Audit will confirm the right fit.',
    },
    {
      question: 'What exactly is "Investor-Ready" GTM Infrastructure?',
      answer: 'It is a unified brand identity, a high-performance web presence (Webflow/Next.js), and a core growth stack (CRM/Automation) that proves to investors your startup is built on a scalable foundation.',
    },
    {
      question: 'Are your Launchpad prices fixed in USD?',
      answer: 'Yes. The 14-Day Launchpad is a productized offer with fixed USD tiers: Launch ($5,500) for standard scope and Launch+ ($8,500) for extended scope. Your Strategic GTM Audit confirms which scope fits the build.',
    },
  ];

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.launchpad} />
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
                The 14-Day Launchpad
              </motion.span>
              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>From</span>
                <span>Idea</span>
                <span>to</span>
                <span>Investor-Ready</span>
              </motion.h1>
              <motion.p className="section-description" variants={fadeInUp}>
                The 14-Day Launchpad brings together GTM Infrastructure, investor-ready branding, performance Webflow and Next.js development, and AI-Ops and workflow automation.
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
                    icon: <FaIcon name="paint-brush" className="text-4xl text-[#F75F0B]" />,
                    title: 'High-End Brand Identity',
                    desc: 'Investor-Ready Branding that positions you for venture-backed growth.',
                    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity System']
                  },
                  {
                    icon: <FaIcon name="code" className="text-4xl text-[#2FA0B5]" />,
                    title: 'Performance Web',
                    desc: 'Performance Webflow and Next.js Development built for speed and venture-scale growth.',
                    features: ['Mobile-First Design', 'SEO Optimization', 'Fast Load Times']
                  },
                  {
                    icon: <FaIcon name="layer-group" className="text-4xl text-[#F75F0B]" />,
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
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-medium uppercase tracking-wider">
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
                    <FaIcon name={pain.icon} className="text-2xl text-[#F75F0B]" />
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
                      <div className="bg-[#F75F0B] text-black px-6 py-3 rounded-lg text-center font-bold text-lg">
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
                Built for founders who need brand, web, and growth systems working as one GTM Infrastructure stack.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Scope-Based Pricing */}
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
                  Most launches complete in 14 days. More complex builds may extend timeline to accommodate scope — your Strategic GTM Audit will confirm the right fit.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Launch Tier */}
                <motion.div
                  className="bg-[#111] p-8 border border-[#F75F0B] flex flex-col relative"
                  variants={fadeInUp}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#F75F0B] text-black px-4 py-1 text-sm font-bold uppercase">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Launch</h3>
                  <div className="text-4xl font-bold text-[#F75F0B] mb-4">$5,500 <span className="text-lg text-gray-400">USD</span></div>
                  <p className="text-gray-400 text-sm mb-6">Standard scope · 14-day standard timeline</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Full Brand Suite</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>5-page site</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>2 AI Workflows</span>
                    </li>
                    <li className="flex items-start gap-2 text-white">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>HubSpot CRM setup</span>
                    </li>
                  </ul>
                  <LinkButton to="/book-consultation" className="w-full bg-[#F75F0B] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all">
                    Strategic GTM Audit
                  </LinkButton>
                </motion.div>

                {/* Launch+ Tier */}
                <motion.div
                  className="bg-[#111] p-8 border border-[#2FA0B5] flex flex-col relative"
                  variants={fadeInUp}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#023942] text-[#CFF8FF] border border-[#CFF8FF] px-3 py-1 text-xs font-medium uppercase tracking-wider">
                    Recommended
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Launch+</h3>
                  <div className="text-4xl font-bold text-[#2FA0B5] mb-4">$8,500 <span className="text-lg text-gray-400">USD</span></div>
                  <p className="text-gray-400 text-sm mb-6">Extended scope · Timeline accommodates complexity</p>
                  <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-start gap-2 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Everything in Launch</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Booking system</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>GPT-trained email responder</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Content automation</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Launch Success Partner</span>
                    </li>
                  </ul>
                  <LinkButton to="/book-consultation" className="w-full bg-[#111] border border-[#2FA0B5] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2FA0B5] transition-all">
                    Strategic GTM Audit
                  </LinkButton>
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
                Use the Strategic GTM Audit to confirm the right Launchpad scope for your goals and timeline.
              </p>
              <ExternalLinkButton
                href="https://calendar.app.google/uCcmuLDGudKtHW9V8"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#F75F0B] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ff8555] transition-all"
              >
                Strategic GTM Audit
              </ExternalLinkButton>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Launchpad;
