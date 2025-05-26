import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Imgwd from '../assets/WebDev.png';
import Imgdm from '../assets/Domain.png';
import Imgdigm from '../assets/DigitalM.png';
import Imggd from '../assets/Graph.png';
import Imgcd from '../assets/Creative.png';
import Imgbi from '../assets/BIdentity.png';
import Imgmk from '../assets/Frame-icons.png';
import './ServicesSection.css';
// import { i, type image } from 'framer-motion/client';

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
      icon: <img src={Imgwd} alt='Website Design & Development '/>,
      title: 'Website Design & Development',
      description: 'We create clean, modern websites that do more than just look good—they work.',
    },
    {
      icon: <img src={Imgdm} alt='Domain & Business Email Setup '/>,
      title: 'Domain & Business Email Setup',
      description: 'Get found online and look professional. We take care of the techy stuff.',
    },
    {
      icon: <img src={Imgdigm} alt='Digital Marketing '/>,
      title: 'Digital Marketing',
      description: 'We help you show up where it matters.',
    },
    {
      icon: <img src={Imggd} alt='Graphic Design'/>,
      title: 'Graphic Design',
      description: 'Need flyers, social posts, or something totally custom? Design keeps brand.',
    },
    {
      icon: <img src={Imgcd} alt='Creative Direction & Strategy '/>,
      title: 'Creative Direction & Strategy',
      description: 'Not sure what your brand needs? We’ll help you figure it out.',
    },
    {
      icon: <img src={Imgbi} alt='Brand Identity & Logo Design '/>,
      title: 'Brand Identity & Logo Design',
      description: 'Your brand is more than a logo—it’s how people remember you.',
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
            className="hero-txt text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={textVariants}
            >
              How We Help
            </motion.span>

            <motion.h1 className="herotwo-heading" variants={textVariants}>
              <span>From</span>
              <span>Vision</span>
              <span>to</span>
              <span>Launch</span>
              <span>—</span>
              <span>Brandgoto</span>
              <span>Got</span>
              <span>You</span>
            </motion.h1>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300"
              variants={textVariants}
            >
              We offer creative and digital services that are tailored to help you look your best
              online and off. Here’s what we do best.
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
                className="p-4 rounded-lg bg-[#131313] card-hover text-left  gap-3 items-start"
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
                title: 'Customer Service',
                description:
                  'Exceptional support to bring your vision to life with personalized care, timely updates, and creative solutions every step of the way!',
                points: ['Enhance Proactive Communication', 'Strengthen Client Collaboration', 'Provide Client Education and Resources'],
                color: 'bg-yellow',
                ocolor: 'bg-lyellow',
              },
              {
                title: 'Business Email Setup',
                description:
                  'Set up seamless, branded email solutions to communicate with confidence and elevate your business presence effortlessly',
                points: ['Domain Setup', 'Business Email Setup', 'Secure and Techy stuff'],
                color: 'bg-purple',
                ocolor: 'bg-lpurple',
              },
              {
                title: 'Client Communication',
                description:
                  'Partner with us to create bold digital campaigns that engage your audience, boost visibility, and drive results with seamless collaboration',
                points: ['Co-Creation of Targeted Campaigns', 'Real-Time Feedback and Iteration', 'Transparent Performance Insights'],
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
