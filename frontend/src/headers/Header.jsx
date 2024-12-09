import { Link } from "react-router-dom";
import { useState } from "react";
import "../headers/header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Main Header */}
      <header className="navbar">
        <div className="logo">Db4Cloud Technologies</div>

        <div className="sign-in">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="user-icon-button"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Icon"
              className="user-icon"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="dropdown">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/signUp">Sign Up</Link>
              </li>
              <li>
                <Link to="/signIn">Sign In</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          )}
        </div>
      </header>

      {/* Second Navbar */}
      <div className="nav-container">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
    </>
  );
}

export default Header;
