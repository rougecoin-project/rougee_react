import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HamburgerMenu.css'; // Import your CSS

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutFunction = () => {
    // Implement your logout logic here
    console.log('Logged out!');
  };

  return (
    <div className="hamburger-menu">
      <div className="hamburger-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      {isOpen && (
        <div className="menu-options">
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={logoutFunction}>Logout</button> {/* Keep as button if triggering logout function */}
        </div>
      )}
    </div>
  );
  
};

export default HamburgerMenu;
