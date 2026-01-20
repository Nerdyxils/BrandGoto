import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/RecentProjects.css';

const AboutUs: React.FC = () => {
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

  return (
    <div className="scroll-container">
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
                About BrandGoto
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Creative</span>
                <span>Meets</span>
                <span>Tech</span>
                <span>—</span>
                <span>Built</span>
                <span>for</span>
                <span>Growth</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                The Technical Growth Partner for Founders. Brandgoto is a Global Technical Studio that deploys high-end branding, performance web, and AI-driven operations for US-based startups.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>Our</span>
                  <span>Story</span>
                </motion.h2>
              </motion.div>
              
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12" variants={fadeInUp}>
                <div className="text-left space-y-6">
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Brandgoto was built to bridge the gap between strategic brand positioning and technical execution. We saw too many founders struggling with disconnected agencies—so we built a studio that handles it all under one roof.
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Our model is built for speed: US-aligned strategy meets European engineering excellence. This allows us to ship high-performance infrastructure at a pace that keeps startups ahead of their technical debt and ready for their next round.
                  </p>
                </div>
                <div className="bg-[#111] p-8 rounded-xl border border-white/10">
                  <h3 className="section-subtitle mb-6">Why We're Different</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#F75F0B] font-bold">→</span>
                      <span>Complete solutions, not just design or just code</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#F75F0B] font-bold">→</span>
                      <span>Built for speed and scalability from day one</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <span className="text-[#F75F0B] font-bold">→</span>
                      <span>Focus on results, not just aesthetics</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>Our</span>
                  <span>Values</span>
                </motion.h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-chart-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Results-Driven</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    Every design decision and line of code serves a business purpose. We measure success by growth, not just aesthetics.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-tachometer-alt text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Speed & Efficiency</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    We build fast, launch quickly, and optimize continuously. Time to market matters as much as quality.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-users text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Partnership</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    We work as an extension of your team, not just a vendor. Your success is our success.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="bg-[#111] p-10 border border-white/10 rounded-xl text-center group hover:border-[#F75F0B] transition-all" variants={fadeInUp}>
                <span className="text-5xl font-extrabold text-[#F75F0B] block mb-2 group-hover:scale-105 transition-transform">150+</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Complete Solutions</span>
              </motion.div>
              
              <motion.div className="bg-[#111] p-10 border border-white/10 rounded-xl text-center group hover:border-[#2FA0B5] transition-all" variants={fadeInUp}>
                <span className="text-5xl font-extrabold text-[#2FA0B5] block mb-2 group-hover:scale-105 transition-transform">3x</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Faster Delivery</span>
              </motion.div>
              
              <motion.div className="bg-[#111] p-10 border border-white/10 rounded-xl text-center group hover:border-white transition-all" variants={fadeInUp}>
                <span className="text-5xl font-extrabold text-white block mb-2 group-hover:scale-105 transition-transform">100%</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Success Rate</span>
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

export default AboutUs;
