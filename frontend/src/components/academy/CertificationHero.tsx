import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const CertificationHero: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/certifications');
  };

  return (
    <section className="relative min-h-screen w-full bg-[#050806] flex items-center justify-center overflow-hidden py-24 sm:py-32 select-none">
      
      {/* ===== Luxury Emerald Ambient Glow Orbs ===== */}
      {/* Orb 1: Center Top */}
      <motion.div
        className="absolute top-[-10%] left-[30%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_70%)] pointer-events-none z-0"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Orb 2: Bottom Left */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.1),transparent_70%)] pointer-events-none z-0"
        animate={{
          scale: [1.1, 0.9, 1.1],
          x: [0, -20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
      {/* Orb 3: Bottom Right */}
      <motion.div
        className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,rgba(5,150,105,0.12),transparent_70%)] pointer-events-none z-0"
        animate={{
          scale: [0.9, 1.1, 0.9],
          x: [0, 15, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Subtle Noise / Grid Overlay to enhance cinematic texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:100px_100px] opacity-25 pointer-events-none z-0" />
      
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,8,6,0.9)_100%)] pointer-events-none z-0" />

      {/* ===== Layout Grid container ===== */}
      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl h-full flex flex-col items-center justify-center min-h-[70vh]">
        
        {/* ===== Left Side Floating Visual Cards (Desktop) ===== */}
        {/* Card 1: Left Top (Misty nature reflection portrait) */}
        <motion.div
          className="hidden xl:flex absolute left-[3%] top-[12%] w-[260px] h-[340px] flex-col rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-20"
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -14, 0] 
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.5 },
            x: { duration: 1.5, delay: 0.5 },
            y: { repeat: Infinity, duration: 7, ease: 'easeInOut' }
          }}
          whileHover={{ scale: 1.03, borderColor: 'rgba(16,185,129,0.3)' }}
        >
          <div className="w-full h-full relative overflow-hidden group">
            <img 
              src="/assets/cert_portrait_reflection.png" 
              alt="Emotional Reflection"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-emerald-400 uppercase">Reflection</span>
              <h4 className="text-white text-base font-bold mt-1 tracking-wide leading-tight">Clarity of Consciousness</h4>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Left Bottom (Steady water green leaf reflection) */}
        <motion.div
          className="hidden xl:flex absolute left-[8%] bottom-[10%] w-[220px] h-[220px] flex-col rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden z-20"
          initial={{ opacity: 0, x: -50, y: 0 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 10, 0]
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.8 },
            x: { duration: 1.5, delay: 0.8 },
            y: { repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }
          }}
          whileHover={{ scale: 1.04, borderColor: 'rgba(16,185,129,0.3)' }}
        >
          <div className="w-full h-full relative overflow-hidden group">
            <img 
              src="/assets/cert_portrait_steady.png" 
              alt="Inner Steadiness"
              className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/20 to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[9px] tracking-[0.2em] font-semibold text-teal-400 uppercase">Resilience</span>
              <h4 className="text-white text-sm font-semibold mt-0.5 tracking-wide">Emotional Grounding</h4>
            </div>
          </div>
        </motion.div>


        {/* ===== Central Massive Typographic Content ===== */}
        <div className="max-w-4xl text-center flex flex-col items-center justify-center z-10">
          
          {/* Subtle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-semibold leading-none">Nirvaha Academy Certifications</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
          </motion.div>

          {/* Main Cinematic Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-[0.12em] text-white leading-[1.05] text-center"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="block text-white font-black drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]">CERTIFIED</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-300 to-teal-100 font-normal py-3 italic tracking-[0.16em] my-1">FOR</span>
            <span className="block text-white font-black drop-shadow-[0_10px_30px_rgba(255,255,255,0.05)]">INNER GROWTH</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-8 text-base sm:text-lg text-emerald-100/60 max-w-xl sm:max-w-2xl mx-auto leading-relaxed tracking-wide font-light"
          >
            Transform awareness into meaningful growth through emotionally grounded certification experiences designed for clarity, reflection, and inner steadiness.
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12"
          >
            <button
              onClick={handleExplore}
              className="group relative px-10 py-4.5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
            >
              {/* Glowing Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute -inset-px rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-30 group-hover:opacity-60 blur-sm transition-all duration-300" />
              
              {/* Glass Inner Rim border */}
              <div className="absolute inset-[1px] rounded-full border border-white/20 pointer-events-none" />

              {/* Text */}
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-white flex items-center gap-3">
                EXPLORE CERTIFICATIONS
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </motion.div>
        </div>


        {/* ===== Right Side Floating Visual Cards (Desktop) ===== */}
        {/* Card 3: Right Center/Top (Meditating under forest light rays) */}
        <motion.div
          className="hidden xl:flex absolute right-[4%] top-[18%] w-[250px] h-[330px] flex-col rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-20"
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, 15, 0] 
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.6 },
            x: { duration: 1.5, delay: 0.6 },
            y: { repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.5 }
          }}
          whileHover={{ scale: 1.03, borderColor: 'rgba(16,185,129,0.3)' }}
        >
          <div className="w-full h-full relative overflow-hidden group">
            <img 
              src="/assets/cert_portrait_meditation.png" 
              alt="Serene Meditation"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-emerald-400 uppercase">Meditation</span>
              <h4 className="text-white text-base font-bold mt-1 tracking-wide leading-tight">Attention & Presence</h4>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Right Bottom (Glassmorphism Academy Verified Credential Badge) */}
        <motion.div
          className="hidden xl:flex absolute right-[9%] bottom-[12%] w-[230px] p-6 rounded-3xl bg-white/[0.015] backdrop-blur-xl border border-white/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.85)] z-20 flex-col gap-4 text-left"
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -10, 0] 
          }}
          transition={{
            opacity: { duration: 1.5, delay: 0.9 },
            x: { duration: 1.5, delay: 0.9 },
            y: { repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1.5 }
          }}
          whileHover={{ scale: 1.04, borderColor: 'rgba(20,184,166,0.3)' }}
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
              ★
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-emerald-400 bg-emerald-950/50 border border-emerald-800/30 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>
          <div>
            <h5 className="text-white text-xs font-black uppercase tracking-wider mb-1">Nirvaha Credential</h5>
            <p className="text-[11px] text-emerald-100/50 leading-relaxed font-light">
              Integration of ancient Vedic reasoning systems & modern psychological frameworks.
            </p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-1 flex items-center justify-between text-[9px] tracking-wider text-white/40">
            <span>CODE: NVRH-ACAD</span>
            <span className="text-teal-400 font-bold">LEVEL 1 & 2</span>
          </div>
        </motion.div>

      </div>

      {/* ===== Floating Particles and Leaves (Drifting behind layout but in front of glows) ===== */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-400/40 blur-[1px]"
            style={{
              width: Math.random() * 4 + 1.5 + 'px',
              height: Math.random() * 4 + 1.5 + 'px',
              left: Math.random() * 100 + '%',
              top: '100%',
            }}
            animate={{
              y: ['0vh', '-100vh'],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, Math.random() * 0.6 + 0.2, 0]
            }}
            transition={{
              duration: Math.random() * 12 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

    </section>
  );
};
