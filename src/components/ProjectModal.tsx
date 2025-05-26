import React from 'react';
import { motion } from 'framer-motion';

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    img: string;
  };
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <motion.div
      className="modal-overlay section-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <button onClick={onClose} className="close-btn">×</button>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <img src={project.img} alt={project.title} />
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
