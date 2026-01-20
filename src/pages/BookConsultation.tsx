import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import ConfirmationModal from '../components/ConfirmationModal';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/ContactSection.css';

const BookConsultation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    services: string[];
    countryCode: string;
  }>({
    name: '',
    phone: '',
    email: '',
    services: [],
    countryCode: '1',
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const services: string[] = [
    'Website Design & Development',
    'Digital Marketing',
    'Brand Identity & Logo Design',
    'Graphic Design',
    'Domain & Business Email Setup',
    'Creative Direction & Strategy',
  ];
  
  // MENU AND SCROLL HANDLERS
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 1, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
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

    // Prevent double submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const formattedPhone = `+${formData.countryCode}${cleanedPhone}`;

    // Validate phone number
    if (!cleanedPhone || cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      alert("Please enter a valid phone number (7-15 digits).");
      setIsSubmitting(false);
      return;
    }

    if (!/^\+\d+$/.test(formattedPhone)) {
      alert("Invalid phone number format. It must start with '+' followed by digits only.");
      setIsSubmitting(false);
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
      lead_source: "BrandGoto Website - Book Consultation",
      consultation_status: "New Lead",
      requires_consultation: formData.services.length > 1 ? "Yes" : "No",
      automated_followup_enabled: "Yes",
      form_timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      browser_info: navigator.userAgent.substring(0, 100)
    };

    console.log("📦 Submitting complete intelligence data:", JSON.stringify(payload, null, 2));

    try {
        const endpoint =
          window.location.hostname === "localhost"
            ? import.meta.env.VITE_MAKE_WEBHOOK_URL || "https://hook.us2.make.com/2jhecx0f9v8buiu1so1pwk8jc73qi5h1"
            : "/.netlify/functions/form-submit";

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      // For localhost (direct webhook), we don't get a JSON response with success field
      if (window.location.hostname === "localhost") {
        console.log("✅ Intelligence form data submitted successfully");
        setShowConfirmationModal(true);
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          services: [],
          countryCode: formData.countryCode,
        });
      } else {
        // For production (Netlify function), check the success field
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Form submission failed');
        }

        console.log("✅ Intelligence form data submitted successfully");
        setShowConfirmationModal(true);
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          services: [],
          countryCode: formData.countryCode,
        });
      }
    } catch (err) {
      console.error("❌ Form submission error:", err);
      alert("There was an error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="scroll-container">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />
      <motion.div
        className="main-content"
         
         
      >
        {/* Hero Section */}
        <section className="hero-section section-standard">
          <div className="hero-background" />
          
          <div className="container">
            <motion.div
              className="section-header"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="section-subtitle" variants={fadeInUp}>
                Book a Free Consultation
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Let's</span>
                <span>Create</span>
                <span>Something</span>
                <span>Amazing</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                Tell us about your project and we'll come prepared with ideas, strategy, and a clear roadmap to success!
              </motion.p>
            </motion.div>
          </div>
        </section>
  
                {/* Creative Consultation Section */}
        <section className="section-black">
          <div className="container">

            <motion.div
              className="creative-consultation-wrapper"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Left Side - Creative Content */}
              <motion.div 
                className="consultation-content"
                variants={fadeInUp}
              >
                <div className="content-header">
                  <motion.div 
                    className="floating-icon"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <i className="fas fa-magic"></i>
                  </motion.div>
                  <p className="consultation-subtitle">
                    Ready to transform your vision into reality? Let's start the conversation that will change everything.
                  </p>
                </div>

                <div className="consultation-features">
                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div className="feature-text">
                      <h4>Free Strategy Session</h4>
                      <p>30-minute deep dive into your goals and vision</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <i className="fas fa-route"></i>
                    </div>
                    <div className="feature-text">
                      <h4>Custom Roadmap</h4>
                      <p>Detailed project plan tailored to your needs</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <i className="fas fa-coins"></i>
                    </div>
                    <div className="feature-text">
                      <h4>Investment Range</h4>
                      <p>Clear pricing structure and timeline</p>
                    </div>
                  </motion.div>
                </div>

                <div className="consultation-stats">
                  <motion.div 
                    className="stat-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="stat-number">24h</span>
                    <span className="stat-label">Response Time</span>
                  </motion.div>
                  <motion.div 
                    className="stat-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Free Consultation</span>
                  </motion.div>
                  <motion.div 
                    className="stat-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Happy Clients</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Form */}
              <motion.div 
                className="consultation-form-container"
                variants={fadeInUp}
              >
                <div className="form-card">
                  <div className="form-header">
                    <div className="form-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <h3>Start Your Journey</h3>
                    <p>Tell us about your project and we'll create magic together</p>
                  </div>

                  <form onSubmit={handleSubmit} className="creative-form">
                    <div className="form-field-group">
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                        />
                        <div className="input-icon">
                          <i className="fas fa-user"></i>
                        </div>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <div className="phone-input-wrapper">
                        <select 
                          className='country-select' 
                          name="countryCode" 
                          value={formData.countryCode} 
                          onChange={handleChange}
                        >
                          {Object.entries(countryCodes).map(([key, val]) => (
                            <option key={key} value={val}>+{val} ({key})</option>
                          ))}
                        </select>
                        <input 
                          className='phone-input' 
                          type="text" 
                          name="phone" 
                          placeholder="Phone number" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <div className="input-wrapper">
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="Your email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                        />
                        <div className="input-icon">
                          <i className="fas fa-envelope"></i>
                        </div>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="services-label">What do you need help with?</label>
                      <div className="services-grid-form">
                        {services.map((service) => (
                          <label key={service} className="service-checkbox">
                            <input
                              type="checkbox"
                              name="services"
                              value={service}
                              checked={formData.services.includes(service)}
                              onChange={handleChange}
                            />
                            <span className="checkbox-custom"></span>
                            <span className="service-text">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <motion.button 
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Start Your Project'}</span>
                      <div className="btn-icon">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </motion.button>
                  </form>
                  
                  {/* Confirmation Modal */}
                  <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    title="Get Your"
                    subtitle="Launch Started"
                    contextMessage="Tell us about your project and we'll get back to you within 24 hours."
                    thankYouMessage="Thank You!"
                    confirmationMessage="We've received your request and will contact you within 24 hours."
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default BookConsultation;

// Creative Consultation Styles
const styles = `
  .scroll-container {
    margin: 0;
    padding: 0;
    background: #000000;
  }

  .main-content {
    margin: 0;
    padding: 0;
    background: #000000;
  }

  .section-black {
    background: #000000;
    color: white;
    padding: 4rem 0;
    margin: 0;
    width: 100%;
    overflow: hidden;
  }

  .section-black .container {
    padding: 0 1rem;
    margin: 0 auto;
  }

  .main-content > *:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .creative-consultation-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .consultation-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .content-header {
    position: relative;
  }

  .floating-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
    color: #F75F0B;
  }

  .floating-icon i {
    font-size: 3rem;
  }

  .consultation-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 1.5rem;
  }



  .consultation-subtitle {
    font-size: 1.25rem;
    color: #cccccc;
    line-height: 1.6;
    max-width: 400px;
  }

  .consultation-features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(247, 95, 11, 0.3);
    transform: translateY(-2px);
  }

  .feature-icon {
    font-size: 2rem;
    flex-shrink: 0;
    color: #F75F0B;
  }

  .feature-icon i {
    font-size: 2rem;
  }

  .feature-text h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.25rem;
  }

  .feature-text p {
    font-size: 0.9rem;
    color: #cccccc;
    margin: 0;
  }

  .consultation-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .stat-item:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(47, 160, 181, 0.3);
  }

  .stat-number {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #F75F0B;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #cccccc;
    font-weight: 500;
  }

  .consultation-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 3rem;
    backdrop-filter: blur(20px);
    width: 100%;
    max-width: 500px;
    position: relative;
    overflow: hidden;
  }

  .form-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(247, 95, 11, 0.1), rgba(47, 160, 181, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .form-card:hover::before {
    opacity: 1;
  }

  .form-header {
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .form-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #F75F0B;
  }

  .form-icon i {
    font-size: 3rem;
  }

  .form-header h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  .form-header p {
    color: #cccccc;
    font-size: 1rem;
  }

  .creative-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-field-group {
    position: relative;
  }

  .input-wrapper {
    position: relative;
  }

  .input-wrapper input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .input-wrapper input:focus {
    outline: none;
    border-color: #F75F0B;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(247, 95, 11, 0.1);
  }

  .input-wrapper input::placeholder {
    color: #999999;
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    pointer-events: none;
    color: #999999;
  }

  .input-icon i {
    font-size: 1.2rem;
  }

  .phone-input-wrapper {
    display: flex;
    gap: 0.5rem;
  }

  .country-select {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 0.9rem;
    min-width: 120px;
    transition: all 0.3s ease;
  }

  .country-select:focus {
    outline: none;
    border-color: #F75F0B;
  }

  .phone-input {
    flex: 1;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .phone-input:focus {
    outline: none;
    border-color: #F75F0B;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(247, 95, 11, 0.1);
  }

  .services-label {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  .services-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .service-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .service-checkbox:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(247, 95, 11, 0.3);
  }

  .service-checkbox input[type="checkbox"] {
    display: none;
  }

  .checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    position: relative;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .service-checkbox input[type="checkbox"]:checked + .checkbox-custom {
    background: #F75F0B;
    border-color: #F75F0B;
  }

  .service-checkbox input[type="checkbox"]:checked + .checkbox-custom::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  .service-text {
    font-size: 0.9rem;
    color: #ffffff;
    font-weight: 500;
  }

  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1.25rem;
    background: linear-gradient(135deg, #F75F0B, #E0540A);
    border: none;
    border-radius: 12px;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  .submit-btn:hover::before {
    left: 100%;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(247, 95, 11, 0.3);
  }

  .btn-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }

  .btn-icon i {
    font-size: 1.2rem;
  }

  .submit-btn:hover .btn-icon {
    transform: translateX(4px);
  }

  .form-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #F75F0B;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1rem;
    z-index: 1000;
    box-shadow: 0 8px 24px rgba(247, 95, 11, 0.4);
    text-align: center;
    max-width: 450px;
  }

  @media (max-width: 1024px) {
    .creative-consultation-wrapper {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .consultation-title {
      font-size: 2.5rem;
    }

    .consultation-stats {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .creative-consultation-wrapper {
      gap: 2rem;
      padding: 1rem 0;
    }

    .consultation-title {
      font-size: 2rem;
    }

    .form-card {
      padding: 2rem;
    }

    .consultation-stats {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .phone-input-wrapper {
      flex-direction: column;
    }

    .country-select {
      min-width: auto;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
