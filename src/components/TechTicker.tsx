import React from 'react';
import { motion } from 'framer-motion';
import './TechTicker.css';

const techStack = [
  { name: 'Webflow', iconClass: 'fa-brands fa-webflow' },
  { name: 'React', iconClass: 'fa-brands fa-react' },
  { name: 'OpenAI', iconClass: 'fa-brands fa-openai' },
  { name: 'Stripe', iconClass: 'fa-brands fa-stripe' },
  { name: 'HubSpot', iconClass: 'fa-brands fa-hubspot' },
  { name: 'Node.js', iconClass: 'fa-brands fa-node-js' },
  { name: 'Python', iconClass: 'fa-brands fa-python' },
  { name: 'AWS', iconClass: 'fa-brands fa-aws' },
];

const TechTicker: React.FC = () => {
  // Duplicate array for seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="tech-ticker-container">
      <div className="tech-ticker-wrapper">
        <motion.div
          className="tech-ticker-track"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="tech-ticker-item">
              <i className={`${tech.iconClass} tech-icon`} aria-hidden="true" />
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TechTicker;
