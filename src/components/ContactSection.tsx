import React, { useState, useEffect } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import patternBg from '../assets/Pattern.png';
import LogoImg from '../assets/logo.svg';

// Country codes (add more if needed)
const countryCodes: Record<string, string> = {
  US: '1',
  CA: '1',
  NG: '234',
  GB: '44',
  IN: '91',
  DE: '49',
  FR: '33',
  // ...
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    services: [] as string[],
    countryCode: '1',
  });
  const [showToast, setShowToast] = useState(false);

  // Detect browser locale on mount
  useEffect(() => {
    const locale = navigator.language.split('-')[1] || 'US';
    const code = countryCodes[locale.toUpperCase()] || '1';
    setFormData((prev) => ({ ...prev, countryCode: code }));
  }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const { name, value } = target;

  if (target.type === 'checkbox') {
    const checked = (target as HTMLInputElement).checked;
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

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

// Combine country code + phone into correct format
  const cleanedPhone = formData.phone.replace(/\D/g, '');
  const formattedPhone = `+${formData.countryCode}${cleanedPhone}`;

  // Validate phone number
  if (!cleanedPhone || cleanedPhone.length < 7 || cleanedPhone.length > 15) {
    alert("Please enter a valid phone number (7-15 digits).");
    return;
  }

  if (!/^\+\d+$/.test(formattedPhone)) {
    alert("Invalid phone number format. It must start with '+' followed by digits only.");
    return;
  }

  // Prepare payload for Make.com webhook (no listIds)
  const payload = {
    email: formData.email, // Brevo expects lowercase 'email'
    attributes: {
      FIRSTNAME: formData.name,
      SMS: formattedPhone,
    },
    services: formData.services, // Let Make handle how it's stored
    // Removed listIds here
  };

  console.log("📦 Submitting form with data:", JSON.stringify(payload, null, 2)); // Pretty-print for debugging

  try {
    const response = await fetch('https://hook.us2.make.com/ln3t91i9y3shyx5u6uryi8p93ebnkdpc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    console.log("✅ Form data submitted to Make.com webhook");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
    setFormData({
      name: '',
      phone: '',
      email: '',
      services: [],
      countryCode: formData.countryCode,
    });
  } catch (err) {
    console.error("❌ Form submission error:", err);
    alert("There was an error submitting the form. Please try again later.");
  }
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
    <section className="contact-section" style={{
      backgroundImage: `url(${patternBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
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
          <iframe
            name="invisibleFrame"
            style={{ display: 'none' }}
            title="Hidden Brevo Target"
          />
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} required />
            
            <div className="phone-field">
              <select className='phone_code' name="countryCode" value={formData.countryCode} onChange={handleChange}>
                {Object.entries(countryCodes).map(([key, val]) => (
                  <option key={key} value={val}>+{val} ({key})</option>
                ))}
              </select>
              <input className='phone' type="text" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
            </div>

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
            <div className="logos-wrapper">
              <div className="logos animate-scroll">
                <img src="/images/higherglyphs1.png" alt="Higher Glyphs" className='logo-comp'/>
                <img src="/images/herlogo.png" alt="Venom" />
                <img src="/images/herlogo.png" alt="Asus" />
                <img src="/images/herlogo.png" alt="Jayo" />
                {/* duplicate for seamless loop */}
                <img src="/images/higherglyphs1.png" alt="Higher Glyphs" className='logo-comp'/>
                <img src="/images/herlogo.png" alt="Venom duplicate" />
                <img src="/images/herlogo.png" alt="Asus duplicate" />
                <img src="/images/herlogo.png" alt="Jayo duplicate" />
              </div>
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
