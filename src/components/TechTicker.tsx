import React from 'react';
import './TechTicker.css';
import FaIcon from './FaIcon';

interface TechItem {
  name: string;
  iconClass?: string;
  imageSrc?: string;
  monogram?: string;
}

const techStack: TechItem[] = [
  { name: 'Webflow', iconClass: 'fa-brands fa-webflow' },
  { name: 'React', iconClass: 'fa-brands fa-react' },
  { name: 'OpenAI', iconClass: 'fa-brands fa-openai' },
  { name: 'Stripe', iconClass: 'fa-brands fa-stripe' },
  { name: 'HubSpot', iconClass: 'fa-brands fa-hubspot' },
  { name: 'Node.js', iconClass: 'fa-brands fa-node-js' },
  { name: 'Python', iconClass: 'fa-brands fa-python' },
  { name: 'AWS', iconClass: 'fa-brands fa-aws' },
  { name: 'n8n', monogram: 'n' },
  { name: 'Make.com', monogram: 'M' },
  { name: 'Zapier', iconClass: 'fa-solid fa-bolt' },
  { name: 'LangChain', monogram: 'L' },
  { name: 'Anthropic', monogram: 'A' },
];

const TechTicker: React.FC = () => {
  // Duplicate array for seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <div className="tech-ticker-container">
      <div className="tech-ticker-wrapper">
        <div className="tech-ticker-track" aria-hidden="true">
          {duplicatedTech.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="tech-ticker-item">
              {tech.imageSrc ? (
                <img 
                  src={tech.imageSrc} 
                  alt={`${tech.name} logo`}
                  className="tech-logo-img"
                  width="24"
                  height="24"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'tech-name-fallback';
                    fallback.textContent = tech.name.charAt(0);
                    target.parentElement?.insertBefore(fallback, target);
                  }}
                />
              ) : tech.monogram ? (
                <span className="tech-name-fallback" aria-hidden="true">{tech.monogram}</span>
              ) : (
                <FaIcon name={tech.iconClass ?? ''} className="tech-icon" />
              )}
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechTicker;
