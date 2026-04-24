import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getSketchBySlug } from '../data/sketches';
import { useTheme } from '../Pages/ThemeContext';

export default function SketchDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const sketch = getSketchBySlug(slug);

  if (!sketch) {
    return (
      <div className="min-h-screen bg-[#fdfcf8] dark:bg-[#0a0a0a] transition-colors flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-black dark:text-white mb-4" i18n>Page not found :(</h1>
          <Link to="/#sketches" className="text-red-600 underline" i18n>Return to notebook</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf8] dark:bg-[#0a0a0a] transition-colors duration-700">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/70 dark:text-white/70 hover:text-red-600 text-sm uppercase tracking-widest mb-12 transition-colors"
        >
          <ArrowLeft size={18} /> Return
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`aspect-[3/4] border p-2 transition-all shadow-2xl ${isDarkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-black/10'}`}>
              <img
                src={sketch.url}
                alt={sketch.title}
                className={`w-full h-full object-cover grayscale transition-all ${isDarkMode ? 'invert brightness-110' : ''}`}
              />
            </div>
          </motion.div>

          <div className="text-black dark:text-white transition-colors">
            <span className="font-serif italic text-red-600 text-sm" i18n>Drawing</span>
            <h1 className="font-serif text-4xl md:text-5xl mt-2 mb-6">{sketch.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 italic mb-8 leading-relaxed">"{sketch.description}"</p>
            <p className="leading-relaxed mb-8 opacity-90">{sketch.longDescription}</p>
            <div className="pt-6 border-t border-black/10 dark:border-white/10">
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1" i18n>Technic</p>
              <p className="font-serif italic">{sketch.technique}</p>
            </div>
            <div className="mt-12">
              <Link to="/#sketches" className="inline-flex items-center gap-2 px-6 py-3 border border-black dark:border-white text-xs uppercase tracking-widest hover:bg-red-700 hover:border-red-700 hover:text-white transition-all" i18n>
                See all designs
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}