import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './toogle';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Fermer le menu mobile au changement de route
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const anchor = (hash) => (isHome ? hash : `/${hash}`);

  const links = [
    { href: anchor('#sketches'), label: 'Qui suis-je' },
    { href: anchor('#about'), label: 'À propos' },
    { href: anchor('#stack'), label: 'Stack' },
    { href: anchor('#github'), label: 'GitHub' },
    { href: anchor('#projects'), label: 'Projets' },
    { href: anchor('#writing'), label: 'Écriture' },
    { href: anchor('#contact'), label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10'
            : 'bg-[#0a0a0a]/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif italic text-2xl text-white hover:text-red-400 transition-colors"
          >
            K.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] uppercase tracking-widest text-white/70 hover:text-red-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/15 bg-[#1a1a1a] hover:border-red-500 transition-colors"
              aria-label="Menu"
            >
              {menuOpen
                ? <X size={15} className="text-white" />
                : <Menu size={15} className="text-white" />
              }
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#0a0a0a] border-t border-white/10 overflow-hidden"
            >
              <nav className="flex flex-col px-5 py-4 gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-white/70 hover:text-red-400 transition-colors py-2.5 border-b border-white/5 last:border-0"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}