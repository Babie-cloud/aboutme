import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 pt-24 pb-16 bg-[#fdfcf8] dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden">

      {/* Grain texture subtil */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-red-600 dark:text-red-400 font-serif italic text-lg md:text-xl mb-5"
          >
            Développeuse Junior &amp; Poète · Toulouse
          </motion.p>

          <h1 className="font-serif text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.88] tracking-tight text-black dark:text-white mb-8">
            Karlie_<br />
            <span className="italic opacity-75">Giona</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="max-w-md text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-red-600 pl-4 mb-10 text-sm md:text-base"
          >
            Étudiante en 1ère année à l'ESGI Toulouse, je cherche une{' '}
            <span className="font-semibold text-black dark:text-white">alternance en développement web</span>{' '}
            pour la rentrée 2026. Je construis des interfaces qui ont une âme.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="px-7 py-3 bg-red-700 text-white text-[10px] uppercase tracking-widest hover:bg-red-800 transition-colors"
            >
              Me contacter
            </a>
            <a
              href="#projects"
              className="px-7 py-3 border border-black/25 dark:border-white/25 text-black dark:text-white text-[10px] uppercase tracking-widest hover:border-red-600 hover:text-red-600 dark:hover:text-red-400 dark:hover:border-red-400 transition-colors"
            >
              Mes projets
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-widest text-black dark:text-white">Scroll</span>
        <ChevronDown size={13} className="text-black dark:text-white" />
      </motion.div>
    </section>
  );
}