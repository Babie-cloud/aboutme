import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const controls = useAnimation();

  // Animation de rebond quand on change de mode
  useEffect(() => {
    controls.start({
      y: [0, 15, 0],
      transition: { duration: 0.4, ease: "easeOut" }
    });
  }, [isDarkMode, controls]);

  return (
    <div className="fixed top-0 right-12 z-[100] flex flex-col items-center">
      {/* Le fil de la lampe */}
      <motion.div 
        animate={controls}
        className="w-[2px] h-32 md:h-40 bg-gray-400 dark:bg-gray-600 origin-top relative shadow-lg"
      >
        {/* L'abat-jour (La Lampe) */}
        <div className="absolute -bottom-8 -left-[14px] w-8 h-10">
          {/* Forme de l'abat-jour en CSS */}
          <div className={`w-full h-6 bg-gray-300 dark:bg-gray-700 rounded-t-lg border-b-2 border-gray-400 dark:border-gray-500 transition-colors duration-500 ${isDarkMode ? '' : 'shadow-[0_0_20px_rgba(255,255,100,0.8)]'}`}></div>
          <div className={`w-10 h-4 -ml-1 rounded-b-full transition-all duration-500 ${isDarkMode ? 'bg-gray-800' : 'bg-yellow-200 shadow-[0_10px_20px_rgba(255,255,150,0.5)]'}`}></div>
          
          {/* L'ampoule (lueur) */}
          {!isDarkMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.6, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-100 rounded-full blur-sm"
            />
          )}
        </div>

        {/* Le cordon à tirer */}
        <motion.div 
          onClick={toggleTheme}
          whileHover={{ scale: 1.2, cursor: 'pointer' }}
          whileTap={{ y: 30 }}
          className="absolute -bottom-20 -left-2 w-5 h-5 bg-red-600 rounded-full border-2 border-white dark:border-gray-800 shadow-xl flex items-center justify-center group"
        >
          <div className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform"></div>
        </motion.div>
      </motion.div>

      {/* Étiquette Vintage */}
      <motion.span 
        className="mt-24 text-[10px] font-serif italic text-gray-500 dark:text-gray-400 tracking-widest uppercase vertical-text"
        style={{ writingMode: 'vertical-rl' }}
      >
        {isDarkMode ? "Éteindre" : "Allumer"}
      </motion.span>
    </div>
  );
}