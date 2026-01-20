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
    <motion.div className="project-stats-container">
      <section
        ref={ref}
        className="relative bg-black text-white section-standard project-stats-section"
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
              className="section-description"
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
            viewport={{ once: true, amount: 0.2 }}
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
