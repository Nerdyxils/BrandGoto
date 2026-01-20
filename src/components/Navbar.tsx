import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/brandlogo-white.png';
import './Navbar.css';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolled: boolean;
}

const navLinks = [
  { label: 'Launchpad', path: '/launchpad' },
  { label: 'Engineering', path: '/engineering' },
  { label: 'Case Studies', path: '/things-we-built' },
  { label: 'About Us', path: '/about-us' },
];

const homeLink = { label: 'Home', path: '/' };

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      // If already on home page, refresh the page
      window.location.reload();
    } else {
      // If on other pages, navigate to home and scroll to top
      scrollToTop();
    }
  };

  // Create navigation links array - include Home only when not on home page
  const currentNavLinks = isHomePage ? navLinks : [homeLink, ...navLinks];

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="w-1/5 navbar-logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logo} alt="BrandGoto Official Logo" className="logoImg" />
          </Link>
        </div>

        {/* Nav Items - Desktop only */}
        <nav className="w-3/5 navbar-links">
          {currentNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={scrollToTop}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop only */}
        <div className="w-1/5 navbar-cta">
          <Link to="/book-consultation" onClick={scrollToTop}>
            <button className="cta-btn">Book a Free Consultation</button>
          </Link>
        </div>

        {/* Hamburger Menu - Mobile only */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-backdrop"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '30vw', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-menu enhanced"
            >
              <div className="mobile-menu-header">
                <button onClick={() => setIsMenuOpen(false)}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="close-menu-btn"
                  >
                    <path 
                      d="M18 6L6 18M6 6L18 18" 
                      stroke="#fff" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="mobile-menu-links">
                {currentNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      scrollToTop();
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-cta">
                <Link to="/book-consultation" onClick={() => {
                  setIsMenuOpen(false);
                  scrollToTop();
                }}>
                  <button className="cta-btn">Book a Free Consultation</button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
