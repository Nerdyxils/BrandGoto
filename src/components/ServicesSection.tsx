import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Imgwd from '../assets/WebDev.png';
import Imgdm from '../assets/Domain.png';
import Imgdigm from '../assets/DigitalM.png';
import Imggd from '../assets/Graph.png';
import Imgcd from '../assets/Creative.png';
import Imgbi from '../assets/BIdentity.png';
import Imgmk from '../assets/Frame-icons.png';
// You'll need a mobile app icon - suggest adding: import ImgApp from '../assets/MobileApp.png';
import './ServicesSection.css';

const ServicesSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const services = [
    {
      icon: <img src={Imgwd} alt='Website Design & Development' />,
      title: 'Website Design & Development',
      description: 'Websites that convert. Clean, fast, mobile-first.',
    },
    {
      icon: <img src={Imgwd} alt='Mobile App Development' />, // Replace with ImgApp when you add the icon
      title: 'Mobile App Development',
      description: 'iOS & Android apps that customers love.',
    },
    {
      icon: <img src={Imgbi} alt='Brand Identity & Logo Design' />,
      title: 'Brand Identity & Logo Design',
      description: 'Memorable brands that stand out and stick.',
    },
    {
      icon: <img src={Imgcd} alt='Creative Direction & Strategy' />,
      title: 'Creative Direction & Strategy',
      description: 'Clear direction from scattered ideas.',
    },
    {
      icon: <img src={Imgdigm} alt='Digital Marketing & Growth' />,
      title: 'Digital Marketing & Growth',
      description: 'Marketing that actually gets results.',
    },
    {
      icon: <img src={Imggd} alt='Graphic Design & Visual Content' />,
      title: 'Graphic Design & Visual Content',
      description: 'Eye-catching visuals that stop the scroll.',
    },
    {
      icon: <img src={Imgdm} alt='Technical Setup & Infrastructure' />,
      title: 'Technical Setup & Infrastructure',
      description: 'All the techy stuff handled for you.',
    },
  ];

  return (
    <motion.div className="services-container">
      <section
        ref={ref}
        className="relative min-h-screen bg-black text-white px-4 sm:px-8 pt-6 pb-10 services_sec"
      >
        <div className="container mx-auto">
          {/* Hero Text */}
          <motion.div
            className="hero-txt text-center max-w-4xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={textVariants}
            >
              Complete Digital Solutions
            </motion.span>

            <motion.h1 className="herotwo-heading" variants={textVariants}>
              <span>From</span>
              <span>Idea</span>
              <span>to</span>
              <span>Empire</span>
              <span>—</span>
              <span>BrandGoto</span>
              <span>Powers</span>
              <span>Growth</span>
            </motion.h1>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
              variants={textVariants}
            >
              Your one-stop creative partner. From startup idea to scaling business—we handle the creative and tech so you can focus on growth.
            </motion.p>
          </motion.div>

          <motion.div
            className="services-grid mt-12"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-[#131313] card-hover text-left gap-3 items-start"
                variants={textVariants}
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
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Highlight Cards */}
          <motion.div
            className="highlight-cards"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
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
                variants={textVariants}
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
    </motion.div>
  );
};

export default ServicesSection;