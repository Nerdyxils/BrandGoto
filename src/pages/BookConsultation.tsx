import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConfirmationModal from '../components/ConfirmationModal';
import { FieldLabel, SelectField } from '../components/ui/FormField';
import SEO from '../components/SEO';
import '../components/Hero.css';
import '../components/Herotwo.css';
import '../components/ContactSection.css';
import { seoConfig } from '../seo/seoConfig';
import FaIcon from '../components/FaIcon';
import { budgetOptions, buildLeadPayload, countryCodes, emptyLeadForm, LEAD_ENDPOINT, services, validateLeadForm, type LeadFormData } from '../features/leads/leadForm';

const BookConsultation: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>(emptyLeadForm());

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    const validation = validateLeadForm(formData, true);
    if (validation.error) {
      alert(validation.error);
      setIsSubmitting(false);
      return;
    }

    // Determine form source
    const formSource = 'book_consultation_page';

    // Complete payload with all intelligence data for Make.com
    const payload = buildLeadPayload(formData, formSource, 'BrandGoto Website - Strategic GTM Audit');

    console.log("📦 Submitting complete intelligence data:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Form submission failed');
      }

      console.log("✅ Intelligence form data submitted successfully");
      setShowConfirmationModal(true);

      setFormData(emptyLeadForm(formData.countryCode));
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
      <SEO {...seoConfig.bookConsultation} />
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
                Strategic GTM Audit
              </motion.span>

              <motion.h1 className="herotwo-heading" variants={fadeInUp}>
                <span>Strategic</span>
                <span>GTM</span>
                <span>Audit</span>
              </motion.h1>

              <motion.p className="section-description" variants={fadeInUp}>
                Tell us about your project, scope, and goals so we can assess the right GTM Infrastructure fit.
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
                    <FaIcon name="magic" />
                  </motion.div>
                  <p className="consultation-subtitle">
                    Use the audit to assess scope across GTM Infrastructure, the 14-Day Launchpad, or a Fractional CTO & Engineering Retainer.
                  </p>
                </div>

                <div className="consultation-features">
                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <FaIcon name="rocket" />
                    </div>
                    <div className="feature-text">
                      <p className="feature-title">Strategic GTM Audit</p>
                      <p>Focused review of your goals, scope, and current infrastructure</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <FaIcon name="route" />
                    </div>
                    <div className="feature-text">
                      <p className="feature-title">Custom Roadmap</p>
                      <p>Detailed project plan tailored to your needs</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="feature-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="feature-icon">
                      <FaIcon name="coins" />
                    </div>
                    <div className="feature-text">
                      <p className="feature-title">Investment Range</p>
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
                    <span className="stat-number">Focused</span>
                    <span className="stat-label">Scope Review</span>
                  </motion.div>
                  <motion.div 
                    className="stat-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="stat-number">Clear</span>
                    <span className="stat-label">Offer Fit</span>
                  </motion.div>
                  <motion.div 
                    className="stat-item"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="stat-number">Practical</span>
                    <span className="stat-label">Next Steps</span>
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
                      <FaIcon name="comments" />
                    </div>
                    <h2>Strategic GTM Audit</h2>
                    <p>Tell us about your project, current infrastructure, and goals</p>
                  </div>

                  <form onSubmit={handleSubmit} className="creative-form">
                    <div className="form-field-group">
                      <FieldLabel htmlFor="consultation-name" className="sr-only">Name</FieldLabel>
                      <div className="input-wrapper">
                        <input 
                          id="consultation-name"
                          type="text" 
                          name="name" 
                          placeholder="Your name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                        />
                        <div className="input-icon">
                          <FaIcon name="user" />
                        </div>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <div className="phone-input-wrapper">
                        <SelectField
                          id="consultation-country-code"
                          label="Country calling code"
                          labelClassName="sr-only"
                          className='country-select' 
                          name="countryCode" 
                          value={formData.countryCode} 
                          onChange={handleChange}
                        >
                          {Object.entries(countryCodes).map(([key, val]) => (
                            <option key={key} value={val}>+{val} ({key})</option>
                          ))}
                        </SelectField>
                        <FieldLabel htmlFor="consultation-phone" className="sr-only">Phone number</FieldLabel>
                        <input 
                          id="consultation-phone"
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
                      <FieldLabel htmlFor="consultation-email" className="sr-only">Email address</FieldLabel>
                      <div className="input-wrapper">
                        <input 
                          id="consultation-email"
                          type="email" 
                          name="email" 
                          placeholder="Your email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                        />
                        <div className="input-icon">
                          <FaIcon name="envelope" />
                        </div>
                      </div>
                    </div>

                    <div className="form-field-group">
                      <FieldLabel htmlFor="consultation-company" className="sr-only">Company website or LinkedIn profile</FieldLabel>
                      <div className="input-wrapper">
                        <input 
                          id="consultation-company"
                          type="text" 
                          name="companyWebsite" 
                          placeholder="Company Website / LinkedIn" 
                          value={formData.companyWebsite} 
                          onChange={handleChange} 
                          required 
                        />
                        <div className="input-icon">
                          <FaIcon name="globe" />
                        </div>
                      </div>
                    </div>

                    <fieldset className="form-field-group">
                      <legend className="services-label">What do you need help with?</legend>
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
                    </fieldset>

                    <div className="form-field-group">
                      <div className="input-wrapper">
                        <SelectField
                          id="consultation-budget"
                          label="Investment Range (USD)"
                          labelClassName="services-label"
                          name="budget" 
                          value={formData.budget} 
                          onChange={handleChange}
                          className="budget-select"
                        >
                          <option value="">Select budget range</option>
                          {budgetOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </SelectField>
                        <div className="input-icon">
                          <FaIcon name="dollar-sign" />
                        </div>
                      </div>
                    </div>

                    <motion.button 
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Strategic GTM Audit'}</span>
                      <div className="btn-icon">
                        <FaIcon name="arrow-right" />
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
    overflow-x: hidden;
    box-sizing: border-box;
  }

  .section-black .container {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
  }

  .main-content > *:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .creative-consultation-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 100%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 0;
    box-sizing: border-box;
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

  .feature-text .feature-title {
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

  .form-header h2 {
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
    border-width: 1px;
  }

  .budget-select {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1rem;
    transition: all 0.3s ease;
    appearance: none;
    cursor: pointer;
  }

  .budget-select:focus {
    outline: none;
    border-color: #F75F0B;
    background: rgba(255, 255, 255, 0.12);
    border-width: 1px;
  }

  .budget-select option {
    background: #1a1a1a;
    color: white;
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
    border-width: 1px;
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
    background: #F75F0B;
    border: 1px solid #F75F0B;
    border-radius: 12px;
    color: #000000;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .submit-btn:hover {
    background: #ff8555;
    border-color: #ff8555;
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
    border: 1px solid #F75F0B;
    font-weight: 500;
    font-size: 1rem;
    z-index: 1000;
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
    .section-black .container {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }

    .creative-consultation-wrapper {
      gap: 2rem;
      padding: 1rem 0;
      max-width: 100%;
    }

    .consultation-content {
      width: 100%;
      max-width: 100%;
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
