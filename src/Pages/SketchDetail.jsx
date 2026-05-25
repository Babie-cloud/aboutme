import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getSketchBySlug } from '../data/sketches';

export default function SketchDetail() {
  const { slug } = useParams();
  const sketch = slug ? getSketchBySlug(slug) : null;

  if (!sketch) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pb-20 pt-28">
        <p className="mb-4 font-serif text-2xl text-white">Sketch not found.</p>
        <Link
          to="/#sketches"
          className="text-sm uppercase tracking-widest text-red-400 transition-colors hover:text-red-300 hover:underline"
        >
          Return
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-28 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Link
          to="/#sketches"
          className="mb-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 transition-colors hover:text-red-400"
        >
          <ArrowLeft size={14} />
          Return
        </Link>

        <div className="mb-8 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/30">
          <img
            src={sketch.url}
            alt={sketch.title}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-red-400">
          {sketch.year} · {sketch.technique}
        </p>
        <h1 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
          {sketch.title}
        </h1>
        <p className="mb-8 leading-relaxed text-zinc-400">{sketch.description}</p>
        <div className="border-l-2 border-red-600/50 pl-5">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
            {sketch.longDescription}
          </p>
        </div>
      </motion.div>
    </article>
  );
}
