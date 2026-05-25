import { useEffect, useMemo, useState } from 'react';
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

// Possible statuses:
//   'loading'  — fetch in progress
//   'ok'       — all slugs resolved
//   'partial'  — some slugs resolved, some 404'd
//   'empty'    — no slugs resolved (all 404'd)
//   'config'   — GITHUB_PINNED_REPO_SLUGS is empty
//   'error'    — network / rate-limit error

/** Load only repos you own, in pinned profile order, via individual REST calls. */
export default function GitHubReposSection() {
  const [repos, setRepos]             = useState([]);
  const [status, setStatus]           = useState('loading');
  const [errorMsg, setErrorMsg]       = useState('');
  const [missingSlugs, setMissingSlugs] = useState([]);

  // Stable cache key — avoids re-running the effect on every render.
  const pinnedSlugKey = useMemo(
    () => GITHUB_PINNED_REPO_SLUGS.join('|'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [GITHUB_PINNED_REPO_SLUGS.join('|')],
  );

  useEffect(() => {
    // Nothing configured yet — show the setup hint immediately.
    if (!GITHUB_PINNED_REPO_SLUGS.length) {
      setRepos([]);
      setMissingSlugs([]);
      setErrorMsg('');
      setStatus('config');
      return;
    }

    const ac = new AbortController();

    const load = async () => {
      setStatus('loading');
      setRepos([]);
      setMissingSlugs([]);
      setErrorMsg('');

      const headers = { Accept: 'application/vnd.github+json' };

      const results = await Promise.all(
        GITHUB_PINNED_REPO_SLUGS.map(async (slug) => {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(slug)}`,
            { signal: ac.signal, headers },
          );

          if (res.ok) return res.json();

          // Surface rate-limit errors immediately.
          if (res.status === 403) {
            throw new Error('GitHub API rate limit reached — please try again later.');
          }

          // 404 → repo missing or renamed; treat as a soft failure.
          if (res.status === 404) return { __missing: slug };

          throw new Error(`GitHub API returned HTTP ${res.status}.`);
        }),
      );

      // Partition results into found / missing.
      const missing = results
        .filter((r) => r?.__missing)
        .map((r) => r.__missing);

      const valid = results.filter((r) => r && !r.__missing);

      setMissingSlugs(missing);
      setRepos(valid);

      if (valid.length === 0) {
        setStatus(missing.length ? 'empty' : 'empty');
      } else {
        setStatus(missing.length ? 'partial' : 'ok');
      }
    };

    load().catch((err) => {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setRepos([]);
      setMissingSlugs([]);
      setErrorMsg(err.message || 'Could not load repositories.');
    });

    return () => ac.abort();
  }, [pinnedSlugKey]);

  // ─── Derived booleans for cleaner JSX ────────────────────────────────────
  const showConfig   = status === 'config';
  const showLoading  = status === 'loading';
  const showError    = status === 'error';
  const showPartial  = (status === 'partial' || status === 'empty') && missingSlugs.length > 0;
  const showEmpty    = status === 'empty' && repos.length === 0;
  const showRepos    = repos.length > 0;

  return (
    <section
      id="repos"
      className="py-20 md:py-28 px-6 md:px-20 bg-page-soft/90 dark:bg-[#0d0d0d] transition-colors border-t border-neutral-900/10 dark:border-white/10 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Pin className="text-red-600 dark:text-red-400" size={24} strokeWidth={1.5} />
              <span className="font-serif italic text-sm text-neutral-400">04.</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Github className="text-neutral-900 dark:text-white" size={22} strokeWidth={1.35} />
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 dark:text-white">
                Pinned repositories
              </h2>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-4 max-w-xl leading-relaxed">
              Visit my own repos only — the same pins as on github.com/{GITHUB_USERNAME}. Contributions
              to other people&apos;s projects never appear here.
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


        {/* ── Loading ─────────────────────────────────────────────────────── */}
        {showLoading && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">
            Loading pinned repos…
          </p>
        )}

        {/* ── Network / rate-limit error ───────────────────────────────────── */}
        {showError && (
          <div className="flex items-start gap-3 text-sm text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/35 border border-red-200 dark:border-red-900/55 rounded-sm px-4 py-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ── Partial — some slugs 404'd ──────────────────────────────────── */}
        {showPartial && (
          <p className="text-xs text-red-700 dark:text-red-400 mb-6">
            Missing or renamed:{' '}
            <strong>{missingSlugs.join(', ')}</strong> — update{' '}
            <code className="px-1 rounded bg-black/10 dark:bg-white/10">
              GITHUB_PINNED_REPO_SLUGS
            </code>
            .
          </p>
        )}

        {/* ── All slugs 404'd, nothing to show ────────────────────────────── */}
        {showEmpty && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            No repositories could be loaded. Check spelling and visibility — repos must be public.
          </p>
        )}

        {/* ── Repo grid ───────────────────────────────────────────────────── */}
        {showRepos && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {repos.map((repo, i) => (
              <motion.li
                key={repo.full_name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.35 }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full p-5 rounded-sm border border-red-900/12 dark:border-white/10 bg-white/70 dark:bg-[#141414]/90 hover:border-red-600/65 dark:hover:border-red-400/55 transition-colors group shadow-[0_1px_0_rgba(153,27,27,0.06)] dark:shadow-none"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors truncate pr-2">
                      {repo.name}
                      {repo.fork && (
                        <span className="ml-2 text-[9px] uppercase tracking-wider text-neutral-400 font-normal">
                          fork
                        </span>
                      )}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3 mb-4 min-h-[3.75rem]">
                    {repo.description?.trim() || 'No description provided.'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 shrink-0"
                          aria-hidden
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} className="text-amber-500" />
                      {formatShortNumber(repo.stargazers_count ?? 0)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={12} />
                      {formatShortNumber(repo.forks_count ?? 0)}
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