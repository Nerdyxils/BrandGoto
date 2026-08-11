import React, { useState, useEffect } from 'react';
import ProjectStats from './ProjectStats';
import ProjectCarousel from './ProjectCarousel';
import ProjectModal from './ProjectModal';
import './RecentProjects.css';
import { LinkButton } from './ui/Button';
import { projects, toCarouselProject, type CarouselProject } from '../data/projectData';

const recentProjects = projects.map(toCarouselProject);

const RecentProjects: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [activeProject, setActiveProject] = useState<CarouselProject | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('light-mode')) setTheme('light');
    else setTheme('dark');
    const observer = new MutationObserver(() => {
      if (root.classList.contains('light-mode')) setTheme('light');
      else setTheme('dark');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleProjectClick = (project: CarouselProject, element: HTMLElement) => {
    setTriggerElement(element);
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
    setTriggerElement(null);
  };

  return (
    <section className="recent-projects section-standard">
      <div className="recent-projects-vertical">
        {/* Intro and Stats at the top */}
        <ProjectStats />
        {/* Full-width Carousel below */}
        <ProjectCarousel
          projects={recentProjects}
          onCardClick={handleProjectClick}
          theme={theme}
        />
        {/* Modal Popup */}
        {activeProject && (
          <ProjectModal 
            project={activeProject} 
            onClose={handleCloseModal}
            triggerElement={triggerElement}
          />
        )}

        {/* CTA Buttons */}
        <div className="cta-buttons-container text-center mt-16">
          <div className="flex flex-row gap-4 justify-center items-center">
            <LinkButton to="/book-consultation" onClick={scrollToTop} className="cta-btn-primary">
              Ready to Start Your Project?
            </LinkButton>
            <LinkButton to="/things-we-built" onClick={scrollToTop} className="cta-btn-secondary">
              Browse Our Work
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
