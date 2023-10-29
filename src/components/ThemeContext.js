import { createContext } from 'react';

const defaultTheme = localStorage.getItem('theme') || 'light';

export const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: theme => {
    localStorage.setItem('theme', theme);
  }
});
