import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../assets/brandlogo-white.webp';
import './Navbar.css';
import { Button, LinkButton } from './ui/Button';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolled: boolean;
}

const navLinks = [
  { label: '14-Day Launchpad', path: '/launchpad' },
  { label: 'Fractional CTO & Engineering Retainer', path: '/engineering' },
  { label: 'Blog', path: '/blog' },
  { label: 'Case Studies', path: '/things-we-built' },
  { label: 'About Us', path: '/about-us' },
];

const homeLink = { label: 'Home', path: '/' };

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isLinkActive = (path: string) =>
    path === '/blog' ? location.pathname === '/blog' || location.pathname.startsWith('/blog/') : location.pathname === path;

  const closeMenu = () => setIsMenuOpen(false);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHomePage) event.preventDefault();
    closeMenu();
    scrollToTop();
  };

  // Create navigation links array - include Home only when not on home page
  const currentNavLinks = isHomePage ? navLinks : [homeLink, ...navLinks];

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="w-1/5 navbar-logo">
          <Link to="/" onClick={handleLogoClick}>
            <img src={Logo} alt="BrandGoto Official Logo" className="logoImg" width="406" height="482" />
          </Link>
        </div>

        {/* Nav Items - Desktop only */}
        <nav className="w-3/5 navbar-links">
          {currentNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
              onClick={scrollToTop}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop only */}
        <div className="w-1/5 navbar-cta">
          <LinkButton to="/book-consultation" onClick={scrollToTop} className="cta-btn">Strategic GTM Audit</LinkButton>
        </div>

        {/* Hamburger Menu - Mobile only */}
        <Button
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={40} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="mobile-menu-layer">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mobile-menu-backdrop"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Slide-in Panel */}
            <motion.aside
              id="mobile-navigation"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-menu enhanced"
              aria-label="Mobile navigation"
              aria-modal="true"
            >
              <div className="mobile-menu-header">
                <Button className="menu-toggle-close" onClick={closeMenu} aria-label="Close navigation menu">
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
                </Button>
              </div>

              <div className="mobile-menu-links">
                {currentNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`mobile-nav-link ${isLinkActive(link.path) ? 'active' : ''}`}
                    onClick={() => {
                      closeMenu();
                      scrollToTop();
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mobile-menu-cta">
                <LinkButton to="/book-consultation" className="cta-btn" onClick={() => {
                  closeMenu();
                  scrollToTop();
                }}>
                  Strategic GTM Audit
                </LinkButton>
              </div>
            </motion.aside>
          </div>
      )}
    </header>
  );
};

export default Navbar;
