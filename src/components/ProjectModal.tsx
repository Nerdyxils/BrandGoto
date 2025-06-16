import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/RecentProjects.css';

interface Project {
  id: number;
  title: string;
  img: string;
  description: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  triggerElement: HTMLElement | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="section-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="close-btn">×</button>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <img src={project.img} alt={project.title} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
