import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const anchor = (hash) => (isHome ? hash : `/${hash}`);

  const links = [
    { href: anchor('#sketches'), label: 'Intro' },
    { href: anchor('#about'), label: 'Profil' },
    { href: anchor('#repos'), label: 'Dépôts' },
    { href: anchor('#cv'), label: 'CV' },
    { href: anchor('#contact'), label: 'Contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? 'border-white/[0.08] bg-black/85 backdrop-blur-lg'
            : 'border-transparent bg-black/65 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="font-serif text-2xl italic text-white transition-colors hover:text-red-400"
          >
            K.
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-red-400"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition-colors hover:border-red-500/50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-white/[0.06] bg-black/95 lg:hidden"
            >
              <nav className="flex flex-col gap-px px-5 py-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-white/[0.04] py-3 text-sm uppercase tracking-widest text-zinc-300 last:border-0 hover:text-red-400"
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
