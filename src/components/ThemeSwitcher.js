import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    // Toggle between 'light', 'dark', and 'terminal' themes
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('terminal');
    } else {
      setTheme('light');
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="theme-toggle"
        checked={theme !== 'light'} // Check if theme is not 'light'
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="toggle">
        <span>Toggle {theme === 'terminal' ? 'Terminal' : 'Dark'} mode</span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
