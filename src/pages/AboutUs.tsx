import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import YouTubeVideo from '../components/YouTubeVideo';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Herotwo.css';
import { seoConfig } from '../seo/seoConfig';
import '../components/RecentProjects.css';

const AboutUs: React.FC = () => {
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

  return (
    <div className="scroll-container">
      <SEO {...seoConfig.aboutUs} />
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
                About BrandGoto
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Creative</span>
                <span>Meets</span>
                <span>Tech</span>
                <span>—</span>
                <span>Built</span>
                <span>for</span>
                <span>Growth</span>
              </motion.h1>

              <motion.p className="section-description text-lg" variants={fadeInUp}>
                We bridge the gap between visionary brand strategy and high-performance technical execution for North American founders.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Global Engine Section */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>The</span>
                  <span>Global</span>
                  <span>Engine</span>
                </motion.h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strategy Column */}
                <motion.div className="bg-[#111] p-8 rounded-xl border border-[#F75F0B]" variants={fadeInUp}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#F75F0B] rounded-lg flex items-center justify-center">
                      <i className="fas fa-chess text-white text-xl" aria-hidden="true"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white">US-Aligned Strategy & Architecture</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Our Lead Architect ensures every line of code serves a business growth goal. We don't build features—we build infrastructure that compounds value.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Strategic technical roadmapping</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Business-aligned architecture decisions</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#F75F0B] mt-1" aria-hidden="true"></i>
                      <span>Investor-ready technical documentation</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Execution Column */}
                <motion.div className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5]" variants={fadeInUp}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#2FA0B5] rounded-lg flex items-center justify-center">
                      <i className="fas fa-cogs text-white text-xl" aria-hidden="true"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white">European Engineering Excellence</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    An elite engineering team providing high-speed, 24/7 delivery cycles. We ship faster than traditional agencies while maintaining enterprise-grade quality.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>24/7 development cycles</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Enterprise-grade code quality</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <i className="fas fa-check text-[#2FA0B5] mt-1" aria-hidden="true"></i>
                      <span>Rapid iteration and deployment</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>The</span>
                  <span>Technical</span>
                  <span>Architect</span>
                </motion.h2>
              </motion.div>
              
              <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start" variants={fadeInUp}>
                <div className="space-y-6 lg:col-span-2">
                  <div className="bg-[#111] p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Silas — From Lone Wolf to Studio Lead</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      The transition from solo developer to studio founder wasn't just about scaling—it was about eliminating technical debt for startups at scale.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      With a track record of <span className="text-[#F75F0B] font-semibold">150+ solutions delivered</span>, the mission is clear: bridge the gap between visionary strategy and bulletproof execution.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111] p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-3xl font-bold text-[#F75F0B] mb-2">150+</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Solutions</div>
                    </div>
                    <div className="bg-[#111] p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-3xl font-bold text-[#2FA0B5] mb-2">100%</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Zero Debt</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[#2FA0B5] rounded-lg flex items-center justify-center">
                        <i className="fas fa-user-tie text-white text-2xl" aria-hidden="true"></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Technical Architect</h4>
                        <p className="text-gray-400 text-sm">Founder & Full Stack Developer</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      Every architecture decision is made with one question: <span className="text-white font-semibold">"Does this serve the business goal?"</span> Not just code—strategic infrastructure.
                    </p>
                  </div>
                  <div className="bg-[#111] rounded-xl border border-[#F75F0B] overflow-hidden">
                    <YouTubeVideo
                      videoId="w1CCEIsH8LY"
                      title="Not Most Agencies — Brandgoto Studio for Tier 3 Clients"
                      accent="orange"
                      aspectRatio="9:16"
                    />
                    <div className="p-4 border-t border-white/10">
                      <p className="text-sm text-gray-400">
                        We build for Tier 3 "Whale" clients who need technical leadership, not just task execution.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/book-consultation"
                    className="block w-full text-center bg-[#2FA0B5] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#3bb0c5] transition-all no-underline"
                  >
                    Request Strategic GTM Audit
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="section-standard bg-[#0a0a0a]">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header mb-12">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>Our</span>
                  <span>Process</span>
                </motion.h2>
              </motion.div>
              
              <div className="max-w-3xl mx-auto space-y-8">
                {[
                  {
                    step: '01',
                    title: 'Architecture',
                    desc: 'Mapping the GTM infrastructure. We analyze your business goals, technical requirements, and growth trajectory to design a scalable architecture that eliminates future technical debt.',
                    icon: 'fa-sitemap',
                    color: '#F75F0B'
                  },
                  {
                    step: '02',
                    title: 'Engineering',
                    desc: 'High-velocity building with Next.js/Webflow. Our European engineering team delivers enterprise-grade code at startup speed—3x faster than traditional agencies.',
                    icon: 'fa-code',
                    color: '#2FA0B5'
                  },
                  {
                    step: '03',
                    title: 'Automation',
                    desc: 'Deploying the AI-Ops layer for scale. We integrate custom AI workflows, CRM automation, and intelligent systems that remove manual friction and compound growth.',
                    icon: 'fa-robot',
                    color: '#F75F0B'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6 items-start"
                    variants={fadeInUp}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold" style={{ color: item.color }}>{item.step}</span>
                      </div>
                      {i < 2 && (
                        <div className="w-px h-16 bg-white/10 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-[#111] p-6 rounded-xl border border-white/10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                          <i className={`fas ${item.icon}`} style={{ color: item.color }} aria-hidden="true"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-standard">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div className="section-header">
                <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                  <span>Our</span>
                  <span>Values</span>
                </motion.h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-chart-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Results-Driven</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    Every design decision and line of code serves a business purpose. We measure success by growth, not just aesthetics.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-tachometer-alt text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Speed & Efficiency</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    We build fast, launch quickly, and optimize continuously. Time to market matters as much as quality.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <i className="fas fa-users text-white text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Partnership</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    We work as an extension of your team, not just a vendor. Your success is our success.
                  </p>
                </motion.div>
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
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">150+</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Solutions Delivered</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#2FA0B5] mb-2">3x</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Faster Delivery</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Success Rate</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">24/7</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Global Engineering</div>
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
                <i className="fas fa-rocket text-4xl text-[#F75F0B] mb-4" aria-hidden="true"></i>
                <h3 className="text-xl font-bold text-white mb-3">Start Your 14-Day Sprint</h3>
                <p className="text-gray-400 mb-6 text-sm">From idea to investor-ready infrastructure in 14 days.</p>
                <Link
                  to="/launchpad"
                  className="inline-block bg-[#F75F0B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all"
                >
                  View Launchpad
                </Link>
              </motion.div>

              <motion.div
                className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5] text-center hover:bg-[#2FA0B5]/5 transition-all"
                variants={fadeInUp}
              >
                <i className="fas fa-code-branch text-4xl text-[#2FA0B5] mb-4" aria-hidden="true"></i>
                <h3 className="text-xl font-bold text-white mb-3">Discuss Technical Architecture</h3>
                <p className="text-gray-400 mb-6 text-sm">Fractional CTO services and high-performance engineering.</p>
                <Link
                  to="/engineering"
                  className="inline-block bg-[#2FA0B5] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3bb0c5] transition-all"
                >
                  View Engineering
                </Link>
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

export default AboutUs;
