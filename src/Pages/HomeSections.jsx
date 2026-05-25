import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import GitHubReposSection from './GitHubReposSection';
import { CV_PDF_URL } from '../config/site';

export default function HomeSections() {
  return (
    <>
      <GitHubReposSection />

      <section id="cv" className="border-t border-white/[0.06] bg-[#0a0a0c] px-6 py-20 md:px-20 md:py-28">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <span className="font-serif text-2xl italic text-red-400/90">05.</span> <br />
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">Documents</span>
            <h2 className="mt-4 font-serif text-3xl text-white md:text-4xl">Curriculum vitae</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-400">
              File available from the folder<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[11px] text-zinc-300">public</code>
              {' '}under{' '}
              <strong className="text-zinc-200">Karlie_cubahiro.pdf</strong>.
            </p>
          </div>
          <motion.a
            href={CV_PDF_URL}
            download
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-3 border border-red-600/50 bg-red-700/90 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-red-600"
          >
            <FileDown size={17} strokeWidth={1.5} />
            Download the PDF
          </motion.a>
        </div>
      </section>
    </>
  );
}
