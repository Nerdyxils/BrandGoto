import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';

const teamMembers = [
  { name: 'Silas', role: 'Founder & Project Lead', img: '/images/Founder.webp' },
  { name: 'Robert', role: 'Full Stack Developer', img: '/images/Robert.webp' },
  { name: 'Olha', role: 'Product Designer', img: '/images/Olha.webp' },
  { name: 'Dmytro', role: 'Marketing Strategist', img: '/images/Dymtro.webp' },
];

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

const TeamSection: React.FC = () => {
  const ref = useRef(null);

  return (
    <section className="team-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="team-subtitle" variants={fadeInUp}>
            About Us
          </motion.p>
          <motion.h2 className="team-title" variants={fadeInUp}>
            <span className="orange">Meet</span> the <span className="teal">Team</span>
          </motion.h2>
          <motion.p className="team-description" variants={fadeInUp}>
            Creative Minds. Tech Hearts. We're a small but mighty remote-first team of creatives and tech enthusiasts serving founders globally,
            passionate about helping brands stand out. Whether you're just starting out or looking to refresh your look, we
            bring strategy, design, and a whole lot of heart into everything we do.
          </motion.p>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="team-card"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="team-image-wrapper">
                  <img src={member.img} alt={member.name} className="team-image" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role badge">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;