import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/brandlogo-white.png';
import './Navbar.css';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const navLinks = ['About Us', 'Services', 'Success Stories'];

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="w-1/5 navbar-logo">
          <img src={Logo} alt="Logo" className="logoImg" />
        </div>

        {/* Nav Items - Desktop only */}
        <nav className="w-3/5 navbar-links">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="nav-link"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* CTA Button - Desktop only */}
        <div className="w-1/5 navbar-cta">
          <button className="cta-btn">Book a Free Consultation</button>
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
      {/* Dimmed Background Overlay */}
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
            animate={{ x: '40vw', opacity: 1 }}
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
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                >
                    {link}
                </a>
                ))}
            </div>

            {/* CTA - now sits directly under links */}
            <div className="mobile-menu-cta">
                <button className="cta-btn" onClick={() => setIsMenuOpen(false)}>
                Book a Free Consultation
                </button>
            </div>
        </motion.div>
    </>
  )}
</AnimatePresence>
    </header>
  );
};

export default Navbar;
