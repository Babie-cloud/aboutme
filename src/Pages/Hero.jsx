import { motion } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';

export default function Hero() {
  const { isDarkMode } = useTheme();

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 overflow-hidden transition-colors duration-700 bg-[#fdfcf8] dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none paper-texture"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10"
      >
        <h2 className="text-2xl md:text-3xl mb-4 text-red-700 dark:text-red-500 font-serif italic">
          Dessinatrice & Comédienne
        </h2>

        <h1 className="font-serif text-7xl md:text-9xl leading-none tracking-tighter text-black dark:text-white transition-colors duration-700">
          KARLIE <br />
          <span className="italic opacity-80">GIONA</span>
        </h1>

        <p className="max-w-md mt-8 font-sans text-gray-600 dark:text-gray-400 leading-relaxed border-l-2 border-red-600 pl-4">
          Capturer l'essence du mouvement au crayon, et l'émotion du texte sur scène avec <span className="font-bold italic">Buja sans Tabou</span>.
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] top-[20%] w-[45%] opacity-20 dark:opacity-30 pointer-events-none"
      >
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800"
          alt="Sketch"
          className={`w-full h-auto transition-all duration-1000 ${isDarkMode ? 'invert brightness-200 grayscale' : 'mix-blend-multiply'}`}
        />
      </motion.div>
    </section>
  );
}