import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── Floating Card positions for hero ──────────────────────────────────────
const leftCards = [
  {
    src: '/certificate1.png',
    label: 'Mindfulness',
    tag: 'Clarity',
    animate: { y: [0, -16, 0] },
    duration: 7,
    delay: 0,
    className: 'top-[14%] left-[15%] w-[260px] h-[360px]',
  },
  {
    src: '/certificate3.png',
    label: 'Spiritual Counseling',
    tag: 'Connected',
    animate: { y: [0, 14, 0] },
    duration: 8.2,
    delay: 0.8,
    className: 'top-[36%] left-[12%] w-[240px] h-[340px]',
  },
  {
    src: '/certificate5.png',
    label: 'Emotional Intelligence',
    tag: 'Awareness',
    animate: { y: [0, 16, 0] },
    duration: 8.8,
    delay: 1.2,
    className: 'bottom-[10%] left-[14%] w-[280px] h-[380px]',
  },
];

const rightCards = [
  {
    src: '/certificate2.png',
    label: 'Holistic Wellness',
    tag: 'Balance',
    animate: { y: [0, 18, 0] },
    duration: 7.6,
    delay: 0.9,
    className: 'top-[14%] right-[15%] w-[260px] h-[360px]',
  },
  {
    src: '/certificate4.png',
    label: 'Breathwork Healing',
    tag: 'Grounded',
    animate: { y: [0, -12, 0] },
    duration: 7.4,
    delay: 1.4,
    className: 'top-[36%] right-[12%] w-[240px] h-[340px]',
  },
  {
    src: '/certificate6.png',
    label: 'Inner Leadership',
    tag: 'Purpose',
    animate: { y: [0, -12, 0] },
    duration: 6.8,
    delay: 1.9,
    className: 'bottom-[10%] right-[14%] w-[280px] h-[380px]',
  },
];

// ─── Component ──────────────────────────────────────────────────────────────
const CertificationCoursesSection: React.FC = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/courses');
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════
           SECTION 1 — FULLSCREEN CINEMATIC HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden select-none py-28">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_bottom,rgba(245,251,255,0.95),rgba(255,255,255,1))] pointer-events-none" />

        <motion.div
          className="absolute left-[10%] top-[10%] w-[36vw] h-[36vw] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 72%)' }}
          animate={{ scale: [1, 1.08, 1], x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[8%] bottom-[6%] w-[34vw] h-[34vw] rounded-full pointer-events-none z-0"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 74%)' }}
          animate={{ scale: [0.96, 1.04, 0.96], x: [0, -22, 0], y: [0, 24, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '86px 86px',
          }}
        />

        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-300/25 blur-[1px]"
              style={{
                width: Math.random() * 4 + 1.5 + 'px',
                height: Math.random() * 4 + 1.5 + 'px',
                left: Math.random() * 100 + '%',
                top: '100%',
              }}
              animate={{ y: ['0vh', '-110vh'], x: [0, (Math.random() - 0.5) * 90], opacity: [0, 0.7, 0] }}
              transition={{ duration: Math.random() * 16 + 12, repeat: Infinity, ease: 'linear', delay: Math.random() * 10 }}
            />
          ))}
        </div>

        {leftCards.map((card, i) => (
          <motion.div
            key={`lc-${i}`}
            className={`hidden xl:block absolute z-20 ${card.className}`}
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0, y: card.animate.y }}
            transition={{
              opacity: { duration: 1.4, delay: 0.4 + i * 0.25 },
              x: { duration: 1.4, delay: 0.4 + i * 0.25 },
              y: { repeat: Infinity, duration: card.duration, ease: 'easeInOut', delay: card.delay },
            }}
            whileHover={{ scale: 1.06 }}
          >
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.24)] bg-white/[0.05] backdrop-blur-2xl group">
              <img
                src={card.src}
                alt={card.label}
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040706] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block text-[9px] font-black tracking-[0.3em] text-emerald-300 uppercase mb-1">{card.tag}</span>
                <span className="block text-white text-xs font-bold leading-tight">{card.label}</span>
              </div>
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-emerald-500/25" />
            </div>
          </motion.div>
        ))}

        {rightCards.map((card, i) => (
          <motion.div
            key={`rc-${i}`}
            className={`hidden xl:block absolute z-20 ${card.className}`}
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0, y: card.animate.y }}
            transition={{
              opacity: { duration: 1.4, delay: 0.5 + i * 0.25 },
              x: { duration: 1.4, delay: 0.5 + i * 0.25 },
              y: { repeat: Infinity, duration: card.duration, ease: 'easeInOut', delay: card.delay },
            }}
            whileHover={{ scale: 1.06 }}
          >
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/[0.06] shadow-[0_24px_64px_rgba(0,0,0,0.24)] bg-white/[0.05] backdrop-blur-2xl group">
              <img
                src={card.src}
                alt={card.label}
                className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040706] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="block text-[9px] font-black tracking-[0.3em] text-emerald-300 uppercase mb-1">{card.tag}</span>
                <span className="block text-white text-xs font-bold leading-tight">{card.label}</span>
              </div>
              <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-emerald-500/25" />
            </div>
          </motion.div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex flex-col items-center gap-4 mb-12"
          >
            <div className="inline-flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.65)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.34em] text-slate-900">Nirvaha — Certified To Transform</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.65)]" />
            </div>
            <div className="max-w-3xl px-4 py-3 rounded-full border border-slate-200/30 bg-slate-50 text-slate-900 text-sm sm:text-base leading-7 shadow-sm">
              A premium cinematic experience for an emotionally immersive certification journey.
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-slate-900 tracking-[-0.04em] leading-[0.92] text-center"
            style={{ fontSize: 'clamp(4.8rem, 8vw, 9.8rem)' }}
          >
            <span className="block tracking-tight">CERTIFIED</span>
            <span className="block text-[1.1em] font-semibold text-emerald-700 uppercase tracking-normal my-2">FOR</span>
            <span className="block tracking-tight">INNER GROWTH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="mt-10 text-sm sm:text-base lg:text-lg text-slate-700 max-w-2xl leading-8 font-light tracking-[0.02em]"
          >
            Discover emotionally grounded certification pathways designed to nurture clarity, reflection, awareness, and meaningful personal transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.65 }}
            className="mt-16"
          >
            <button
              onClick={handleExplore}
              className="relative inline-flex items-center justify-center rounded-full border border-transparent bg-emerald-600 px-14 py-4 text-[12px] font-black uppercase tracking-[0.32em] text-white shadow-[0_24px_64px_rgba(16,185,129,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-300/20 opacity-100" />
              <span className="relative z-10">EXPLORE CERTIFICATIONS</span>
            </button>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default CertificationCoursesSection;
