import React, { useRef } from 'react';
import './TestimonialsSection.css';
import { LinkButton } from './ui/Button';

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
  logoWidth: number;
  logoHeight: number;
  avatarWidth: number;
  avatarHeight: number;
  stats: Stat[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    company: 'Higher Glyphs',
    testimonial: 'BrandGoto has been an indispensable asset to my communications company for over three years, and I can say without hesitation that they are one of the most capable, reliable, and results-driven digital agency I\'ve had the pleasure of working with.',
    name: 'Shannon T',
    title: 'CEO & Founder of Higher Glyphs',
    logo: '/images/higherglyphs1.webp',
    avatar: '/images/shannon-travis-1.webp',
    logoWidth: 1554,
    logoHeight: 716,
    avatarWidth: 371,
    avatarHeight: 371,
    stats: [
      { value: '97%', label: 'Client Satisfaction', numericValue: 97 },
      { value: '43%', label: 'Customer engagement', numericValue: 43 },
      { value: '7M+', label: 'Impressions', numericValue: 7 },
    ],
  },
  {
    id: 2,
    company: 'Nexora',
    testimonial: 'Working with BrandGoto was a game-changer. They didn\'t just design our website — they helped us clarify our vision, streamline our messaging, and launch with confidence. Our leads tripled within the first month!',
    name: 'Sarah L',
    title: 'Marketing Director at Nexora',
    logo: '/images/Nexora.webp',
    avatar: '/images/SarahL.webp',
    logoWidth: 1024,
    logoHeight: 1024,
    avatarWidth: 1024,
    avatarHeight: 1536,
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
    logo: '/images/Neuralabs.webp',
    avatar: '/images/DavidK.webp',
    logoWidth: 352,
    logoHeight: 200,
    avatarWidth: 1024,
    avatarHeight: 1536,
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
  const accentClass = index % 2 === 0 ? 'testimonial-card--teal' : 'testimonial-card--orange';

  return (
    <div 
      className="testimonial-card-shell"
      ref={cardRef}
      aria-label={`Testimonial from ${testimonial.name} at ${testimonial.company}`}
    >
      <article className={`testimonial-card ${accentClass}`}>
        <header className="testimonial-card-header">
          <div className="testimonial-logo">
            <img
              src={testimonial.logo}
              alt={`${testimonial.company} logo`}
              width={testimonial.logoWidth}
              height={testimonial.logoHeight}
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="testimonial-card-number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </header>

        <div className="testimonial-quote">
          <span className="quote-mark" aria-hidden="true">“</span>
          <p>{testimonial.testimonial}</p>
        </div>

        <div className="testimonial-author">
          <div className="avatar-container">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              width={testimonial.avatarWidth}
              height={testimonial.avatarHeight}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="author-info">
            <strong>{testimonial.name}</strong>
            <span>{testimonial.title}</span>
          </div>
        </div>

        <div className="testimonial-stats" aria-label={`${testimonial.company} outcomes`}>
          {testimonial.stats.map((stat) => (
            <div className="testimonial-stat" key={stat.label}>
              <p className="stat-value">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

      </article>
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

        <h2 className="herotwo-heading">
          <span>Love</span>
          <span>From</span>
          <span>Clients</span>
        </h2>

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
            <LinkButton to="/book-consultation" onClick={scrollToTop} className="cta-btn-primary">
              Want Results Like This?
            </LinkButton>
            <LinkButton to="/success-stories" onClick={scrollToTop} className="cta-btn-secondary">
              More Success Stories
            </LinkButton>
          </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
