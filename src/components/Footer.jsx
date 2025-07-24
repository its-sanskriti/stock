// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub, FaChartLine } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-enhanced">
      <div className="footer-container">
        {/* Main content of the footer */}
        <div className="footer-main">
          <div className="footer-column footer-about">
            <Link to="/" className="footer-logo">
              <FaChartLine />
              <span>Stock Analyzer</span>
            </Link>
            <p>
              Your one-stop solution for stock market analysis, news, and
              data-driven insights.
            </p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/">Stock List</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Get In Touch</h4>
            <ul>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="mailto:support@stockanalyzer.com">
                  support@stockanalyzer.com
                </a>
              </li>
              {/* Optional: Add social links here if you prefer */}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest market updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom bar with copyright and social links */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Stock Analyzer. All Rights Reserved.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/SrigadaAkshayKumar/stock"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
