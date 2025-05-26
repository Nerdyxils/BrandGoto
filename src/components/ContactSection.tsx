import React, { useState } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';

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

    setTimeout(() => setShowToast(false), 3500); // hide toast after 3.5s
    setFormData({ name: '', phone: '', email: '', services: [] }); // reset form
  };

  const services = [
    'Website Design & Development',
    'Digital Marketing',
    'Brand Identity & Logo Design',
    'Graphic Design',
    'Domain & Business Email Setup',
    'Creative Direction & Strategy',
  ];
    if (showToast) {
        setTimeout(() => setShowToast(false), 3500); // hide toast after 3.5s
    }
  return (
    <section className="contact-section">
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

      <footer className="footer">
            <div className="partners">
              <div className="brand-partners">
            <p>PARTNERED BY THE WORLD’S TOP BRANDS</p>
            <div className="logos">
              <span>• Venom</span>
              <span>ASUS</span>
              <span>HERITAGE</span>
              <span>• Venom</span>
            </div>
          </div>
        </div>
          

        <div className="footer-top">
            <div className="logo-social">
                <img src="/images/brand-logo-white.svg" alt="Brandgoto Logo" />
                <div className="socials">
                <a href="#"><i className="fab fa-xing"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                </div>
                <p>© Copyright 2025, All Rights Reserved.</p>
            </div>
            <div className="signup_txt">
                <p>Signup to get access to Brandgoto updates. We will notify you about releases and industry news.</p>
            </div>
            <div className="newsletter">
                <form>
                <input type="email" placeholder="What's your e-mail?" required />
                <button type="submit">→</button>
                </form>
                <p className="privacy">I confirm that I have read <strong>Brandgoto’s Privacy Policy</strong> and agree with it.</p>
            </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
