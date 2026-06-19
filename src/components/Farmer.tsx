import React from 'react';
import { FarmerTool } from '../types';

interface FarmerProps {
  tool: FarmerTool;
  className?: string;
  isHappy?: boolean;
}

export const Farmer: React.FC<FarmerProps> = ({ tool, className = '', isHappy = false }) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Dynamic speech bubble / interactive hint based on tool */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-emerald-100 whitespace-nowrap animate-bounce pointer-events-none">
        {tool === 'idle' && "Welcome to the farm!"}
        {tool === 'seed-bag' && "Prepare to plant!"}
        {tool === 'watering-can' && "Validating nutrition..."}
        {tool === 'sickle' && "Ready for harvest!"}
        {tool === 'success-sign' && "A bountiful yield!"}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white border-r border-b border-emerald-100 rotate-45"></div>
      </div>

      {/* SVG Farmer Graphic */}
      <svg
        id="farmer-svg"
        viewBox="0 0 160 160"
        className="w-28 h-28 md:w-32 md:h-32 drop-shadow-lg transition-all duration-300 animate-farmer-idle"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="148" rx="42" ry="7" fill="rgba(67, 40, 15, 0.15)" />

        {/* Dynamic sparkling droplets when watering */}
        {tool === 'watering-can' && (
          <g>
            <circle cx="34" cy="115" r="2.5" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '1s' }} />
            <circle cx="28" cy="128" r="1.5" fill="#0ea5e9" className="animate-bounce" style={{ animationDelay: '0.1s' }} />
            <circle cx="22" cy="140" r="2" fill="#7dd3fc" className="animate-bounce" style={{ animationDelay: '0.3s' }} />
          </g>
        )}

        {/* Dynamic seeds falling when carrying seeds */}
        {tool === 'seed-bag' && (
          <g>
            <circle cx="126" cy="120" r="2" fill="#b45309" className="animate-bounce" style={{ animationDelay: '0.2s' }} />
            <circle cx="132" cy="132" r="1.5" fill="#d97706" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
          </g>
        )}

        {/* Tunic / Body */}
        <path
          d="M48 115 C48 95, 112 95, 112 115 L118 145 L42 145 Z"
          fill="#0284c7" /* Jodhpur Blue / Royal blue tunic */
          stroke="#0369a1"
          strokeWidth="2"
        />
        {/* Tunic collar */}
        <path d="M70 100 L80 115 L90 100" fill="none" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />

        {/* Neck */}
        <rect x="74" y="85" width="12" height="18" rx="2" fill="#fed7aa" />

        {/* Head */}
        <circle cx="80" cy="72" r="22" fill="#fed7aa" />

        {/* Traditional Jodhpur Red-Orange Turban */}
        <g>
          {/* Main turban wraps */}
          <path d="M54 62 C50 48, 70 38, 85 46 C95 38, 110 48, 106 62 Z" fill="#ea580c" />
          <path d="M54 62 C65 52, 95 52, 106 62 C112 55, 100 45, 80 48 C60 45, 48 55, 54 62 Z" fill="#f97316" />
          {/* Turban central folds / tuck */}
          <ellipse cx="80" cy="46" rx="9" ry="6" fill="#c2410c" />
          <path d="M78 40 L82 32 L85 41" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          {/* Mini elegant feather/trim */}
          <path d="M80 32 C82 25, 88 20, 84 15 C82 22, 79 28, 80 32 Z" fill="#eab308" className="origin-bottom animate-pulse" />
        </g>

        {/* Friendly eyes */}
        <g>
          {isHappy || tool === 'success-sign' ? (
            <>
              {/* Smiling curved eyes */}
              <path d="M66 70 Q71 65 74 70" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M86 70 Q89 65 94 70" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Focused, warm eyes */}
              <circle cx="70" cy="70" r="2.5" fill="#374151" />
              <circle cx="90" cy="70" r="2.5" fill="#374151" />
              {/* Cute friendly brown eyebrows */}
              <path d="M64 64 Q70 61 75 64" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
              <path d="M85 64 Q90 61 96 64" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Cheerful rosy cheeks */}
        <circle cx="62" cy="76" r="3.5" fill="#f43f5e" opacity="0.4" />
        <circle cx="98" cy="76" r="3.5" fill="#f43f5e" opacity="0.4" />

        {/* Traditional Mustache & Beard */}
        <g>
          {/* Cozy beard line */}
          <path d="M58 75 C60 98, 100 98, 102 75 C100 85, 60 85, 58 75 Z" fill="#1f2937" />
          {/* Mustache curls */}
          <path d="M68 76 Q80 74 80 80 Q80 74 92 76" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 76 Q62 76 60 72" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M92 76 Q98 76 100 72" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Satisfied smiling mouth */}
        <path d="M75 80 Q80 84 85 80" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />

        {/* Ears */}
        <circle cx="56" cy="73" r="4.5" fill="#fed7aa" />
        <circle cx="104" cy="73" r="4.5" fill="#fed7aa" />
        {/* Tiny gold loop earring */}
        <circle cx="56" cy="76" r="3" fill="none" stroke="#fbbf24" strokeWidth="1.5" />

        {/* --- DYNAMIC HANDS & TOOLS SELECTION --- */}

        {/* LEFT COMPONENT (Watering can / Sickle / Idle placement) */}
        {tool === 'watering-can' && (
          <g className="origin-[50px_105px] transition-transform duration-300">
            {/* Extended left sleeve towards watering can */}
            <path d="M48 115 L28 100 L32 92 L50 106 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="28" cy="96" r="4" fill="#fed7aa" />
            
            {/* The Watering Can */}
            <g transform="translate(10, 85) rotate(-15)">
              {/* Can body */}
              <rect x="6" y="10" width="18" height="15" rx="3" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
              {/* Handle */}
              <path d="M24 13 C29 13, 29 22, 24 22" fill="none" stroke="#475569" strokeWidth="2" />
              {/* Spout pouring */}
              <line x1="6" y1="18" x2="-6" y2="28" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              <path d="M-6 28 L-10 32 L-7 34 L-3 30 Z" fill="#cbd5e1" />
            </g>
          </g>
        )}

        {tool === 'sickle' && (
          <g className="origin-[50px_105px] transition-transform duration-300">
            {/* Extended left arm holding sickle */}
            <path d="M48 115 L26 95 L32 88 L52 104 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="27" cy="91" r="4" fill="#fed7aa" />
            
            {/* Golden Sickle */}
            <g transform="translate(18, 62)">
              {/* Wooden handle */}
              <rect x="5" y="24" width="4" height="14" rx="1" fill="#78350f" transform="rotate(-15)" />
              {/* Metal curved sickle blade */}
              <path d="M7 25 C12 15, 6 2, -4 0 C1 2, 6 12, 5 25 Z" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
              {/* Sharp edge highlight */}
              <path d="M1 4 C6 11, 4 20, 5 25" fill="none" stroke="#f1f5f9" strokeWidth="1" />
            </g>
          </g>
        )}

        {tool === 'seed-bag' && (
          <g>
            {/* Left Hand folded on hip */}
            <path d="M48 115 Q36 125 44 132" fill="none" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <circle cx="44" cy="132" r="3.5" fill="#fed7aa" />

            {/* Right Arm wrapping seed bag */}
            <path d="M112 115 L128 110 L130 118 L114 122" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
            <circle cx="130" cy="114" r="4" fill="#fed7aa" />

            {/* Seed bag Sack */}
            <g transform="translate(118, 105)">
              <path d="M4 10 C1 10, -5 18, -4 28 C-3 34, 15 34, 14 26 C13 18, 9 10, 4 10 Z" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
              {/* Tied neck of bag */}
              <ellipse cx="4" cy="11" rx="5" ry="2" fill="#b45309" />
              {/* SEED text print */}
              <text x="4" y="24" fontSize="6" fontWeight="bold" fill="#78350f" textAnchor="middle" letterSpacing="0.5">SEEDS</text>
            </g>
          </g>
        )}

        {tool === 'idle' && (
          <g>
            {/* Welcoming Waving Arm (Left) */}
            <path d="M48 115 C32 105, 25 80, 20 74" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="19" cy="71" r="4.5" fill="#fed7aa" />
            
            {/* Waving hand lines */}
            <path d="M12 66 L16 68 M15 62 L18 66 M21 62 L21 66" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />

            {/* Right arm relaxed */}
            <path d="M112 115 C118 122, 122 131, 120 137" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="119" cy="139" r="4" fill="#fed7aa" />
          </g>
        )}

        {tool === 'success-sign' && (
          <g>
            {/* Dual arms holding a wooden board */}
            {/* Left Arm */}
            <path d="M48 115 L28 110" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="28" cy="110" r="4" fill="#fed7aa" />

            {/* Right Arm */}
            <path d="M112 115 L132 110" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
            <circle cx="132" cy="110" r="4" fill="#fed7aa" />

            {/* Placard pole */}
            <rect x="77" y="102" width="6" height="40" fill="#78350f" rx="1" />
          </g>
        )}
      </svg>
    </div>
  );
};
