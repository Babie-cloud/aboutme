import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // On récupère la préférence enregistrée ou on met 'false' par défaut
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    // ÉLÉMENT CLÉ : On ajoute ou retire la classe .dark sur l'élément <html>
    // C'est ce qui permet aux classes "dark:bg-..." de Tailwind de fonctionner
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);