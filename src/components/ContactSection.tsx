import React, { useState, useEffect } from 'react';
import './ContactSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import patternBg from '../assets/Pattern.webp';
import ConfirmationModal from './ConfirmationModal';

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
  companyWebsite: string;
  services: string[];
  budget: string;
  countryCode: string;
}

interface ContactSectionProps {
  formSource?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ formSource }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    companyWebsite: '',
    services: [],
    budget: '',
    countryCode: '1',
  });
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

  // AI Intelligence Functions for Business Automation
  const calculateComplexityScore = (services: string[]): number => {
    const complexityMap: Record<string, number> = {
      "GTM Infrastructure (14-Day Launchpad)": 10,
      "Investor-Ready Brand Identity": 8,
      "Performance Web Engineering": 9,
      "AI Operations & Automation Audit": 7,
      "Fractional CTO & Strategic Support": 9
    };
    return services.reduce((total, service) => total + (complexityMap[service] || 5), 0);
  };

  const calculateProjectValue = (services: string[], budget: string): number => {
    // Use budget if available, otherwise calculate from services
    if (budget) {
      if (budget.includes('$10,000+')) return 10000;
      if (budget.includes('$5,500 - $8,500')) return 7000;
      if (budget.includes('$3,500 - $5,500')) return 4500;
    }
    
    const valueMap: Record<string, number> = {
      "GTM Infrastructure (14-Day Launchpad)": 5500,
      "Investor-Ready Brand Identity": 3500,
      "Performance Web Engineering": 8500,
      "AI Operations & Automation Audit": 5000,
      "Fractional CTO & Strategic Support": 10000
    };
    return services.reduce((total, service) => total + (valueMap[service] || 5000), 0);
  };

  const calculatePriorityLevel = (services: string[]): string => {
    if (services.length >= 3) return "High";
    if (services.includes("GTM Infrastructure (14-Day Launchpad)")) return "High";
    if (services.includes("Fractional CTO & Strategic Support")) return "High";
    if (services.includes("Performance Web Engineering")) return "High";
    return "Medium";
  };

  const getEmailTemplateId = (services: string[]): string => {
    if (services.length >= 3) return "comprehensive_package";
    if (services.includes("GTM Infrastructure (14-Day Launchpad)")) return "launchpad_focused";
    if (services.includes("Investor-Ready Brand Identity")) return "branding_focused";
    if (services.includes("Performance Web Engineering")) return "engineering_focused";
    if (services.includes("AI Operations & Automation Audit")) return "ai_ops_focused";
    if (services.includes("Fractional CTO & Strategic Support")) return "cto_focused";
    return "general_inquiry";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const formattedPhone = `+${formData.countryCode}${cleanedPhone}`;

    // Validate required fields
    if (!formData.name || !formData.name.trim()) {
      alert("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email || !formData.email.trim()) {
      alert("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.companyWebsite || !formData.companyWebsite.trim()) {
      alert("Please enter your company website or LinkedIn profile.");
      setIsSubmitting(false);
      return;
    }

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
    const projectValue = calculateProjectValue(formData.services, formData.budget);
    const priorityLevel = calculatePriorityLevel(formData.services);
    const templateId = getEmailTemplateId(formData.services);

    // Determine form source
    const detectedFormSource = formSource || 
      (window.location.pathname.includes('/launchpad') ? 'launchpad_footer' :
       window.location.pathname.includes('/engineering') ? 'engineering_footer' :
       window.location.pathname === '/' ? 'homepage_hero' : 'other');

    // Complete payload with all intelligence data for Make.com
    const payload = {
      email: formData.email,
      firstname: formData.name,
      phone: formattedPhone,
      company_website: formData.companyWebsite,
      services_selected: formData.services.join(';'),
      services_count: formData.services.length,
      primary_service: formData.services[0] || "General Inquiry",
      budget_range: formData.budget || "Not specified",
      service_complexity_score: complexityScore,
      estimated_project_value: projectValue,
      priority_level: priorityLevel,
      email_template_id: templateId,
      page_url: window.location.href,
      form_source: detectedFormSource,
      lead_source: "BrandGoto Website",
      consultation_status: "New Lead",
      requires_consultation: formData.services.length > 1 ? "Yes" : "No",
      automated_followup_enabled: "Yes",
      form_timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      browser_info: navigator.userAgent.substring(0, 100)
    };

    console.log("📦 Submitting complete intelligence data:", JSON.stringify(payload, null, 2));
    console.log("📋 Form data before submission:", formData);
    console.log("🔍 Form validation - Name:", formData.name, "Email:", formData.email, "Phone:", formData.phone);

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
        console.log("✅ Intelligence form data submitted successfully (localhost)");
        setShowConfirmationModal(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            companyWebsite: '',
            services: [],
            budget: '',
            countryCode: formData.countryCode,
          });
        }, 1000);
      } else {
        // For production (Netlify function), check the success field
        const result = await response.json();
        console.log("📥 Netlify function response:", result);
        
        if (!result.success) {
          throw new Error(result.error || 'Form submission failed');
        }

        console.log("✅ Intelligence form data submitted successfully (production)");
        setShowConfirmationModal(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            companyWebsite: '',
            services: [],
            budget: '',
            countryCode: formData.countryCode,
          });
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Form submission error:", err);
      alert("There was an error submitting the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const services: string[] = [
    'GTM Infrastructure (14-Day Launchpad)',
    'Investor-Ready Brand Identity',
    'Performance Web Engineering',
    'AI Operations & Automation Audit',
    'Fractional CTO & Strategic Support',
  ];

  const budgetOptions = [
    '$3,500 - $5,500',
    '$5,500 - $8,500',
    '$10,000+',
    'Not sure yet',
  ];


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

        <motion.h1 
          className="herotwo-heading"
          variants={fadeInUp}
        >
          <span>Start</span>
          <span>Conversation</span>
          <span>with</span>
          <span>Us</span>
        </motion.h1>

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
          <h3>Request Strategic Audit</h3>
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

            <input 
              type="text" 
              name="companyWebsite" 
              placeholder="Company Website / LinkedIn" 
              value={formData.companyWebsite} 
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

            <div className="budget-field">
              <label htmlFor="budget">Investment Range (USD)</label>
              <select 
                id="budget"
                name="budget" 
                value={formData.budget} 
                onChange={handleChange}
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Request Strategic Audit'}
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
          <img src="/images/client.webp" alt="Happy Client" />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;