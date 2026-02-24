import React, { memo, useCallback } from 'react';

const Navigation = memo(function Navigation({ navActive, toggleNav, closeNav, scrollToSection }) {
  return (
    <>
      {/* Left Side Navigation Button */}
      <button 
        className={`nav-menu-toggle ${navActive ? 'active' : ''}`}
        onClick={toggleNav}
        aria-label="Quick Navigation Menu" 
        title="Quick Navigation"
      >
        <div className="moon-icon"></div>
        <div className="nav-tooltip">Quick Navigation</div>
        <i className="fas fa-times close-icon"></i>
      </button>

      {/* Navigation Menu */}
      <nav className={`side-nav ${navActive ? 'active' : ''}`}>
        <div className="nav-content">
          <h3>Quick Navigation</h3>
          <ul className="nav-links">
            <li>
              <a href="#header" onClick={(e) => { e.preventDefault(); scrollToSection('header'); }}>
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="#certifications" onClick={(e) => { e.preventDefault(); scrollToSection('certifications'); }}>
                <i className="fas fa-certificate"></i> Certifications
              </a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
                <i className="fas fa-code"></i> Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                <i className="fas fa-project-diagram"></i> Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                <i className="fas fa-envelope"></i> Contact
              </a>
            </li>
          </ul>
          <div className="nav-footer">
            <p>Mukthar Basha</p>
            <p>Software Developer</p>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`nav-overlay ${navActive ? 'active' : ''}`}
        onClick={closeNav}
      ></div>
    </>
  );
});

export default Navigation;
