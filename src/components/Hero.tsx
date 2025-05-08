import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart2, Users, Rocket } from 'lucide-react';
import Navbar from './Navbar';
import LogoSvg from '../assets/LogoSvg';
import './Hero.css';

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
    { icon: <BarChart2 size={20} />, label: 'Conversion', value: '200%', change: '81%' },
    { icon: <Users size={20} />, label: 'Engagement', value: '150%', change: '65%' },
    { icon: <Rocket size={20} />, label: 'Growth', value: '300%', change: '90%' },
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

  return (
    <motion.div
      className="main-content"
      animate={isMenuOpen ? { x: '-40vw' } : { x: 0 }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <section className="relative min-h-screen bg-black text-white px-4 sm:px-8 pt-6 pb-10 overflow-hidden hero-bg">
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
              className="text-base sm:text-lg text-gray-300 h__txt"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              We creatively make your brand standout, build beautiful websites, and launch your online presence with power.
            </motion.p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Hero;
