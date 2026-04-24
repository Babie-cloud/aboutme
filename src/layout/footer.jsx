import { motion } from 'framer-motion';
// Ajout des imports manquants : Linkedin, Github, Gitlab
import { Mail, ArrowUpRight, Linkedin, Github, Gitlab } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-28 md:py-32 px-8 md:px-24 bg-[#fdfcf8] dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/10 relative overflow-hidden transition-colors duration-700"
    >
      {/* Texture papier */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] dark:invert" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
        
        {/* Section Gauche : Appel à l'action */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl mb-12 text-black dark:text-white transition-colors duration-700"
          >
            Let's talk about <br />
            <span className="italic">projects.</span>
          </motion.h2>

          <div className="space-y-6">
            <motion.a
              href="mailto:karliegionacubahiro@gmail.com"
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-2xl font-light hover:text-red-600 transition-colors text-black dark:text-white dark:hover:text-red-500"
            >
              <Mail size={24} /> {/* Taille augmentée pour la lisibilité */}
              <span>karliegionacubahiro@gmail.com</span>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>
          </div>
        </div>

        {/* Section Droite : Réseaux et Copyright */}
        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="flex gap-8">
            <a 
              href="https://www.linkedin.com/in/karlie-giona-cubahiro-0371a52b7/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com/Babie-cloud" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://gitlab.com/karliegionacubahiro" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-black dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <Gitlab size={24} />
            </a>
          </div>

          <div className="text-left md:text-right mt-20 md:mt-0">
            <p 
              className="text-3xl mb-2 text-black dark:text-white transition-colors duration-700" 
              style={{ fontFamily: 'cursive' }}
            >
              Karlie Giona Cubahiro
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 text-black dark:text-gray-400 transition-colors duration-700">
              © 2026 — Built with passion in Toulouse
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}