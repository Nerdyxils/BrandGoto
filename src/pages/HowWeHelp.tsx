import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import Imgwd from '../assets/WebDev.png';
import Imgbi from '../assets/BIdentity.png';
import Imgdigm from '../assets/DigitalM.png';
import Imggd from '../assets/Graph.png';
import Imgdm from '../assets/Domain.png';
import Imgmk from '../assets/Frame-icons.png';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/ServicesSection.css';

const HowWeHelp: React.FC = () => {
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

  const services = [
    {
      icon: <img src={Imgwd} alt='Website Design & Development' />,
      title: 'Website Design & Development',
      description: 'Websites that convert. Clean, fast, mobile-first.',
      context: 'From stunning landing pages to complex e-commerce platforms, we build websites that not only look great but drive real business results. Our sites are optimized for speed, SEO, and conversion with seamless user experiences across all devices.',
    },
    {
      icon: <img src={Imgwd} alt='Mobile App Development' />,
      title: 'Mobile App Development',
      description: 'iOS & Android apps that customers love.',
      context: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We specialize in creating apps that solve real problems, engage users, and scale with your business growth.',
    },
    {
      icon: <img src={Imgbi} alt='Brand Identity & Logo Design' />,
      title: 'Brand Identity & Logo Design',
      description: 'Memorable brands that stand out and stick.',
      context: 'Complete brand identity systems including logos, color palettes, typography, and brand guidelines. We help businesses establish a strong, memorable presence that resonates with their target audience.',
    },
    {
      icon: <img src={Imgdigm} alt='Digital Marketing & Growth' />,
      title: 'Digital Marketing & Growth',
      description: 'Marketing that actually gets results.',
      context: 'Data-driven digital marketing strategies that drive traffic, generate leads, and increase conversions. From social media campaigns to email marketing, we create campaigns that deliver measurable ROI.',
    },
    {
      icon: <img src={Imggd} alt='Graphic Design & Visual Content' />,
      title: 'Graphic Design & Visual Content',
      description: 'Eye-catching visuals that stop the scroll.',
      context: 'Professional graphic design services including social media graphics, marketing materials, presentations, and visual content that captures attention and communicates your message effectively.',
    },
    {
      icon: <img src={Imgdm} alt='Technical Setup & Infrastructure' />,
      title: 'Technical Setup & Infrastructure',
      description: 'All the techy stuff handled for you.',
      context: 'Complete technical infrastructure setup including domain management, hosting configuration, email systems, security protocols, and ongoing technical support to keep your digital presence running smoothly.',
    },
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
                How We Help
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>From</span>
                <span>Idea</span>
                <span>to</span>
                <span>Empire</span>
                <span>—</span>
                <span>Complete</span>
                <span>Solutions</span>
              </motion.h1>

              <motion.p className="h__txt" variants={fadeInUp}>
                Your one-stop creative partner. From startup idea to scaling business—we handle the creative and tech so you can focus on growth.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="services-grid mt-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-[#131313] card-hover text-left gap-3 items-start"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="flex top_card">
                    <div className="icon_image">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-white mb-1">
                        {service.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p_text">
                    <p className="text-sm text-gray-400 mb-3">{service.description}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{service.context}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Highlight Cards Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="highlight-cards"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: 'Partnership Excellence',
                  description:
                    'True collaboration with proactive communication and creative solutions that exceed expectations.',
                  points: ['Dedicated Project Management', 'Regular Strategy Sessions', 'Transparent Progress Tracking'],
                  color: 'bg-yellow',
                  ocolor: 'bg-lyellow',
                },
                {
                  title: 'Technical Foundation',
                  description:
                    'Rock-solid foundation with domain setup, hosting, and all the technical stuff handled.',
                  points: ['Professional Email & Domain', 'Secure Hosting & Performance', 'Ongoing Technical Support'],
                  color: 'bg-purple',
                  ocolor: 'bg-lpurple',
                },
                {
                  title: 'Growth Partnership',
                  description:
                    'Scale smarter with data-driven strategies and continuous optimization for ongoing growth.',
                  points: ['Performance Analytics', 'Continuous Optimization', 'Strategic Growth Planning'],
                  color: 'bg-blue',
                  ocolor: 'bg-lblue',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className={`highlight-card ${card.color} card-hover`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <h3 className="highlight-title">{card.title}</h3>
                  <p className="highlight-description">{card.description}</p>
                  <div className={`out__inner ${card.ocolor}`}>
                    <div className="inner_points">
                      <ul className="highlight-points">
                        {card.points.map((point, idx) => (
                          <li key={idx} className="pill-icon-wrapper">
                            <img src={Imgmk} alt="✓" className="w-4 h-4" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SmartLaunch CTA Section */}
        <section className="smartlaunch-cta">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="text-center" variants={fadeInUp}>
                <motion.div className="badge-container" variants={fadeInUp}>
                  <span className="ai-badge">AI-Powered Solution</span>
                </motion.div>
                
                <motion.h2 className="herotwo-heading smartlaunch-heading" variants={fadeInUp}>
                  <span>SmartLaunch</span>
                  <span>AI</span>
                  <span>Platform</span>
                </motion.h2>
                
                <motion.p className="h__txt smartlaunch-description" variants={fadeInUp}>
                  Streamline your business with our intelligent automation platform. SmartLaunch helps you capture leads, automate workflows, and scale your operations with AI-powered tools. From lead generation to customer follow-up, our platform handles the repetitive tasks so you can focus on what matters most—growing your business.
                </motion.p>
                
                <motion.div className="features-list" variants={fadeInUp}>
                  <div className="feature-item">
                    <span className="feature-dot"></span>
                    <span className="feature-text">Lead Capture Automation</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-dot"></span>
                    <span className="feature-text">Workflow Management</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-dot"></span>
                    <span className="feature-text">AI-Powered Insights</span>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <a 
                    href="https://smartlaunch.brandgoto.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="smartlaunch-button"
                  >
                    🚀 Launch SmartLaunch Platform
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="text-center mb-8" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>Our</span>
                  <span>Process</span>
                </motion.h2>
                <motion.p className="h__txt max-w-2xl mx-auto mt-4" variants={fadeInUp}>
                  A proven methodology that transforms ideas into successful digital solutions
                </motion.p>
              </motion.div>
              
              <div className="fancy-process-grid">
                <motion.div className="fancy-process-step" variants={fadeInUp}>
                  <div className="process-step-header">
                    <div className="step-number-circle">
                      <span className="step-number">01</span>
                    </div>
                    <div className="step-connector"></div>
                  </div>
                  <div className="process-content">
                    <h3 className="process-title">Discovery & Research</h3>
                    <p className="process-description">We dive deep into your business, goals, and audience to understand what success looks like. This includes competitor analysis, market research, and defining your unique value proposition.</p>
                    <div className="process-features">
                      <div className="process-feature">
                        <span className="feature-icon">🔍</span>
                        <span>Market Analysis</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">🎯</span>
                        <span>Goal Setting</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">📊</span>
                        <span>Competitor Research</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="fancy-process-step" variants={fadeInUp}>
                  <div className="process-step-header">
                    <div className="step-number-circle">
                      <span className="step-number">02</span>
                    </div>
                    <div className="step-connector"></div>
                  </div>
                  <div className="process-content">
                    <h3 className="process-title">Strategy & Planning</h3>
                    <p className="process-description">We create a clear roadmap and strategy that aligns with your business objectives. This phase includes defining project scope, timelines, and success metrics to ensure we deliver exactly what you need.</p>
                    <div className="process-features">
                      <div className="process-feature">
                        <span className="feature-icon">📋</span>
                        <span>Project Scope</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">⏱️</span>
                        <span>Timeline Planning</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">📈</span>
                        <span>Success Metrics</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="fancy-process-step" variants={fadeInUp}>
                  <div className="process-step-header">
                    <div className="step-number-circle">
                      <span className="step-number">03</span>
                    </div>
                    <div className="step-connector"></div>
                  </div>
                  <div className="process-content">
                    <h3 className="process-title">Design & Development</h3>
                    <p className="process-description">We bring your vision to life with clean design and solid technology. Our team works collaboratively to create solutions that are both beautiful and functional, with regular check-ins to ensure we're on track.</p>
                    <div className="process-features">
                      <div className="process-feature">
                        <span className="feature-icon">🎨</span>
                        <span>UI/UX Design</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">💻</span>
                        <span>Development</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">🔄</span>
                        <span>Iteration</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="fancy-process-step" variants={fadeInUp}>
                  <div className="process-step-header">
                    <div className="step-number-circle">
                      <span className="step-number">04</span>
                    </div>
                  </div>
                  <div className="process-content">
                    <h3 className="process-title">Launch & Growth</h3>
                    <p className="process-description">We launch with confidence and continue optimizing for growth. Post-launch, we provide ongoing support, analytics monitoring, and optimization recommendations to help your business scale.</p>
                    <div className="process-features">
                      <div className="process-feature">
                        <span className="feature-icon">🚀</span>
                        <span>Launch</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">📊</span>
                        <span>Analytics</span>
                      </div>
                      <div className="process-feature">
                        <span className="feature-icon">📈</span>
                        <span>Optimization</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default HowWeHelp;

// Add responsive grid styles
const gridStyles = `
  .services-grid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  
  @media (min-width: 640px) {
    .services-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  
  @media (min-width: 1024px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = gridStyles;
  document.head.appendChild(styleElement);
}
