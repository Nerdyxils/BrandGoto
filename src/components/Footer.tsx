import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ContactSection.css';
import LogoImg from '../assets/logo.svg';

interface LogoData {
  src: string;
  alt: string;
}

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const logosRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(1);

  // Logo data
  const logos: LogoData[] = [
    { src: "/images/higherglyphs1.webp", alt: "Higher Glyphs" },
    { src: "/images/smt.webp", alt: "SMT" },
    { src: "/images/Neuralabs.webp", alt: "Neuralabs" },
    { src: "/images/herlogo.webp", alt: "Jayo" }
  ];

  // Calculate exact dimensions based on screen size
  const getLogoDimensions = (width: number) => {
    if (width <= 480) {
      return {
        logoWidth: 60,
        logoHeight: 20,
        gap: 12,
        containerMaxWidth: 280,
        animationSpeed: 20,
      };
    } else if (width <= 768) {
      return {
        logoWidth: 80,
        logoHeight: 25,
        gap: 16,
        containerMaxWidth: 350,
        animationSpeed: 15,
      };
    } else if (width <= 1200) {
      return {
        logoWidth: 100,
        logoHeight: 30,
        gap: 20,
        containerMaxWidth: 500,
        animationSpeed: 12,
      };
    } else {
      return {
        logoWidth: 120,
        logoHeight: 35,
        gap: 24,
        containerMaxWidth: 600,
        animationSpeed: 10,
      };
    }
  };

  const dimensions = getLogoDimensions(screenWidth);

  // Screen width effect
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Logo animation
  const renderLogos = () => {
    const logoElements = logos.map((logo, index) => (
      <img
        key={`${logo.alt}-${index}`}
        src={logo.src}
        alt={logo.alt}
        style={{
          width: `${dimensions.logoWidth}px`,
          height: `${dimensions.logoHeight}px`,
          objectFit: 'contain',
          filter: 'grayscale(100%) brightness(0.8)',
          opacity: 0.7,
        }}
      />
    ));

    // Duplicate logos for seamless loop with unique keys
    const duplicatedElements = logos.map((logo, index) => (
      <img
        key={`${logo.alt}-duplicate-${index}`}
        src={logo.src}
        alt={logo.alt}
        style={{
          width: `${dimensions.logoWidth}px`,
          height: `${dimensions.logoHeight}px`,
          objectFit: 'contain',
          filter: 'grayscale(100%) brightness(0.8)',
          opacity: 0.7,
        }}
      />
    ));

    return [...logoElements, ...duplicatedElements];
  };

  const animateLogos = () => {
    if (!logosRef.current) return;

    const container = logosRef.current;
    // Cache scrollWidth to avoid forced reflow - read once in requestAnimationFrame
    let totalWidth = 0;
    requestAnimationFrame(() => {
      if (container) {
        totalWidth = container.scrollWidth / 2; // Half because we duplicated
      }
    });
    
    let currentPosition = 0;

    const step = () => {
      // Only read scrollWidth if not cached yet
      if (totalWidth === 0 && container) {
        totalWidth = container.scrollWidth / 2;
      }
      currentPosition -= dimensions.animationSpeed / 60; // 60fps
      if (currentPosition <= -totalWidth) {
        currentPosition = 0;
      }
      container.style.transform = `translateX(${currentPosition}px)`;
      animationRef.current = requestAnimationFrame(step);
    };

    step();
  };

  const restartAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animateLogos();
  };

  useEffect(() => {
    restartAnimation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions.animationSpeed]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterEmail('');
  };

  const fadeInUp = {
    hidden: { opacity: 1, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.footer
      className="footer"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Logo Animation */}
      <div className="partners">
        <div className="brand-partners">
          <p style={{ 
            fontWeight: 600, 
            marginBottom: '2rem', 
            color: 'white', 
            textAlign: 'center' 
          }}>
            PARTNERED BY THE WORLD'S TOP BRANDS
          </p>
          <div style={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: `${dimensions.containerMaxWidth}px`,
            margin: '0 auto',
            position: 'relative',
          }}>
            <div 
              ref={logosRef}
              style={{
                display: 'flex',
                gap: `${dimensions.gap}px`,
                width: 'max-content',
                willChange: 'transform',
              }}
              onMouseEnter={() => {
                if (animationRef.current) {
                  cancelAnimationFrame(animationRef.current);
                }
              }}
              onMouseLeave={restartAnimation}
            >
              {renderLogos()}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="logo-social">
          <img src={LogoImg} alt="BrandGoto Official Logo" />
          <div className="socials">
            <a href="https://x.com/Brand_goto" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/brandgoto/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com/brand_goto/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className='copy_w'>© Copyright 2025, All Rights Reserved.</p>
        </div>

        <div className="signup_txt">
          <p>Stay updated with BrandGoto insights, industry trends, and exclusive creative resources. Join our community of bold brands.</p>
        </div>

        <div className="newsletter">
          <form onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="What's your e-mail?" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required 
            />
            <button type="submit">→</button>
          </form>
          <p className="privacy">
            I confirm that I have read <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline"><strong>BrandGoto's Privacy Policy</strong></Link> and agree to receive marketing communications.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
