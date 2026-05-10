import React from 'react';
export default function TornPaper() {
  return (
    <div
      className="relative w-full h-16 md:h-20 -mt-1 bg-[#fdfcf8] dark:bg-[#0a0a0a] transition-colors duration-500"
      aria-hidden="true"
    >
      {/* Clair */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full block dark:hidden"
      >
        <defs>
          <linearGradient id="tornLight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdfcf8" />
            <stop offset="100%" stopColor="#f5f0e6" />
          </linearGradient>
          <filter id="shadowLight">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0,0,0,0.06)" />
          </filter>
        </defs>
        <path
          d="M0,80 L0,45 Q50,35 100,42 Q180,52 250,38 Q320,28 400,45 Q480,58 550,35 Q620,18 700,40 Q780,62 850,32 Q920,8 1000,38 Q1080,68 1150,42 Q1180,30 1200,45 L1200,80 Z"
          fill="url(#tornLight)"
          filter="url(#shadowLight)"
        />
        <path d="M0,80 L1200,80 L1200,85 L0,85 Z" fill="#e8dfc8" />
      </svg>

      {/* Sombre */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full hidden dark:block"
      >
        <defs>
          <linearGradient id="tornDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <filter id="shadowDark">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(255,255,255,0.03)" />
          </filter>
        </defs>
        <path
          d="M0,80 L0,45 Q50,35 100,42 Q180,52 250,38 Q320,28 400,45 Q480,58 550,35 Q620,18 700,40 Q780,62 850,32 Q920,8 1000,38 Q1080,68 1150,42 Q1180,30 1200,45 L1200,80 Z"
          fill="url(#tornDark)"
          filter="url(#shadowDark)"
        />
        <path d="M0,80 L1200,80 L1200,85 L0,85 Z" fill="#0d0d0d" />
      </svg>
    </div>
  );
}