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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
        animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background" />
          
          <div className="container">
            <motion.div
              className="hero-txt"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="sm__txt" variants={fadeInUp}>
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

              <motion.p className="h__txt" variants={fadeInUp}>
                We're a creative-meets-tech studio based in Ontario, helping founders and growing companies build brands, websites, and smart automations that scale with confidence.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="herotwo-heading text-center" variants={fadeInUp}>
                <span>Our</span>
                <span>Story</span>
              </motion.h2>
              
              <motion.div className="story-grid" variants={fadeInUp}>
                <div className="story-content">
                  <p className="h__txt">
                    BrandGoto started with a simple belief: great design and smart technology should work together to drive real business results. We've seen too many companies struggle with disconnected creative and tech solutions that don't scale.
                  </p>
                  <p className="h__txt">
                    Our work is clean, efficient, and conversion-focused—built to launch quickly and grow smoothly. We focus on the fundamentals that matter: clear messaging, fast websites, and systems that work.
                  </p>
                </div>
                <div className="info-card">
                  <h3 className="sm__txt">Why We're Different</h3>
                  <ul className="feature-list">
                    <li className="h__txt">
                      <span className="arrow">→</span>
                      Complete solutions, not just design or just code
                    </li>
                    <li className="h__txt">
                      <span className="arrow">→</span>
                      Built for speed and scalability from day one
                    </li>
                    <li className="h__txt">
                      <span className="arrow">→</span>
                      Focus on results, not just aesthetics
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Our</span>
                <span>Values</span>
              </motion.h2>
              
              <div className="values-grid">
                <motion.div className="value-card" variants={fadeInUp}>
                  <div className="value-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3 className="sm__txt">Results-Driven</h3>
                  <p className="h__txt">
                    Every design decision and line of code serves a business purpose. We measure success by growth, not just aesthetics.
                  </p>
                </motion.div>
                
                <motion.div className="value-card" variants={fadeInUp}>
                  <div className="value-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <h3 className="sm__txt">Speed & Efficiency</h3>
                  <p className="h__txt">
                    We build fast, launch quickly, and optimize continuously. Time to market matters as much as quality.
                  </p>
                </motion.div>
                
                <motion.div className="value-card" variants={fadeInUp}>
                  <div className="value-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="sm__txt">Partnership</h3>
                  <p className="h__txt">
                    We work as an extension of your team, not just a vendor. Your success is our success.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="stats-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="premium-stat-card glass-card orange-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-orange">150+</span>
                <span className="premium-stat-label">Complete Solutions Delivered</span>
              </motion.div>
              
              <motion.div className="premium-stat-card glass-card teal-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-teal">3x</span>
                <span className="premium-stat-label">Faster Than Multiple Agencies</span>
              </motion.div>
              
              <motion.div className="premium-stat-card glass-card white-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-white">100%</span>
                <span className="premium-stat-label">End-to-End Success Rate</span>
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
