import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  img: string;
  description: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
      duration: 0.15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.98,
    y: 5,
    rotate: 0
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      delay: i * 0.02
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    scale: 0.98,
    y: -5,
    rotate: -2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      delay: i * 0.01
    }
  })
};

const ProjectGrid: React.FC<{ 
  projects: Project[], 
  onCardClick: (project: Project, element: HTMLElement) => void 
}> = ({ projects, onCardClick }) => {
  // Shuffle projects array for random effect
  const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.length}
        className="project-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        {shuffledProjects.map((project, i) => (
          <motion.div
            className="project-card"
            key={project.id}
            custom={i}
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              rotate: 3,
              transition: { 
                type: "spring", 
                stiffness: 400,
                damping: 25,
                mass: 0.5
              }
            }}
            onClick={(e) => onCardClick(project, e.currentTarget)}
          >
            <img src={project.img} alt={project.title} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectGrid;
