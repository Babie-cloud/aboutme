import { motion } from 'framer-motion';
import { Instagram, Twitter, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-28 md:py-32 px-8 md:px-24 bg-[#fdfcf8] border-t border-black/5 relative overflow-hidden"
    >
      {/* Texture papier (Optionnel : nécessite une classe CSS personnalisée) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
        {/* Section Gauche : Appel à l'action */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl mb-12 text-black"
          >
            Parlons de <br />
            <span className="italic">projets.</span>
          </motion.h2>

          <div className="space-y-6">
            <motion.a
              href="mailto:hello@karlie.art"
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-2xl font-light hover:text-red-600 transition-colors text-black"
            >
              <Mail size={24} />
              <span>hello@karlie.art</span>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>
          </div>
        </div>

        {/* Section Droite : Réseaux et Copyright */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="flex gap-8">
            <a href="#" className="text-black hover:text-red-600 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-black hover:text-red-600 transition-colors">
              <Twitter size={24} />
            </a>
          </div>

          <div className="text-left md:text-right mt-20 md:mt-0">
            {/* Si tu n'as pas de font "hand", ça sera du cursive par défaut */}
            <p className="font-hand text-3xl mb-2 text-black" style={{ fontFamily: 'cursive' }}>
              Karlie Giona
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 text-black">
              © 2026 — Built with passion in Bujumbura
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
