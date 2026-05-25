import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Feather, Video, Code2 } from 'lucide-react';

const personalityCards = [
  {
    id: 1,
    label: 'Poetry',
    icon: Feather,
    accent: '#c45c5c',
    mediaType: 'image',
    mediaSrc: '/IMG_2515.jpeg',
    tagline: 'Words are my ink.',
    verse: `"I keep silences\nthe way we keep letters—\nfolded, precious, secret."`,
    description:
      'Poetry is how I look at the world sideways. Every line is a small door into another room.',
  },
  {
    id: 2,
    label: 'Life & friends',
    icon: Video,
    accent: '#d97706',
    mediaType: 'video',
    mediaSrc: '/IMG_1906.mov',
    tagline: 'Film, laugh, show up.',
    verse: `"The best edit\nis the one you never notice—\nreal life, live."`,
    description:
      'Honest moments with people I care about. Every frame worth keeping.',
  },
  {
    id: 3,
    label: 'Development',
    icon: Code2,
    accent: '#4ade80',
    mediaType: 'image',
    mediaSrc: '/mohammad-rahmani-LrxSl4ZxoRs-unsplash.jpg',
    tagline: 'Build, break, try again.',
    verse: `"Another bug,\nanother lesson—\nthe terminal doesn't lie."`,
    description:
      'From the shell to shipping: I like things that work where it matters.',
  },
];

function CarouselSlide({ card, onExpand }) {
  const Icon = card.icon;
  return (
    <div className="relative mx-auto aspect-[3/4] max-h-[min(520px,70vh)] w-full overflow-hidden rounded-2xl border border-white/[0.09] bg-black shadow-[0_40px_90px_-40px_rgba(0,0,0,0.95)]">
      {card.mediaType === 'video' ? (
        <video
          src={card.mediaSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={card.mediaSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay"
        style={{ backgroundColor: card.accent }}
      />

      <div className="absolute left-5 top-5 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/35 backdrop-blur-md">
          <Icon size={16} className="text-white" />
        </div>
        <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
          {card.label}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <p className="font-serif text-2xl leading-tight text-white md:text-3xl">{card.tagline}</p>
        <p className="mt-3 max-w-lg whitespace-pre-line font-serif text-sm italic leading-relaxed text-white/60 line-clamp-3">
          {card.verse}
        </p>
        <button
          type="button"
          onClick={() => onExpand(card)}
          className="mt-5 text-[10px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-red-400"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

export default function SketchGallery() {
  const [index, setIndex] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);
  const total = personalityCards.length;

  const go = (delta) => {
    setIndex((i) => (i + delta + total) % total);
  };

  return (
    <section id="sketches" className="relative overflow-hidden px-4 py-20 md:py-28 lg:py-32">
      <div className="relative z-10 mx-auto mb-12 max-w-3xl px-2 text-center">
        <span className="font-serif text-2xl italic text-red-500/90 md:text-3xl">01.</span>
        <h2 className="mt-2 font-serif text-4xl tracking-tight text-white md:text-6xl">Who am I</h2>
        <p className="mt-4 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
          Carousel — arrows or dots to navigate, click cards to expand.
        </p>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-2 md:max-w-lg">
        <div className="relative mb-10 w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={personalityCards[index].id}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <CarouselSlide card={personalityCards[index]} onExpand={setExpandedCard} />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md transition-colors hover:border-red-500/50 hover:bg-black/85 md:-translate-x-[120%]"
            aria-label="Slide précédent"
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-20 flex h-11 w-11 translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/65 text-white backdrop-blur-md transition-colors hover:border-red-500/50 hover:bg-black/85 md:translate-x-[120%]"
            aria-label="Slide suivant"
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex gap-2">
          {personalityCards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Afficher ${c.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-red-500' : 'w-2 bg-zinc-600 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedCard && (
          <ExpandedCardModal expandedCard={expandedCard} onClose={() => setExpandedCard(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ExpandedCardModal({ expandedCard, onClose }) {
  const ExpandedIcon = expandedCard.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/75 backdrop-blur-md md:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/[0.08] bg-[#0c0c0e] p-8 shadow-2xl md:max-w-lg md:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-500 hover:text-red-400"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <ExpandedIcon size={18} style={{ color: expandedCard.accent }} />
          <span className="font-serif text-sm italic" style={{ color: expandedCard.accent }}>
            {expandedCard.label}
          </span>
        </div>

        <p className="font-serif text-2xl text-white">{expandedCard.tagline}</p>
        <p
          className="mt-4 border-l-[3px] border-red-600/70 pl-4 font-serif text-sm italic leading-relaxed text-zinc-400 whitespace-pre-line"
          style={{ borderLeftColor: expandedCard.accent }}
        >
          {expandedCard.verse}
        </p>
        <p className="mt-6 text-sm leading-relaxed text-zinc-300">{expandedCard.description}</p>
      </motion.div>
    </motion.div>
  );
}
