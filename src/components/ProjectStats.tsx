import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Smile, Globe2 } from 'lucide-react';

const statData = [
  {
    icon: <Briefcase size={32} strokeWidth={2.2} className="stat-icon" />, 
    value: 40, 
    suffix: '+', 
    label: 'Projects Completed',
    accent: 'orange-glow',
    gradient: 'stat-gradient-orange',
  },
  {
    icon: <Smile size={32} strokeWidth={2.2} className="stat-icon" />, 
    value: 99, 
    suffix: '%', 
    label: 'Client Satisfaction',
    accent: 'teal-glow',
    gradient: 'stat-gradient-teal',
  },
  {
    icon: <Globe2 size={32} strokeWidth={2.2} className="stat-icon" />, 
    value: 32000000, 
    suffix: '+', 
    label: 'Digital Campaign Reach',
    accent: 'white-glow',
    gradient: 'stat-gradient-white',
  },
];

const ProjectStats: React.FC = () => {
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

  return (
    <motion.div className="project-stats-container">
      <section
        ref={ref}
        className="relative bg-black text-white px-4 sm:px-8 pt-6 pb-10 project-stats-section"
      >
        <div className="container mx-auto">
          {/* Hero Text */}
          <motion.div
            className="hero-txt text-center max-w-4xl mx-auto mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="sm__txt text-sm sm:text-base text-[#CFF8FF] block mb-3"
              variants={fadeInUp}
            >
              Things We've Built
            </motion.span>

            <motion.h2 className="herotwo-heading" variants={fadeInUp}>
              <span>Work</span>
              <span>That</span>
              <span>Speaks</span>
              <span>for</span>
              <span>Itself</span>
            </motion.h2>

            <motion.p
              className="h__txt text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Check out some of our favorite builds—from bold brands to sleek websites.
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="stats-grid mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statData.map((stat) => (
              <motion.div
                className={`premium-stat-card glass-card ${stat.accent} card-hover`}
                key={stat.label}
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="stat-icon-row">{stat.icon}</div>
                <span className={`premium-stat-number ${stat.gradient}`}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </span>
                <span className="premium-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectStats;
