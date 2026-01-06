import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/RecentProjects.css';

const ThingsWeBuilt: React.FC = () => {
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

  const scrollToLeft = () => {
    const swiper = document.querySelector('.project-swiper');
    if (swiper) {
      swiper.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollToRight = () => {
    const swiper = document.querySelector('.project-swiper');
    if (swiper) {
      swiper.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const projects = [
    {
      id: 1,
      title: 'Prodex – Inventory & Product Management System',
      category: 'Web Application',
      tech: 'MERN Stack',
      image: '/images/projectA.png',
      description: 'Built a comprehensive inventory and product management system using the MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports.',
      features: ['Role-based authentication', 'Real-time data updates', 'CRUD operations', 'Scalable architecture']
    },
    {
      id: 2,
      title: 'CoinVers – Cryptocurrency Tracking Platform',
      category: 'Web Application',
      tech: 'React, Python, Django',
      image: '/images/projectB.png',
      description: 'Developed a cryptocurrency tracking and analytics platform using React for the frontend and Django with Django REST Framework for the backend.',
      features: ['Real-time price updates', 'Interactive charts', 'Portfolio tracking', 'Third-party API integration']
    },
    {
      id: 3,
      title: 'Dala – Fancy Landing Page',
      category: 'Website',
      tech: 'React + Next.js, GSAP',
      image: '/images/Dala.png',
      description: 'Developed a fancy landing page with smooth scroll animations and modern design elements.',
      features: ['Smooth scroll animations', 'Modern design', 'Performance optimized', 'Responsive layout']
    },
    {
      id: 4,
      title: 'Jayo – Tech Consulting Website',
      category: 'Website',
      tech: 'ReactJS, NextJs, Tailwind',
      image: '/images/projectE.png',
      description: 'We proudly delivered a fully functional, high-performance ReactJS website for JAYO, a forward-thinking tech consulting firm based in the USA.',
      features: ['High performance', 'Modern UI/UX', 'SEO optimized', 'Fast loading']
    },
    {
      id: 5,
      title: 'Multi-featured Shopping Site',
      category: 'E-commerce',
      tech: 'Vue, Django',
      image: '/images/projectF.png',
      description: 'Developed a modern e-commerce platform using Vue.js for the frontend and Django for the backend.',
      features: ['User authentication', 'Shopping cart', 'Payment integration', 'Order tracking']
    },
    {
      id: 6,
      title: 'BizWorld – Business News Website',
      category: 'Content Platform',
      tech: 'WordPress',
      image: '/images/projectG.png',
      description: 'Designed and developed a dynamic business news and blog website using WordPress.',
      features: ['Custom theme', 'SEO optimized', 'Content management', 'Newsletter integration']
    }
  ];

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
                Things We Built
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Work</span>
                <span>That</span>
                <span>Speaks</span>
                <span>for</span>
                <span>Itself</span>
              </motion.h1>

              <motion.p className="h__txt" variants={fadeInUp}>
                Check out some of our favorite builds—from bold brands to sleek websites and powerful applications.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Carousel */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="text-center mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Recent</span>
                <span>Projects</span>
              </motion.h2>
              <motion.p className="h__txt max-w-2xl mx-auto mt-4" variants={fadeInUp}>
                A showcase of our latest work—from web applications to stunning websites
              </motion.p>
            </motion.div>
            
            <motion.div
              className="project-carousel-container carousel-dark"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button 
                className="carousel-nav-button prev"
                onClick={scrollToLeft}
                aria-label="Scroll left"
              >
                ←
              </button>
              
              <div className="project-swiper">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="carousel-project-card"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="carousel-project-img"
                      loading="lazy"
                    />
                    <h3 className="carousel-project-title">
                      {project.title}
                    </h3>
                    <div className="carousel-project-category">
                      {project.category} • {project.tech}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button 
                className="carousel-nav-button next"
                onClick={scrollToRight}
                aria-label="Scroll right"
              >
                →
              </button>
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

export default ThingsWeBuilt;
