import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import YouTubeVideo from '../components/YouTubeVideo';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Herotwo.css';
import { seoConfig } from '../seo/seoConfig';
import '../components/RecentProjects.css';
import FaIcon from '../components/FaIcon';

const AboutUs: React.FC = () => {
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
                      <FaIcon name="chess" className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">US-Aligned Strategy & Architecture</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Our Lead Architect ensures every line of code serves a business growth goal. We don't build features—we build infrastructure that compounds value.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#F75F0B] mt-1" />
                      <span>Strategic technical roadmapping</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#F75F0B] mt-1" />
                      <span>Business-aligned architecture decisions</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#F75F0B] mt-1" />
                      <span>Investor-ready technical documentation</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Execution Column */}
                <motion.div className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5]" variants={fadeInUp}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#2FA0B5] rounded-lg flex items-center justify-center">
                      <FaIcon name="cogs" className="text-white text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Engineering Delivery</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    A remote-first engineering team supporting implementation, iteration, and maintainable technical delivery.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Structured development cycles</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
                      <span>Enterprise-grade code quality</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <FaIcon name="check" className="text-[#2FA0B5] mt-1" />
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
                      The transition from solo developer to studio founder wasn't just about scaling—it was about helping startups address technical debt with clearer architecture and delivery practices.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      The mission is clear: bridge the gap between visionary strategy and maintainable technical execution.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#111] p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-base sm:text-3xl font-bold text-[#F75F0B] mb-2">Integrated</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Delivery</div>
                    </div>
                    <div className="bg-[#111] p-4 rounded-lg border border-white/10 text-center">
                      <div className="text-base sm:text-3xl font-bold text-[#2FA0B5] mb-2">Maintainable</div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider">Foundations</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-[#111] p-8 rounded-xl border border-[#2FA0B5]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-[#2FA0B5] rounded-lg flex items-center justify-center">
                        <FaIcon name="user-tie" className="text-white text-2xl" />
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
                    Strategic GTM Audit
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
                    desc: 'Mapping the GTM infrastructure. We analyze your business goals, technical requirements, and growth trajectory to design a maintainable architecture that reduces technical-debt risk.',
                    icon: 'fa-sitemap',
                    color: '#F75F0B'
                  },
                  {
                    step: '02',
                    title: 'Engineering',
                    desc: 'Focused implementation with Next.js and Webflow, supported by maintainable engineering practices and clear delivery milestones.',
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
                          <FaIcon name={item.icon} style={{ color: item.color }} />
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
                    <FaIcon name="chart-line" className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Results-Driven</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    Every design decision and line of code serves a business purpose. We measure success by growth, not just aesthetics.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <FaIcon name="tachometer-alt" className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Speed & Efficiency</h3>
                  <p className="text-gray-400 leading-relaxed text-center">
                    We build fast, launch quickly, and optimize continuously. Time to market matters as much as quality.
                  </p>
                </motion.div>
                
                <motion.div className="bg-[#111] p-8 rounded-xl border border-white/10 hover:border-[#F75F0B] transition-all group" variants={fadeInUp}>
                  <div className="w-16 h-16 bg-[#F75F0B] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform mx-auto">
                    <FaIcon name="users" className="text-white text-2xl" />
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
                <div className="text-xl sm:text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">Integrated</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Brand, Web &amp; Systems</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-xl sm:text-3xl md:text-4xl font-bold text-[#2FA0B5] mb-2">Focused</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Delivery</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Maintainable</div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">Technical Foundation</div>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeInUp}>
                <div className="text-xl sm:text-3xl md:text-4xl font-bold text-[#F75F0B] mb-2">Remote</div>
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
                  className="inline-block bg-[#F75F0B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#ff8555] transition-all"
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
                  className="inline-block bg-[#2FA0B5] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#3bb0c5] transition-all"
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

export default AboutUs;
