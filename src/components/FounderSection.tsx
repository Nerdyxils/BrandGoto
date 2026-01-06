import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './FounderSection.css';
import './SectionSpacing.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const FounderSection: React.FC = () => {
  const ref = useRef(null);

  return (
    <section className="founder-section" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="founder-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Quote Section - Left Side */}
          <motion.div 
            className="founder-quote-section"
            variants={fadeInUp}
          >
            <motion.p className="founder-subtitle" variants={fadeInUp}>
              About Us
            </motion.p>
            <motion.h2 className="founder-title" variants={fadeInUp}>
              <span className="orange">Meet</span> the <span className="teal">Founder</span>
            </motion.h2>
            
            <motion.blockquote className="founder-quote" variants={fadeInUp}>
              <span className="quote-mark">"</span>
              <p className="quote-text">
                Creative Minds. Tech Hearts. We're a small but mighty team of creatives and tech enthusiasts based in Canada,
                passionate about helping brands stand out. Whether you're just starting out or looking to refresh your look, we
                bring strategy, design, and a whole lot of heart into everything we do.
              </p>
              <footer className="quote-author">
                <strong>Silas</strong>
                <span>Founder & Full Stack Developer</span>
              </footer>
            </motion.blockquote>
          </motion.div>

          {/* Image Section - Right Side */}
          <motion.div 
            className="founder-image-section"
            variants={fadeInUp}
          >
            <div className="founder-image-wrapper">
              <img 
                src="/images/Founder.JPG" 
                alt="Silas - Founder & Full Stack Developer" 
                className="founder-image"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="founder-badge-overlay">
                <span>Founder</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;

