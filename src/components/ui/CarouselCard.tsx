import React from 'react';
import { motion } from 'framer-motion';

interface CarouselCardProps {
  children: React.ReactNode;
  className: string;
  label: string;
  onActivate: (element: HTMLElement) => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ children, className, label, onActivate }) => (
  <motion.button
    type="button"
    className={`interactive-control ${className}`}
    aria-label={label}
    onClick={(event) => onActivate(event.currentTarget)}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
  >
    {children}
  </motion.button>
);

export default CarouselCard;
