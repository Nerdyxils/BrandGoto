import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './TestimonialsSection.css';

interface Stat {
  value: string;
  label: string;
  numericValue?: number;
}

interface Testimonial {
  id: number;
  company: string;
  testimonial: string;
  name: string;
  title: string;
  logo: string;
  avatar: string;
  stats: Stat[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    company: 'Higher Glyphs',
    testimonial: 'BrandGoto has been an indispensable asset to my communications company for over three years, and I can say without hesitation that they are one of the most capable, reliable, and results-driven digital agency I\'ve had the pleasure of working with.',
    name: 'Shannon T',
    title: 'CEO & Founder of Higher Glyphs',
    logo: '/images/higherglyphs1.png',
    avatar: '/images/shannon-travis-1.jpg',
    stats: [
      { value: '97%', label: 'Client Satisfaction', numericValue: 97 },
      { value: '43%', label: 'Customer engagement', numericValue: 43 },
      { value: '7M+', label: 'Impressions', numericValue: 7 },
    ],
  },
  {
    id: 2,
    company: 'SMT',
    testimonial: 'Working with BrandGoto was a game-changer. They didn\'t just design our website — they helped us clarify our vision, streamline our messaging, and launch with confidence. Our leads tripled within the first month!',
    name: 'Sarah L',
    title: 'Marketing Director at Nexora',
    logo: '/images/Nexora.png',
    avatar: '/images/SarahL.PNG',
    stats: [
      { value: '94%', label: 'Client Satisfaction', numericValue: 94 },
      { value: '60%', label: 'Customer engagement', numericValue: 60 },
      { value: '5M+', label: 'Impressions', numericValue: 5 },
    ],
  },
  {
    id: 3,
    company: 'NeuraForm Labs',
    testimonial: 'From branding to web development, the BrandGoto team exceeded our expectations. Their attention to detail and creative direction gave our brand a whole new identity. Couldn\'t recommend them more.',
    name: 'David K',
    title: 'Co-founder of NeuraForm Labs',
    logo: '/images/Neuralabs.png',
    avatar: '/images/DavidK.PNG',
    stats: [
      { value: '97%', label: 'Client Satisfaction', numericValue: 97 },
      { value: '43%', label: 'Customer engagement', numericValue: 43 },
      { value: '2M+', label: 'Impressions', numericValue: 2 },
    ],
  },
];

// Individual Testimonial Card Component
const TestimonialCard: React.FC<{ 
  testimonial: Testimonial; 
  index: number; 
}> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const bgClass = isEven ? 'teal-overlay' : 'orange-overlay';

  return (
    <div 
      className={`testimonial-row ${!isEven ? 'reverse-row' : ''}`} 
      ref={cardRef}
      aria-label={`Testimonial from ${testimonial.name} at ${testimonial.company}`}
    >
      {/* Logo Box */}
      <div className={`logo-box ${bgClass}`}>
        <div className="logo-container">
          <img 
            src={testimonial.logo} 
            alt={`${testimonial.company} logo`}
            loading="lazy"
            decoding="async"
          />
          <div className="logo-glow" />
        </div>
        <div className="connection-line" />
      </div>

      {/* Testimonial Card */}
      <div className={`testimonial-card ${bgClass}`}>
        <div className="card-content">
          <div className="testimonial-text">
            <div className="quote-mark">"</div>
            <p>{testimonial.testimonial}</p>
            <div className="author">
              <div className="avatar-container">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  loading="lazy"
                  decoding="async"
                />
                <div className="avatar-ring" />
              </div>
              <div className="author-info">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.title}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-stats">
            <div className="stats-grid">
              {testimonial.stats.map((stat, idx) => (
                <div 
                  className="stat" 
                  key={idx}
                >
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card-pattern" />
      </div>
    </div>
  );
};

// Main Testimonials Section Component
const TestimonialSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="testimonial-section" 
      ref={ref}
      aria-label="Client testimonials"
    >
      {/* Header */}
      <div className="section-header">
        <span className="section-subtitle">
          Testimonials
        </span>

        <h1 className="herotwo-heading">
          <span>Love</span>
          <span>From</span>
          <span>Clients</span>
        </h1>

        <p className="section-description">
          What They're Saying About Our Work
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="testimonial-grid" role="list">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            id={`testimonial-${index}`}
            role="listitem"
          >
            <TestimonialCard
              testimonial={testimonial}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="cta-buttons-container text-center mt-16">
                  <div className="flex flex-row gap-4 justify-center items-center">
            <Link to="/book-consultation" onClick={scrollToTop}>
              <button className="cta-btn-primary">
                Want Results Like This?
              </button>
            </Link>
            <Link to="/success-stories" onClick={scrollToTop}>
              <button className="cta-btn-secondary">
                More Success Stories
              </button>
            </Link>
          </div>
      </div>
    </section>
  );
};

export default TestimonialSection;