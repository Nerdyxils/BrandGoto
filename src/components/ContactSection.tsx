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
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showNewsletterToast, setShowNewsletterToast] = useState(false);

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

  // AI Intelligence Functions for Business Automation
  const calculateComplexityScore = (services: string[]): number => {
    const complexityMap: Record<string, number> = {
      "Website Design & Development": 8,
      "Digital Marketing": 6,
      "Brand Identity & Logo Design": 4,
      "Graphic Design": 3,
      "Domain & Business Email Setup": 2,
      "Creative Direction & Strategy": 7
    };
    return services.reduce((total, service) => total + (complexityMap[service] || 3), 0);
  };

  const calculateProjectValue = (services: string[]): number => {
    const valueMap: Record<string, number> = {
      "Website Design & Development": 5000,
      "Digital Marketing": 2500,
      "Brand Identity & Logo Design": 2000,
      "Graphic Design": 1000,
      "Domain & Business Email Setup": 500,
      "Creative Direction & Strategy": 3000
    };
    return services.reduce((total, service) => total + (valueMap[service] || 1000), 0);
  };

  const calculatePriorityLevel = (services: string[]): string => {
    if (services.length >= 3) return "High";
    if (services.includes("Website Design & Development")) return "High";
    if (services.includes("Creative Direction & Strategy")) return "Medium";
    return "Standard";
  };

  const getEmailTemplateId = (services: string[]): string => {
    if (services.length >= 3) return "comprehensive_package";
    if (services.includes("Website Design & Development")) return "website_focused";
    if (services.includes("Brand Identity & Logo Design")) return "branding_focused";
    if (services.includes("Digital Marketing")) return "marketing_focused";
    return "general_inquiry";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // Calculate intelligence data first
    const complexityScore = calculateComplexityScore(formData.services);
    const projectValue = calculateProjectValue(formData.services);
    const priorityLevel = calculatePriorityLevel(formData.services);
    const templateId = getEmailTemplateId(formData.services);

    // Complete payload with all intelligence data for Make.com
    const payload = {
      // Standard contact fields
      email: formData.email,
      firstname: formData.name,
      phone: formattedPhone,
      
      // Services data
      services_selected: formData.services.join(';'),
      services_count: formData.services.length,
      primary_service: formData.services[0] || "General Inquiry",
      
      // Intelligence data (calculated values)
      service_complexity_score: complexityScore,
      estimated_project_value: projectValue,
      priority_level: priorityLevel,
      email_template_id: templateId,
      page_url: window.location.href,
      
      // Lead metadata
      lead_source: "BrandGoto Website",
      consultation_status: "New Lead",
      requires_consultation: formData.services.length > 1 ? "Yes" : "No",
      automated_followup_enabled: "Yes",
      form_timestamp: new Date().toISOString(),
      
      // Additional context
      referrer: document.referrer || "Direct",
      browser_info: navigator.userAgent.substring(0, 100)
    };

    console.log("📦 Submitting complete intelligence data:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('https://hook.us2.make.com/2jhecx0f9v8buiu1so1pwk8jc73qi5h1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed with status ${response.status}`);
      }

      console.log("✅ Intelligence form data submitted successfully");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
      
      // Reset form but preserve country code
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

  // Newsletter signup handler - Simple email list collection
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simple newsletter payload - just for list building
    const newsletterPayload = {
      email: newsletterEmail,
      lead_source: "BrandGoto Newsletter Signup",
      subscription_type: "Newsletter",
      signup_timestamp: new Date().toISOString(),
      list_name: "BrandGoto Newsletter List",
      opt_in_status: "Subscribed",
      // No automation flags - just save to list
    };

    console.log("📧 Saving email to newsletter list:", JSON.stringify(newsletterPayload, null, 2));

    try {
      // Use separate webhook for newsletter (no AI automation)
      const response = await fetch('https://hook.us2.make.com/mfai8q73ni4yxbqribo1oaglmbfw01q8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterPayload),
      });

      if (!response.ok) {
        throw new Error(`Newsletter signup failed with status ${response.status}`);
      }

      console.log("✅ Email saved to newsletter list successfully");
      setShowNewsletterToast(true);
      setTimeout(() => setShowNewsletterToast(false), 3500);
      
      // Reset newsletter email
      setNewsletterEmail('');
    } catch (err) {
      console.error("❌ Newsletter signup error:", err);
      alert("There was an error subscribing to the newsletter. Please try again later.");
    }
  };

  // Exact service names as they appear in HubSpot
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
            🎉 Message sent! We'll be in touch shortly.
          </motion.div>
        )}
        {showNewsletterToast && (
          <motion.div
            className="form-toast newsletter-toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            style={{ backgroundColor: '#023942', color: '#CFF8FF' }}
          >
            📧 Successfully subscribed to our newsletter!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="form-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-pretitle">Let's Make It Happen</p>
        <h2 className="section-title">
          <span className="orange">Start</span> <span className="teal">Conversation</span> with <span className="text-light-cyan">Us</span>
        </h2>
        <p className="section-subtitle_txt">Have a project in mind? We'd love to hear about it.</p>
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

            <p className="services-title">What do you need help with? (Select all that apply)</p>
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
            <p>PARTNERED BY THE WORLD'S TOP BRANDS</p>
            <div className="logos-wrapper">
              <div className="logos animate-scroll">
                <img src="/images/higherglyphs1.png" alt="Higher Glyphs" className='logo-comp'/>
                <img src="/images/smt.webp" alt="SMT" className='logo-comp' />
                <img src="/images/Neuralabs.png" alt="Neuralabs" className='logo-comp' />
                <img src="/images/herlogo.png" alt="Jayo" className='logo-comp' />
                {/* duplicate for seamless loop */}
                <img src="/images/higherglyphs1.png" alt="Higher Glyphs" className='logo-comp'/>
                <img src="/images/smt.webp" alt="SMT duplicate" className='logo-comp' />
                <img src="/images/Neuralabs.png" alt="Neuralabs duplicate" className='logo-comp' />
                <img src="/images/herlogo.png" alt="Jayo duplicate" className='logo-comp'/>
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
            <p>Stay updated with BrandGoto insights, industry trends, and exclusive creative resources. Join our community of bold brands.</p>
          </div>

          <div className="newsletter">
            <form onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                placeholder="What's your e-mail?" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required 
              />
              <button type="submit">→</button>
            </form>
            <p className="privacy">
              I confirm that I have read <strong>BrandGoto's Privacy Policy</strong> and agree to receive marketing communications.
            </p>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default ContactSection;