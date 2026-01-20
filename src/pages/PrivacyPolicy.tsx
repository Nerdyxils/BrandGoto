import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import '../components/Hero.css';
import { seoConfig } from '../seo/seoConfig';

const PrivacyPolicy: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-gray-900">
      <SEO {...seoConfig.privacyPolicy} />
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        isScrolled={isScrolled} 
      />
      <ScrollToTop />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="pt-20"
      >
        {/* Privacy Policy Content */}
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-300">
              Effective Date: 01 January 2025
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="prose prose-lg max-w-none">
            <div className="bg-gray-800 rounded-lg p-8 space-y-8 text-gray-300">
              
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p className="mb-4">
                  BrandGoto ("we," "our," "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you interact with our website, services, and communications.
                </p>
                <p>
                  By using our services, you consent to the practices described in this Privacy Policy, which complies with applicable privacy laws in the United States and other jurisdictions where we operate.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p className="mb-4">
                  We collect personal and business information necessary to deliver our services. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, billing/shipping address.</li>
                  <li><strong>Business Information:</strong> Company name, industry, branding assets, project details.</li>
                  <li><strong>Payment Information:</strong> Limited billing details (processed securely via third-party payment providers; we do not store full credit card information).</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, website usage data (via cookies, analytics tools).</li>
                  <li><strong>Communications:</strong> Emails, chat messages, forms, or calls with our team.</li>
                </ul>
                <p>
                  We only collect information directly from you unless otherwise authorized by law.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">
                  We use your personal information to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Deliver and manage our services (branding, design, development, automation).</li>
                  <li>Respond to inquiries, provide quotes, and manage client relationships.</li>
                  <li>Process payments and maintain accurate billing records.</li>
                  <li>Improve our website, user experience, and service offerings.</li>
                  <li>Provide marketing communications, newsletters, or offers (with your consent).</li>
                  <li>Comply with legal, tax, and regulatory obligations.</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Disclosure of Information</h2>
                <p className="mb-4">
                  We may share information with trusted third parties only as necessary:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong>Service Providers & Partners:</strong> Hosting, payment processors, CRM/automation platforms (e.g., HubSpot, MailerLite, Make.com), cloud storage, or subcontractors who assist in delivering projects.</li>
                  <li><strong>Legal Obligations:</strong> Where disclosure is required by law, regulation, court order, or government request.</li>
                  <li><strong>Business Transactions:</strong> In the event of a merger, acquisition, or sale of assets, provided safeguards remain in place.</li>
                </ul>
                <p>
                  All third parties are contractually required to handle your information securely and in compliance with privacy laws.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Consent</h2>
                <p className="mb-4">
                  We rely on your consent to collect, use, and disclose your personal information, except where permitted or required by law. Consent may be express (e.g., when you check a box or sign a contract) or implied (e.g., when you provide your details for a project quote).
                </p>
                <p>
                  You may withdraw your consent at any time, subject to legal or contractual restrictions, by contacting us at <a href="mailto:hello@brandgoto.com" className="text-blue-400 hover:text-blue-300">hello@brandgoto.com</a>.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
                <p>
                  We retain personal information only as long as necessary for the purposes outlined in this policy, to meet legal obligations, or to resolve disputes. Once no longer required, information will be securely destroyed or anonymized.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Security Measures</h2>
                <p>
                  We implement reasonable physical, administrative, and technical safeguards to protect your information against loss, theft, unauthorized access, disclosure, alteration, or misuse. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies & Tracking</h2>
                <p className="mb-4">
                  Our website uses cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Improve user experience and website performance.</li>
                  <li>Analyze traffic via tools such as Google Analytics.</li>
                  <li>Deliver personalized ads or retargeting campaigns.</li>
                </ul>
                <p>
                  You can manage cookie preferences in your browser settings, though some features may not function properly if disabled.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
                <p>
                  If we transfer personal information across borders (for example, to U.S.-based cloud providers), we ensure appropriate safeguards are in place to protect your information in compliance with applicable law.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Your Rights</h2>
                <p className="mb-4">
                  As a client or website user, you have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Access the personal information we hold about you.</li>
                  <li>Request corrections to inaccurate or incomplete information.</li>
                  <li>Withdraw consent for certain uses of your data.</li>
                  <li>Request deletion of your data, subject to legal/contractual limits.</li>
                  <li>File a complaint with the appropriate data protection authority if you believe your rights have been violated.</li>
                </ul>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected such information, please contact us for deletion.
                </p>
              </div>

              {/* Section 12 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. Updates will be posted on our website with a revised effective date. We encourage you to review it regularly.
                </p>
              </div>

              {/* Section 13 */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Us</h2>
                <p className="mb-4">
                  If you have questions, concerns, or requests related to this Privacy Policy or your personal information, please contact us:
                </p>
                <div className="bg-gray-700 rounded-lg p-6">
                  <p className="font-semibold text-white mb-2">BrandGoto</p>
                  <p className="mb-2">
                    <strong>Email:</strong> <a href="mailto:hello@brandgoto.com" className="text-blue-400 hover:text-blue-300">hello@brandgoto.com</a>
                  </p>
                  <p className="mb-2">
                    <strong>Phone:</strong> <a href="tel:+16479377031" className="text-blue-400 hover:text-blue-300">+1 (647) 937 7031</a>
                  </p>
                  <p>
                    <strong>Address:</strong> Remote-First | Global
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
