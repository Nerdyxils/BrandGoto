import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/TestimonialsSection.css';

const SuccessStories: React.FC = () => {
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
                Success Stories
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Real</span>
                <span>Results</span>
                <span>from</span>
                <span>Real</span>
                <span>Clients</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                See how we've helped founders and growing companies achieve their goals and scale their businesses.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-standard">
          <div className="container">
            <TestimonialsSection />
          </div>
        </section>

        {/* Case Studies Section */}
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
                  <span>Case</span>
                  <span>Studies</span>
                </motion.h2>
              </motion.div>
              
              <div className="case-studies-grid">
                <motion.div className="case-study-card" variants={fadeInUp}>
                  <div className="case-study-content">
                    <div className="case-study-header">
                      <img src="/images/Nexora.png" alt="Nexora Logo" className="company-logo" />
                      <h3 className="sm__txt">Nexora - Digital Transformation</h3>
                    </div>
                    <p className="h__txt">
                      Complete digital transformation including brand identity redesign, website development, and marketing strategy that increased leads by 300% and improved conversion rates by 65%.
                    </p>
                    <div className="case-study-details">
                      <div className="case-study-metrics">
                        <div className="metric">
                          <span className="metric-value">300%</span>
                          <span className="metric-label">Lead Increase</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">65%</span>
                          <span className="metric-label">Conversion Boost</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">94%</span>
                          <span className="metric-label">Client Satisfaction</span>
                        </div>
                      </div>
                      <div className="case-study-tags">
                        <span className="case-tag">Brand Design</span>
                        <span className="case-tag">Web Development</span>
                        <span className="case-tag">Marketing Strategy</span>
                        <span className="case-tag">Digital Transformation</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="case-study-card" variants={fadeInUp}>
                  <div className="case-study-content">
                    <div className="case-study-header">
                      <img src="/images/Neuralabs.png" alt="NeuraForm Labs Logo" className="company-logo" />
                      <h3 className="sm__txt">NeuraForm Labs - Brand Evolution</h3>
                    </div>
                    <p className="h__txt">
                      Strategic brand evolution and website redesign that positioned NeuraForm Labs as a leader in their industry, resulting in 500+ qualified leads and 97% client satisfaction.
                    </p>
                    <div className="case-study-details">
                      <div className="case-study-metrics">
                        <div className="metric">
                          <span className="metric-value">500+</span>
                          <span className="metric-label">Qualified Leads</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">97%</span>
                          <span className="metric-label">Client Satisfaction</span>
                        </div>
                        <div className="metric">
                          <span className="metric-value">2M+</span>
                          <span className="metric-label">Impressions</span>
                        </div>
                      </div>
                      <div className="case-study-tags">
                        <span className="case-tag">Brand Strategy</span>
                        <span className="case-tag">Website Design</span>
                        <span className="case-tag">Lead Generation</span>
                        <span className="case-tag">Market Positioning</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="stats-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="premium-stat-card glass-card orange-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-orange">300%</span>
                <span className="premium-stat-label">Average Growth</span>
              </motion.div>
              
              <motion.div className="premium-stat-card glass-card teal-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-teal">65%</span>
                <span className="premium-stat-label">Conversion Increase</span>
              </motion.div>
              
              <motion.div className="premium-stat-card glass-card white-glow card-hover" variants={fadeInUp}>
                <span className="premium-stat-number stat-gradient-white">500+</span>
                <span className="premium-stat-label">Leads Generated</span>
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

export default SuccessStories;

// Add styles for the enhanced case studies
const styles = `
  .case-studies-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  .case-study-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .case-study-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(247, 95, 11, 0.1), rgba(47, 160, 181, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .case-study-card:hover::before {
    opacity: 1;
  }

  .case-study-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .case-study-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .company-logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
  }

  .case-study-content h3 {
    margin: 0;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .case-study-details {
    margin-top: 1.5rem;
  }

  .case-study-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .metric {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #F75F0B;
    margin-bottom: 0.25rem;
  }

  .metric-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  .case-study-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .case-tag {
    background: linear-gradient(135deg, #F75F0B, #FF7A2E);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @media (min-width: 768px) {
    .case-studies-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 767px) {
    .case-study-metrics {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .case-study-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
