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
      className="relative border-t border-white/[0.06] bg-[#08080a] px-6 py-24 md:px-20 md:py-28"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <span className="font-serif text-2xl italic text-red-400/90">06.</span>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-white md:text-5xl">
                Travailler
                <br />
                ensemble.
              </h2>

              <p className="mt-8 max-w-sm text-sm leading-relaxed text-zinc-500">
                Ouverte et disponible, je réponds généralement sous 48&nbsp;h.
                N&apos;hésitez pas à me contacter pour discuter de votre projet ou simplement pour dire bonjour !
              </p>

              <motion.a
                href="mailto:karliegionacubahiro@gmail.com"
                whileHover={{ x: 4 }}
                className="group mt-8 inline-flex items-center gap-3 text-white transition-colors hover:text-red-400"
              >
                <Mail size={18} className="shrink-0" />
                <span className="break-all text-sm md:text-base">karliegionacubahiro@gmail.com</span>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex flex-col justify-between gap-12"
          >
            <div>
              <p className="mb-6 text-[9px] uppercase tracking-[0.28em] text-zinc-500">Réseaux</p>
              <div className="flex gap-6">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group flex items-center gap-2 text-zinc-500 transition-colors hover:text-red-400"
                  >
                    <Icon size={20} />
                    <span className="hidden text-xs text-zinc-600 group-hover:text-red-400 sm:inline">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-8">
              <p className="text-xl text-white" style={{ fontFamily: 'cursive' }}>
                Karlie Giona Cubahiro
              </p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.22em] text-zinc-600">
                2026 Toulouse
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
