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
import './ScrollSnap.css';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';

const Hero: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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


const [isScrolled, setIsScrolled] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const HeroImg = '/public/images/hero_imgg.png';
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
      await new Promise(resolve => setTimeout(resolve, 1500)); // Wait for hero text animations to finish
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
      <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled}/>
    <motion.div
      className="main-content"
      animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <section className="relative min-h-screen bg-black text-white px-4 sm:px-8 pt-[90px] pb-10 hero-bg">
        <div className="container mx-auto">

          {/* Hero Text */}
          <motion.div
            className="hero-txt text-center max-w-3xl mx-auto mb-16"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="sm__txt block mb-3" variants={textItemVariants}>
              Built for all Brands
            </motion.span>

            <motion.h1 className="hero-heading" variants={textItemVariants}>
              <span>Bold</span><span>Brands</span><span>Start</span><span>Here</span>
            </motion.h1>

            <motion.p className="h__txt text-base sm:text-lg text-gray-300" variants={textItemVariants}>
              We creatively make your brand standout, build beautiful websites, and launch your online presence with power.
            </motion.p>
          </motion.div>

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
              {/* <div className="middle-image-overlay">
                <p className="middle-image-name">Silas .A</p>
                <p className="middle-image-position">Founding Partner</p>
              </div> */}
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
                <img src={CSMimg} alt="Client Success Manager" className="cta-image" />
                <span className="cta-online-indicator"></span>
              </div>
              <div className="cta-text">
                <span className="cta-name">Celine</span>
                <br />
                <span className="cta-role">Client Success Manager</span>
              </div>
              <button className="cta-button">Book a Free Consultation</button>
            </motion.div>
          </div>
        </div>
      </section>
              <section id="about-us">
                <Herotwo />
              </section>

              <section id="services">
                <ServicesSection />
              </section>

              <section id="recent-projects">
                <RecentProjects />
              </section>

              <section id="team">
                <TeamSection />
              </section>
              <section id="success-stories">
                <TestimonialsSection />
              </section>

              <section id="contact">
                <ContactSection />
              </section>
    </motion.div>
    </>
  );
};

export default Hero;
