// src/components/Header.js
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Use NavLink for active styles
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this path is correct
import { FaChartLine, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    setIsMenuOpen(false); // Close menu on logout
  };

  // Function to close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getUsername = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          <FaChartLine className="logo-icon" />
          <span className="logo-text">Stock Analyzer</span>
        </Link>

        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-links ${isMenuOpen ? "nav-open" : ""}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>
            Home
          </NavLink>

          {/* === ADDED LINKS START HERE === */}
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
            Contact
          </NavLink>
          {/* === ADDED LINKS END HERE === */}

          {currentUser ? (
            <>
              <span className="nav-link-welcome">
                Hi, {getUsername(currentUser.email)}
              </span>
              <button onClick={handleLogout} className="nav-link-button">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;