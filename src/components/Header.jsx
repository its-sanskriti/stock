import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Stock Analyzer</h1>
        <nav className="header-nav">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/" className="nav-link">
            About
          </a>
          <a href="/" className="nav-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
