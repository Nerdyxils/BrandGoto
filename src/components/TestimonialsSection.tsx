import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    company: 'Heritage',
    testimonial: 'Our startup was struggling to stand out in a crowded market. The team at Brandgoto crafted a bold, authentic brand identity that perfectly captured our eco-friendly mission. From logo to messaging, they made us unforgettable.',
    name: 'Mayowa Peters',
    title: 'Founder of Heritage Enterprises',
    logo: '/images/herlogo.png',
    avatar: '/images/Founder.JPG',
    stats: [
      { value: '97%', label: 'Client Satisfaction' },
      { value: '43%', label: 'Customer engagement' },
      { value: '7M+', label: 'Impressions' },
    ],
  },
  {
    id: 2,
    company: 'Venom',
    testimonial: 'Working with Brandgoto on our digital marketing was a game-changer. They involved us every step of the way, co-creating campaigns that hit 5 million impressions in just three months. Their real-time feedback tools kept us aligned, and our leads doubled.',
    name: 'Titilayo George',
    title: 'Marketing Director at Venom',
    logo: '/images/herlogo.png',
    avatar: '/images/Founder.JPG',
    stats: [
      { value: '94%', label: 'Client Satisfaction' },
      { value: '60%', label: 'Customer engagement' },
      { value: '5M+', label: 'Impressions' },
    ],
  },
  {
    id: 3,
    company: 'Asus',
    testimonial: 'Rebranding our restaurant chain felt daunting, but Brandgoto made it seamless. They delivered a fresh look and consistent assets across all locations in just five weeks. Their clear communication and fast turnaround saved us time and stress—our sales are up 25%',
    name: 'Stephen Kingsley',
    title: 'Co-founder of Asus',
    logo: '/images/herlogo.png',
    avatar: '/images/Founder.JPG',
    stats: [
      { value: '97%', label: 'Client Satisfaction' },
      { value: '43%', label: 'Customer engagement' },
      { value: '2M+', label: 'Impressions' },
    ],
  },
];

const TestimonialSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };
    const variants = {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
      },
    };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };


  return (
    <section className="testimonial-section" ref={ref}>
     <motion.div
        className="testimonial-header"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.p className="section-subtitle" variants={variants}>Testimonial</motion.p>
        <motion.h2 className="section-title" variants={variants}>
          <span className="orange">Love</span> <span className="teal">From</span> <span className="white">Clients</span>
        </motion.h2>
        <motion.p className="section-desc" variants={variants}>What They're Saying</motion.p>
      </motion.div>



      <div className="testimonial-grid">
{testimonials.map((t, i) => {
  const isEven = i % 2 === 0;
  const bgClass = isEven ? 'teal-overlay' : 'orange-overlay';

  return (
    <div className={`testimonial-row ${!isEven ? 'reverse-row' : ''}`} key={t.id}>
      <motion.div
        className={`logo-box ${bgClass}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={isEven ? cardVariantsRight : cardVariantsLeft}
      >
        <img src={t.logo} alt={t.company} />
      </motion.div>

      <motion.div
        className={`testimonial-card ${bgClass}`} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={isEven ? cardVariantsLeft : cardVariantsRight}
      >
        <div className="testimonial-text">
          <img src={t.logo} alt={t.company} />
          <p>{t.testimonial}</p>
          <div className="author">
            <img src={t.avatar} alt={t.name} />
            <div>
              <strong>{t.name}</strong><br/>
              <span>{t.title}</span>
            </div>
          </div>
        </div>
        <div className="testimonial-stats">
          {t.stats.map((s, idx) => (
            <div className="stat" key={idx}>
              <h4>{s.value}</h4>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
})}
      </div>
    </section>
  );
};

export default TestimonialSection;


