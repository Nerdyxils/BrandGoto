import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './AuditSlideModal.css';

const MOBILE_BREAKPOINT = 768;

interface AuditSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Desktop: right-edge slide-in panel.
 * Mobile: bottom sheet (slides up from bottom, ~55% height) so flow is less disrupted.
 * Boutique Lab: Matte Black / Orange / Teal, no gradients/shadows.
 */
const AuditSlideModal: React.FC<AuditSlideModalProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const panelVariants = isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
      }
    : {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={`audit-slide-modal-container ${isMobile ? 'audit-slide-modal-container--mobile' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="audit-modal-heading"
        >
          <motion.div
            className="audit-slide-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className={`audit-slide-modal-panel ${isMobile ? 'audit-slide-modal-panel--mobile' : ''}`}
            initial={panelVariants.initial}
            animate={panelVariants.animate}
            exit={panelVariants.exit}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMobile && (
              <div className="audit-slide-modal-drag-handle" aria-hidden="true" />
            )}
            <button
              type="button"
              className="audit-slide-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="audit-slide-modal-content">
              <h2 id="audit-modal-heading" className="audit-slide-modal-headline">
                Is your website a billboard or a system?
              </h2>
              <p className="audit-slide-modal-subtext">
                Most sites look good but don't convert. We build GTM infrastructure that turns visitors into leads.
              </p>
              <Link to="/book-consultation" className="audit-slide-modal-cta" onClick={onClose}>
                Free Technical Audit
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuditSlideModal;
