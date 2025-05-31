import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  // Extract name from email
  const getUsername = (email) => {
    return email?.split("@")[0];
  };

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
          {currentUser ? (
            <>
              <span className="nav-link">{getUsername(currentUser.email)}</span>
              <button onClick={handleLogout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="nav-link">
              Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
