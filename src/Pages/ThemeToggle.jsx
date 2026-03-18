import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';
import { useEffect } from 'react';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const controls = useAnimation();

  const handlePull = () => {
    toggleTheme();
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (_) {}
  };

  // Animation de rebond du fil quand on tire
  useEffect(() => {
    controls.start({
      y: [0, 20, 0],
      transition: { duration: 0.4, ease: "easeOut" }
    });
  }, [isDarkMode, controls]);

  return (
    <div className="fixed top-0 right-8 md:right-12 z-[100] flex flex-col items-center">
      {/* Zone cliquable large : toute la lampe + cordon */}
      <motion.div
        animate={controls}
        onClick={handlePull}
        whileTap={{ scale: 0.97 }}
        className="relative w-16 h-56 md:h-64 cursor-pointer flex flex-col items-center select-none"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Le fil de la lampe */}
        <div className="w-[1.5px] h-32 md:h-48 bg-gray-400 dark:bg-gray-600 origin-top flex-shrink-0" />

        {/* L'abat-jour + lampe */}
        <div className="absolute top-28 md:top-32 -left-[14px] w-8 h-12 flex flex-col items-center pointer-events-none">
          <div className="w-6 h-3 bg-gray-400 dark:bg-gray-800 rounded-t-sm" />
          <div className={`w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-b-lg border-b-4 transition-all duration-500 ${
            isDarkMode
              ? 'border-gray-800 shadow-none'
              : 'border-yellow-400 shadow-[0_10px_40px_rgba(255,255,100,0.6)]'
          }`} />
          <div className={`absolute bottom-1 w-4 h-4 rounded-full blur-md transition-opacity duration-500 ${
            isDarkMode ? 'opacity-0' : 'opacity-100 bg-yellow-200'
          }`} />
        </div>

        {/* Cordon à tirer (visuel) */}
        <div className="absolute -bottom-4 -left-2 w-5 h-8 flex flex-col items-center pointer-events-none">
          <div className="w-[1px] h-full bg-gray-400 dark:bg-gray-600 mx-auto" />
          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white dark:border-gray-900 shadow-lg -mt-1" />
        </div>
      </motion.div>

      {/* Texte vertical */}
      <div className="mt-2 overflow-hidden pointer-events-none">
        <motion.span
          initial={false}
          animate={{ y: isDarkMode ? 0 : 5 }}
          className="text-[9px] font-serif italic text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase block"
          style={{ writingMode: 'vertical-rl' }}
        i18n>
          {isDarkMode ? "Allumer la lumière" : "Éteindre la scène"}
        </motion.span>
      </div>
    </div>
  );
}