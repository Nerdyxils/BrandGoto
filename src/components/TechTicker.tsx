import React from 'react';
import './TechTicker.css';

interface TechItem {
  name: string;
  iconClass?: string;
  imageSrc?: string;
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
  { name: 'n8n', imageSrc: '/images/n8n-logo.svg' },
  { name: 'Make.com', imageSrc: '/images/make-logo.svg' },
  { name: 'Zapier', iconClass: 'fa-solid fa-bolt' },
  { name: 'LangChain', imageSrc: '/images/langchain-logo.svg' },
  { name: 'Anthropic', imageSrc: '/images/anthropic-logo.svg' },
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
              ) : (
                <i className={`${tech.iconClass} tech-icon`} aria-hidden="true" />
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
