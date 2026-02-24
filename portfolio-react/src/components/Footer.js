import React, { memo } from 'react';

const Footer = memo(function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Shaik Mukthar Basha. All rights reserved.</p>
        <p className="footer-note">Made with React</p>
      </div>
    </footer>
  );
});

export default Footer;
