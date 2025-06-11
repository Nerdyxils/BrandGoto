
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import ImgCo from '../assets/conversion.png';
import ImgDi from '../assets/digital.png';
import ImgCs from '../assets/clientS.png';
import Arrowup from '../assets/ArrowUpRight.png';
import BigArr from '../assets/bigarrow.png';
import TinArr from '../assets/tinyarrow-dropdown.png';
import './Hero.css';
import './EnhancedScrollEffects.css'; // NEW CSS FILE FOR SCROLL EFFECTS
import Herotwo from './Herotwo';
import ServicesSection from './ServicesSection';
import RecentProjects from './RecentProjects';
import TeamSection from './TeamSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // SCROLL ANIMATION REFS AND HOOKS
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // SMOOTH SPRING ANIMATIONS
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // GENTLE PARALLAX TRANSFORMS - REDUCED INTENSITY
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]); // Reduced from 50%
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]); // Reduced from -30%
  const statsY = useTransform(smoothProgress, [0, 1], ["0%", "-5%"]); // Reduced from -20%
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.01, 1.02]); // Much subtler
  const opacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.95, 0.8]); // Less dramatic
  
  // INDIVIDUAL ELEMENT TRANSFORMS - DESKTOP ONLY
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const leftCardsX = useTransform(smoothProgress, [0, 1], 
    isMobile ? ["0%", "0%"] : ["0%", "-100%"]
  );
  const rightCardsX = useTransform(smoothProgress, [0, 1], 
    isMobile ? ["0%", "0%"] : ["0%", "100%"]
  );
  const middleImageScale = useTransform(smoothProgress, [0, 1], 
    isMobile ? [1, 1] : [1, 1.2]
  );
  const middleImageRotate = useTransform(smoothProgress, [0, 1], 
    isMobile ? [0, 0] : [0, 5]
  );

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

  const leftStats = [
    {
      icon: <img src={ImgCo} />,
      label: 'Average Conversion Boost',
      value: '320%',
      change: '81%',
    },
    {
      icon: <img src={ImgDi} />,
      label: 'Digital Campaign Reach',
      value: '32M+',
      change: '76%',
    },
    {
      icon: <img src={ImgCs} />,
      label: 'Client Satisfaction Rate',
      value: '99.2%',
      change: '79%',
    },
  ];

  const rightStats = [
    {
      label: 'Brand Visibility',
      subLabel: 'From obscurity to standout',
      value: '4x',
    },
    {
      label: 'Revenue Growth Impact',
      subLabel: 'After identity rebrands',
      value: '+65%',
    },
    {
      label: 'Projects Delivered On Time',
      subLabel: 'Agile and reliable delivery',
      value: '100%',
    },
  ];

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3, ease: 'easeInOut' }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  const leftControls = leftStats.map(() => useAnimation());
  const rightControls = rightStats.map(() => useAnimation());

  useEffect(() => {
    const animateStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      while (true) {
        await Promise.all([
          leftControls[0].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
          leftControls[1].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
          leftControls[2].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
          rightControls[0].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
          rightControls[1].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
          rightControls[2].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
        ]);
        await new Promise(r => setTimeout(r, 2000));
        await Promise.all([
          leftControls[0].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
          leftControls[1].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
          leftControls[2].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
          rightControls[0].start({ scale: 0.9, background: 'rgba(255,255,255,0.1)', transition: { duration: 0.5 } }),
          rightControls[1].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
          rightControls[2].start({ scale: 1.1, background: '#1F2937', transition: { duration: 0.5 } }),
        ]);
        await new Promise(r => setTimeout(r, 2000));
      }
    };
    animateStats();
  }, []);

  return (
    <div ref={containerRef} className="scroll-container">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled}/>
      
      <motion.div
        className="main-content"
        animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {/* ENHANCED HERO SECTION WITH SCROLL EFFECTS */}
        <motion.section 
          ref={heroRef}
          className="hero-section relative text-white px-4 sm:px-8 pt-[90px] pb-10"
          style={{
            scale,
            opacity
          }}
        >
          {/* PARALLAX BACKGROUND */}
          <motion.div 
            className="hero-background"
            style={{
              y: backgroundY,
            }}
          />
          
          <div className="container mx-auto relative z-10">
            {/* PARALLAX HERO TEXT */}
            <motion.div
              className="hero-txt text-center max-w-3xl mx-auto mb-16"
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              style={{
                y: textY,
              }}
            >
              <motion.span className="sm__txt block mb-3" variants={textItemVariants}>
                Built for all Brands
              </motion.span>

              <motion.h1 className="hero-heading enhanced-heading" variants={textItemVariants}>
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Bold
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Brands
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Start
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Here
                </motion.span>
              </motion.h1>

              <motion.p className="h__txt text-base sm:text-lg text-gray-300" variants={textItemVariants}>
                We creatively make your brand standout, build beautiful websites, and launch your online presence with power.
              </motion.p>
            </motion.div>

            {/* ENHANCED STATS CONTAINER WITH PARALLAX */}
            <motion.div 
              className="stats-container enhanced-stats"
              style={{
                y: statsY,
              }}
            >
              {/* LEFT CARDS WITH SCROLL ANIMATION */}
              <motion.div 
                className="left-cards"
                style={{
                  x: leftCardsX,
                }}
              >
                {leftStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="left-card enhanced-card"
                    style={{ maxHeight: '130px', width: '100%'}}
                    initial={{
                      scale: index < 2 ? 1.1 : 0.9,
                      background: index < 2 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: index < 2 ? 'none' : 'blur(10px)',
                      border: index < 2 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: index < 2 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                    }}
                    animate={leftControls[index]}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      transition: { duration: 0.3 }
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

              {/* MIDDLE IMAGE WITH ENHANCED EFFECTS */}
              <motion.div 
                className="middle-image-container"
                style={{
                  scale: middleImageScale,
                  rotateY: middleImageRotate,
                }}
              >
                <motion.img
                  src={HeroImg}
                  alt="Profile"
                  className="middle-image enhanced-middle-image"
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.5 }
                  }}
                />
                <div className="floating-particles">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [-20, -60, -100],
                        x: [(i - 3) * 10, (i - 3) * 20, (i - 3) * 30],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* RIGHT CARDS WITH SCROLL ANIMATION */}
              <motion.div 
                className="right-cards"
                style={{
                  x: rightCardsX,
                }}
              >
                {rightStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="right-card enhanced-card"
                    style={{ maxHeight: '81px', maxWidth: '378px', width: '100%' }}
                    initial={{
                      scale: index === 0 ? 1.1 : 0.9,
                      background: index === 0 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: index === 0 ? 'none' : 'blur(10px)',
                      border: index === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: index === 0 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                    }}
                    animate={rightControls[index]}
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="right-card-dot shadow-glow enhanced-dot" />
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

            {/* ENHANCED CTA */}
            <div className="cta-container">
              <motion.div
                className="cta-box enhanced-cta"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(247, 95, 11, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="cta-image-wrapper">
                  <img src={CSMimg} alt="Client Success Manager" className="cta-image" />
                  <span className="cta-online-indicator"></span>
                </div>
                <div className="cta-text">
                  <span className="cta-name">Celine</span>
                  <br />
                  <span className="cta-role">Client Success Manager</span>
                </div>
                <motion.button 
                  className="cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Free Consultation
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SMOOTH SECTIONS WITH GENTLE TRANSITIONS */}
        <motion.section 
          id="about-us"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1], // Custom smooth easing
            type: "tween"
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <Herotwo />
        </motion.section>

        <motion.section 
          id="services"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <ServicesSection />
        </motion.section>

        <motion.section 
          id="recent-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <RecentProjects />
        </motion.section>

        <motion.section 
          id="team"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <TeamSection />
        </motion.section>

        <motion.section 
          id="success-stories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <TestimonialsSection />
        </motion.section>

        <motion.section 
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.1, 0.25, 1],
            type: "tween",
            delay: 0.1
          }}
          viewport={{ once: true, margin: "-50px", amount: 0.3 }}
        >
          <ContactSection />
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Hero;