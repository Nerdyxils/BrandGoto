import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import TechTicker from '../components/TechTicker';
import SEO from '../components/SEO';
import FAQ, { FAQItem } from '../components/FAQ';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/FAQ.css';
import '../components/ContactSection.css';
import { seoConfig } from '../seo/seoConfig';

const Engineering: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  const scalableTech = [
    { name: 'React', iconClass: 'fa-brands fa-react' },
    { name: 'Node.js', iconClass: 'fa-brands fa-node-js' },
    { name: 'Python', iconClass: 'fa-brands fa-python' },
    { name: 'AWS', iconClass: 'fa-brands fa-aws' },
    { name: 'Docker', iconClass: 'fa-brands fa-docker' },
    { name: 'Kubernetes', iconClass: 'fa-brands fa-kubernetes' },
    { name: 'GitHub', iconClass: 'fa-brands fa-github' },
    { name: 'GitLab', iconClass: 'fa-brands fa-gitlab' },
    { name: 'Jira', iconClass: 'fa-brands fa-jira' },
    { name: 'Slack', iconClass: 'fa-brands fa-slack' },
    { name: 'Figma', iconClass: 'fa-brands fa-figma' },
    { name: 'Stripe', iconClass: 'fa-brands fa-stripe' },
    { name: 'OpenAI', iconClass: 'fa-brands fa-openai' },
    { name: 'PostgreSQL', iconClass: 'fa-solid fa-database' },
    { name: 'MongoDB', iconClass: 'fa-solid fa-database' },
    { name: 'CI/CD', iconClass: 'fa-solid fa-code-branch' },
  ];

  const faqItems: FAQItem[] = [
    {
      question: 'What is a Fractional CTO?',
      answer: 'A Fractional CTO is a strategic technical partner who handles your architecture, technical roadmap, and engineering management at a fraction of the cost of a full-time executive hire.',
    },
    {
      question: 'How does the US-Strategic / European-Engineering model work?',
      answer: 'Our Lead Architect handles high-level strategy and architecture to ensure alignment with North American markets, while our elite European engineering team provides 24/7 technical execution and delivery.',
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'We are experts across the full stack: frontend (Webflow, Next.js, React, Vue.js, TypeScript), backend (Node.js, Python, Django, FastAPI), cloud infrastructure (AWS, Docker, Kubernetes), databases (PostgreSQL, MongoDB, Redis), AI/ML (OpenAI, LangChain, custom LLM integrations), and complex API integrations. We bridge the gap between design and deep technology.',
    },
  ];

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.engineering} />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />
      <div className="main-content">
        {/* Hero Section */}
        <section className="hero-section section-standard">
          <div className="hero-background" />
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="visible"
              animate="visible"
            >
              <h1 className="sr-only">
                Fractional CTO & High-End Engineering Studio | Brandgoto
              </h1>
              <motion.span className="section-subtitle" variants={fadeInUp}>
                High-Performance Engineering
              </motion.span>
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>For</span>
                <span>Growing</span>
                <span>Teams</span>
              </motion.h2>
              <motion.p className="section-description" variants={fadeInUp}>
                Venture-backed startup partner delivering Fractional CTO Services, AI-Ops and Workflow Automation, and a Lead Architect + Engineering Team model that scales.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Ticker */}
        <TechTicker />

        {/* Services Grid */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>Our</span>
                  <span>Engineering</span>
                  <span>Services</span>
                </motion.h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: <i className="fas fa-user-tie text-4xl text-[#F75F0B]"></i>,
                    title: 'Fractional CTO',
                    desc: 'Fractional CTO Services with strategic roadmapping and architecture—senior leadership without full-time overhead.',
                    features: ['Technical Strategy', 'Architecture Design', 'Team Leadership']
                  },
                  {
                    icon: <i className="fas fa-laptop-code text-4xl text-[#2FA0B5]"></i>,
                    title: 'Custom Development',
                    desc: 'Scaling web applications and complex API integrations. Build robust, scalable solutions that grow with your business.',
                    features: ['Full-Stack Development', 'API Integration', 'System Scaling']
                  },
                  {
                    icon: <i className="fas fa-robot text-4xl text-[#F75F0B]"></i>,
                    title: 'AI Operations',
                    desc: 'AI-Ops and workflow automation using LLM systems to remove manual friction and accelerate execution.',
                    features: ['LLM Integration', 'Workflow Automation', 'AI-Powered Solutions']
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all"
                    variants={fadeInUp}
                  >
                    <div className="mb-6">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      {item.features.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wider">
                          <span className="w-1 h-1 bg-[#F75F0B] rounded-full"></span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Workflow Demo */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12" variants={fadeInUp}>
                <motion.span className="section-subtitle">AI Lead Engine</motion.span>
                <motion.h2 className="herotwo-heading">
                  <span>See</span>
                  <span>It</span>
                  <span>In</span>
                  <span>Action</span>
                </motion.h2>
                <motion.p className="section-description">
                  Watch how our AI Lead Workflow transforms form submissions into personalized, strategic responses in seconds.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
                {/* Video Container (60%) */}
                <div className="video-container">
                  <div className="video-wrapper" style={{ border: '1px solid #2FA0B5' }}>
                    <iframe
                      src="https://www.youtube.com/embed/_-w6CPPE7Qs"
                      title="AI Lead Workflow Technical Walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="video-iframe"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* System Logic Map (40%) */}
                <div className="system-logic-container">
                  <h4 className="system-logic-title">System Logic</h4>
                  <div className="system-logic-steps">
                    {[
                      {
                        icon: 'fa fa-wpforms',
                        label: 'Form Filled',
                        desc: 'Customer submits contact form',
                      },
                      {
                        icon: 'fa fa-bolt',
                        label: 'Trigger',
                        desc: 'Make.com activates the workflow',
                      },
                      {
                        icon: 'fab fa-hubspot',
                        label: 'HubSpot Sync',
                        desc: 'Lead created in HubSpot',
                      },
                      {
                        icon: 'fa fa-robot',
                        label: 'AI Personalization',
                        desc: 'GPT-4o generates a strategic response',
                      },
                      {
                        icon: 'fa fa-paper-plane',
                        label: 'Automated Delivery',
                        desc: 'Personalized email is delivered instantly',
                      },
                      {
                        icon: 'fa fa-bell',
                        label: 'Lead Alert',
                        desc: 'The team is notified for high-touch follow-up',
                      },
                    ].map((step, index) => (
                      <div key={index} className="system-logic-step">
                        <div className="step-icon-wrapper">
                          <i className={step.icon} aria-hidden="true" />
                        </div>
                        <div className="step-content">
                          <span className="step-label">{step.label}</span>
                          <span className="step-desc">{step.desc}</span>
                        </div>
                        {index < 5 && <div className="step-connector" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { value: '2.3s', label: 'Average Response Time' },
                  { value: '99.9%', label: 'Uptime' },
                  { value: '24/7', label: 'Automated Operation' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-6 border border-white/10 text-center"
                    variants={fadeInUp}
                  >
                    <div className="text-3xl font-bold text-[#2FA0B5] mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Scalable Tech Stack */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>Scalable</span>
                  <span>Tech</span>
                </motion.h2>
                <motion.p className="section-description" variants={fadeInUp}>
                  We build with technologies that scale. From startups to enterprise, our stack grows with you.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {scalableTech.map((tech, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-6 rounded-xl border border-white/10 text-center hover:border-[#2FA0B5] transition-all"
                    variants={fadeInUp}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <i className={`${tech.iconClass} text-2xl text-white/80`} aria-hidden="true" />
                      <span className="text-white font-bold text-xs md:text-sm uppercase tracking-tight">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <FAQ
                items={faqItems}
                subtitle="Common Questions"
                title="Frequently Asked Questions"
              />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="bg-[#111] border border-[#2FA0B5] rounded-2xl p-12 text-center"
              variants={fadeInUp}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Scale Your Engineering?</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Let's discuss how our Fractional CTO and Studio Retainers can accelerate your growth.
              </p>
              <Link to="/book-consultation">
                <button className="bg-[#2FA0B5] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3fb8d0] transition-all">
                  Explore Engineering Retainers
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Engineering;
