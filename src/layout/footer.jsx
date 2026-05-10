import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Linkedin, Github, Gitlab } from 'lucide-react';

const SOCIALS = [
  {
    href: 'https://www.linkedin.com/in/karlie-giona-cubahiro-0371a52b7/',
    Icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com/Babie-cloud',
    Icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://gitlab.com/karliegionacubahiro',
    Icon: Gitlab,
    label: 'GitLab',
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="py-28 md:py-32 px-6 md:px-20 bg-[#fdfcf8] dark:bg-[#0a0a0a] border-t border-black/5 dark:border-white/8 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">

          {/* Gauche — CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-serif italic text-red-600 dark:text-red-400 text-2xl block mb-3">
                07.
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-black dark:text-white mb-10 leading-tight">
                Travaillons<br />
                <span className="italic">ensemble.</span>
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-sm">
                Disponible pour une alternance dès septembre 2026.
                N'hésitez pas à me contacter, je réponds dans les 48h.
              </p>

              <motion.a
                href="mailto:karliegionacubahiro@gmail.com"
                whileHover={{ x: 6 }}
                className="group inline-flex items-center gap-3 text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm md:text-base break-all">
                  karliegionacubahiro@gmail.com
                </span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0"
                />
              </motion.a>
            </motion.div>
          </div>

          {/* Droite — Socials + Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-between gap-12"
          >
            {/* Réseaux */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-5">
                Retrouvez-moi sur
              </p>
              <div className="flex gap-5">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex items-center gap-2 text-black/60 dark:text-white/60 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Icon size={20} />
                    <span className="text-xs text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors hidden sm:block">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Signature */}
            <div className="border-t border-black/8 dark:border-white/8 pt-6">
              <p
                className="text-2xl text-black dark:text-white mb-1"
                style={{ fontFamily: 'cursive' }}
              >
                Karlie Giona Cubahiro
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                © 2026 — Built with passion in Toulouse
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}