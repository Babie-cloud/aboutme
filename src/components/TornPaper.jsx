import React from 'react';

/**
 * Illusion de feuille déchirée entre l'accueil et le carnet.
 * Bord irrégulier type déchirure.
 */
export default function TornPaper() {
  return (
    <div className="relative w-full h-16 md:h-24 -mt-1" aria-hidden>
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full block"
      >
        <defs>
          <linearGradient id="tornPaperGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fdfcf8" />
            <stop offset="100%" stopColor="#f5f0e6" />
          </linearGradient>
          <filter id="tornShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="rgba(0,0,0,0.06)" />
          </filter>
        </defs>
        {/* Forme déchirée irrégulière (haut) */}
        <path
          d="M0,80 L0,45 Q50,35 100,42 Q180,52 250,38 Q320,28 400,45 Q480,58 550,35 Q620,18 700,40 Q780,62 850,32 Q920,8 1000,38 Q1080,68 1150,42 Q1180,30 1200,45 L1200,80 Z"
          fill="url(#tornPaperGrad)"
          filter="url(#tornShadow)"
        />
        {/* Petit trait "papier" sous la déchirure */}
        <path
          d="M0,80 L1200,80 L1200,85 L0,85 Z"
          fill="#ccad6e"
        />
      </svg>
    </div>
  );
}
