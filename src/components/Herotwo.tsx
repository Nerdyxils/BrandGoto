import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Imgcon from '../assets/Brand-conversion.png.webp';
import Imgcor from '../assets/Brand-core.png.webp';
import Imgdat from '../assets/Brand-data.png.webp';
import './Herotwo.css';

const Herotwo: React.FC = () => {
  const ref = useRef(null);

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

  const cardData = [
  {
    title: 'Strategic Brand Identity Conversion',
    image: <img src={Imgcon} alt='Strategic Brand Identity Conversion' width="339" height="320" loading="lazy" decoding="async" />,
  },
  {
    title: 'Multi-Channel Brand Core',
    image: <img src={Imgcor} alt='Multi-Channel Brand Core' width="339" height="320" loading="lazy" decoding="async" />,
  },
  {
    title: 'Data-Driven Brand Tracking',
    image: <img src={Imgdat} alt='Data-Driven Brand Tracking' width="340" height="320" loading="lazy" decoding="async" />,
  },
];

  return (
    <motion.div className="herotwo-container">
      <section
        ref={ref}
        className="relative bg-black text-white px-4 sm:px-8 pt-6 pb-10 herotwo-bg"
      >
        <div className="mx-auto">
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
              className="section-description"
              variants={fadeInUp}
            >
              Your brand should clarify value and make the next step obvious online.
            </motion.p>
          </motion.div>
        </div>
        <section className="features-section">
          <motion.div 
            className="features-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
