import React, { memo } from 'react';

const Header = memo(function Header({ scrollToSection }) {
  return (
    <header className="header">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">SHAIK MUKTHAR BASHA: Software Developer</h1>
            <p className="hero-description">
              Dedicated Software Engineer with expertise in C, Java, and Python, building efficient, user-centered solutions.
            </p>
            <div className="hero-buttons">
              <a 
                href="#contact" 
                className="btn btn-secondary" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                <i className="fas fa-envelope"></i> Contact Me
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-photo">
              <img 
                src="/images/passport image.png" 
                alt="Shaik Mukthar Basha" 
                className="profile-img"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
