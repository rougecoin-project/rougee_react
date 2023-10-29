import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaBell, FaUser } from "react-icons/fa";

const BottomNavbar = ({ onHomeClick }) => {

  const handleHomeClick = (e) => {
    if (onHomeClick) {
      onHomeClick();
    }
  };

  return (
    <div className="bottom-navbar">
      <Link to="/feed" className="bottom-nav-link" onClick={handleHomeClick}> {/* Use handleHomeClick here */}
        <FaHome size={24} />
      </Link>
      <Link to="/explore" className="bottom-nav-link">
        <FaSearch size={24} />
      </Link>
      <Link to="/notifications" className="bottom-nav-link">
        <FaBell size={24} />
      </Link>
      <Link to="/profile" className="bottom-nav-link">
        <FaUser size={24} />
      </Link>
    </div>
  );
};

export default BottomNavbar;
