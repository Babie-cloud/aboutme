import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 md:right-10 z-[100] w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      style={{
        background: isDarkMode ? '#1a1a1a' : '#fdfcf8',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
        boxShadow: isDarkMode
          ? '0 2px 16px rgba(0,0,0,0.5)'
          : '0 2px 16px rgba(0,0,0,0.08)',
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.08 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Sun size={18} className="text-yellow-400" strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Moon size={18} className="text-gray-600" strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}