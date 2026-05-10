import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../Pages/ThemeContext';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 focus:outline-none bg-white dark:bg-[#1a1a1a] border-black/15 dark:border-white/15 hover:border-red-500 dark:hover:border-red-500"
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      aria-label={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} className="text-yellow-400" strokeWidth={1.5} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={15} className="text-gray-500" strokeWidth={1.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}