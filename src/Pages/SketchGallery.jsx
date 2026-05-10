import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, Feather, Video, Code2 } from 'lucide-react';

const personalityCards = [
  {
    id: 1,
    theme: 'poetry',
    label: 'Poésie',
    icon: Feather,
    accent: '#8b1a1a',
    mediaType: 'image',
    // Remplace par ton vrai chemin d'image
    mediaSrc: '/IMG_2235.jpeg',
    tagline: 'Les mots sont mon encre.',
    verse: `"Je garde les silences\ncomme on garde les lettres—\npliés, précieux, secrets."`,
    description:
      "La poésie, c'est ma façon de voir le monde autrement. Chaque mot posé sur la page est un monde qui s'ouvre.",
  },
  {
    id: 2,
    theme: 'fun',
    label: 'Vie & Amis',
    icon: Video,
    accent: '#c84b11',
    mediaType: 'video',
    mediaSrc: '/IMG_1906.mov',
    tagline: 'Filmer, rire, exister.',
    verse: `"Le meilleur montage\nc'est celui qu'on ne voit pas—\nla vraie vie, en direct."`,
    description:
      "J'aime capturer les moments vrais. Avec mes amis, chaque instant mérite d'être filmé, partagé, gardé.",
  },
  {
    id: 3,
    theme: 'tech',
    label: 'Développement',
    icon: Code2,
    accent: '#1a5c3a',
    mediaType: 'image',
    mediaSrc: '/terminal-dev.png',
    tagline: 'Builder, casser, recommencer.',
    verse: `"Un bug de plus,\nune leçon de plus—\nle terminal ne ment pas."`,
    description:
      "La tech, c'est mon terrain de jeu. Du terminal au déploiement, j'aime construire des choses qui fonctionnent.",
  },
];

// ─── Card individuelle ────────────────────────────────────────────────────────
function Card({ card, index, onSwipe, onExpand }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-14, 14]);
  const likeOpacity = useTransform(x, [40, 130], [0, 1]);
  const nopeOpacity = useTransform(x, [-130, -40], [1, 0]);

  // On distingue drag vs tap avec un ref
  const hasDragged = useRef(false);

  const Icon = card.icon;

  return (
    <motion.div
      drag={index === 0 ? 'x' : false}
      dragConstraints={{ left: -500, right: 500 }}
      dragElastic={0.12}
      onDragStart={() => {
        hasDragged.current = false;
      }}
      onDrag={(_, info) => {
        if (Math.abs(info.offset.x) > 6) hasDragged.current = true;
      }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100) {
          onSwipe(card.id);
        }
      }}
      onClick={() => {
        if (!hasDragged.current) onExpand(card);
      }}
      style={{
        x: index === 0 ? x : 0,
        rotate: index === 0 ? rotate : 0,
        zIndex: 10 - index,
      }}
      animate={{
        y: index * -8,
        scale: 1 - index * 0.04,
        opacity: index > 2 ? 0 : 1,
      }}
      exit={{
        x: 600,
        opacity: 0,
        rotate: 18,
        transition: { duration: 0.3 },
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      className={`absolute inset-0 ${
        index === 0 ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
    >
      <div className="w-full h-full rounded-sm overflow-hidden shadow-2xl bg-black select-none relative">

        {/* Media */}
        {card.mediaType === 'video' ? (
          <video
            src={card.mediaSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
            draggable={false}
          />
        ) : (
          <img
            src={card.mediaSrc}
            alt={card.label}
            className="w-full h-full object-cover opacity-85"
            draggable={false}
            onError={(e) => {
              // Fallback si l'image n'existe pas
              e.target.style.display = 'none';
            }}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Couleur de fond si pas d'image */}
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: card.accent + '33' }}
        />

        {/* Tag haut */}
        <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
            <Icon size={14} color="white" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/80 bg-black/25 backdrop-blur-sm px-2 py-1 rounded-full">
            {card.label}
          </span>
        </div>

        {/* Contenu bas */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="font-serif text-white text-xl leading-tight mb-1">{card.tagline}</p>
          <p className="font-serif italic text-white/55 text-xs leading-relaxed whitespace-pre-line line-clamp-2">
            {card.verse}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand(card);
            }}
            className="mt-3 text-[9px] uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors"
          >
            En savoir plus →
          </button>
        </div>

        {/* Indicateurs LIKE / NOPE */}
        {index === 0 && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-5 z-30 border-[3px] border-green-400 text-green-400 px-3 py-1 rotate-[-12deg] font-bold text-sm bg-black/30 backdrop-blur-sm rounded-sm"
            >
              LIKE ♥
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-5 z-30 border-[3px] border-red-400 text-red-400 px-3 py-1 rotate-[12deg] font-bold text-sm bg-black/30 backdrop-blur-sm rounded-sm"
            >
              NOPE
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Section principale ───────────────────────────────────────────────────────
export default function SketchGallery() {
  const [cards, setCards] = useState(personalityCards);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleSwipe = (id) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      return [...copy, removed];
    });
  };

  const currentCard = cards[0];

  return (
    <section
      id="sketches"
      className="relative py-20 md:py-28 min-h-screen flex flex-col items-center justify-center
                 bg-[#fdfcf8] dark:bg-[#0a0a0a] transition-colors duration-500 overflow-hidden px-4"
    >
      {/* Header */}
      <div className="z-10 text-center mb-12 relative">
        <span className="font-serif italic text-2xl md:text-3xl text-red-600 dark:text-red-400">
          01.
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-black dark:text-white mt-1 transition-colors">
          Qui suis-je ?
        </h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mt-3">
          Swipe pour explorer · Tap pour les détails
        </p>
      </div>

      {/* Stack de cartes */}
      <div className="relative w-full max-w-[300px] md:max-w-[340px] h-[460px] md:h-[500px] z-20">
        <AnimatePresence>
          {cards.slice(0, 3).map((card, idx) => (
            <Card
              key={card.id}
              card={card}
              index={idx}
              onSwipe={handleSwipe}
              onExpand={setExpandedCard}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Indicateurs points */}
      <div className="flex gap-2.5 mt-10 z-10">
        {personalityCards.map((c) => (
          <div
            key={c.id}
            className="rounded-full transition-all duration-400"
            style={{
              width: currentCard?.id === c.id ? 20 : 8,
              height: 8,
              backgroundColor: currentCard?.id === c.id ? c.accent : '#d1d5db',
            }}
          />
        ))}
      </div>

      {/* Modal détails */}
      <AnimatePresence>
        {expandedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setExpandedCard(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="bg-[#fdfcf8] dark:bg-[#141414] w-full md:max-w-lg rounded-t-2xl md:rounded-sm p-8 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedCard(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <expandedCard.icon
                  size={17}
                  style={{ color: expandedCard.accent }}
                />
                <span
                  className="font-serif italic text-sm"
                  style={{ color: expandedCard.accent }}
                >
                  {expandedCard.label}
                </span>
              </div>

              <p className="font-serif text-2xl text-black dark:text-white mb-4">
                {expandedCard.tagline}
              </p>
              <p
                className="font-serif italic text-sm leading-relaxed whitespace-pre-line border-l-2 pl-4 mb-6 text-gray-500 dark:text-gray-400"
                style={{ borderColor: expandedCard.accent }}
              >
                {expandedCard.verse}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {expandedCard.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}