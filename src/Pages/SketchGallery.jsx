import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Heart, X, Info } from 'lucide-react';
import { useTheme } from '../Pages/ThemeContext'; // Import crucial pour la lampe

// Liste de tes 5 dessins (tu peux en ajouter d'autres ici)
// Les URLs pointent vers des dessins en noir et blanc pour le style "croquis" par défaut
const initialSketches = [
  { id: 1, title: "L'Innocence", desc: "Croquis rapide au graphite (Unsplash).", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600" },
  { id: 2, title: "L'Ombre", desc: "Étude de contrastes profonds (Unsplash).", url: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600" },
  { id: 3, title: "Le Regard", desc: "Inspiré des coulisses de la scène (Unsplash).", url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=600" },
  { id: 4, title: "Mouvement", desc: "Capture d'un instant éphémère de danse (Unsplash).", url: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=600" },
  { id: 5, title: "Silence", desc: "L'émotion brute avant le texte (Unsplash).", url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800" },
];

// L'URL de l'image cible (le portrait de Karlie) que l'on doit reconstituer
const targetPortraitUrl = "https://i.ibb.co/3sX8M8K/image-3.png"; // J'ai hébergé ton image pour qu'elle soit accessible

export default function SketchGallery() {
  const [cards, setCards] = useState(initialSketches);
  const [swipedCount, setSwipedCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const { isDarkMode } = useTheme();

  // Fonction appelée à chaque swipe réussi (gauche ou droite)
  const handleSwipe = () => {
    setSwipedCount(prev => prev + 1);
    // On fait tourner la pile : la carte du dessus va en dessous
    setCards(prev => {
      const newCards = [...prev];
      const swipedCard = newCards.shift();
      return [...newCards, swipedCard];
    });
  };

  // Calcul de l'opacité du portrait final (il se révèle au fur et à mesure)
  // 15% d'opacité en plus par swipe, bloqué à 85% max
  const portraitOpacity = Math.min(swipedCount * 0.15, 0.85);

  return (
    <section id="sketches" className="relative py-24 min-h-screen flex flex-col items-center justify-center transition-colors duration-700 bg-[#fdfcf8] dark:bg-[#0a0a0a] overflow-hidden">
      
      {/* --- LE PORTRAIT CIBLE EN ARRIÈRE-PLAN --- */}
      <motion.div 
        className="absolute z-0 transition-opacity duration-1000 ease-in-out pointer-events-none" 
        style={{ opacity: portraitOpacity }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[450px] h-[600px] border-8 border-double border-gray-400 dark:border-gray-700 p-4 shadow-2xl bg-white dark:bg-gray-800">
          <img 
            src={targetPortraitUrl} 
            className={`w-full h-full object-cover transition-all ${isDarkMode ? 'grayscale invert brightness-110' : ''}`}
            alt="Portrait reconstitué de l'artiste"
          />
        </div>
      </motion.div>

      {/* Titre et Texte explicatif */}
      <div className="z-10 text-center mb-16 relative">
        <span className="font-serif italic text-3xl text-red-600 dark:text-red-500">01.</span>
        <h2 className="font-serif text-5xl md:text-6xl text-black dark:text-white transition-colors">Le Carnet d'Or</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 mt-4">
          Swipez les croquis pour révéler le portrait final de l'artiste.
        </p>
      </div>

      {/* --- LA PILE DE CARTES INTERACTIVES --- */}
      <div className="relative w-[320px] h-[480px] z-20 perspective-1000">
        <AnimatePresence>
          {cards.slice(0, 3).reverse().map((sketch, index) => (
            <Card 
              key={sketch.id} 
              sketch={sketch} 
              index={index} 
              onSwipe={handleSwipe}
              onDetails={() => setSelected(sketch)}
              isDarkMode={isDarkMode}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* --- MODAL DE DÉTAILS (Fenêtre surgissante) --- */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-md p-6" onClick={() => setSelected(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fdfcf8] dark:bg-[#1a1a1a] max-w-2xl w-full p-10 rounded-sm relative shadow-2xl border border-black/5 dark:border-white/5"
              onClick={(e) => e.stopPropagation()} // Empêche de fermer en cliquant sur le contenu
            >
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 text-gray-400 hover:text-red-600 transition-colors">
                <X size={24} />
              </button>
              <div className="grid md:grid-cols-2 gap-10">
                <img src={selected.url} className={`w-full h-80 object-cover shadow-lg grayscale ${isDarkMode ? 'invert' : ''}`} />
                <div className="text-black dark:text-white flex flex-col justify-center">
                  <h3 className="font-serif text-4xl mb-6">{selected.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 italic leading-relaxed">{selected.desc}</p>
                  <p className="mt-8 text-[10px] uppercase tracking-widest text-red-600">Buja sans Tabou</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Composant Carte Individuel avec gestion du Drag et du Hover
function Card({ sketch, index, onSwipe, onDetails, isDarkMode }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Opacité du cœur de "Like" (apparaît quand on swipe à droite)
  const likeOpacity = useTransform(x, [50, 150], [0, 1]); 

  // Seule la carte du dessus (index 0) est draggable
  const isTop = index === 0;

  return (
    <motion.div
      style={{ 
        x, rotate, opacity, 
        position: 'absolute', inset: 0,
        zIndex: 10 - index, // Gère la superposition
        scale: 1 - index * 0.05, // Effet de profondeur
        y: index * 10 // Décalage vertical
      }}
      drag={isTop ? "x" : false} // N'active le drag que pour la carte du dessus
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => { 
        // Si le swipe est assez fort (> 120px), on déclenche l'action
        if (Math.abs(info.offset.x) > 120) onSwipe(); 
      }}
      onClick={onDetails} // Clic pour les détails
      className={`group cursor-pointer p-4 shadow-xl border-2 transition-all duration-500 rounded-sm ${
        isDarkMode ? "bg-gray-900 border-white/10 shadow-white/5" : "bg-white border-black/5"
      }`}
    >
      {/* --- INDICATEUR "LIKE" (Cœur rouge à droite) --- */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute top-6 right-6 z-30 text-red-600 pointer-events-none">
        <Heart fill="currentColor" size={42} className="drop-shadow-lg" />
      </motion.div>

      {/* --- IMAGE INTERACTIVE (Noir et blanc <-> Couleur au survol) --- */}
      <div className="relative w-full h-full overflow-hidden">
        <img 
          src={sketch.url} 
          alt={sketch.title}
          className={`w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 ${
            isDarkMode ? 'brightness-125 invert' : 'mix-blend-multiply'
          }`}
        />
        {/* Overlay d'information au survol */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Info className="text-white drop-shadow-lg" size={32} />
        </div>
      </div>
    </motion.div>
  );
}