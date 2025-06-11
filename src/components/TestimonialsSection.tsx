import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
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
    name: 'Sarah Langford',
    title: 'Marketing Director at SMT',
    logo: '/images/smt.webp',
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
    name: 'David Kingsley',
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

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  value: string; 
  numericValue?: number; 
  inView: boolean;
  delay?: number;
}> = ({ value, numericValue, inView, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || !numericValue) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let stepCount = 0;

    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        current += increment;
        stepCount++;
        
        if (stepCount >= steps) {
          current = numericValue;
          if (countRef.current) {
            clearInterval(countRef.current);
          }
        }

        // Format the display value
        if (value.includes('M+')) {
          setDisplayValue(`${Math.round(current)}M+`);
        } else if (value.includes('%')) {
          setDisplayValue(`${Math.round(current)}%`);
        } else {
          setDisplayValue(Math.round(current).toString());
        }
      }, duration / steps);

      countRef.current = counter as unknown as number;
    }, delay);

    return () => {
      clearTimeout(timer);
      if (countRef.current) {
        clearInterval(countRef.current);
      }
    };
  }, [inView, numericValue, value, delay]);

  return <span>{displayValue}</span>;
};

// Individual Testimonial Card Component
const TestimonialCard: React.FC<{ 
  testimonial: Testimonial; 
  index: number; 
}> = ({ testimonial, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(cardRef, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;
  const bgClass = isEven ? 'teal-overlay' : 'orange-overlay';

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -80, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.3
      } 
    },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 80, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.3
      } 
    },
  };

  const logoFloat = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <div 
      className={`testimonial-row ${!isEven ? 'reverse-row' : ''}`} 
      ref={cardRef}
      aria-label={`Testimonial from ${testimonial.name} at ${testimonial.company}`}
    >
      {/* Enhanced Logo Box with Connection Line */}
      <motion.div
        className={`logo-box ${bgClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={isEven ? cardVariantsRight : cardVariantsLeft}
        whileHover={{ 
          scale: 1.05,
          rotateY: isEven ? 5 : -5,
          transition: { duration: 0.3 }
        }}
        animate={logoFloat}
      >
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
      </motion.div>

      {/* Enhanced Testimonial Card */}
      <motion.div
        className={`testimonial-card ${bgClass}`} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={isEven ? cardVariantsLeft : cardVariantsRight}
        whileHover={{ 
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3 }
        }}
      >
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
                <motion.div 
                  className="stat" 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <h4>
                    <AnimatedCounter 
                      value={stat.value}
                      numericValue={stat.numericValue}
                      inView={statsInView}
                      delay={idx * 200}
                    />
                  </h4>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card-pattern" />
      </motion.div>
    </div>
  );
};

// Main Testimonials Section Component
const TestimonialSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.4
      },
    },
  };

  return (
    <section 
      className="testimonial-section" 
      ref={ref}
      aria-label="Client testimonials"
    >
      {/* Enhanced Header */}
      <motion.div
        className="testimonial-header"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.p className="section-subtitle" variants={headerVariants}>
          Testimonials
        </motion.p>
        <motion.h2 className="section-title" variants={titleVariants}>
          <span className="orange">Love</span> <span className="teal">From</span> <span className="white">Clients</span>
        </motion.h2>
        <motion.p className="section-desc" variants={headerVariants}>
          What They're Saying About Our Work
        </motion.p>
      </motion.div>

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

      {/* Background Elements */}
      <div className="section-bg-elements">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
      </div>
    </section>
  );
};

export default TestimonialSection;