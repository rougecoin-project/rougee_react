import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import UserProfile from './components/Profile/UserProfile';
import Feed from './components/Posts/Feed';
import logo from './assets/images/logo.png';
import HamburgerMenu from './components/HamburgerMenu';
import ExplorePage from './components/ExplorePage';
import BottomNavbar from './components/BottomNavbar';
import { ThemeContext } from './components/ThemeContext';
import  ThemeSwitcher  from './components/ThemeSwitcher';

function App() {
  // Fetch the initial theme from local storage or default to 'light'
  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);

  // Save the theme to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [refreshFeed, setRefreshFeed] = useState(false);

  const handleRefreshFeed = () => {
    setRefreshFeed(!refreshFeed);  // Toggle the refreshFeed state
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className={`App ${theme}`}> {/* This will help in applying theme-specific styles */}
          <div className="navbar-container">
            <img src={logo} alt="RouGee Logo" className="logo" />
            <HamburgerMenu />
            <ThemeSwitcher />
          </div>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
          <BottomNavbar onHomeClick={handleRefreshFeed} />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
