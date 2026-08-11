import React from 'react';
import '../components/RecentProjects.css';
import Modal from './ui/Modal';
import { Button } from './ui/Button';
import type { CarouselProject } from '../data/projectData';

interface ProjectModalProps {
  project: CarouselProject;
  onClose: () => void;
  triggerElement: HTMLElement | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, triggerElement }) => {
  return (
    <Modal
      isOpen
      onClose={onClose}
      labelledBy={`project-modal-title-${project.id}`}
      containerClassName="section-modal"
      panelClassName="modal-content"
      backdropClassName="section-modal-backdrop"
      restoreFocusTo={triggerElement}
    >
          <Button onClick={onClose} className="close-btn" aria-label="Close project details">×</Button>
          <h2 id={`project-modal-title-${project.id}`}>{project.title}</h2>
          <p>{project.description}</p>
          <picture>
            {project.avifSrcSet && <source type="image/avif" srcSet={project.avifSrcSet} sizes="(max-width: 768px) 90vw, 760px" />}
            <img src={project.img} alt={project.title} width={project.width} height={project.height} decoding="async" />
          </picture>
    </Modal>
  );
};

export default ProjectModal;
