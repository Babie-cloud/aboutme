import { motion } from 'framer-motion';
import { useTheme } from '../Pages/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const TIMELINE = [
  {
    year: '2026',
    title: 'Alternance recherchée',
    desc: 'Développement web — ESGI Toulouse',
    current: true,
  },
  {
    year: '2025',
    title: '1ère année ESGI',
    desc: 'Bachelor Informatique, Toulouse. Algo, web, réseaux, bases de données.',
  },
  {
    year: '2024',
    title: 'Premiers projets perso',
    desc: 'Premiers repos GitHub, premières lignes React. La curiosité devient passion.',
  },
  {
    year: '2022',
    title: 'Découverte du code',
    desc: 'Premiers pas en HTML/CSS. Une porte ouverte sur un monde de créativité technique.',  

  },
];

export default function TheaterSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="about"
      className="relative py-28 md:py-40 bg-white dark:bg-[#0d0d0d] transition-colors duration-500 overflow-hidden"
    >
      {/* Image de fond floue */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none">
        <img
          src="/deux.jpg"
          alt=""
          aria-hidden
          className="w-full h-full object-cover blur-sm"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            isDarkMode
              ? 'from-[#0d0d0d] via-transparent to-[#0d0d0d]'
              : 'from-white via-transparent to-white'
          }`}
        />
      </div>

      <div className="relative z-10 px-6 md:px-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Texte gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-black dark:text-white"
          >
            <span className="font-serif italic text-red-600 dark:text-red-400 text-2xl block mb-3">
              02.
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
              À propos<br />
              <span className="italic opacity-75">de moi</span>
            </h2>

            <p className="text-base md:text-lg font-light leading-relaxed mb-5 opacity-70">
              Je suis <strong className="font-semibold opacity-100">Karlie Giona Cubahiro</strong>,
              étudiante en 1ère année d'informatique à l'ESGI de Toulouse.
              Je cherche une alternance en développement web pour construire
              des projets concrets — et apprendre sur le terrain.
            </p>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-70 mb-8">
              En dehors du code, je suis poète. J'écris des haïkus, je filme
              des moments avec mes amis, et je crois que la meilleure interface
              c'est celle qu'on ne remarque pas. La créativité est ce qui lie
              tout ça ensemble.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-600 dark:text-red-400 border-b border-red-600/40 pb-0.5 hover:border-red-600 transition-colors group"
            >
              Me contacter
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </motion.div>

          {/* Timeline droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            {/* Ligne verticale */}
            <div className="absolute left-3 top-2 bottom-2 w-px bg-black/10 dark:bg-white/10" />

            <div className="space-y-9">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="pl-10 relative"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-[9px] border transition-colors ${
                      item.current
                        ? 'bg-red-600 border-red-600 text-white'
                        : 'bg-white dark:bg-[#0d0d0d] border-black/20 dark:border-white/20'
                    }`}
                  >
                    {item.current ? '●' : ''}
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-red-600 dark:text-red-400 font-mono">
                    {item.year}
                  </span>
                  <h3 className="text-black dark:text-white font-medium mt-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div
        className={`mt-32 overflow-hidden whitespace-nowrap border-y py-7 ${
          isDarkMode ? 'border-white/8' : 'border-black/8'
        }`}
      >
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          {['EXPRESSION', 'LIBERTÉ', 'CODE & POÉSIE', 'MOUVEMENT', 'BUILD', 'CRÉER', 'INNOVER'].map(
            (text, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl font-serif italic mx-10 opacity-[0.07] text-black dark:text-white"
              >
                {text}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}