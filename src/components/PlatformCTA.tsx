import React from 'react';
import { motion } from 'framer-motion';
import './PlatformCTA.css';
import './Herotwo.css';

// TypeScript JSX fix
declare global {
  namespace JSX {
    interface IntrinsicElements {
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    }
  }
}

const PlatformCTA: React.FC = () => {
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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const scaleOnHover = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="platform-cta-section section-standard">
      <div className="container mx-auto px-4">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span className="section-subtitle" variants={fadeInUp}>
            Tech Platforms
          </motion.span>
          <motion.h2 className="herotwo-heading" variants={fadeInUp}>
            <span>Scale</span>
            <span>Your</span>
            <span>Business</span>
            <span>with</span>
            <span>Our</span>
            <span>Tech</span>
            <span>Platforms</span>
          </motion.h2>
          <p className="section-description">
            Beyond creative services, we offer powerful platforms to accelerate your growth
          </p>
        </motion.div>

        <motion.div
          className="platform-cards-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Outsource Platform Card */}
          <motion.div
            className="platform-card outsource-card"
            variants={fadeInUp}
            whileHover={scaleOnHover}
          >
            <div className="platform-card-header">
              <div className="platform-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="platform-badge">Tech Outsourcing</div>
            </div>
            
            <div className="platform-card-content">
              <h3 className="platform-card-title">Outsource Platform</h3>
              <p className="platform-card-description">
                Connect with top-tier developers, designers, and tech experts. 
                Scale your team instantly with vetted professionals ready to deliver.
              </p>
              
              <div className="platform-features">
                <div className="feature-item">
                  <i className="fas fa-bolt feature-icon"></i>
                  <span>Instant Team Scaling</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-bullseye feature-icon"></i>
                  <span>Vetted Professionals</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-rocket feature-icon"></i>
                  <span>Fast Project Delivery</span>
                </div>
              </div>
            </div>

            <div className="platform-card-footer">
              <motion.a
                href="https://outsource.brandgoto.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="platform-cta-button primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Outsource Platform
                <i className="fas fa-external-link-alt"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* SmartLaunch Platform Card */}
          <motion.div
            className="platform-card smartlaunch-card"
            variants={fadeInUp}
            whileHover={scaleOnHover}
          >
            <div className="platform-card-header">
              <div className="platform-icon">
                <i className="fas fa-robot"></i>
              </div>
              <div className="platform-badge">AI Automation</div>
            </div>
            
            <div className="platform-card-content">
              <h3 className="platform-card-title">SmartLaunch</h3>
              <p className="platform-card-description">
                AI-powered automation packages that streamline your business processes. 
                From lead generation to customer support - automate it all.
              </p>
              
              <div className="platform-features">
                <div className="feature-item">
                  <i className="fas fa-robot feature-icon"></i>
                  <span>AI-Powered Automation</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-chart-line feature-icon"></i>
                  <span>Lead Generation</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-cogs feature-icon"></i>
                  <span>Process Optimization</span>
                </div>
              </div>
            </div>

            <div className="platform-card-footer">
              <motion.a
                href="https://smartlaunch.brandgoto.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="platform-cta-button secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover SmartLaunch
                <i className="fas fa-external-link-alt"></i>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="platform-bottom-cta"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="bottom-cta-content">
            <h3 className="bottom-cta-title">Ready to Scale?</h3>
            <p className="bottom-cta-description">
              Whether you need creative services or tech solutions, we've got you covered.
            </p>
            <motion.a
              href="/book-consultation"
              className="bottom-cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformCTA;
