import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  GitFork,
  AlertCircle,
  ExternalLink,
  Pin,
  Settings,
} from 'lucide-react';
import { GITHUB_PINNED_REPO_SLUGS, GITHUB_USERNAME } from '../config/site';

function formatShortNumber(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/** Load only repos you own, by pinned profile order (`GET /repos/{owner}/{repo}` each). */
export default function GitHubReposSection() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ok | empty | config | partial | error
  const [errorMsg, setErrorMsg] = useState('');
  const [missingSlugs, setMissingSlugs] = useState([]);
  const pinnedSlugKey = GITHUB_PINNED_REPO_SLUGS.join('|');

  useEffect(() => {
    const ac = new AbortController();

    const load = async () => {
      if (!GITHUB_PINNED_REPO_SLUGS.length) {
        setRepos([]);
        setStatus('config');
        setErrorMsg('');
        return;
      }

      setStatus('loading');
      setMissingSlugs([]);

      const headers = { Accept: 'application/vnd.github+json' };
      const results = await Promise.all(
        GITHUB_PINNED_REPO_SLUGS.map(async (slug) => {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(slug)}`,
            { signal: ac.signal, headers },
          );
          if (res.ok) return res.json();
          if (res.status === 403) throw new Error('GitHub API rate limit — try again later.');
          if (res.status === 404) return { __missing: slug };
          throw new Error(`HTTP ${res.status}`);
        }),
      );

      const missing = results.filter((r) => r && r.__missing).map((r) => r.__missing);
      const valid = results.filter((r) => r && !r.__missing);

      setMissingSlugs(missing);
      if (valid.length === 0) {
        setRepos([]);
        setStatus(missing.length ? 'partial' : 'empty');
      } else {
        setRepos(valid);
        setStatus(missing.length ? 'partial' : 'ok');
      }
      setErrorMsg('');
    };

    load().catch((e) => {
      if (e.name === 'AbortError') return;
      setStatus('error');
      setRepos([]);
      setErrorMsg(e.message || 'Could not load repositories.');
    });

    return () => ac.abort();
  }, [pinnedSlugKey]);

  return (
    <section
      id="repos"
      className="py-20 md:py-28 px-6 md:px-20 bg-page-soft/90 dark:bg-[#0d0d0d] transition-colors border-t border-neutral-900/10 dark:border-white/10 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Pin className="text-red-600 dark:text-red-400" size={24} strokeWidth={1.5} />
              <span className="font-serif italic text-sm text-neutral-400">03.</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Github className="text-neutral-900 dark:text-white" size={22} strokeWidth={1.35} />
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 dark:text-white">
                Pinned repositories
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-4 max-w-xl leading-relaxed">
              Your own repos only—the same pins as on github.com/{GITHUB_USERNAME}. Contributions to
              other people&apos;s projects never appear here.
            </p>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-red-700 dark:text-red-400 border border-red-700/35 dark:border-red-400/35 px-5 py-3 hover:bg-red-700 hover:text-white dark:hover:bg-red-500 transition-colors"
          >
            Open GitHub <ExternalLink size={14} />
          </a>
        </div>

        {status === 'config' && (
          <div className="flex gap-3 rounded-sm border border-red-900/20 bg-white/55 dark:bg-white/5 dark:border-white/15 px-4 py-4 text-sm text-neutral-700 dark:text-neutral-300">
            <Settings className="shrink-0 text-red-600 dark:text-red-400 mt-0.5" size={18} />
            <span>
              Add your pinned repo <strong className="text-neutral-900 dark:text-white">slugs</strong>{' '}
              to <code className="text-xs px-1 rounded bg-red-950/10 dark:bg-white/10">GITHUB_PINNED_REPO_SLUGS</code>{' '}
              in <code className="text-xs px-1 rounded bg-red-950/10 dark:bg-white/10">src/config/site.js</code>
              — use the URL tail (e.g. <code className="text-xs">aboutme</code> for github.com/you/
              <strong className="text-neutral-900 dark:text-white">aboutme</strong>), in the{' '}
              <strong className="text-neutral-900 dark:text-white">same order</strong> as on your profile.
            </span>
          </div>
        )}

        {status === 'loading' && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">
            Loading pinned repos…
          </p>
        )}
        {status === 'error' && (
          <div className="flex items-start gap-3 text-sm text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900/55 rounded-sm px-4 py-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
        {status === 'partial' && missingSlugs.length > 0 && (
          <p className="text-xs text-red-700 dark:text-red-400 mb-6">
            Missing or renamed: {missingSlugs.join(', ')} — update{' '}
            <code className="px-1 rounded bg-black/10 dark:bg-white/10">GITHUB_PINNED_REPO_SLUGS</code>.
          </p>
        )}
        {(status === 'empty' || status === 'partial') && repos.length === 0 && status !== 'config' && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No repos could be loaded. Check spelling and visibility (repos must be public).
          </p>
        )}
        {repos.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {repos.map((r, i) => (
              <motion.li
                key={r.id ?? r.full_name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35 }}
              >
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full p-5 rounded-sm border border-red-900/12 dark:border-white/10 bg-white/70 dark:bg-[#141414]/90 hover:border-red-600/65 dark:hover:border-red-400/55 transition-colors group shadow-[0_1px_0_rgba(153,27,27,0.06)] dark:shadow-none"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors truncate pr-2">
                      {r.name}
                      {r.fork && (
                        <span className="ml-2 text-[9px] uppercase tracking-wider text-neutral-400 font-normal">
                          fork
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
                    {r.description?.trim() || 'No description provided.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0"
                          aria-hidden
                        />
                        {r.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="text-amber-500" />
                      {formatShortNumber(r.stargazers_count ?? 0)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={12} />
                      {formatShortNumber(r.forks_count ?? 0)}
                    </span>
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
