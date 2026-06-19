import React, { useEffect, useState } from 'react';

interface HarvesterProps {
  isDriving: boolean;
  isMobile: boolean;
  onHarvestMidpoint: () => void; // call when harvester crosses the crops to crop-out
  onComplete: () => void; // call when drive animation finishes
}

export const Harvester: React.FC<HarvesterProps> = ({
  isDriving,
  isMobile,
  onHarvestMidpoint,
  onComplete,
}) => {
  const [puffCounter, setPuffCounter] = useState(0);

  // Periodically emit smoke puffs during operation
  useEffect(() => {
    if (!isDriving) return;

    const interval = setInterval(() => {
      setPuffCounter((prev) => (prev + 1) % 6);
    }, 400);

    // Call midpoint validation trigger (harvest the crops as the blade runs through)
    const midTimeout = setTimeout(() => {
      onHarvestMidpoint();
    }, 1200); // harvest action happens mid-way through drive

    // Call finish trigger
    const endTimeout = setTimeout(() => {
      onComplete();
    }, 2800); // total transition dur. 2.8s

    return () => {
      clearInterval(interval);
      clearTimeout(midTimeout);
      clearTimeout(endTimeout);
    };
  }, [isDriving]);

  if (!isDriving) return null;

  // Render responsive drive path styles (Now horizontal left-to-right for both desktop and mobile!)
  const animationStyle = isMobile
    ? {
        animation: 'harvester-drive-horizontal-mobile 2.8s cubic-bezier(0.42, 0, 0.58, 1) forwards',
      }
    : {
        animation: 'harvester-drive-horizontal 2.8s cubic-bezier(0.42, 0, 0.58, 1) forwards',
      };

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        ...animationStyle,
        bottom: isMobile ? '12px' : '20px',
        width: '100px',
        height: '90px',
      }}
    >
      {/* Smoke puffs from exhaust chimney */}
      <div className="absolute left-6 -top-2 w-8 h-8 pointer-events-none overflow-visible">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-slate-300 opacity-60"
            style={{
              width: '10px',
              height: '10px',
              left: `${8 - i * 6}px`,
              top: `${-4 - i * 4}px`,
              animation: 'puff-smoke 1.2s ease-out infinite',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* SVG Combine Harvester Machine */}
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full drop-shadow-md"
      >
        {/* Exhaust pipe */}
        <path d="M26 15 L24 -4 L20 -5" fill="none" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

        {/* Dynamic cabin structure with glassmorphism */}
        <rect x="28" y="10" width="34" height="26" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <rect x="34" y="14" width="22" height="15" rx="2" fill="#bae6fd" opacity="0.85" />
        {/* Steering wheel silhouette */}
        <circle cx="50" cy="24" r="3.5" fill="none" stroke="#1e293b" strokeWidth="1.5" />

        {/* Chassis & grain tank */}
        <path d="M12 36 L70 36 L66 18 L16 18 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
        {/* Decorative tribal branding lines or Jodhpur-orange decals */}
        <path d="M22 24 L56 24" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        <path d="M28 29 L50 29" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

        {/* Discharge tube auger */}
        <path d="M16 26 L2 14 L0 16" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

        {/* Heavy rear tread wheel */}
        <g className="origin-[25px_50px] animate-spin" style={{ animationDuration: '1s' }}>
          <circle cx="25" cy="50" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <circle cx="25" cy="50" r="5" fill="#f59e0b" />
          {/* Wheel treads */}
          <path d="M25 36 L25 42 M25 58 L25 64 M11 50 L17 50 M33 50 L39 50" stroke="#f8fafc" strokeWidth="2" />
          <path d="M15 40 L19 44 M31 56 L35 60 M15 60 L19 56 M31 40 L35 44" stroke="#f8fafc" strokeWidth="2" />
        </g>

        {/* Front heavy tire */}
        <g className="origin-[60px_50px] animate-spin" style={{ animationDuration: '0.8s' }}>
          <circle cx="60" cy="50" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <circle cx="60" cy="50" r="5" fill="#f59e0b" />
          <path d="M60 36 L60 42 M60 58 L60 64 M46 50 L52 50 M68 50 L74 50" stroke="#f8fafc" strokeWidth="2" />
          <path d="M50 40 L54 44 M66 56 L70 60 M50 60 L54 56 M66 40 L70 44" stroke="#f8fafc" strokeWidth="2" />
        </g>

        {/* Cutter header support arms */}
        <path d="M60 46 L82 52" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

        {/* Spiky spinning threshing reel headers */}
        <g className="origin-[82px_54px] animate-spin" style={{ animationDuration: '0.5s' }}>
          {/* Main wheel core */}
          <circle cx="82" cy="54" r="10" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="82" cy="54" r="2.5" fill="#475569" />
          {/* Reel cutting fingers */}
          <line x1="82" y1="40" x2="82" y2="44" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          <line x1="82" y1="64" x2="82" y2="68" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          <line x1="68" y1="54" x2="72" y2="54" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          <line x1="92" y1="54" x2="96" y2="54" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          {/* Diagonal cutting sprockets */}
          <line x1="72" y1="44" x2="75" y2="47" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="89" y1="61" x2="92" y2="64" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="72" y1="64" x2="75" y2="61" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="89" y1="44" x2="92" y2="47" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};
