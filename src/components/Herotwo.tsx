import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Imgcon from '../assets/Brand-conversion.png.png';
import Imgcor from '../assets/Brand-core.png.png';
import Imgdat from '../assets/Brand-data.png.png';
import './Herotwo.css';

const Herotwo: React.FC = () => {
  // Define animation variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the children animations
      },
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

  // Set up animation controls and viewport detection
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' }); // Trigger when section is 100px from bottom of viewport

  // Trigger animation when the section comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const cardData = [
  {
    title: 'Strategic Brand Identity Conversion',
    image: <img src={Imgcon} alt='Strategic Brand Identity Conversion '/>,
  },
  {
    title: 'Multi-Channel Brand Core',
    image: <img src={Imgcor} alt='Multi-Channel Brand Core '/>,
  },
  {
    title: 'Data-Driven Brand Tracking',
    image: <img src={Imgdat} alt='Data-Driven Brand Tracking'/>,
  },
];

  return (
    <motion.div className="herotwo-container">
      <section
        ref={ref} // Attach the ref to the section for viewport detection
        className="relative container bg-black text-white px-4 sm:px-8 pt-6 pb-10 herotwo-bg"
      >
        <div className=" mx-auto">
          {/* Hero Text */}
          <motion.div
            className="hero-txt text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls} // Use animation controls tied to viewport
          >
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={textVariants}
            >
              First impressions matter more than ever
            </motion.span>

            <motion.h1 className="herotwo-heading" variants={textVariants}>
              <span>Craft,</span>
              <span>Unify,</span>
              <span>and</span>
              <span>Amplify</span>
              <span>Your</span>
              <span>Brand</span>
            </motion.h1>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300"
              variants={textVariants}
            >
              Your brand deserves the spotlight — we make sure it steals the show online.
            </motion.p>
          </motion.div>
        </div>
        <section className="features-section">
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            >
            {cardData.map((card, index) => (
              <motion.div key={index} 
                className="feature-card"   
                variants={textVariants}
                >
                <div className="feature-image">
                  {card.image}
                </div>
                <p className="feature-title">{card.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </section>

    </motion.div>
  );
};

export default Herotwo;