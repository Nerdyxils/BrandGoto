import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title, subtitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  React.useEffect(() => {
    // Inject FAQPage structured data
    const existingScript = document.querySelector('script[type="application/ld+json"][data-faq="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-faq', 'true');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-faq="true"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return (
    <section className="faq-section" aria-label="Frequently Asked Questions">
      {(title || subtitle) && (
        <div className="faq-header">
          {subtitle && <span className="faq-subtitle">{subtitle}</span>}
          {title && <h2 className="faq-title">{title}</h2>}
        </div>
      )}

      <div className="faq-container">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
                type="button"
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="faq-answer-content">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
