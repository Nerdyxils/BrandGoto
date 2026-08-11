import React from 'react';
import { motion } from 'framer-motion';
import TechTicker from '../components/TechTicker';
import YouTubeVideo from '../components/YouTubeVideo';
import SEO from '../components/SEO';
import FAQ, { FAQItem } from '../components/FAQ';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/FAQ.css';
import '../components/ContactSection.css';
import { seoConfig } from '../seo/seoConfig';
import FaIcon from '../components/FaIcon';
import { ExternalLinkButton } from '../components/ui/Button';

const Engineering: React.FC = () => {
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
      question: 'How does the Fractional CTO & Engineering Retainer work?',
      answer: 'The Lead Architect handles technical strategy, architecture, and roadmap decisions while the engineering team supports implementation, delivery, and ongoing iteration.',
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'We are experts across the full stack: frontend (Webflow, Next.js, React, Vue.js, TypeScript), backend (Node.js, Python, Django, FastAPI), cloud infrastructure (AWS, Docker, Kubernetes), databases (PostgreSQL, MongoDB, Redis), AI/ML (OpenAI, LangChain, custom LLM integrations), and complex API integrations. We bridge the gap between design and deep technology.',
    },
  ];

  return (
    <div className="scroll-container bg-black">
      <SEO {...seoConfig.engineering} />
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
              <motion.span className="section-subtitle" variants={fadeInUp}>
                Fractional CTO & Engineering Retainer
              </motion.span>
              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>For</span>
                <span>Growing</span>
                <span>Teams</span>
              </motion.h1>
              <motion.p className="section-description" variants={fadeInUp}>
                Recurring technical leadership and engineering delivery for venture-scale startups, including architecture, implementation, AI-Ops, and workflow automation.
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
                    icon: <FaIcon name="user-tie" className="text-4xl text-[#F75F0B]" />,
                    title: 'Fractional CTO & Engineering Retainer',
                    desc: 'Strategic roadmapping, architecture, and engineering delivery without full-time executive overhead.',
                    features: ['Technical Strategy', 'Architecture Design', 'Team Leadership']
                  },
                  {
                    icon: <FaIcon name="laptop-code" className="text-4xl text-[#2FA0B5]" />,
                    title: 'Custom Development',
                    desc: 'Scaling web applications and complex API integrations. Build robust, scalable solutions that grow with your business.',
                    features: ['Full-Stack Development', 'API Integration', 'System Scaling']
                  },
                  {
                    icon: <FaIcon name="robot" className="text-4xl text-[#F75F0B]" />,
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
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-medium uppercase tracking-wider">
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

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8">
                {/* Video Container (60%) */}
                <div className="video-container video-container--custom">
                  <YouTubeVideo
                    videoId="_-w6CPPE7Qs"
                    title="AI Lead Workflow Technical Walkthrough"
                    accent="teal"
                  />
                </div>

                {/* System Logic Map (40%) */}
                <div className="system-logic-container">
                  <h3 className="system-logic-title">System Logic</h3>
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
                          <FaIcon name={step.icon} />
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
                  { value: 'Automated', label: 'Lead Response' },
                  { value: 'Resilient', label: 'Infrastructure' },
                  { value: 'Continuous', label: 'Workflow Operation' },
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
                      <FaIcon name={tech.iconClass} className="text-2xl text-white/80" />
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
                Discuss whether a Fractional CTO & Engineering Retainer fits your technical roadmap and delivery needs.
              </p>
              <ExternalLinkButton
                href="https://calendar.app.google/uCcmuLDGudKtHW9V8"
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#023942] border border-[#CFF8FF] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#CFF8FF] hover:text-[#023942] transition-all"
              >
                Strategic GTM Audit
              </ExternalLinkButton>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Engineering;
