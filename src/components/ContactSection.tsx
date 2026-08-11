import React, { useState, useEffect } from 'react';
import './ContactSection.css';
import { motion } from 'framer-motion';
import patternBg from '../assets/Pattern.webp';
import ConfirmationModal from './ConfirmationModal';
import { FieldLabel, SelectField } from './ui/FormField';
import { budgetOptions, buildLeadPayload, countryCodes, emptyLeadForm, LEAD_ENDPOINT, services, validateLeadForm, type LeadFormData } from '../features/leads/leadForm';

interface ContactSectionProps {
  formSource?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ formSource }) => {
  const [formData, setFormData] = useState<LeadFormData>(emptyLeadForm());
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    const validation = validateLeadForm(formData);
    if (validation.error) {
      alert(validation.error);
      setIsSubmitting(false);
      return;
    }

    // Determine form source
    const detectedFormSource = formSource || 
      (window.location.pathname.includes('/launchpad') ? 'launchpad_footer' :
       window.location.pathname.includes('/engineering') ? 'engineering_footer' :
       window.location.pathname === '/' ? 'homepage_hero' : 'other');

    // Complete payload with all intelligence data for Make.com
    const payload = buildLeadPayload(formData, detectedFormSource, 'BrandGoto Website');

    console.log("📦 Submitting complete intelligence data:", JSON.stringify(payload, null, 2));
    console.log("📋 Form data before submission:", formData);
    console.log("🔍 Form validation - Name:", formData.name, "Email:", formData.email, "Phone:", formData.phone);

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

      setTimeout(() => {
        setFormData(emptyLeadForm(formData.countryCode));
      }, 1000);
    } catch (err) {
      console.error("❌ Form submission error:", err);
      alert("There was an error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };



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

  return (
    <section className="contact-section" style={{
      backgroundImage: `url(${patternBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>


      <motion.div
        className="section-header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.span
          className="section-subtitle"
          variants={fadeInUp}
        >
          Let's Make It Happen
        </motion.span>

        <motion.h2
          className="herotwo-heading"
          variants={fadeInUp}
        >
          <span>Start</span>
          <span>Conversation</span>
          <span>with</span>
          <span>Us</span>
        </motion.h2>

        <motion.p
          className="section-description"
          variants={fadeInUp}
        >
          Have a project in mind? We'd love to hear about it.
        </motion.p>
      </motion.div>

      <motion.div
        className="contact-wrapper"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="form-content">
          <h2>Strategic GTM Audit</h2>
          <form onSubmit={handleSubmit}>
            <FieldLabel htmlFor="contact-name" className="sr-only">Name</FieldLabel>
            <input 
              id="contact-name"
              type="text" 
              name="name" 
              placeholder="Enter name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            
            <div className="phone-field">
              <SelectField
                id="contact-country-code"
                label="Country calling code"
                labelClassName="sr-only"
                className='phone_code' 
                name="countryCode" 
                value={formData.countryCode} 
                onChange={handleChange}
              >
                {Object.entries(countryCodes).map(([key, val]) => (
                  <option key={key} value={val}>+{val} ({key})</option>
                ))}
              </SelectField>
              <FieldLabel htmlFor="contact-phone" className="sr-only">Phone number</FieldLabel>
              <input 
                id="contact-phone"
                className='phone' 
                type="text" 
                name="phone" 
                placeholder="Phone number" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>

            <FieldLabel htmlFor="contact-email" className="sr-only">Email address</FieldLabel>
            <input
              id="contact-email"
              type="email" 
              name="email" 
              placeholder="Enter email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />

            <FieldLabel htmlFor="contact-company" className="sr-only">Company website or LinkedIn profile</FieldLabel>
            <input
              id="contact-company"
              type="text" 
              name="companyWebsite" 
              placeholder="Company Website / LinkedIn" 
              value={formData.companyWebsite} 
              onChange={handleChange} 
              required 
            />

            <fieldset>
              <legend className="services-title">What do you need help with? (Select all that apply)</legend>
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
            </fieldset>

            <div className="budget-field">
              <SelectField
                id="contact-budget"
                label="Investment Range (USD)"
                name="budget" 
                value={formData.budget} 
                onChange={handleChange}
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </SelectField>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Strategic GTM Audit'}
            </button>
          </form>
        </div>
        
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

        <div className="form-image">
          <img src="/images/client.webp" alt="Happy Client" width="622" height="519" loading="lazy" decoding="async" />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
