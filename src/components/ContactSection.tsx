import React, { useState } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import patternBg from '../assets/Pattern.png';
import LogoImg from '../assets/logo.svg';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', services: [] as string[] });
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
    setFormData({ name: '', phone: '', email: '', services: [] });
  };

  const services = [
    'Website Design & Development',
    'Digital Marketing',
    'Brand Identity & Logo Design',
    'Graphic Design',
    'Domain & Business Email Setup',
    'Creative Direction & Strategy',
  ];

  return (
    <section className="contact-section"
          style={{
            backgroundImage: `url(${patternBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            overflow: 'hidden',
        }}
    >
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="form-toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
          >
            🎉 Message sent! We’ll be in touch shortly.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="form-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-pretitle">Let’s Make It Happen</p>
        <h2 className="section-title">
          <span className="orange">Start</span> <span className="teal">Conversation</span> with <span className="text-light-cyan">Us</span>
        </h2>
        <p className="section-subtitle_txt">Have a project in mind? We’d love to hear about it.</p>
      </motion.div>

      <motion.div
        className="contact-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="form-content">
          <h3>Sign up for a free Consultation</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} required />

            <p className="services-title">What do you need help with?</p>
            <div className="checkbox-grid">
              {services.map((service) => (
                <label key={service}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    checked={formData.services.includes(service)}
                    onChange={handleChange}
                  />
                  {service}
                </label>
              ))}
            </div>

            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className="form-image">
          <img src="/images/client.png" alt="Happy Client" />
        </div>
      </motion.div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="partners">
          <div className="brand-partners">
            <p>PARTNERED BY THE WORLD’S TOP BRANDS</p>
            <div className="logos">
              <img src="/images/herlogo.png" alt="" />
              <img src="/images/herlogo.png" alt="" />
              <img src="/images/herlogo.png" alt="" />
              <img src="/images/herlogo.png" alt="" />
            </div>
          </div>
        </div>

        <div className="footer-top">
          <div className="logo-social">
            <img src={LogoImg} alt="BrandGoto Logo" />
            <div className="socials">
              <a href="#"><i className="fab fa-x-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
            </div>
            <p className='copy_w'>© Copyright 2025, All Rights Reserved.</p>
          </div>

          <div className="signup_txt">
            <p>Signup to get access to Brandgoto updates. We will notify you about releases and industry news.</p>
          </div>

          <div className="newsletter">
            <form>
              <input type="email" placeholder="What's your e-mail?" required />
              <button type="submit">→</button>
            </form>
            <p className="privacy">
              I confirm that I have read <strong>Brandgoto’s Privacy Policy</strong> and agree with it.
            </p>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default ContactSection;
