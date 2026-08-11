import React from 'react';
import { motion } from 'framer-motion';
import FaIcon from '../components/FaIcon';

import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/TeamSection.css';

const Team: React.FC = () => {
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

  const teamMembers = [
    {
      name: 'Silas',
      role: 'Founder & Lead Developer',
      image: '/images/Founder-960.webp',
      width: 960,
      height: 1228,
      bio: 'Full-stack developer and creative strategist with a passion for building brands that scale. Combines technical expertise with strategic vision to lead our team.',
      skills: ['Full-Stack Development', 'Strategic Leadership', 'Brand Development', 'Technical Architecture'],
      linkedin: 'https://www.linkedin.com/in/abiodun-silas-timi/',
      isFounder: true
    },
    {
      name: 'Robert',
      role: 'Senior Full Stack Developer',
      image: '/images/Robert.webp',
      width: 1024,
      height: 1536,
      bio: 'Senior developer with expertise in modern web technologies. Builds fast, scalable applications that users love.',
      skills: ['React', 'Node.js', 'Python', 'Database Design'],
      linkedin: 'https://linkedin.com/in/robert-dev',
      isFounder: false
    },
    {
      name: 'Olha',
      role: 'Senior Product Designer',
      image: '/images/Olha.webp',
      width: 958,
      height: 1280,
      bio: 'UX/UI designer focused on creating intuitive, beautiful interfaces that drive user engagement and conversion.',
      skills: ['UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
      linkedin: 'https://linkedin.com/in/olha-designer',
      isFounder: false
    },
    {
      name: 'Dmytro',
      role: 'Marketing Strategist',
      image: '/images/Dymtro.webp',
      width: 1024,
      height: 1280,
      bio: 'Growth-focused marketer who understands how to build campaigns that convert and scale businesses.',
      skills: ['Digital Marketing', 'Growth Strategy', 'Analytics', 'Content Strategy'],
      linkedin: 'https://linkedin.com/in/dmytro-marketing',
      isFounder: false
    }
  ];

  return (
    <div className="scroll-container">
      <motion.div
        className="main-content"
      >
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background" />
          
          <div className="container">
            <motion.div
              className="hero-txt"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="sm__txt" variants={fadeInUp}>
                Meet the Team
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Creative</span>
                <span>Minds.</span>
                <span>Tech</span>
                <span>Hearts.</span>
              </motion.h1>

              <motion.p className="h__txt" variants={fadeInUp}>
                We're a small but mighty team of creatives and tech enthusiasts based in Ontario, passionate about helping brands stand out.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="section-black">
          <div className="container">
                          <motion.div
                className="text-center mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Meet</span>
                <span>Our</span>
                <span>Team</span>
              </motion.h2>
                              <motion.p className="h__txt max-w-2xl mx-auto mt-4" variants={fadeInUp}>
                A talented team of developers, designers, and strategists passionate about building exceptional digital experiences
              </motion.p>
            </motion.div>
            
            <motion.div
              className="team-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  className={`team-card ${member.isFounder ? 'founder-card' : ''}`}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="team-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="team-image"
                      loading="lazy"
                      decoding="async"
                      width={member.width}
                      height={member.height}
                    />
                    {member.isFounder && (
                      <div className="founder-badge">
                        <span>Founder</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="team-info">
                    <div className="team-header">
                      <h3 className="team-name">{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                    </div>
                    
                    <p className="team-bio">{member.bio}</p>
                    
                    <div className="skills-section">
                      <h4 className="skills-title">Expertise:</h4>
                      <div className="skills-tags">
                        {member.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="skill-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-link"
                    >
                      <span>Connect on LinkedIn</span>
                      <svg className="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="section-black">
          <div className="container">
            <motion.div
              className="content-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 className="herotwo-heading" variants={fadeInUp}>
                <span>Our</span>
                <span>Culture</span>
              </motion.h2>
              
              <div className="culture-grid">
                <motion.div className="culture-item" variants={fadeInUp}>
                  <div className="culture-icon">
                    <FaIcon name="chart-line" />
                  </div>
                  <h3 className="sm__txt">Results-Focused</h3>
                  <p className="h__txt">
                    We measure success by the impact we create for our clients, not just the work we produce.
                  </p>
                </motion.div>
                
                <motion.div className="culture-item" variants={fadeInUp}>
                  <div className="culture-icon">
                    <FaIcon name="rocket" />
                  </div>
                  <h3 className="sm__txt">Fast Execution</h3>
                  <p className="h__txt">
                    We move quickly, iterate often, and deliver results faster than traditional agencies.
                  </p>
                </motion.div>
                
                <motion.div className="culture-item" variants={fadeInUp}>
                  <div className="culture-icon">
                    <FaIcon name="handshake" />
                  </div>
                  <h3 className="sm__txt">True Partnership</h3>
                  <p className="h__txt">
                    We work as an extension of your team, invested in your success and growth.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
      </motion.div>
    </div>
  );
};

export default Team;
