import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Imgwd from '../assets/WebDev.webp';
import Imgdm from '../assets/Domain.webp';
import Imgdigm from '../assets/DigitalM.webp';
import Imggd from '../assets/Graph.webp';
import Imgcd from '../assets/Creative.webp';
import Imgbi from '../assets/BIdentity.webp';
import Imgmk from '../assets/Frame-icons.webp';
// You'll need a mobile app icon - suggest adding: import ImgApp from '../assets/MobileApp.webp';
import './ServicesSection.css';
import FaIcon from './FaIcon';
import { LinkButton } from './ui/Button';

const ServicesSection: React.FC = () => {
  const ref = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const services = [
    {
      icon: <img src={Imgwd} alt='Website Design & Development' width="31" height="31" />,
      title: 'Website Design & Development',
      description: 'Websites that convert. Clean, fast, mobile-first with AI-ready infrastructure.',
    },
    {
      icon: <img src={Imgwd} alt='Mobile App Development' width="31" height="31" />, // Replace with ImgApp when you add the icon
      title: 'Mobile App Development',
      description: 'iOS & Android apps that customers love.',
    },
    {
      icon: <img src={Imgbi} alt='Brand Identity & Logo Design' width="31" height="30" />,
      title: 'Brand Identity & Logo Design',
      description: 'Memorable brands that stand out and stick.',
    },
    {
      icon: <img src={Imgcd} alt='Creative Direction & Strategy' width="31" height="30" />,
      title: 'Creative Direction & Strategy',
      description: 'Clear direction from scattered ideas.',
    },
    {
      icon: <img src={Imgdigm} alt='Digital Marketing & Growth' width="31" height="30" />,
      title: 'Digital Marketing & Growth',
      description: 'Marketing that actually gets results with AI-assisted targeting and optimization.',
    },
    {
      icon: <img src={Imggd} alt='Graphic Design & Visual Content' width="31" height="31" />,
      title: 'Graphic Design & Visual Content',
      description: 'Eye-catching visuals that stop the scroll.',
    },
    {
      icon: <img src={Imgdm} alt='Technical Setup & Infrastructure' width="31" height="31" />,
      title: 'Technical Setup & Infrastructure',
      description: 'Technical setup, infrastructure, AI integrations, and automation managed as one growth stack.',
    },
    {
      icon: <img src={Imgmk} alt='AI Integrations & Systems' width="22" height="22" />,
      title: 'AI Integrations & Systems',
      description: 'LLM-powered workflows, AI assistants, and automation that remove manual friction.',
    },
  ];

  return (
    <motion.div className="services-container">
      <section
        ref={ref}
        className="relative bg-black text-white section-standard services_sec"
      >
        <div className="container mx-auto">
          {/* Hero Text */}
          <motion.div
            className="section-header"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.span
              className="section-subtitle"
              variants={fadeInUp}
            >
              GTM Infrastructure
            </motion.span>

            <motion.h2 className="herotwo-heading" variants={fadeInUp}>
              <span>From</span>
              <span>Idea</span>
              <span>to</span>
              <span>Infrastructure</span>
              <span>—</span>
              <span>BrandGoto</span>
              <span>Powers</span>
              <span>Growth</span>
            </motion.h2>

            <motion.p
              className="section-description"
              variants={fadeInUp}
            >
              GTM Infrastructure unifies brand, performance web, and AI-enabled operations so each layer supports growth.
            </motion.p>

            <motion.p className="text-sm text-gray-400 mt-4" variants={fadeInUp}>
              Explore our GTM (Go-to-Market) Infrastructure on the{' '}
              <Link to="/launchpad" onClick={scrollToTop} className="text-[#F75F0B] hover:text-[#ff8555] underline">
                14-Day Launchpad
              </Link>{' '}
              and scale with{' '}
              <Link to="/engineering" onClick={scrollToTop} className="text-[#2FA0B5] hover:text-[#3fb8d0] underline">
                Fractional CTO &amp; Engineering Retainer
              </Link>
              .
            </motion.p>
          </motion.div>

          <motion.div
            className="services-grid mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
                    <h3 className="font-semibold text-sm md:text-base text-white mb-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p_text">
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Highlight Cards */}
          <motion.div
            className="highlight-cards"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                title: 'Strategic Alignment',
                description:
                  'Deep collaboration focused on technical architecture and creative solutions that exceed venture-scale expectations.',
                points: ['Asynchronous Lead Management', 'Architecture Roadmapping', 'Real-Time Deployment Tracking'],
                color: 'bg-yellow',
                borderColor: 'border-lime-dark',
                iconColor: '#F75F0B',
              },
              {
                title: 'Technical Architecture',
                description:
                  'A maintainable foundation with investor-ready infrastructure, secure deployment, and a clear path for continued engineering.',
                points: ['Enterprise Domain Governance', 'Hardened Cloud Infrastructure', 'System Integrity & Scaling'],
                color: 'bg-purple',
                borderColor: 'border-purple-dark',
                iconColor: '#2FA0B5',
              },
              {
                title: 'Performance Engineering',
                description:
                  'Scale smarter with predictive data strategies and iterative conversion tuning for sustainable, ongoing growth.',
                points: ['Predictive Data Modeling', 'Iterative Conversion Tuning', 'Venture-Scale Growth Strategy'],
                color: 'bg-blue',
                borderColor: 'border-blue-dark',
                iconColor: '#F75F0B',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className={`highlight-card ${card.color}`}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="highlight-title">{card.title}</h3>
                <p className="highlight-description">{card.description}</p>
                <div className="out__inner">
                  <div className={`inner_points ${card.borderColor}`}>
                    <ul className="highlight-points">
                      {card.points.map((point, idx) => (
                        <li key={idx} className="pill-icon-wrapper">
                          <FaIcon name="check" style={{ color: card.iconColor }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="cta-buttons-container"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex justify-center items-center"
              variants={fadeInUp}
            >
              <LinkButton to="/book-consultation" onClick={scrollToTop} className="cta-btn-primary w-full sm:w-auto">
                Let's Build Something Amazing
              </LinkButton>
              <LinkButton to="/how-we-help" onClick={scrollToTop} className="cta-btn-secondary w-full sm:w-auto">
                See What We Can Do
              </LinkButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesSection;
