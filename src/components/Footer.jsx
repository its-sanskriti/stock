import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Stock Analyzer. All rights reserved.
        </p>
        <div className="footer-social">
          <a target="_blank" rel="noopener noreferrer" className="social-link">
            Twitter
          </a>
          <a target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
          <a target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
