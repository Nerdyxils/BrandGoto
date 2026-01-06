import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Imgcon from '../assets/Brand-conversion.png.png';
import Imgcor from '../assets/Brand-core.png.png';
import Imgdat from '../assets/Brand-data.png.png';
import './Herotwo.css';
import './SectionSpacing.css';

const Herotwo: React.FC = () => {
  const ref = useRef(null);

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
        ref={ref}
        className="relative container bg-black text-white px-4 sm:px-8 pt-6 pb-10 herotwo-bg"
      >
        <div className=" mx-auto">
          {/* Hero Text */}
          <motion.div
            className="hero-txt text-center max-w-3xl mx-auto mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={fadeInUp}
            >
              First impressions matter more than ever
            </motion.span>

            <motion.h2 className="herotwo-heading" variants={fadeInUp}>
              <span>Craft,</span>
              <span>Unify,</span>
              <span>and</span>
              <span>Amplify</span>
              <span>Your</span>
              <span>Brand</span>
            </motion.h2>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300"
              variants={fadeInUp}
            >
              Your brand deserves the spotlight — we make sure it steals the show online.
            </motion.p>
          </motion.div>
        </div>
        <section className="features-section">
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            >
            {cardData.map((card, index) => (
              <motion.div key={index} 
                className="feature-card"   
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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