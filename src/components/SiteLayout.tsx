import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

const SiteLayout: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 1100) setIsMenuOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let frameId = 0;
    const update = () => {
      frameId = 0;
      const next = window.scrollY > 10;
      setIsScrolled((current) => current === next ? current : next);
    };
    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="site-layout scroll-container bg-black">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} isScrolled={isScrolled} />
      <ScrollToTop />
      <main id="main-content" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SiteLayout;
