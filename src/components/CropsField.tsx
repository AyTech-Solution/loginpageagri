import React from 'react';

interface CropsFieldProps {
  passwordStrength: number; // 0 (empty) to 100 (full strength)
  isEmailValid: boolean | null; // true = valid, false = invalid/weeds, null = empty
  isHarvested: boolean; // if true, crops opacity drops to 0
  isMobile: boolean;
  children?: React.ReactNode;
}

export const CropsField: React.FC<CropsFieldProps> = ({
  passwordStrength,
  isEmailValid,
  isHarvested,
  isMobile,
  children,
}) => {
  // Generate 8 individual crop positions for organic look
  const cropPlots = Array.from({ length: isMobile ? 6 : 10 }).map((_, i) => {
    const randomOffset = Math.sin(i * 123) * 5; // deterministic natural deviation
    const scaleDelay = (i * 0.05).toFixed(2);
    return {
      id: i,
      offset: randomOffset,
      delay: scaleDelay,
    };
  });

  // Decide layout parameters of the crop
  // Strength ranges from 0 to 100
  // 0-25: very weak (tiny brown nubs)
  // 26-55: medium (green leafy sprouts)
  // 56-100: strong (lush golden wheat ears)
  const getCropStatus = () => {
    if (passwordStrength === 0) return { scale: 0.1, color: '#b45309', label: 'Bare Soil', isGolden: false };
    if (passwordStrength < 35) return { scale: 0.35, color: '#d97706', label: 'Sprouts Planted', isGolden: false };
    if (passwordStrength < 75) return { scale: 0.7, color: '#16a34a', label: 'Growing Strong', isGolden: false };
    return { scale: 1.1, color: '#eab308', label: 'Golden Bloom!', isGolden: true };
  };

  const status = getCropStatus();

  return (
    <div className="w-full flex flex-col items-center select-none" id="crops-field-container">
      {/* Tiny descriptive HUD for crop status (Human labeled/Clean look) */}
      <div className="flex items-center gap-1.5 mb-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-xs">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color, transition: 'background-color 0.4s' }}></span>
        <span className="text-[10px] md:text-xs font-semibold text-emerald-950 tracking-wider font-mono">
          CROP LEVEL: {status.label.toUpperCase()} ({passwordStrength}%)
        </span>
      </div>

      {/* Soil Plot & Crops container */}
      <div
        className={`relative w-full ${
          isMobile ? 'h-32' : 'h-40'
        } bg-emerald-950/20 rounded-2xl border border-emerald-900/15 p-3 md:p-4 flex flex-row items-end justify-around gap-1 md:gap-2 overflow-hidden transition-all duration-700`}
      >
        {/* Underlayer Soil styling lines */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-soil-brown/40 border-t border-soil-brown/20 rounded-b-xl"></div>

        {/* Clipped absolute overlays like the automated Harvester */}
        {children}

        {/* Floating pollen particles for golden bloom */}
        {status.isGolden && !isHarvested && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-300 rounded-full animate-sparkle"
                style={{
                  left: `${15 + i * 7.5}%`,
                  bottom: `${20 + (i % 3) * 20}%`,
                  animationDelay: `${i * 0.25}s`,
                  animationDuration: `${2.5 + (i % 2)}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Plot columns */}
        {cropPlots.map((plot) => {
          // Individual crop height scale
          const heightScale = isHarvested ? 0 : status.scale;

          return (
            <div
              key={plot.id}
              className="relative flex flex-col items-center justify-end h-full transition-opacity duration-500"
              style={{
                transform: `translateX(${plot.offset}px)`,
                opacity: isHarvested ? 0 : 1,
                transition: `all 0.5s ease-out ${isHarvested ? parseFloat(plot.delay) * 0.5 : 0}s`,
              }}
            >
              {/* Animated weed overlay if email validation fails */}
              {isEmailValid === false && !isHarvested && (
                <div className="absolute bottom-6 z-10 animate-weed origin-bottom" style={{ animationDelay: `${plot.id * 0.08}s` }}>
                  <svg width="24" height="28" viewBox="0 0 24 28" className="drop-shadow-sm">
                    {/* Dark thorny validation weeds */}
                    <path
                      d="M12 28 Q6 16, 2 12 Q8 14, 12 2 C12 12, 16 14, 22 12 Q18 16, 12 28 Z"
                      fill="#701a75" /* Spiky Indigo/Muted purple weed */
                      stroke="#4a044e"
                      strokeWidth="1.5"
                    />
                    {/* Weed thorns */}
                    <line x1="8" y1="18" x2="4" y2="17" stroke="#4a044e" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="16" y1="18" x2="20" y2="17" stroke="#4a044e" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="9" y1="10" x2="5" y2="8" stroke="#4a044e" strokeWidth="1" strokeLinecap="round" />
                    <line x1="15" y1="10" x2="19" y2="8" stroke="#4a044e" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>
              )}

              {/* Animated clover/healthy sprout if email is valid */}
              {isEmailValid === true && !isHarvested && (
                <div className="absolute bottom-6 z-10 animate-sprout origin-bottom" style={{ animationDelay: `${plot.id * 0.05}s` }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="drop-shadow-xs">
                    {/* Double leaf baby sprout of validation success */}
                    <path d="M12 24 L12 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                    {/* Left Leaf */}
                    <path d="M12 14 C6 10, 4 14, 12 14 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
                    {/* Right Leaf */}
                    <path d="M12 14 C18 10, 20 14, 12 14 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />
                  </svg>
                </div>
              )}

              {/* Main Jodhpur Millet Crop Stalk */}
              <div
                className="relative origin-bottom transition-all duration-700 ease-out"
                style={{
                  transform: `scaleY(${heightScale})`,
                  transitionDelay: `${plot.delay}s`,
                }}
              >
                <svg
                  width={isMobile ? '24' : '32'}
                  height="90"
                  viewBox="0 0 32 90"
                  className="transition-all duration-300"
                >
                  {/* Stalk core */}
                  <path
                    d="M16 90 Q14 45, 16 0"
                    fill="none"
                    stroke={status.color}
                    strokeWidth={passwordStrength > 75 ? "3.5" : "2"}
                    strokeLinecap="round"
                  />

                  {/* Crop leaves according to strength phases */}
                  {passwordStrength > 0 && (
                    <g fill={status.color}>
                      {/* Leaf pair 1 */}
                      <path d="M15 70 C5 60, 0 65, 15 78 Z" />
                      <path d="M17 70 C27 60, 32 65, 17 78 Z" />

                      {/* Leaf pair 2 */}
                      {passwordStrength >= 35 && (
                        <>
                          <path d="M15 50 C4 35, -2 40, 15 58 Z" />
                          <path d="M17 50 C28 35, 34 40, 17 58 Z" />
                        </>
                      )}

                      {/* Lush details & rich ear of millets/wheat if strong */}
                      {passwordStrength >= 75 && (
                        <g>
                          {/* Upper thick leaves */}
                          <path d="M15 30 C6 15, 2 20, 15 38 Z" fill="#eab308" />
                          <path d="M17 30 C26 15, 30 20, 17 38 Z" fill="#eab308" />

                          {/* Beautiful golden crop bloom top */}
                          <g transform="translate(11, 2)">
                            <ellipse cx="5" cy="18" rx="4" ry="5.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                            <ellipse cx="5" cy="8" rx="4" ry="5.5" fill="#f59e0b" stroke="#ca8a04" strokeWidth="1" />
                            <ellipse cx="5" cy="-2" rx="3.5" ry="5" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1" />
                            
                            <ellipse cx="11" cy="22" rx="3.5" ry="5" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1" />
                            <ellipse cx="11" cy="12" rx="4" ry="5.5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                            <ellipse cx="11" cy="2" rx="4" ry="5.5" fill="#f59e0b" stroke="#ca8a04" strokeWidth="1" />

                            <circle cx="8" cy="-8" r="3" fill="#fef08a" />
                          </g>

                          {/* Golden sparkles/pollen */}
                          <circle cx="16" cy="-12" r="1.5" fill="#fef08a" className="animate-pulse" />
                        </g>
                      )}
                    </g>
                  )}
                </svg>
              </div>

              {/* Natural Soil Mound below each crop */}
              <svg width="36" height="12" viewBox="0 0 36 12" className="mt-1">
                <path d="M2 12 C2 4, 34 4, 34 12 Z" fill="#7c2d12" stroke="#451a03" strokeWidth="1" />
                {/* Seed shell decoration */}
                <ellipse cx="18" cy="10" rx="3" ry="1.5" fill="#92400e" />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};
