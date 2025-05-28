import React from 'react';
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
  { label: 'About Us', id: 'about-us' },
  { label: 'How we Help', id: 'services' },
  { label: 'Things we Built', id: 'recent-projects' },
  { label: 'Team', id: 'team' },
  { label: 'Success Stories', id: 'success-stories' },
];


const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => {
  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="w-1/5 navbar-logo">
          <img src={Logo} alt="Logo" className="logoImg" />
        </div>

        {/* Nav Items - Desktop only */}
        <nav className="w-3/5 navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button - Desktop only */}
        <div className="w-1/5 navbar-cta">
          <a href="#contact">
            <button className="cta-btn">Book a Free Consultation</button>
          </a>
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
                  <X size={28} color="#fff" />
                </button>
              </div>

              {/* Nav Items */}
              <div className="mobile-menu-links">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="mobile-menu-cta">
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  <button className="cta-btn">
                    Book a Free Consultation
                  </button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
