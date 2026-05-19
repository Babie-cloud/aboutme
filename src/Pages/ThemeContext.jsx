import { useEffect } from 'react';

/** Always-on dark presentation (no toggle). */
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    try {
      localStorage.setItem('theme', 'dark');
    } catch {
      /* ignore */
    }
  }, []);
  return children;
}
