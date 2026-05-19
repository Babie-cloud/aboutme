export default function TornPaper() {
  return (
    <div
      className="relative -mt-1 h-16 w-full bg-[#060607] md:h-20"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
      >
        <defs>
          <linearGradient id="tornDivider" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#09090b" />
            <stop offset="55%" stopColor="#0f0f12" />
            <stop offset="100%" stopColor="#141418" />
          </linearGradient>
          <linearGradient id="tornGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="55%" stopColor="rgba(220,38,38,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="dividerShadow">
            <feDropShadow dx="0" dy="3" stdDeviation="1.5" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <path
          d="M0,80 L0,45 Q50,35 100,42 Q180,52 250,38 Q320,28 400,45 Q480,58 550,35 Q620,18 700,40 Q780,62 850,32 Q920,8 1000,38 Q1080,68 1150,42 Q1180,30 1200,45 L1200,80 Z"
          fill="url(#tornDivider)"
          filter="url(#dividerShadow)"
        />
        <path
          d="M0,80 L0,45 Q50,35 100,42 Q180,52 250,38 Q320,28 400,45 Q480,58 550,35 Q620,18 700,40 Q780,62 850,32 Q920,8 1000,38 Q1080,68 1150,42 Q1180,30 1200,45 L1200,80 Z"
          fill="url(#tornGlow)"
        />
        <path d="M0,80 L1200,80 L1200,82 L0,82 Z" fill="#0a0a0c" />
      </svg>
    </div>
  );
}
