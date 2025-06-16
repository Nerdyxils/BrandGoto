import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import patternBg from '../assets/Pattern.png';
import LogoImg from '../assets/logo.svg';

// Country codes
const countryCodes: Record<string, string> = {
  US: '1',
  CA: '1',
  NG: '234',
  GB: '44',
  IN: '91',
  DE: '49',
  FR: '33',
  AU: '61',
  NZ: '64',
  ZA: '27',
  JP: '81',
  KR: '82',
  CN: '86',
  BR: '55',
  MX: '52',
  ES: '34',
  IT: '39',
  NL: '31',
  SE: '46',
  NO: '47',
  DK: '45',
  FI: '358',
  PL: '48',
  RU: '7',
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  services: string[];
  countryCode: string;
}

interface LogoData {
  src: string;
  alt: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    services: [],
    countryCode: '1',
  });
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showNewsletterToast, setShowNewsletterToast] = useState<boolean>(false);

  // FINAL LOGO ANIMATION FIX - CONTROLLED APPROACH
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const logosRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(1);

  // Logo data
  const logos: LogoData[] = [
    { src: "/images/higherglyphs1.png", alt: "Higher Glyphs" },
    { src: "/images/smt.webp", alt: "SMT" },
    { src: "/images/Neuralabs.png", alt: "Neuralabs" },
    { src: "/images/herlogo.png", alt: "Jayo" }
  ];

  // Calculate exact dimensions based on screen size
  const getLogoDimensions = (width: number) => {
    if (width <= 480) {
      return {
        logoWidth: 60,
        logoHeight: 20,
        gap: 12,
        containerMaxWidth: 280,
        animationSpeed: 20, // Much slower on mobile
      };
    } else if (width <= 768) {
      return {
        logoWidth: 80,
        logoHeight: 25,
        gap: 16,
        containerMaxWidth: 350,
        animationSpeed: 15,
      };
    } else if (width <= 1200) {
      return {
        logoWidth: 100,
        logoHeight: 30,
        gap: 20,
        containerMaxWidth: 500,
        animationSpeed: 12,
      };
    } else {
      return {
        logoWidth: 120,
        logoHeight: 35,
        gap: 24,
        containerMaxWidth: 700,
        animationSpeed: 10,
      };
    }
  };

  // MANUAL ANIMATION CONTROL - NO CSS ANIMATIONS
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Manual animation using requestAnimationFrame
  useEffect(() => {
    if (!logosRef.current) return;

    const dimensions = getLogoDimensions(screenWidth);
    const totalLogoWidth = dimensions.logoWidth * 4 + dimensions.gap * 3; // 4 logos + 3 gaps
    let translateX = 0;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      // Calculate progress (0 to 1)
      const progress = (elapsed % (dimensions.animationSpeed * 1000)) / (dimensions.animationSpeed * 1000);
      
      // Calculate translateX position
      translateX = -progress * totalLogoWidth;
      
      if (logosRef.current) {
        logosRef.current.style.transform = `translateX(${translateX}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [screenWidth]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      email: formData.email,
      firstname: formData.name,
      phone: formattedPhone,
      services_selected: formData.services.join(';'),
      services_count: formData.services.length,
      primary_service: formData.services[0] || "General Inquiry",
      service_complexity_score: complexityScore,
      estimated_project_value: projectValue,
      priority_level: priorityLevel,
      email_template_id: templateId,
      page_url: window.location.href,
      lead_source: "BrandGoto Website",
      consultation_status: "New Lead",
      requires_consultation: formData.services.length > 1 ? "Yes" : "No",
      automated_followup_enabled: "Yes",
      form_timestamp: new Date().toISOString(),
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

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newsletterPayload = {
      email: newsletterEmail,
      lead_source: "BrandGoto Newsletter Signup",
      subscription_type: "Newsletter",
      signup_timestamp: new Date().toISOString(),
      list_name: "BrandGoto Newsletter List",
      opt_in_status: "Subscribed",
    };

    console.log("📧 Saving email to newsletter list:", JSON.stringify(newsletterPayload, null, 2));

    try {
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
      
      setNewsletterEmail('');
    } catch (err) {
      console.error("❌ Newsletter signup error:", err);
      alert("There was an error subscribing to the newsletter. Please try again later.");
    }
  };

  const services: string[] = [
    'Website Design & Development',
    'Digital Marketing',
    'Brand Identity & Logo Design',
    'Graphic Design',
    'Domain & Business Email Setup',
    'Creative Direction & Strategy',
  ];

  // Get current dimensions for rendering
  const dimensions = getLogoDimensions(screenWidth || window.innerWidth);

  // Render logos with exact calculated dimensions
  const renderLogos = () => {
    const doubledLogos = [...logos, ...logos];
    
    return doubledLogos.map((logo, index) => (
      <img
        key={`${logo.alt}-${index}`}
        src={logo.src}
        alt={logo.alt}
        style={{
          width: `${dimensions.logoWidth}px`,
          height: `${dimensions.logoHeight}px`,
          objectFit: 'contain' as const,
          flexShrink: 0,
        }}
        loading="lazy"
      />
    ));
  };

  // Animation restart function for mouse leave event
  const restartAnimation = () => {
    if (!logosRef.current) return;
    
    const dimensions = getLogoDimensions(screenWidth);
    const totalLogoWidth = dimensions.logoWidth * 4 + dimensions.gap * 3;
    let translateX = 0;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const progress = (elapsed % (dimensions.animationSpeed * 1000)) / (dimensions.animationSpeed * 1000);
      translateX = -progress * totalLogoWidth;
      
      if (logosRef.current) {
        logosRef.current.style.transform = `translateX(${translateX}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

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
            <input 
              type="text" 
              name="name" 
              placeholder="Enter name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            
            <div className="phone-field">
              <select 
                className='phone_code' 
                name="countryCode" 
                value={formData.countryCode} 
                onChange={handleChange}
              >
                {Object.entries(countryCodes).map(([key, val]) => (
                  <option key={key} value={val}>+{val} ({key})</option>
                ))}
              </select>
              <input 
                className='phone' 
                type="text" 
                name="phone" 
                placeholder="Phone number" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <input 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />

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
        {/* FINAL LOGO ANIMATION - COMPLETELY CONTROLLED */}
        <div className="partners">
          <div className="brand-partners">
            <p style={{ 
              fontWeight: 600, 
              marginBottom: '2rem', 
              color: 'white', 
              textAlign: 'center' 
            }}>
              PARTNERED BY THE WORLD'S TOP BRANDS
            </p>
            <div style={{
              overflow: 'hidden',
              width: '100%',
              maxWidth: `${dimensions.containerMaxWidth}px`,
              margin: '0 auto',
              position: 'relative',
            }}>
              <div 
                ref={logosRef}
                style={{
                  display: 'flex',
                  gap: `${dimensions.gap}px`,
                  width: 'max-content',
                  willChange: 'transform',
                }}
                onMouseEnter={() => {
                  if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                  }
                }}
                onMouseLeave={restartAnimation}
              >
                {renderLogos()}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-top">
          <div className="logo-social">
            <img src={LogoImg} alt="BrandGoto Official Logo" />
            <div className="socials">
              <a href="https://x.com/Brand_goto" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/brand_goto/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
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