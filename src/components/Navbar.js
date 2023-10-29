import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const handleHomeReload = (e) => {
    e.preventDefault();  // Prevent the default behavior of the link
    window.location.href = '/';  // Navigate to Home
    window.location.reload();  // Perform a hard reload
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        RouGee
      </Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link" onClick={handleHomeReload}>
          Home
        </Link>
        <Link to="/explore" className="navbar-link">
          Explore
        </Link>
        <Link to="/notifications" className="navbar-link">
          Notifications
        </Link>
        <Link to="/profile" className="navbar-link">
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
