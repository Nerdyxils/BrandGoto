import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Navbar from './Navbar';
import ImgCo from '../assets/conversion.png';
import ImgDi from '../assets/digital.png';
import ImgCs from '../assets/clientS.png';
import Arrowup from '../assets/ArrowUpRight.png';
import BigArr from '../assets/bigarrow.png';
import TinArr from '../assets/tinyarrow-dropdown.png';
import './Hero.css';
import Herotwo from './Herotwo';
import ServicesSection from './ServicesSection';
import RecentProjects from './RecentProjects';
import TeamSection from './TeamSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import ScrollToTop from './ScrollToTop';

const Hero: React.FC = () => {
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

  const HeroImg = '/images/hero_imgg.png';
  const CSMimg = '/images/Image.png';

  // STATS DATA - KEEPING YOUR ORIGINAL DATA
  const leftStats = [
    {
      icon: <img src={ImgCo} />,
      label: 'Complete Solutions Delivered',
      value: '150+',
      change: '81%',
    },
    {
      icon: <img src={ImgDi} />,
      label: 'Businesses Launched & Scaled',
      value: '50+',
      change: '76%',
    },
    {
      icon: <img src={ImgCs} />,
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

  // SIMPLIFIED ANIMATION VARIANTS - NO CONFLICTING TRANSFORMS
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
      transition: { staggerChildren: 0.15 }
    }
  };

  // SIMPLIFIED STATS ANIMATION CONTROLS
  const leftControls = leftStats.map(() => useAnimation());
  const rightControls = rightStats.map(() => useAnimation());

  // ORIGINAL ALTERNATING CARD ANIMATIONS - RESTORED
  useEffect(() => {
    const animateStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Infinite alternating animation loop like original
      while (true) {
        // First pattern - some cards pop in
        await Promise.all([
          leftControls[0].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[1].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[2].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[0].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[1].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[2].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
        ]);
        
        // Random wait between 1.5-3 seconds
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
        
        // Second pattern - different cards pop in
        await Promise.all([
          leftControls[0].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[1].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[2].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[0].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[1].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[2].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
        ]);
        
        // Random wait between 1.5-3 seconds
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
        
        // Third pattern - mix it up
        await Promise.all([
          leftControls[0].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[1].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          leftControls[2].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[0].start({ 
            scale: 1.1, 
            background: '#000000',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[1].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
          rightControls[2].start({ 
            scale: 0.9, 
            background: 'rgba(255,255,255,0.1)',
            transition: { duration: 0.5, ease: "easeOut" }
          }),
        ]);
        
        // Random wait between 1.5-3 seconds
        await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));
      }
    };
    
    animateStats();
  }, [leftControls, rightControls]);

  // SIMPLIFIED MOBILE-FRIENDLY SECTION ANIMATION
  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="scroll-container">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled}/>
      <ScrollToTop />
      <motion.div
        className="main-content"
        animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {/* HERO SECTION - KEEPING YOUR ORIGINAL STRUCTURE AND CLASSES */}
        <section className="hero-section relative text-white px-4 sm:px-8 pt-[90px] pb-10">
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
              <motion.span className="sm__txt block mb-3" variants={fadeInUp}>
                Built for Founders & Growing Companies
              </motion.span>

              <motion.h1 className="hero-heading" variants={staggerContainer}>
                <motion.span variants={fadeInUp}>Bold</motion.span>
                <motion.span variants={fadeInUp}>Brands</motion.span>
                <motion.span variants={fadeInUp}>Start</motion.span>
                <motion.span variants={fadeInUp}>Here</motion.span>
              </motion.h1>

              <motion.p className="h__txt text-base sm:text-lg text-gray-300 max-w-2xl mx-auto" variants={fadeInUp}>
                Your one-stop creative partner. Brand, website, marketing, and tech solutions that scale with your business.
              </motion.p>

              {/* SOCIAL PROOF - KEEPING YOUR ORIGINAL CLASSES */}
              <motion.div className="social-proof mt-4" variants={fadeInUp}>
                <span className="proof-text text-sm text-gray-400">
                  Trusted by 50+ founders from idea to $1M+
                </span>
              </motion.div>
            </motion.div>

            {/* STATS CONTAINER - KEEPING YOUR ORIGINAL CLASSES */}
            <motion.div 
              className="stats-container"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* LEFT CARDS - KEEPING YOUR ORIGINAL STRUCTURE */}
              <motion.div className="left-cards" variants={fadeInUp}>
                {leftStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="left-card"
                    style={{ maxHeight: '130px', width: '100%'}}
                    initial={{
                      scale: index < 2 ? 1.1 : 0.9,
                      background: index < 2 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                    }}
                    animate={leftControls[index]}
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
                          <img src={Arrowup} alt="Arrow Up" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* MIDDLE IMAGE - KEEPING YOUR ORIGINAL STRUCTURE */}
              <motion.div 
                className="middle-image-container"
                variants={fadeInUp}
              >
                <motion.img
                  src={HeroImg}
                  alt="Profile"
                  className="middle-image"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>

              {/* RIGHT CARDS - KEEPING YOUR ORIGINAL STRUCTURE */}
              <motion.div className="right-cards" variants={fadeInUp}>
                {rightStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="right-card"
                    style={{ maxHeight: '81px', maxWidth: '378px', width: '100%' }}
                    initial={{
                      scale: index === 0 ? 1.1 : 0.9,
                      background: index === 0 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                    }}
                    animate={rightControls[index]}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="right-card-dot shadow-glow" />
                    <div className="right-card-content">
                      <div className="right-card-arrow-container">
                        <img src={BigArr} className="right-card-arrow" />
                      </div>
                      <div className="right-card-texts">
                        <p className="right-card-label">{stat.label}</p>
                        <p className="right-card-sublabel">{stat.subLabel}</p>
                      </div>
                      <div className="right-card-change">
                        <span>{stat.value}</span>
                        <img src={TinArr} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* CTA - KEEPING YOUR ORIGINAL STRUCTURE */}
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
                  <img src={CSMimg} alt="Client Success Manager" className="cta-image" />
                  <span className="cta-online-indicator"></span>
                </div>
                <div className="cta-text">
                  <span className="cta-name">Celine</span>
                  <span className="cta-role">Client Success Manager</span>
                </div>
                <motion.a 
                  href="#contact"
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Track CTA click
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'click', {
                        'event_category': 'cta',
                        'event_label': 'contact_form',
                        'value': 1
                      });
                    }
                  }}
                >
                  Get Everything You Need
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTIONS - SIMPLIFIED SMOOTH SCROLL-IN */}
        <motion.section 
          id="about-us"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Herotwo />
        </motion.section>

        <motion.section 
          id="services"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ServicesSection />
        </motion.section>

        <motion.section 
          id="recent-projects"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <RecentProjects />
        </motion.section>

        <motion.section 
          id="team"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <TeamSection />
        </motion.section>

        <motion.section 
          id="success-stories"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <TestimonialsSection />
        </motion.section>

        <motion.section 
          id="contact"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <ContactSection />
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Hero;