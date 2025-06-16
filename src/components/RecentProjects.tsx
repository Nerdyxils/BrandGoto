import React, { useState, useRef } from 'react';
import ProjectStats from './ProjectStats';
import ProjectGrid from './ProjectGrid';
import ProjectModal from './ProjectModal';
import './RecentProjects.css';

const RecentProjects: React.FC = () => {
    type Project = {
    id: number;
    title: string;
    img: string;
    description: string;
  };

  const [selectedTab, setSelectedTab] = useState<'recent' | 'all'>('recent');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

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
      id: 1, 
      title: 'Prodex – Inventory & Product Management System (MERN Stack)', 
      img: '/images/projectA.png', 
      description: 'Built a comprehensive inventory and product management system using the MERN stack. The platform allows businesses to track stock levels, manage product listings, and generate reports. Developed an intuitive dashboard with role-based authentication, real-time data updates, and CRUD operations. Optimized for scalability and seamless user experience.' 
    },
    { 
      id: 2, 
      title: 'CoinVers (React, Python, Django, Restful APIs)', 
      img: '/images/projectB.png', 
      description: 'Developed a cryptocurrency tracking and analytics platform using React for the frontend and Django with Django REST Framework for the backend. Implemented real-time price updates, interactive charts, user authentication, and portfolio tracking. Integrated third-party APIs for fetching live cryptocurrency data and built a scalable architecture for high-performance data handling.' 
    },
    { 
      id: 3, 
      title: "Dala (React + Next.js paired with GSAP's ScrollTrigger)", 
      img: '/images/Dala.png', 
      description: 'Developed a fancy landing page with fancy smooth scroll.' 
    },
    { 
      id: 4, 
      title: 'Jayo - A tech consulting firm', 
      img: '/images/projectE.png', 
      description: 'We proudly delivered a fully functional, high-performance ReactJS website for JAYO, a forward-thinking tech consulting firm based in the USA.' 
    },
    { 
      id: 5, 
      title: 'Multi-featured Shopping site (Vue, Django)', 
      img: '/images/projectF.png', 
      description: 'Developed a modern e-commerce platform using Vue.js for the frontend and Django for the backend. The platform included user authentication, product catalog management, a shopping cart, and secure payment integration. I optimized the frontend for performance and responsiveness while implementing a scalable Django REST API for seamless data flow. Additionally, I integrated third-party services for payment processing and order tracking, ensuring a smooth user experience.' 
    },
    { 
      id: 8, 
      title: 'BizWorld (WordPress)', 
      img: '/images/projectG.png', 
      description: 'Designed and developed a dynamic business news and blog website using WordPress. Implemented a custom theme with optimized performance, SEO-friendly architecture, and a responsive design. Integrated third-party plugins for analytics, social media sharing, and newsletter subscriptions. Ensured smooth content management with a customized WordPress admin panel.' 
    }
  ];

  const allProjects = [
    ...recentProjects,
    { 
      id: 6, 
      title: 'Christ Apostolic Church First in the Americas', 
      img: '/images/projectD.png', 
      description: 'A beautifully crafted, fully functional WordPress website, thoughtfully designed and delivered to a vibrant Church organization, empowering their community to connect, engage, and grow with seamless navigation, inspiring content, and a heavenly user experience.' 
    },
    { 
      id: 7, 
      title: 'Covenant Children Ministry (ReactJs, Netlify, EmailJs)', 
      img: '/images/projectC.png', 
      description: 'A One pager functional website and brand design for a non-profit children ministry using ReactJs. We deliver to both profit and non-profit organizations.' 
    },
    { 
      id: 9, 
      title: 'Project H', 
      img: '/images/projectH.png', 
      description: "We had the privilege of crafting a stunning, fully functional WordPress website for Apostolic Church, Goshen Assembly—a sacred space where faith and community unite. This tailor-made digital sanctuary was designed to inspire, connect, and uplift, offering seamless navigation, heartfelt content, and a divine user experience that resonates with their congregation. At the heart of our mission, we proudly serve both profit and non-profit organizations, delivering exceptional solutions that bring your vision to life. No matter the scope of your project, we've got you covered with creativity, expertise, and unwavering dedication!" 
    }
  ];

  return (
    <section className="recent-projects">
      <div className="projects-layout">
        {/* Left Panel */}
        <ProjectStats selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Right Grid */}
        <ProjectGrid
          projects={selectedTab === 'recent' ? recentProjects : allProjects}
          onCardClick={handleProjectClick}
        />

        {/* Modal Popup */}
        {activeProject && (
          <ProjectModal 
            project={activeProject} 
            onClose={handleCloseModal}
            triggerElement={triggerElement}
          />
        )}
      </div>
    </section>
  );
};

export default RecentProjects;
