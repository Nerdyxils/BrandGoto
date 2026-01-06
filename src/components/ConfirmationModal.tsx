import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  contextMessage?: string;
  thankYouMessage?: string;
  confirmationMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  title = "Get Your",
  subtitle = "Launch Started",
  contextMessage = "Tell us about your project and we'll get back to you within 24 hours.",
  thankYouMessage = "Thank You!",
  confirmationMessage = "We've received your request and will contact you within 24 hours."
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="confirmation-modal-container">
          {/* Backdrop */}
          <motion.div
            className="confirmation-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="confirmation-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              className="confirmation-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="confirmation-modal-content">
              {/* Title */}
              <div className="confirmation-modal-title">
                <span className="title-text">{title}</span>
                <span className="title-highlight">{subtitle}</span>
              </div>

              {/* Context Message */}
              <p className="confirmation-modal-context">
                {contextMessage}
              </p>

              {/* Success Icon */}
              <div className="confirmation-modal-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="24" fill="#10B981" />
                  <path
                    d="M16 24L21 29L32 18"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Thank You Message */}
              <h2 className="confirmation-modal-thanks">
                {thankYouMessage}
              </h2>

              {/* Confirmation Message */}
              <p className="confirmation-modal-confirmation">
                {confirmationMessage}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
