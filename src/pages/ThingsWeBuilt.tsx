import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import ProjectCarousel from '../components/ProjectCarousel';
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

  const carouselProjects = projects.map((project) => ({
    id: project.id,
    title: project.title,
    img: project.image,
    description: project.description,
  }));

  const handleProjectClick = () => {
    // Case studies carousel is visual only on this page.
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
                Things We Built
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Work</span>
                <span>That</span>
                <span>Speaks</span>
                <span>for</span>
                <span>Itself</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                Check out some of our favorite builds—from bold brands to sleek websites and powerful applications.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Projects Carousel */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Recent</span>
                <span>Projects</span>
              </motion.h2>
              <motion.p className="section-description" variants={fadeInUp}>
                A showcase of our latest work—from web applications to stunning websites
              </motion.p>
            </motion.div>
            
            <ProjectCarousel
              projects={carouselProjects}
              onCardClick={handleProjectClick as any}
              theme="dark"
            />
          </div>
        </section>

        {/* Stats Section */}
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
