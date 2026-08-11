import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCarousel from '../components/ProjectCarousel';
import ProjectModal from '../components/ProjectModal';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/RecentProjects.css';
import { seoConfig } from '../seo/seoConfig';
import FaIcon from '../components/FaIcon';
import { caseStudyProjects as projects, toCarouselProject, type CarouselProject } from '../data/projectData';

const carouselProjects = projects.map(toCarouselProject);

const ThingsWeBuilt: React.FC = () => {
  const [activeProject, setActiveProject] = useState<CarouselProject | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  
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

  const handleProjectClick = (project: CarouselProject, element: HTMLElement) => {
    setTriggerElement(element);
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    setTriggerElement(null);
  };

  return (
    <div className="scroll-container">
      <SEO {...seoConfig.thingsWeBuilt} />
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
                Every project follows our results-first methodology: Problem → Infrastructure → Impact. See how we address technical debt and deliver investor-ready assets.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Results-First Methodology */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              className="section-header mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Results-First</span>
                <span>Methodology</span>
              </motion.h2>
              <motion.p className="section-description" variants={fadeInUp}>
                Every project follows a proven framework: identify the problem, build the infrastructure, measure the impact.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Problem',
                  desc: 'We identify the core business challenge—not just symptoms, but root causes that limit growth.',
                  icon: 'fa-search',
                  color: '#F75F0B'
                },
                {
                  step: '02',
                  title: 'Infrastructure',
                  desc: 'We architect scalable solutions that address technical debt and support value over time.',
                  icon: 'fa-sitemap',
                  color: '#2FA0B5'
                },
                {
                  step: '03',
                  title: 'Impact',
                  desc: 'We measure success by business outcomes: clearer launches, maintainable foundations, and measurable growth.',
                  icon: 'fa-chart-line',
                  color: '#F75F0B'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#111] p-6 rounded-xl border border-white/10"
                  variants={fadeInUp}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                      <FaIcon name={item.icon} style={{ color: item.color }} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 font-semibold">{item.step}</span>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
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
            </motion.div>
            
            <ProjectCarousel
              projects={carouselProjects}
              onCardClick={handleProjectClick}
              theme="dark"
            />
            {activeProject && (
              <ProjectModal
                project={activeProject}
                onClose={handleCloseProject}
                triggerElement={triggerElement}
              />
            )}
          </div>
        </section>

        {/* Featured Project Deep Dive - CoinVers */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Full-width Image */}
              <motion.div className="mb-12" variants={fadeInUp}>
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src="/images/projectB.webp" 
                    alt="CoinVers Cryptocurrency Tracking Platform" 
                    width="983"
                    height="684"
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Metrics Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-6 border-t border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#F75F0B] mb-1">Real-time</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Price Updates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#2FA0B5] mb-1">Real-time</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">WebSocket Updates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">Unified</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Portfolio View</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Strategic Breakdown */}
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="exclamation-triangle" className="text-[#F75F0B]" />
                    <h3 className="font-bold text-white">Problem</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Fragmented cryptocurrency data across multiple platforms making portfolio tracking inefficient and decision-making slow. Users struggled with delayed price updates and lacked a unified view of their investments.</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-[#2FA0B5]">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="sitemap" className="text-[#2FA0B5]" />
                    <h3 className="font-bold text-white">Infrastructure</h3>
                  </div>
                  <p className="text-gray-300 text-sm">React frontend with Django REST Framework backend, real-time WebSocket connections for live price updates, interactive charts via Chart.js, third-party API integration for cryptocurrency data, and secure portfolio tracking with user authentication.</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="chart-line" className="text-[#F75F0B]" />
                    <h3 className="font-bold text-white">Impact</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Unified portfolio view that reduces reliance on multiple platforms, with real-time updates, interactive charts, and an architecture designed to evolve with product demand.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Technical Case Study - OddLogic */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-10" variants={fadeInUp}>
                <motion.span className="section-subtitle">Technical Case Study</motion.span>
                <motion.h2 className="herotwo-heading">
                  <span>OddLogic</span>
                  <span>Predictive</span>
                  <span>Engine</span>
                </motion.h2>
                <motion.p className="section-description">
                  How we architected a high-performance predictive engine for OddLogic.
                </motion.p>
              </motion.div>

              <motion.div className="mb-8" variants={fadeInUp}>
                <div className="relative rounded-xl overflow-hidden border border-[#2FA0B5]">
                  <picture>
                    <source type="image/avif" srcSet="/images/oddlogic-480.avif 480w, /images/oddlogic-960.avif 960w" sizes="(max-width: 768px) 100vw, 960px" />
                    <img
                      src="/images/oddlogic-960.webp"
                      alt="OddLogic predictive engine technical case study dashboard"
                      width="960"
                      height="466"
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={fadeInUp}>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="database" className="text-[#F75F0B]" />
                    <h3 className="font-bold text-white">Data Architecture</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    We engineered a robust ingestion layer for real-time sports data feeds, validating and routing events through a low-latency pipeline that keeps predictions current under continuous load.
                  </p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-[#2FA0B5]">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="sitemap" className="text-[#2FA0B5]" />
                    <h3 className="font-bold text-white">Algorithm Logic</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    We mapped transparent system logic across ingestion, feature scoring, prediction generation, and confidence routing so teams can audit outputs and improve model decisions over time.
                  </p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <FaIcon name="chart-line" className="text-[#F75F0B]" />
                    <h3 className="font-bold text-white">Scalability</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    The infrastructure is built for venture-scale traffic with resilient services, horizontal scaling paths, and performance safeguards that keep response times stable during peak demand.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Infrastructure Gallery */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12" variants={fadeInUp}>
                <motion.h2 className="herotwo-heading">
                  <span>Inside</span>
                  <span>the</span>
                  <span>Engine</span>
                </motion.h2>
                <motion.p className="section-description">
                  Beyond the UI—see the infrastructure that powers growth: CRM setups, automation workflows, and AI systems.
                </motion.p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'HubSpot CRM Integration',
                    desc: 'Custom property mapping, automated lead scoring, and pipeline management.',
                    icon: 'fa-hubspot',
                    color: '#2FA0B5'
                  },
                  {
                    title: 'Make.com Workflows',
                    desc: 'AI-powered lead routing, automated email sequences, and CRM sync automation.',
                    icon: 'fa-bolt',
                    color: '#F75F0B'
                  },
                  {
                    title: 'AI Lead Workflows',
                    desc: 'GPT-4o powered personalization, instant response systems, and intelligent routing.',
                    icon: 'fa-robot',
                    color: '#2FA0B5'
                  },
                  {
                    title: 'Technical Documentation',
                    desc: 'Investor-ready architecture docs, API documentation, and deployment guides.',
                    icon: 'fa-file-code',
                    color: '#F75F0B'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-[#111] p-6 rounded-xl border border-white/10 hover:border-opacity-50 transition-all"
                    style={{ borderColor: `${item.color}40` }}
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <FaIcon name={item.icon} style={{ color: item.color }} />
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Studio Stats Banner */}
        <section className="section-standard bg-[#0a0a0a] border-t border-b border-white/10">
          <div className="container">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">Integrated</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Brand, Web &amp; Systems</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#2FA0B5] mb-2">Focused</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Delivery</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">Maintainable</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Technical Foundation</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">Remote</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Collaboration</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sophisticated CTAs */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className="bg-[#111] p-8 rounded-xl border border-[#F75F0B] text-center hover:bg-[#F75F0B]/5 transition-all"
                variants={fadeInUp}
              >
                <FaIcon name="rocket" className="text-4xl text-[#F75F0B] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">14-Day Launchpad</h3>
                <p className="text-gray-400 mb-6 text-sm">Productized GTM Infrastructure for an investor-ready launch.</p>
                <Link
                  to="/launchpad"
                  className="inline-block bg-[#F75F0B] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all"
                >
                  View 14-Day Launchpad
                </Link>
              </motion.div>

              <motion.div
                className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5] text-center hover:bg-[#2FA0B5]/5 transition-all"
                variants={fadeInUp}
              >
                <FaIcon name="code-branch" className="text-4xl text-[#2FA0B5] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Discuss Technical Architecture</h3>
                <p className="text-gray-400 mb-6 text-sm">Ongoing technical leadership and engineering delivery.</p>
                <Link
                  to="/engineering"
                  className="inline-block bg-[#023942] border border-[#CFF8FF] text-[#CFF8FF] px-8 py-3 rounded-lg font-bold hover:bg-[#CFF8FF] hover:text-[#023942] transition-all"
                >
                  View Fractional CTO &amp; Engineering Retainer
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
      </motion.div>
    </div>
  );
};

export default ThingsWeBuilt;
