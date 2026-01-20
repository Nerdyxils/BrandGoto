import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
import './RecentProjects.css';

// Define Project interface locally
interface Project {
  id: number;
  title: string;
  img: string;
  description: string;
}

const fadeInUp = {
  hidden: { opacity: 1, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

interface ProjectCarouselProps {
  projects: Project[];
  onCardClick: (project: Project, element: HTMLElement) => void;
  theme: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onCardClick, theme }) => {
  const swiperRef = useRef<any>(null);

  return (
    <div className={`project-carousel-container ${theme === 'dark' ? 'carousel-dark' : 'carousel-light'}`}>  
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2.2}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.carousel-arrow-next',
          prevEl: '.carousel-arrow-prev',
        }}
        breakpoints={{
          320: { 
            slidesPerView: 1.1,
            spaceBetween: 16,
            centeredSlides: true
          },
          480: { 
            slidesPerView: 1.3,
            spaceBetween: 18,
            centeredSlides: true
          },
          768: { 
            slidesPerView: 1.8,
            spaceBetween: 20,
            centeredSlides: true
          },
          1024: { 
            slidesPerView: 2.2,
            spaceBetween: 24,
            centeredSlides: true
          }
        }}
        className="project-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <motion.div
              className="carousel-project-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={e => onCardClick(project, e.currentTarget)}
              tabIndex={0}
              role="button"
              aria-label={`View project: ${project.title}`}
            >
              <img 
                src={project.img} 
                alt={project.title} 
                className="carousel-project-img"
                loading="lazy"
              />
              <h3 className="carousel-project-title">
                {project.title}
              </h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <div className="carousel-arrows">
        <button className="carousel-arrow carousel-arrow-prev" aria-label="Previous project">
          ←
        </button>
        <button className="carousel-arrow carousel-arrow-next" aria-label="Next project">
          →
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel; 