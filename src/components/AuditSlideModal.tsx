import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AuditSlideModal.css';
import Modal from './ui/Modal';
import { Button } from './ui/Button';

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="audit-modal-heading"
      containerClassName={`audit-slide-modal-container ${isMobile ? 'audit-slide-modal-container--mobile' : ''}`}
      panelClassName={`audit-slide-modal-panel ${isMobile ? 'audit-slide-modal-panel--mobile' : ''}`}
      backdropClassName="audit-slide-modal-backdrop"
    >
            {isMobile && (
              <div className="audit-slide-modal-drag-handle" aria-hidden="true" />
            )}
            <Button
              type="button"
              className="audit-slide-modal-close"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Button>
            <div className="audit-slide-modal-content">
              <h2 id="audit-modal-heading" className="audit-slide-modal-headline">
                Is your website a billboard or a system?
              </h2>
              <p className="audit-slide-modal-subtext">
                Most sites look good but don't convert. We build GTM infrastructure that turns visitors into leads.
              </p>
              <Link to="/book-consultation" className="audit-slide-modal-cta" onClick={onClose}>
                Strategic GTM Audit
              </Link>
            </div>
    </Modal>
  );
};

export default AuditSlideModal;
