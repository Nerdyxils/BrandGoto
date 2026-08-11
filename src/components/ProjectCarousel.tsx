import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Keyboard, Navigation } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import './RecentProjects.css';
import CarouselCard from './ui/CarouselCard';
import type { CarouselProject } from '../data/projectData';

interface ProjectCarouselProps {
  projects: CarouselProject[];
  onCardClick: (project: CarouselProject, element: HTMLElement) => void;
  theme: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, onCardClick, theme }) => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const formatIndex = (index: number) => String(index + 1).padStart(2, '0');

  return (
    <div className={`project-carousel-container ${theme === 'dark' ? 'carousel-dark' : 'carousel-light'}`}>
      <div className="carousel-toolbar">
        <div className="carousel-position" aria-live="polite" aria-atomic="true">
          <span className="carousel-position-current">{formatIndex(activeIndex)}</span>
          <span className="carousel-position-rule" aria-hidden="true" />
          <span className="carousel-position-total">{String(projects.length).padStart(2, '0')}</span>
        </div>

        <div className="carousel-arrows">
          <button className="carousel-arrow carousel-arrow-prev" aria-label="Previous project">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="carousel-arrow carousel-arrow-next" aria-label="Next project">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveIndex(swiper.realIndex);
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[A11y, Navigation, Autoplay, Keyboard]}
        spaceBetween={32}
        slidesPerView={1.55}
        centeredSlides={true}
        loop={true}
        speed={950}
        grabCursor={true}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          nextEl: '.carousel-arrow-next',
          prevEl: '.carousel-arrow-prev',
        }}
        breakpoints={{
          320: { 
            slidesPerView: 1.08,
            spaceBetween: 14,
            centeredSlides: true
          },
          480: { 
            slidesPerView: 1.15,
            spaceBetween: 18,
            centeredSlides: true
          },
          768: { 
            slidesPerView: 1.32,
            spaceBetween: 24,
            centeredSlides: true
          },
          1024: { 
            slidesPerView: 1.55,
            spaceBetween: 32,
            centeredSlides: true
          },
          1440: {
            slidesPerView: 1.72,
            spaceBetween: 40,
            centeredSlides: true
          }
        }}
        className="project-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <CarouselCard
              className="carousel-project-card"
              label={`View project: ${project.title}`}
              onActivate={(element) => onCardClick(project, element)}
            >
              <picture>
                {project.avifSrcSet && (
                  <source type="image/avif" srcSet={project.avifSrcSet} sizes="(max-width: 767px) 92vw, (max-width: 1023px) 76vw, 64vw" />
                )}
                <img
                  src={project.img}
                  alt={project.title}
                  className="carousel-project-img"
                  width={project.width}
                  height={project.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <span className="carousel-project-overlay" aria-hidden="true" />
              <span className="carousel-project-index" aria-hidden="true">
                {String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, '0')}
              </span>
              <span className="carousel-project-copy">
                <span className="carousel-project-meta">{project.category} / {project.tech}</span>
                <span className="carousel-project-title">{project.title}</span>
                <span className="carousel-project-link">Explore case study <span aria-hidden="true">&#8599;</span></span>
              </span>
            </CarouselCard>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="carousel-progress" aria-hidden="true">
        <span
          className="carousel-progress-fill"
          style={{ transform: `scaleX(${(activeIndex + 1) / projects.length})` }}
        />
      </div>
    </div>
  );
};

export default ProjectCarousel;
