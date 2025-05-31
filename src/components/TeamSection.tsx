import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './TeamSection.css';

const teamMembers = [
  { name: 'Silas .A', role: 'Managing Partner & Project Manager', img: '/images/Founder.JPG' },
  { name: 'Robert .W', role: 'Full Stack Developer', img: '/images/Full-stack-developer.png' },
  { name: 'Olha .K', role: 'Product Designer', img: '/images/designer.png' },
  { name: 'Dmytro .K', role: 'Marketing Strategist', img: '/images/Marketing-Strategist.png' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const TeamSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <section className="team-section" ref={ref}>
        <div className="container">
            <motion.p className="team-subtitle" variants={textVariants} initial="hidden" animate={controls}>
            About Us
            </motion.p>
            <motion.h2 className="team-title" variants={textVariants} initial="hidden" animate={controls}>
                <span className="orange">Meet</span> the <span className="teal">Team</span>
            </motion.h2>
            <motion.p className="team-description" variants={textVariants} initial="hidden" animate={controls}>
                Creative Minds. Tech Hearts. We’re a small but mighty team of creatives and tech enthusiasts based in Canada,
                passionate about helping brands stand out. Whether you’re just starting out or looking to refresh your look, we
                bring strategy, design, and a whole lot of heart into everything we do.
            </motion.p>
     

      <div className="team-grid">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            className="team-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
          >
            <div className="team-image-wrapper">
              <img src={member.img} alt={member.name} className="team-image" />
              <div className="image-overlay" />
            </div>
            <div className="team-info">
              <h4 className="team-name">{member.name}</h4>
              <p className="team-role badge">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
        </div>
    </section>
  );
};

export default TeamSection;
