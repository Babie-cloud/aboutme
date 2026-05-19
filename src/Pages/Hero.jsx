import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-24 md:px-20">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 font-serif text-lg italic text-red-400 md:text-xl"
          >
            Junior developer. Toulouse.
          </motion.p>

          <h1 className="font-serif text-[clamp(3.25rem,10vw,7.75rem)] leading-[0.9] tracking-tight text-white">
            Karlie_
            <br />
            <span className="italic text-zinc-400">Giona</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.65 }}
            className="mt-10 max-w-xl border-l-[3px] border-red-600/80 bg-white/[0.03] px-6 py-5 backdrop-blur-sm"
          >
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              Première année informatique à l&apos;ESGI Toulouse. Je prépare ensuite le{' '}
              <strong className="font-medium text-zinc-100">Bac+3 Concepteur développeur
              d&apos;applications</strong> à{' '}
              <strong className="font-medium text-zinc-100">Learn IT (Brest)</strong>, en alternance
              sur 2026–2027 avec un rythme entreprise / école qui me permet de passer du code livré aux
              cas réels du terrain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="bg-red-700 px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-red-600"
            >
              Contact
            </a>
            <a
              href="#repos"
              className="border border-white/20 px-7 py-3.5 text-[10px] uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-red-500/60 hover:text-red-400"
            >
              Dépôts GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-30"
      >
        <span className="text-[9px] uppercase tracking-widest text-zinc-500">Scroll</span>
        <ChevronDown size={14} className="text-zinc-500" />
      </motion.div>
    </section>
  );
}
