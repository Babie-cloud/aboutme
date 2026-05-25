import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap, BookOpen } from 'lucide-react';

const EXPERIENCES = [
  {
    id: ' OGSo',
    period: 'Nov. 2025 – Jan. 2026',
    title: 'Support Developer Intern',
    organization: 'Open Global Solutions (OGSo) · Toulouse',
    focus: 'WooCommerce Development',
    bullets: [
      'Contributing to the development and maintenance of front-end and back-end functionalities on production applications (PHP)',
      'Participation in functional testing: writing test cases, identifying and documenting anomalies.',
      'Cross-functional collaboration with technical teams and project managers to ensure the quality and relevance of delivered solutions',
      'Exposure to the e-commerce ecosystem and the specificities of WooCommerce development',
    ],
  },
  {
    id: 'magis',
    period: 'Avr. 2025',
    title: 'Front-End Developer Intern',
    organization: 'Magis Digital Solutions · Mwaro, Burundi',
    focus: 'Angular Development · Figma · GitLab · Linux Ubuntu',
    bullets: [
      'Development of dynamic Angular components from Figma mockups, respecting functional specifications.',
      'Participation via GitLab to code reviews, issue tracking, and sprint planning in an Agile environment',
      'Writing technical documentation for components and leading follow-up meetings with the team',
      'Development under Linux Ubuntu environment – autonomy in post-configuration and troubleshooting',
    ],
  },
];

const FORMATION = [
  {
    period: '2026 – 2027',
    title: 'Application designer and developer — Bac+3',
    subtitle: 'Learn IT · Brest',
    detail: 'Alternating work and study: 3 weeks in a company / 1 week in class',
    highlight: true,
  },
  {
    period: '2025 – 2026',
    title: 'Bac+1 Computer Science — Bachelor',
    subtitle: 'ESGI · Toulouse',
    detail: 'In progress',
    highlight: false,
  },
  {
    period: '2022 – 2025',
    title: 'Bachelor Computer Science — Software Engineering',
    subtitle: 'Université du Lac Tanganyika · Burundi',
    detail: 'Mention Satisfaction',
    highlight: false,
  },
];

function ExperienceCard({ job, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-inner shadow-black/40 backdrop-blur-sm"
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-red-400">{job.period}</p>
      <h4 className="text-lg font-medium leading-snug text-white md:text-xl">{job.title}</h4>
      <p className="mt-1 text-sm text-zinc-400">{job.organization}</p>
      <p className="mt-3 text-xs font-medium text-zinc-500">{job.focus}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-300 marker:text-red-500">
        {job.bullets.map((b, idx) => (
          <li key={`${job.id}-${idx}`} className="pl-1">
            {b}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function FormationCard({ item, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className={`relative flex flex-col rounded-2xl border p-6 md:p-7 ${
        item.highlight
          ? 'border-red-500/40 bg-gradient-to-b from-red-950/35 to-transparent ring-1 ring-red-500/20'
          : 'border-white/[0.07] bg-white/[0.02]'
      }`}
    >
      {item.highlight && (
        <span className="absolute right-4 top-4 rounded-full bg-red-600/90 px-2 py-0.5 text-[9px] uppercase tracking-widest text-white">
          Priority
        </span>
      )}
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/40">
        {item.highlight ? (
          <GraduationCap size={20} className="text-red-400" aria-hidden />
        ) : (
          <BookOpen size={18} className="text-zinc-400" aria-hidden />
        )}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-red-400/90">{item.period}</p>
      <h4 className="mt-3 font-serif text-xl text-white">{item.title}</h4>
      <p className="mt-1 text-sm text-zinc-400">{item.subtitle}</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.detail}</p>
    </motion.article>
  );
}

export default function TheaterSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0a0a0c] px-6 py-28 md:px-12 md:py-36 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 0%, rgb(127 29 29 / 0.25), transparent 50%), radial-gradient(ellipse 50% 40% at 90% 100%, rgb(153 27 27 / 0.12), transparent 45%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-20 md:space-y-28">
        <div className="grid grid-cols-1 items-start gap-14 xl:grid-cols-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="xl:col-span-5"
          >
            <span className="mb-3 block font-serif text-2xl italic text-red-400">02.</span>
            <h2 className="mb-10 font-serif text-5xl leading-tight text-white md:text-7xl">
              About me
              <br />
              <span className="italic text-zinc-500">de moi</span>
            </h2>

            <p className="mb-6 text-base font-light leading-relaxed text-zinc-400 md:text-lg">
              My name is {' '}
              <strong className="font-semibold text-zinc-100">Karlie Giona Cubahiro</strong>, a 21 year old computer science student with a passion for software development. 
              </p>

            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
              <h3 className="mb-3 text-[10px] uppercase tracking-[0.28em] text-red-400">
                Alternance 2026–2027
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300 md:text-base">
  A <strong className="text-white">work study program (company — school)</strong> as part of the{' '}
  <strong className="text-white">Bachelor’s degree in Application Design and Development</strong> at{' '}
  <strong className="text-white">Learn IT (Brest, 2026–2027)</strong>, following a{' '}
  <strong className="text-white">3 week company / 1 week school</strong> rhythm, to deepen my skills in application design and development through real world business use cases.
</p>
            </div>

            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-2 border-b border-red-600/60 pb-0.5 text-[10px] uppercase tracking-widest text-red-400 transition-colors hover:border-red-400"
            >
              Contact me
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="xl:col-span-7"
          >

            <h3 className="mb-10 text-[10px] uppercase tracking-[0.3em] text-red-400">
              Professional experience
            </h3>
            <div className="space-y-8">
              {EXPERIENCES.map((job, i) => (
                <ExperienceCard key={job.id} job={job} delay={i * 0.06} />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="border-t border-white/[0.08] pt-16 md:pt-24"
        >
          
          <div className="mb-12 md:mb-14">
            <span className="font-serif text-2xl italic text-red-400/90">03.</span> <br />
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-red-400">Education</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Path in three phases: goal bac+3 CDA with apprenticeship in Brest.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {FORMATION.map((f, i) => (
              <FormationCard key={f.title + f.period} item={f} delay={i * 0.06} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
