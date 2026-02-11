import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectStats from './ProjectStats';
import ProjectCarousel from './ProjectCarousel';
import ProjectModal from './ProjectModal';
import './RecentProjects.css';

const RecentProjects: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  type Project = {
    id: number;
    title: string;
    img: string;
    description: string;
  };

  const [activeProject, setActiveProject] = useState<Project | null>(null);
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

  const handleProjectClick = (project: Project, element: HTMLElement) => {
    setTriggerElement(element);
    setActiveProject(project);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
    setTriggerElement(null);
  };

  const recentProjects = [
    { 
      id: 9, 
      title: 'OddLogic – High-Performance Predictive Engine',
      img: '/images/oddlogic.png',
      description: 'How we architected a high-performance predictive engine for OddLogic. We designed a resilient data architecture for real-time sports feeds, mapped system logic for prediction orchestration, and deployed venture-scale infrastructure capable of handling high-traffic demand without performance degradation.'
    },
    { 
      id: 1, 
      title: 'Prodex – Inventory & Product Management System (MERN Stack)', 
      img: '/images/projectA.webp', 
      description: 'Built a comprehensive inventory and product management system using the MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports. Developed an intuitive dashboard with role-based authentication, real-time data updates, and CRUD operations. Optimized for scalability and seamless user experience.' 
    },
    { 
      id: 2, 
      title: 'CoinVers (React, Python, Django, Restful APIs)', 
      img: '/images/projectB.webp', 
      description: 'Developed a cryptocurrency tracking and analytics platform using React for the frontend and Django with Django REST Framework for the backend. Implemented real-time price updates, interactive charts, user authentication, and portfolio tracking. Integrated third-party APIs for fetching live cryptocurrency data and built a scalable architecture for high-performance data handling.' 
    },
    { 
      id: 3, 
      title: "Dala (React + Next.js paired with GSAP's ScrollTrigger)", 
      img: '/images/Dala.webp', 
      description: 'Developed a fancy landing page with fancy smooth scroll.' 
    },
    { 
      id: 4, 
      title: 'Jayo - ReactJs, NextJs, Tailwind, Framer Motion', 
      img: '/images/projectE.webp', 
      description: 'We proudly delivered a fully functional, high-performance ReactJS website for JAYO, a forward-thinking tech consulting firm based in the USA.' 
    },
    { 
      id: 5, 
      title: 'Multi-featured Shopping site (Vue, Django)', 
      img: '/images/projectF.webp', 
      description: 'Developed a modern e-commerce platform using Vue.js for the frontend and Django for the backend. The platform included user authentication, product catalog management, a shopping cart, and secure payment integration. I optimized the frontend for performance and responsiveness while implementing a scalable Django REST API for seamless data flow. Additionally, I integrated third-party services for payment processing and order tracking, ensuring a smooth user experience.' 
    },
    { 
      id: 8, 
      title: 'BizWorld (WordPress)', 
      img: '/images/projectG.webp', 
      description: 'Designed and developed a dynamic business news and blog website using WordPress. Implemented a custom theme with optimized performance, SEO-friendly architecture, and a responsive design. Integrated third-party plugins for analytics, social media sharing, and newsletter subscriptions. Ensured smooth content management with a customized WordPress admin panel.' 
    }
  ];

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
            <Link to="/book-consultation" onClick={scrollToTop}>
              <button className="cta-btn-primary">
                Ready to Start Your Project?
              </button>
            </Link>
            <Link to="/things-we-built" onClick={scrollToTop}>
              <button className="cta-btn-secondary">
                Browse Our Work
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;
