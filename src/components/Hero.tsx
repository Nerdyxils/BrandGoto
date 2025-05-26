import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowUpRight, BarChart2, Users, Rocket, ArrowUp } from 'lucide-react';
import Navbar from './Navbar';
import LogoSvg from '../assets/LogoSvg';
import HeroImg from '/images/Founder.JPG';
import ImgCo from '../assets/conversion.png'
import ImgDi from '../assets/digital.png'
import ImgCs from '../assets/clientS.png'
import Arrowup from '../assets/ArrowUpRight.png'
import BigArr from '../assets/bigarrow.png'
import TinArr from '../assets/tinyarrow-dropdown.png'
import './Hero.css';
import Herotwo from './Herotwo';
import ServicesSection from './ServicesSection';
import RecentProjects from './RecentProjects';
import TeamSection from './TeamSection';
import './ScrollSnap.css'; // 
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Lock scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    // ESC key to close tray
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    // Resize: auto-close if screen is wider than 768px
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

  const leftStats = [
    { icon: <img src={ImgCo} />, label: 'Conversion', value: '200%', change: '81%' },
    { icon: <img src={ImgDi} />, label: 'Digital Campaign', value: '20M+', change: '76%' },
    { icon: <img src={ImgCs} />, label: 'Client Satisfaction', value: '156%', change: '79%' },
  ];

  const rightStats = [
    { label: 'Customer Engagement', subLabel: 'High-converting strategy', value: '70%' },
    { label: 'Business Email Setup', subLabel: 'Look legit with setting it up', value: '210%' },
    { label: 'Great Brand Strategy', subLabel: 'Not sure what your brand needs?', value: '101%' },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut', delay: i * 0.2 },
    }),
  };

  // Animation for Stats Cards
  const leftControls = leftStats.map(() => useAnimation());
  const rightControls = rightStats.map(() => useAnimation());

  useEffect(() => {
    const animateStats = async () => {
      while (true) {
        // Phase 1: Left (2 up, 1 down), Right (1 up, 2 down)
        await Promise.all([
          leftControls[0].start({
            scale: 1.1,
            background: '#1F2937', // Solid background when popped up
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Small glow shadow when popped up
            transition: { duration: 0.5 },
          }),
          leftControls[1].start({
            scale: 1.1,
            background: '#1F2937',
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.5 },
          }),
          leftControls[2].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)', // Glassmorphism when popped down
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
          rightControls[0].start({
            scale: 1.1,
            background: '#1F2937',
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.5 },
          }),
          rightControls[1].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
          rightControls[2].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
        ]);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s

        // Phase 2: Left (1 up, 2 down), Right (2 up, 1 down)
        await Promise.all([
          leftControls[0].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
          leftControls[1].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
          leftControls[2].start({
            scale: 1.1,
            background: '#1F2937',
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.5 },
          }),
          rightControls[0].start({
            scale: 0.9,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'none',
            transition: { duration: 0.5 },
          }),
          rightControls[1].start({
            scale: 1.1,
            background: '#1F2937',
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.5 },
          }),
          rightControls[2].start({
            scale: 1.1,
            background: '#1F2937',
            backdropFilter: 'none',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.5 },
          }),
        ]);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
      }
    };
    animateStats();
  }, [leftControls, rightControls]);

  return (
    <motion.div
      className="main-content"
      animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <section className="relative min-h-screen bg-black text-white px-4 sm:px-8 pt-6 pb-10 hero-bg">
        <div className="container mx-auto">
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          {/* Hero Text */}
          <div className="hero-txt text-center max-w-3xl mx-auto mb-16">
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Built for all Brands
            </motion.span>

            <motion.h1
              className="hero-heading"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span>Bold</span>
              <span>Brands</span>
              <span>Start</span>
              <span>Here</span>
            </motion.h1>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              We creatively make your brand standout, build beautiful websites, and launch your online presence with power.
            </motion.p>
          </div>

          {/* Stats Section */}
          <div className="stats-container">
            {/* Left Cards */}
            <div className=" left-cards">
              {leftStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="left-card"
                  style={{ maxHeight: '130px', width: '100%'}}
                  initial={{
                    scale: index < 2 ? 1.1 : 0.9,
                    background: index < 2 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: index < 2 ? 'none' : 'blur(10px)',
                    border: index < 2 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: index < 2 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                  animate={leftControls[index]}
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
            </div>

            {/* Middle Image */}
            <div className="middle-image-container">
              <img
                src={HeroImg}
                alt="Profile"
                className="middle-image"
              />
              <div className="middle-image-overlay">
                <p className="middle-image-name">Silas .A</p>
                <p className="middle-image-position">Founding Partner</p>
              </div>
            </div>

            {/* Right Cards */}
            <div className="right-cards">
              {rightStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="right-card"
                  style={{ maxHeight: '81px', maxWidth: '378px', width: '100%' }}
                  initial={{
                    scale: index === 0 ? 1.1 : 0.9,
                    background: index === 0 ? '#000000' : 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: index === 0 ? 'none' : 'blur(10px)',
                    border: index === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: index === 0 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                  animate={rightControls[index]}
                >
                  {/* Online Indicator Dot */}
                  <div className="right-card-dot shadow-glow" />
                    <div className="right-card-content">
                      {/* Sub-Column 1: Arrow */}
                      <div className="right-card-arrow-container">
                        <img src={BigArr} className="right-card-arrow" />
                      </div>
                      {/* Sub-Column 2: Texts */}
                      <div className="right-card-texts">
                        <p className="right-card-label">{stat.label}</p>
                        <p className="right-card-sublabel">{stat.subLabel}</p>
                      </div>
                      {/* Sub-Column 3: Stat */}
                      <div className="right-card-change">
                        <span>{stat.value}</span>
                        <img src={TinArr} />
                      </div>
                    </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="cta-container">
            <motion.div
              className="cta-box"
              initial={{ y: 50, opacity: 0 }} // Start 50px below and fully transparent
              animate={{ y: 0, opacity: 1 }} // Move to original position and fully opaque
              transition={{ duration: 0.6, ease: "easeOut" }} // Smooth ease-out animation over 0.6s
            >
              <div className="cta-image-wrapper">
                <img src={HeroImg} alt="Client Success Manager" className="cta-image" />
                <span className="cta-online-indicator"></span>
              </div>
              <div className="cta-text">
                <span className="cta-name">Jane Doe</span>
                <br />
                <span className="cta-role">Client Success Manager</span>
              </div>
              <button className="cta-button">Book a Free Consultation</button>
            </motion.div>
          </div>
        </div>
      </section>
      <Herotwo />
      <ServicesSection />
      <RecentProjects />
      <TeamSection />
      <TestimonialsSection />
      <ContactSection />
    </motion.div>
  );
};

export default Hero;