import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  RotateCcw, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Sun,
  CloudSun,
  Shield,
  PhoneCall,
  Heart,
  Share2
} from 'lucide-react';
import { LoginState, FarmerTool } from './types';
import { Farmer } from './components/Farmer';
import { CropsField } from './components/CropsField';
import { Harvester } from './components/Harvester';

export default function App() {
  // Intro Rain states: 'raining' | 'rippling' | 'spawned'
  const [introState, setIntroState] = useState<'raining' | 'rippling' | 'spawned'>('raining');
  
  // Custom screen state
  const [state, setState] = useState<LoginState>({
    emailInput: '',
    isEmailValid: null,
    passwordInput: '',
    passwordStrength: 0,
    isSubmitting: false,
    isHarvested: false,
    activeScreen: 'login',
  });

  const [fullName, setFullName] = useState('');
  const [farmerTool, setFarmerTool] = useState<FarmerTool>('idle');
  const [isJittering, setIsJittering] = useState(false);
  const [harvesterDriving, setHarvesterDriving] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect glass-panel resize to ensure responsive viewports
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rain fall sequencing
  useEffect(() => {
    // 1.8s for the raindrop to fall down
    const rainTimer = setTimeout(() => {
      setIntroState('rippling');
    }, 1800);

    // 1s for the ripple ground splash, then spawn
    const rippleTimer = setTimeout(() => {
      setIntroState('spawned');
    }, 2800);

    return () => {
      clearTimeout(rainTimer);
      clearTimeout(rippleTimer);
    };
  }, []);

  // Determine what tool the Farmer holds dynamically
  useEffect(() => {
    if (state.activeScreen === 'success') {
      setFarmerTool('success-sign');
      return;
    }
    if (harvesterDriving) {
      setFarmerTool('sickle');
      return;
    }
    // Signup mode toggle
    if (state.activeScreen === 'signup') {
      setFarmerTool('seed-bag');
      return;
    }
    // Checking if user is currently validating or inputting
    if (state.emailInput.length > 0 || state.passwordInput.length > 0) {
      setFarmerTool('watering-can');
      return;
    }
    setFarmerTool('idle');
  }, [state.activeScreen, state.emailInput, state.passwordInput, harvesterDriving]);

  // Handle email changes and validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Gmail check requirement: starts/contains valid text followed specifically by "@gmail.com"
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let isValid: boolean | null = null;
    
    if (val.length > 0) {
      isValid = gmailRegex.test(val);
    }

    // Trigger feedback jitter if the layout is typed out but becomes invalid
    if (val.length > 5 && !gmailRegex.test(val)) {
      setIsJittering(true);
      const timer = setTimeout(() => setIsJittering(false), 500);
    }

    setState((prev) => ({
      ...prev,
      emailInput: val,
      isEmailValid: isValid,
    }));
  };

  // Handle password change & calculate Jodhpur crop strength
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Calculate 0 to 100% crop growth based on length & simple strength criteria
    let strength = 0;
    if (val.length > 0) {
      // 10 points per character up to 10 chars max (100 points)
      strength = Math.min(val.length * 10, 100);
    }

    setState((prev) => ({
      ...prev,
      passwordInput: val,
      passwordStrength: strength,
    }));
  };

  // Skip the rain drop intro instantly (For ease of use / testing)
  const skipIntro = () => {
    setIntroState('spawned');
  };

  // Harvester midpoint yield hook
  const handleHarvestMidpoint = () => {
    setState((prev) => ({ ...prev, isHarvested: true }));
    // Tactile feel vibrator notification on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([120, 80, 150, 50, 100]);
    }
  };

  // Harvester finish yield hook
  const handleHarvestComplete = () => {
    setHarvesterDriving(false);
    setState((prev) => ({
      ...prev,
      isSubmitting: false,
      activeScreen: 'success',
    }));
  };

  // Submit / Login harvest action
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.isEmailValid) {
      setIsJittering(true);
      setTimeout(() => setIsJittering(false), 500);
      return;
    }
    if (state.passwordStrength < 35) {
      // Need stronger password sprout to harvest
      setIsJittering(true);
      setTimeout(() => setIsJittering(false), 500);
      return;
    }

    // Start harvest visualizer!
    setHarvesterDriving(true);
    setState((prev) => ({ ...prev, isSubmitting: true }));
  };

  // Restart flow
  const resetFarmFlow = () => {
    setState({
      emailInput: '',
      isEmailValid: null,
      passwordInput: '',
      passwordStrength: 0,
      isSubmitting: false,
      isHarvested: false,
      activeScreen: 'login',
    });
    setFullName('');
    setHarvesterDriving(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-jodhpur-sky-gradient flex flex-col items-center justify-start md:justify-center p-4 md:p-8 select-none font-sans overflow-y-auto overflow-x-hidden">
      
      {/* Background Ambience: Drift Suns and Clouds */}
      <div className="absolute top-24 left-1/4 pointer-events-none animate-cloud-slow opacity-25">
        <CloudSun className="w-24 h-24 text-emerald-500/40" />
      </div>
      <div className="absolute top-40 right-1/4 pointer-events-none animate-cloud-fast opacity-30">
        <div className="w-24 h-24 rounded-full bg-amber-200 blur-xl opacity-60"></div>
      </div>

      {/* Decorative full-bleed soil layers to ground the visual farm */}
      <div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-[#3D2B1F] to-[#5D4037] border-t-8 border-emerald-600 z-0 pointer-events-none opacity-40 md:opacity-100" />

      {/* --- INTRO SCENE 1: WALKING RAINDROP --- */}
      {introState !== 'spawned' && (
        <div className="flex flex-col items-center justify-center absolute inset-0 z-50 bg-[#0c1a30] transition-colors duration-1000 p-6 text-center">
          <div className="relative w-full max-w-md h-96 flex flex-col items-center justify-center">
            
            {/* Seed / Wheat visual indicator waiting for water */}
            <div className="text-slate-500 font-mono text-xs tracking-widest uppercase mb-12 animate-pulse">
              Watering the dry soil to spawn the terminal...
            </div>

            {/* Falling rain drop */}
            {introState === 'raining' && (
              <div className="absolute top-0 w-1.5 h-14 bg-sky-400 rounded-full animate-raindrop" />
            )}

            {/* Ripple when hit ground */}
            {introState === 'rippling' && (
              <div className="absolute bottom-28 flex items-center justify-center">
                {/* Ripples */}
                <div className="absolute w-20 h-20 border-[3px] border-sky-400/80 rounded-full animate-ripple" />
                <div className="absolute w-20 h-20 border-[2.5px] border-sky-400/65 rounded-full animate-ripple" style={{ animationDelay: '0.2s' }} />
                {/* Ground splash */}
                <div className="w-28 h-2 bg-sky-200 animate-splash" />
              </div>
            )}

            {/* Soil patch where drop falls */}
            <div className="absolute bottom-24 w-40 h-4 bg-amber-950/40 rounded-full blur-xs" />
          </div>

          {/* Skip rain prompt */}
          <button
            onClick={skipIntro}
            className="mt-6 px-4 py-2 border border-slate-600 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold tracking-wider uppercase font-mono transition-all"
          >
            Skip Rain Animation
          </button>
        </div>
      )}

      {/* --- INTRO SCENE 2: MAIN LOGIN BOARD SPAWNED --- */}
      {introState === 'spawned' && (
        <main
          className="relative w-full max-w-5xl flex flex-col items-center gap-4 md:gap-6 z-10 animate-glass-spawn text-slate-900 px-2 sm:px-4"
        >
          {/* RUSTIC FARM HEADER BAR */}
          <header className="w-full max-w-4xl px-2 md:px-6 py-2 flex justify-between items-center z-10 gap-2 mb-2 md:mb-4">
            <div className="flex items-center gap-3">
              <div className="relative p-[2px] bg-gradient-to-br from-amber-400 via-emerald-650 to-emerald-400 rounded-2xl shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer" id="portal-premium-logo">
                <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-2.5 rounded-[14px] relative overflow-hidden flex items-center justify-center">
                  {/* Radial light glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-450 to-emerald-350 opacity-20 blur-xs group-hover:opacity-40 transition-opacity duration-300" />
                  {/* Gold beacon indicator */}
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-xs" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                  <div className="relative z-10">
                    <Sprout className="w-5 h-5 text-emerald-300 group-hover:text-amber-350 group-hover:rotate-12 transition-all duration-300" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-sm md:text-base font-black text-emerald-950 tracking-wider uppercase font-mono leading-none flex items-center gap-1.5">
                  AyTech AgriPortal <span className="text-[9px] bg-amber-400 text-emerald-950 px-1.5 py-0.5 rounded-md font-extrabold uppercase tracking-tight">PRO</span>
                </h1>
                <p className="text-[9px] md:text-[10px] text-emerald-850 font-bold font-mono tracking-tight mt-0.5">
                  CULTIVATED BY AYTECH SOLUTION
                </p>
              </div>
            </div>

            {/* Action badge */}
            <div className="bg-emerald-50 border border-emerald-200/55 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-xs shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span className="text-[9px] md:text-[10px] font-mono text-emerald-900 uppercase font-bold">Live Node</span>
            </div>
          </header>

          {/* Main Desktop split layout (Farmer left, Form center-right) */}
          <div className={`w-full flex ${isMobile ? 'flex-col gap-4' : 'flex-row gap-8 items-stretch'} justify-center`}>
            
            {/* LEFT COLUMN: Farmer Housing */}
            <div className={`flex flex-col ${isMobile ? 'order-first' : 'w-1/3 min-w-[240px]'} flex-shrink-0 z-10`}>
              <div className="bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm backdrop-blur-md flex flex-col items-center justify-center text-center w-full h-full min-h-[220px]">
                <Farmer tool={farmerTool} isHappy={state.activeScreen === 'success'} className="transition-all duration-300" />
                
                <div className="mt-4 font-mono">
                  <p className="text-emerald-900 text-xs font-semibold uppercase">
                    Your Personal Farmer
                  </p>
                  <p className="text-[10px] text-emerald-800 mt-1 max-w-[190px]">
                    {farmerTool === 'idle' && "Ready to start the seasonal crop cultivation!"}
                    {farmerTool === 'seed-bag' && "Ready to sow seeds for your signup parameters."}
                    {farmerTool === 'watering-can' && "Injecting mineral validation into the soil."}
                    {farmerTool === 'sickle' && "Harvesting sickle is prepped. Rev up the combine!"}
                    {farmerTool === 'success-sign' && "Sovereign produce gathered. Great harvest!"}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Interactive Glassmorphic Terminal Card */}
            <div className={`flex-1 ${state.activeScreen === 'success' ? 'max-w-xl' : 'max-w-2xl'} z-10`}>
              
              <div 
                className={`glass-panel rounded-[40px] p-6 md:p-8 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
                  isJittering ? 'animate-jitter border-red-400' : ''
                }`}
              >
                {/* Visual backdrop decoration */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* --- INNER SCREEN 1: LOGIN FORM --- */}
                {state.activeScreen !== 'success' && (
                  <div>
                    {/* Switch Mode tabs (Sign In vs Sign Up) */}
                    <div className="flex bg-emerald-950/10 rounded-xl p-1 mb-6">
                      <button
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, activeScreen: 'login' }))}
                        className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                          state.activeScreen === 'login'
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'text-emerald-900 hover:bg-white/10'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setState(prev => ({ ...prev, activeScreen: 'signup' }))}
                        className={`flex-1 py-2 rounded-lg text-xs md:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                          state.activeScreen === 'signup'
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'text-emerald-905 hover:bg-white/10'
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>

                    <div className="text-center mb-6">
                      <h2 className="text-xl md:text-2xl font-black text-emerald-950 leading-tight">
                        {state.activeScreen === 'login' ? 'Welcome to AgriPortal ' : 'Create your Account'}
                      </h2>
                      <p className="text-xs text-emerald-900/60 mt-1.5 font-semibold">
                        {state.activeScreen === 'login' 
                          ? 'Create your account to get started.' 
                          : 'Please enter the required details for your farm.'}
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      {/* Name Row if Signing Up */}
                      {state.activeScreen === 'signup' && (
                        <div>
                          <label className="block text-xs font-bold text-emerald-850 uppercase tracking-wider mb-1.5 font-mono">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-800/60" />
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="e.g. Agro & Garden Solution"
                              className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-xl shadow-xs focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-sm text-emerald-950 placeholder:text-emerald-800/40 outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {/* Gmail Email Row */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-emerald-850 uppercase tracking-wider font-mono">
                            Email Address
                          </label>
                          {state.isEmailValid === true && (
                            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-bounce">
                              <Sprout className="w-3 h-3" /> Gmail Verified
                            </span>
                          )}
                          {state.isEmailValid === false && (
                            <span className="text-[10px] text-red-650 font-bold font-mono">
                              REQUIRES VALID GMAIL
                            </span>
                          )}
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-800/60" />
                          <input
                            type="email"
                            required
                            value={state.emailInput}
                            onChange={handleEmailChange}
                            placeholder="yourname@gmail.com"
                            className={`w-full pl-10 pr-4 py-2.5 bg-white/80 border ${
                              state.isEmailValid === false ? 'border-red-500 ring-2 ring-red-100' : 'border-emerald-200'
                            } rounded-xl shadow-xs focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-sm text-emerald-950 placeholder:text-emerald-800/40 outline-none`}
                          />
                        </div>
                      </div>

                      {/* Password Field: triggers scaling Jodhpur crops */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-xs font-bold text-emerald-850 uppercase tracking-wider font-mono">
                           Password
                          </label>
                          <span className="text-[10px] font-mono text-emerald-900 font-bold">
                            Length: {state.passwordInput.length} (Strength)
                          </span>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-800/60" />
                          <input
                            type="password"
                            required
                            value={state.passwordInput}
                            onChange={handlePasswordChange}
                            placeholder="At least 9 symbols for Golden Bloom"
                            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-xl shadow-xs focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-sm text-emerald-950 placeholder:text-emerald-800/40 outline-none"
                          />
                        </div>

                        {/* Visual progress bar of natural soil moisture */}
                        <div className="mt-2.5">
                          <div className="flex justify-between items-center text-[10px] text-emerald-900 font-semibold mb-1">
                            <span>Password Strength</span>
                            <span className="font-mono">
                              {state.passwordStrength < 35 && '🔴 CLAY / LOW (Needs Water)'}
                              {state.passwordStrength >= 35 && state.passwordStrength < 75 && '🟡 DAMP / MEDIUM (Healthy)'}
                              {state.passwordStrength >= 75 && '🟢 LUSH / DELUGE (Perfect Bloom!)'}
                            </span>
                          </div>
                          <div className="h-2 w-full bg-emerald-950/15 rounded-full overflow-hidden p-0.5 border border-emerald-950/5">
                            <div
                              className="h-full rounded-full transition-all duration-500 ease-out"
                              style={{
                                width: `${state.passwordStrength}%`,
                                backgroundColor:
                                  state.passwordStrength < 35
                                    ? '#d97706'
                                    : state.passwordStrength < 75
                                    ? '#10b981'
                                    : '#f59e0b',
                                boxShadow: state.passwordStrength >= 75 ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Crop validation warnings to guide user */}
                      {state.passwordStrength < 35 && state.passwordInput.length > 0 && (
                        <div className="bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-xl text-[11px] text-emerald-850 leading-relaxed font-mono">
                          ⚠️ <strong>Growth warning:</strong> Your password is too short! Crops cannot build deep roots. Type more symbols to water the fields.
                        </div>
                      )}

                      {/* Real action submit button */}
                      <button
                        type="submit"
                        disabled={state.isSubmitting || state.isEmailValid !== true || state.passwordStrength < 35}
                        className={`w-full py-3 px-4 rounded-xl text-white font-extrabold tracking-wider uppercase text-xs md:text-sm shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                          state.isEmailValid === true && state.passwordStrength >= 35
                            ? 'bg-emerald-700 hover:bg-emerald-800 hover:shadow-lg cursor-pointer'
                            : 'bg-emerald-900/40 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {state.isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            CULMINATING HARVEST...
                          </>
                        ) : (
                          <>
                            {state.activeScreen === 'login' ? 'Login' : 'Sign UP'}
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}

                {/* --- INNER SCREEN 2: SUCCESS STATE & SOCIALS --- */}
                {state.activeScreen === 'success' && (
                  <div className="flex flex-col items-center text-center py-4">
                    
                    {/* Glowing Sparkle Core */}
                    <div className="relative mb-4 flex items-center justify-center">
                      <div className="absolute inset-0 bg-emerald-400/25 rounded-full blur-xl animate-pulse" />
                      <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-700 p-4 rounded-full shadow-md relative z-10 animate-bounce">
                        <Sparkles className="w-8 h-8" />
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-950 tracking-tight">
                      Success
                    </h2>
                    <p className="text-sm text-emerald-900/80 mt-2 max-w-md leading-relaxed font-semibold">
                      Harvest successful! Crop Quality is excellent, and soil health is optimal.
                    </p>

                    {/* VIRAL CALL-TO-ACTION SIGNS */}
                    <div className="mt-6 w-full bg-emerald-50/50 border-2 border-dashed border-emerald-600/40 rounded-2xl p-4 md:p-6 shadow-xs relative overflow-hidden">
                      {/* Decorative backdrop stamp */}
                      <div className="absolute -right-8 -bottom-8 opacity-5 font-bold">
                        <Sprout className="w-32 h-32 text-emerald-900" />
                      </div>

                      <p className="text-xs font-bold text-emerald-900/40 uppercase tracking-widest font-mono">
                        Connect With Us
                      </p>
                      
                      <blockquote className="my-3 text-lg md:text-xl font-extrabold text-emerald-950 italic tracking-tight font-serif">
                        &ldquo;Want this code? DM me!&rdquo;
                      </blockquote>

                      <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto mb-5 font-semibold">
                        Click below to copy this template or connect with me to receive the raw responsive asset. Let&apos;s go viral!
                      </p>

                      {/* Instagram & Social Media Buttons */}
                      <div className="flex justify-center gap-3">
                        <a
                          href="https://instagram.com/aytech_solution"
                          target="_blank"
                          rel="noreferrer referrer"
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-transform cursor-pointer"
                        >
                          <Instagram className="w-4 h-4" />
                          <span>Follow Us</span>
                        </a>

                        <a
                          href="https://github.com/AyTech-Solution/loginpageagri/tree/main"
                          target="_blank"
                          rel="noreferrer referrer"
                          className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-transform cursor-pointer"
                        >
                          <Facebook className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      </div>

                      {/* Code copy success trigger or reset option */}
                      <div className="mt-5 pt-4 border-t border-emerald-900/10 flex justify-center gap-2.5">
                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText("Check Out Our Website:\\nhttps://agrogardensolution.com\\n\\nOur Github Profile:\\nhttps://github.com/AyTech_Solution\\n\\nFollow Us On Social Media");
                              alert("Social link copied to clipboard!");
                            }
                          }}
                          className="text-emerald-800 bg-emerald-100 hover:bg-emerald-200/80 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-transform active:scale-95 flex items-center gap-1 leading-none cursor-pointer"
                        >
                          <Share2 className="w-3 h-3" /> Share With Your Friends
                        </button>
                      </div>
                    </div>

                    {/* Reset Cultivator Trigger */}
                    <button
                      onClick={resetFarmFlow}
                      className="mt-6 text-emerald-800 hover:text-emerald-950 font-bold text-xs tracking-wider uppercase font-mono transition-all flex items-center gap-1.5 hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      Begin New Session
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

           {/* BELOW THE MAIN GIRD: Crop Visualizer Row (representing the farm horizontal layout) */}
          <div className="w-full relative py-2">
            
            {/* The visual crops row where growth scales up based on password length */}
            <CropsField
              passwordStrength={state.passwordStrength}
              isEmailValid={state.isEmailValid}
              isHarvested={state.isHarvested}
              isMobile={isMobile}
            >
              {/* The automated animated combine harvester rendered as a clipped child */}
              <Harvester
                isDriving={harvesterDriving}
                isMobile={isMobile}
                onHarvestMidpoint={handleHarvestMidpoint}
                onComplete={handleHarvestComplete}
              />
            </CropsField>
          </div>

          {/* FOOTER BAR: Simple & Clean (Aligns with anti-AI system-indicators rules) */}
          <footer className="mt-4 flex flex-col items-center gap-1.5 z-10">
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 text-xs font-bold text-emerald-900/50">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> SSL Cultivated
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> Farmer Support
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-red-650 drop-shadow-md">
                Built with ❤️ by AyTech Solution
              </span>
            </div>
            <p className="text-[10px] text-emerald-900/30 font-mono tracking-wider font-bold">
              &copy; 2026 AYTECH AGRIPORTAL. ALL RIGHTS RESERVED.
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}
