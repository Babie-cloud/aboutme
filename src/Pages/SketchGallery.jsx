import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, Info } from 'lucide-react';
import { sketches } from '../data/sketches';

// URL du portrait final (celui que tu as envoyé).
// Tu peux remplacer cette URL par celle où tu hébergeras ton image.
const targetPortraitUrl =
  'https://i.ibb.co/3sX8M8K/image-3.png';

export default function SketchGallery() {
  const [cards, setCards] = useState(sketches);
  const [swipedCount, setSwipedCount] = useState(0);
  const [selectedSketch, setSelectedSketch] = useState(null);

  const handleSwipe = (id, direction) => {
    setSwipedCount((c) => c + 1);
    // On fait tourner la pile : la carte swipée passe en dessous
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const copy = [...prev];
      const [removed] = copy.splice(idx, 1);
      return [...copy, removed];
    });
  };

  // Chaque swipe augmente l'opacité du portrait jusqu'à 1
  const portraitOpacity = Math.min(swipedCount * 0.2, 1);

  return (
    <section
      id="sketches"
      className="relative py-24 min-h-screen flex flex-col items-center justify-center transition-colors duration-700 bg-[#fdfcf8] dark:bg-[#0a0a0a] overflow-hidden"
    >
      {/* Portrait final en arrière-plan qui se révèle au fur et à mesure des swipes */}
      <motion.div
        className="absolute z-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: portraitOpacity }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-[320px] h-[420px] md:w-[380px] md:h-[500px] border-8 border-double border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl p-3">
          <img
            src={targetPortraitUrl}
            alt="Portrait final"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <div className="z-10 text-center mb-16 relative px-6">
        <span className="font-serif italic text-3xl text-red-600 dark:text-red-500">01.</span>
        <h2 className="font-serif text-5xl md:text-6xl text-black dark:text-white transition-colors">
          Le Carnet
        </h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-4">
          Swipe à droite = like. Chaque dessin a sa page.
        </p>
      </div>

      <div className="relative w-[320px] h-[480px] z-20">
        <AnimatePresence>
          {cards
            .slice(0, 3) // on n'affiche que les 3 du dessus pour une pile lisible
            .map((sketch, idx) => (
              <Card
                key={sketch.id}
                sketch={sketch}
                index={idx}
                onSwipe={handleSwipe}
                onInfo={(e) => {
                  e.preventDefault();
                  setSelectedSketch(sketch);
                }}
              />
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedSketch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
            onClick={() => setSelectedSketch(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fdfcf8] dark:bg-[#1a1a1a] max-w-2xl w-full p-10 rounded-sm relative shadow-2xl border border-black/5 dark:border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSketch(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X size={24} />
              </button>
              <div className="grid md:grid-cols-2 gap-10">
                <img
                  src={selectedSketch.url}
                  alt={selectedSketch.title}
                  className="w-full h-80 object-cover shadow-lg grayscale"
                />
                <div className="text-black dark:text-white flex flex-col justify-center">
                  <h3 className="font-serif text-4xl mb-6">{selectedSketch.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">
                    {selectedSketch.description}
                  </p>
                  <Link
                    to={`/dessin/${selectedSketch.slug}`}
                    className="mt-8 inline-flex text-[10px] uppercase tracking-widest text-red-600 hover:text-red-500"
                    >
                    Voir la page →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Card({ sketch, index, onSwipe, onInfo }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-12, 12]);
  const likeOpacity = useTransform(x, [60, 180], [0, 1]);
  const nopeOpacity = useTransform(x, [-180, -60], [1, 0]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120) onSwipe(sketch.id, 'right');
    else if (info.offset.x < -120) onSwipe(sketch.id, 'left');
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -400, right: 400 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, zIndex: 10 - index }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 shadow-2xl p-3">
        <Link to={`/dessin/${sketch.slug}`} className="block w-full h-full">
          <img src={sketch.url} alt={sketch.title} className="w-full h-full object-cover grayscale" />
        </Link>

        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-6 left-6 z-30 text-green-500 border-4 border-green-500 px-3 py-1 rotate-[-12deg] font-bold"
        >
          <Heart size={22} fill="currentColor" className="inline-block mr-2" />
          LIKE
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-6 right-6 z-30 text-red-500 border-4 border-red-500 px-3 py-1 rotate-[12deg] font-bold"
        >
          NON
        </motion.div>

        <button
          onClick={onInfo}
          className="absolute bottom-6 left-6 z-30 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/90 hover:text-white"
        >
          <Info size={14} /> Détails
        </button>
      </div>
    </motion.div>
  );
}