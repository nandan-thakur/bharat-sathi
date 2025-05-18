import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Bharat Sathi - Data Explorer for data.gov.in</p>
        <div className="footer-links">
          <a href="https://www.data.gov.in/about-us" target="_blank" rel="noopener noreferrer">
            About data.gov.in
          </a>
          <span className="separator">|</span>
          <a href="https://www.data.gov.in/apis" target="_blank" rel="noopener noreferrer">
            API Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
