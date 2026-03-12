import { motion } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';

export default function TheaterSection() {
  const { isDarkMode } = useTheme();

  return (
    <section id="theater" className="relative py-36 md:py-44 transition-colors duration-700 bg-white dark:bg-[#0d0d0d] overflow-hidden">
      {/* Background Image avec Overlay adaptable */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1920"
          alt="Stage background"
          className="w-full h-full object-cover blur-[2px]"
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-[#0d0d0d] via-transparent to-[#0d0d0d]' : 'from-white via-transparent to-white'}`}></div>
      </div>

      <div className="relative z-10 px-8 md:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-black dark:text-white"
          >
            <span className="font-serif italic text-2xl text-red-600 block mb-4">02.</span>
            <h2 className="font-serif text-6xl md:text-8xl mb-8 leading-tight">
              Buja sans <br /> <span className="italic">Tabou</span>
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed mb-8 opacity-70">
              Le théâtre est mon autre langage. Avec la troupe, nous brisons les silences et explorons l'humain dans toute sa complexité.
            </p>
            <button className="px-8 py-3 border border-black/20 dark:border-white/20 rounded-full text-xs uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all">
              Voir les pièces
            </button>
          </motion.div>

          <div className="relative aspect-[4/5] md:aspect-square">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className={`w-full h-full border p-4 backdrop-blur-sm transition-colors ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}
            >
              <img
                src="https://images.unsplash.com/photo-1503073321235-ef4a1b3fe9ad?q=80&w=800"
                alt="Performance"
                className={`w-full h-full object-cover transition-all duration-1000 grayscale hover:grayscale-0 ${isDarkMode ? 'brightness-75' : ''}`}
              />
              <div className="absolute -bottom-6 -right-6 bg-red-700 p-8 hidden md:block shadow-2xl">
                <p className="font-serif italic text-2xl text-white">"Le corps ne ment jamais."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className={`mt-40 overflow-hidden whitespace-nowrap border-y py-8 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="inline-block text-black dark:text-white"
        >
          {["EXPRESSION", "LIBERTÉ", "BUJA SANS TABOU", "MOUVEMENT", "VÉRITÉ"].map((text, i) => (
            <span key={i} className="text-4xl md:text-7xl font-serif italic mx-12 opacity-10">{text}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}