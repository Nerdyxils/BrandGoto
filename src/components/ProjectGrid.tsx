import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  img: string;
  description: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const ProjectGrid: React.FC<{ projects: Project[], onCardClick: (p: Project) => void }> = ({ projects, onCardClick }) => {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <motion.div
          className="project-card"
          key={project.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.05, rotate: 0.5 }}
          viewport={{ once: true }}
          onClick={() => onCardClick(project)}
        >
          <img src={project.img} alt={project.title} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectGrid;
