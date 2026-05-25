import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import CertificationCoursesSection from '../components/landing/CertificationCoursesSection';

const allCertifications = [
  {
    title: 'Mindfulness Meditation Certification',
    description: 'Learn the art and science of mindfulness meditation and become a certified instructor.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    feel: 'Calm & Focused',
    tag: 'Clarity',
  },
  {
    title: 'Emotional Intelligence Mastery',
    description: 'Deep dive into emotional intelligence with practical tools and certification.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    feel: 'Empowered & Aware',
    tag: 'Awareness',
  },
  {
    title: 'Holistic Wellness Coach',
    description: 'Comprehensive training to guide others on their holistic wellness journey.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    feel: 'Balanced & Inspired',
    tag: 'Balance',
  },
  {
    title: 'Spiritual Counseling Program',
    description: 'Integrate ancient wisdom and modern psychology for spiritual counseling.',
    image: 'https://images.unsplash.com/photo-1528319725582-ddc0b610113c?auto=format&fit=crop&w=600&q=80',
    feel: 'Connected & Uplifted',
    tag: 'Connected',
  },
  {
    title: 'Breathwork Healing Practitioner',
    description: 'Master transformative breathwork techniques to facilitate deep healing and emotional release.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    feel: 'Grounded & Free',
    tag: 'Grounded',
  },
  {
    title: 'Inner Leadership Certification',
    description: 'Develop soulful leadership skills rooted in self-awareness, purpose, and compassionate action.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    feel: 'Purposeful & Clear',
    tag: 'Purpose',
  },
];

const faqs = [
  {
    q: 'How much does a Nirvaha certification cost?',
    a: 'Our certification programs are priced to be accessible. Each program has its own pricing based on depth and duration. Visit the certifications panel above to explore individual program details.',
  },
  {
    q: 'Is it worth getting a wellness certification?',
    a: 'Absolutely. A recognised certification validates your expertise, builds client trust, and opens doors to professional opportunities in the rapidly growing wellness industry.',
  },
  {
    q: 'How long does it take to complete a certification?',
    a: 'Most Nirvaha certifications can be completed in 4–12 weeks depending on the program. All courses are self-paced, so you can learn on your own schedule.',
  },
  {
    q: 'Are Nirvaha certifications globally recognised?',
    a: 'Yes. Nirvaha certifications are respected by wellness organisations, corporate wellness programs, and healing communities worldwide, giving you credibility wherever you practice.',
  },
  {
    q: 'What type of certification is most in demand?',
    a: 'Mindfulness, emotional intelligence, and holistic wellness coaching are among the most sought-after certifications today, driven by growing awareness of mental health and conscious living.',
  },
  {
    q: 'Can I practice without a certification?',
    a: 'While some wellness roles don\'t legally require certification, having one significantly increases your credibility, client confidence, and earning potential as a practitioner.',
  },
  {
    q: 'Do I get lifetime access to course materials?',
    a: 'Yes. Once enrolled, you receive lifetime access to all course content, updates, and community resources — so you can revisit and deepen your learning at any time.',
  },
];

const FAQAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#e5e7eb]">
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-start gap-5 py-6 text-left group"
          >
            <span className="mt-1 flex-shrink-0 text-2xl font-light text-[#0a0f0c] group-hover:text-emerald-600 transition-colors leading-none select-none w-6">
              {openIdx === idx ? '−' : '+'}
            </span>
            <span className="text-lg sm:text-xl font-semibold text-[#0a0f0c] group-hover:text-emerald-700 transition-colors leading-snug">
              {faq.q}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {openIdx === idx && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p className="pb-6 pl-11 text-[#555] text-base sm:text-lg leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const INITIAL_COUNT = 4;

const CertificationsPage: React.FC = () => {
  const navigate = useNavigate();
  // certVisible: whether the full-screen certifications panel is shown
  const [certVisible, setCertVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (certVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [certVisible]);

  const handleViewCertifications = () => {
    navigate('/courses');
  };

  const handleClose = () => {
    setCertVisible(false);
    setShowAll(false);
  };

  const visibleCerts = showAll ? allCertifications : allCertifications.slice(0, INITIAL_COUNT);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <SEOHead
        title="Certifications | Nirvaha"
        description="Immersive wellness certifications designed for emotional balance, mindful living, and conscious growth."
      />

      {/* ── Back to Home — fixed top-left ── */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        type="button"
        onClick={() => navigate('/')}
        className="fixed top-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-white/80 backdrop-blur-sm px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#065f46] shadow-[0_2px_16px_rgba(16,185,129,0.12)] transition-all duration-300 hover:border-emerald-400 hover:bg-white hover:shadow-md"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </motion.button>

      {/* ── Cinematic Hero — CERTIFIED FOR INNER GROWTH ── */}
      <CertificationCoursesSection />

      {/* ── FUTURISTIC EMOTIONAL WELLNESS HERO ── */}
      <div className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 40%, #f0fdfa 70%, #f7fffe 100%)' }}>

        {/* Dynamic grid background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Grid fade vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(240,253,248,0.95) 100%)' }}
        />

        {/* Floating emotional keywords */}
        {['Clarity', 'Balance', 'Growth', 'Awareness', 'Presence', 'Healing', 'Purpose', 'Calm', 'Wisdom', 'Flow'].map((word, i) => (
          <motion.span
            key={word}
            className="absolute text-emerald-600/[0.07] font-black uppercase select-none pointer-events-none"
            style={{
              fontSize: `${1.2 + (i % 3) * 0.6}rem`,
              left: `${5 + (i * 9.3) % 85}%`,
              top: `${8 + (i * 13.7) % 80}%`,
              fontFamily: "'Cinzel', serif",
              letterSpacing: '0.15em',
            }}
            animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {word}
          </motion.span>
        ))}

        {/* Ambient particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                background: i % 3 === 0 ? 'rgba(16,185,129,0.5)' : i % 3 === 1 ? 'rgba(52,211,153,0.4)' : 'rgba(110,231,183,0.35)',
                left: `${Math.random() * 100}%`,
                top: '100%',
                filter: 'blur(0.5px)',
              }}
              animate={{ y: ['0vh', '-110vh'], x: [0, (Math.random() - 0.5) * 100], opacity: [0, 0.8, 0] }}
              transition={{ duration: Math.random() * 14 + 10, repeat: Infinity, ease: 'linear', delay: Math.random() * 10 }}
            />
          ))}
        </div>

        {/* Main layout */}
        <div className="relative z-10 w-full px-6 lg:px-20 py-24 lg:py-0 min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

            {/* ── LEFT: Typography ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-white/70 backdrop-blur-sm px-5 py-2.5 shadow-[0_2px_16px_rgba(16,185,129,0.12)]"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[10px] uppercase tracking-[0.34em] text-emerald-700 font-black">
                  Signature Certification Collection
                </span>
              </motion.div>

              {/* 3-line headline */}
              <div className="space-y-0">
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[1.05] tracking-[-0.04em] text-[#0a1a12]"
                  style={{ fontSize: 'clamp(2.4rem, 4.2vw, 4.5rem)', fontFamily: "'Cinzel', serif" }}
                >
                  Designed for Emotional Balance
                </motion.h1>

                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[1.05] tracking-[-0.04em]"
                  style={{
                    fontSize: 'clamp(2.4rem, 4.2vw, 4.5rem)',
                    fontFamily: "'Cinzel', serif",
                    background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  &amp; Conscious Growth.
                </motion.h1>
              </div>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.72 }}
                className="text-[#4a6b5a] text-base sm:text-lg font-light leading-relaxed max-w-lg"
              >
                Discover emotionally grounded certification pathways designed to nurture clarity, reflection, awareness, and meaningful personal transformation.
              </motion.p>

              {/* Glassmorphism stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { value: '10', label: 'Certifications' },
                  { value: '6–10 wks', label: 'Duration' },
                  { value: '∞', label: 'Lifetime Access' },
                ].map((s, i) => (
                  <div key={i}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-200/60 bg-white/60 backdrop-blur-sm shadow-[0_2px_12px_rgba(16,185,129,0.1)]"
                  >
                    <span className="text-base font-black text-emerald-700">{s.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#6b9e85] font-bold">{s.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* No buttons here — Back to Home is top-left, View Certifications removed */}
            </motion.div>

            {/* ── RIGHT: pic.png ── */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-end"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-3xl blur-2xl scale-105"
                  style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
                />
                {/* Image — no white bg, bigger */}
                <div className="relative rounded-3xl overflow-hidden border border-emerald-200/30 shadow-[0_24px_64px_rgba(16,185,129,0.15)]">
                  <img
                    src="/pic.png"
                    alt="Wellness certification"
                    className="w-full h-auto object-contain"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Nirvaha Advantage Section ── */}
      <section className="relative bg-[#f7f9f8] py-20 lg:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">

          {/* Heading block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0f0c] tracking-tight leading-[1.0] uppercase mb-3">
              The Nirvaha Advantage
            </h2>
            <p className="text-[#444] text-base sm:text-lg font-medium max-w-xl">
              Your pathway to inner mastery, global recognition, and real transformation.
            </p>
          </motion.div>

          {/* Stacked horizontal cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                img: '/advantage1.png',
                title: 'The Nirvaha seal of excellence:',
                desc: 'Backed by the globally trusted Nirvaha name, you carry our seal of excellence — assuring clients and communities of your quality, commitment, and transformational capability.',
              },
              {
                img: '/advantage2.png',
                title: 'Rooted in real results:',
                desc: 'Nirvaha has guided thousands of individuals toward lasting emotional balance and conscious living. Learn from tested, impactful methodologies that create measurable change in real lives.',
              },
              {
                img: '/advantage3.png',
                title: 'Ancient wisdom, modern science:',
                desc: 'Our curriculum weaves Vedic philosophy, Ayurvedic principles, and contemplative traditions with cutting-edge neuroscience and evidence-based psychology for a truly holistic education.',
              },
              {
                img: '/advantage4.png',
                title: 'World-class expert mentors:',
                desc: 'Learn directly from seasoned practitioners, spiritual guides, and certified wellness coaches who bring decades of lived experience and deep mastery to every session.',
              },
              {
                img: '/advantage5.png',
                title: 'Globally recognised credentials:',
                desc: 'Earn certifications respected by wellness organisations, corporate wellness programs, and healing communities across the world — opening doors to meaningful professional opportunities.',
              },
              {
                img: '/advantage6.png',
                title: 'Learn at your own pace:',
                desc: 'Study on your schedule with lifetime access to all course materials, live community sessions, and ongoing mentor support — so your growth never has to pause.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group flex flex-col sm:flex-row items-stretch rounded-2xl bg-white border border-[#e5e7eb] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_8px_36px_rgba(0,0,0,0.1)] hover:border-emerald-200 transition-all duration-300"
                style={{ minHeight: 220 }}
              >
                {/* Left image */}
                <div className="sm:w-[380px] w-full h-64 sm:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Right content */}
                <div className="flex-1 px-8 py-9 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0a0f0c] mb-2.5 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#555] text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="relative bg-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle dashed vertical divider — decorative, desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-[220px] bottom-16 w-px border-l-2 border-dashed border-[#d1d5db] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0f0c] tracking-tight uppercase mb-5">
              How It Works
            </h2>
            <p className="text-[#444] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Embarking on your certified wellness journey with Nirvaha isn't just a course — it's a transformative adventure. With each step, you're crafting a potent skillset, setting the stage for a purposeful and impactful career.
            </p>
          </motion.div>

          {/* Steps grid — 2 columns, staggered */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
            {[
              {
                num: 1,
                title: 'Pick your path',
                desc: 'Select a certification specialisation tailored to your unique dreams, vision, and the transformation you want to create in the world.',
                img: '/work1.png',
                offset: false,
              },
              {
                num: 2,
                title: 'Quick application',
                desc: 'Get started with our user-friendly online application. It\'s straightforward and takes under 2 minutes to complete.',
                img: '/work2.png',
                offset: true,
              },
              {
                num: 3,
                title: 'Immersive learning',
                desc: 'Dive into rich, cinematic course content — live sessions, guided practices, and deep-dive modules crafted by world-class mentors.',
                img: '/work3.png',
                offset: false,
              },
              {
                num: 4,
                title: 'Get certified',
                desc: 'Complete your assessments, demonstrate your mastery, and receive your globally recognised Nirvaha certification with pride.',
                img: '/work4.png',
                offset: true,
              },
              {
                num: 5,
                title: 'Join the community',
                desc: 'Step into a thriving global network of certified wellness practitioners, coaches, and conscious leaders who support each other\'s growth.',
                img: '/work5.png',
                offset: false,
              },
              {
                num: 6,
                title: 'Launch your practice',
                desc: 'Use your certification, Nirvaha\'s seal of excellence, and our career resources to build a meaningful, profitable wellness practice.',
                img: null,
                offset: true,
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: idx * 0.1 }}
                className={`relative pb-12 ${step.offset ? 'lg:mt-24' : ''}`}
              >
                {/* Number badge */}
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-base mb-5 shadow-[0_4px_16px_rgba(16,185,129,0.35)]">
                  {step.num}
                </div>

                {/* Text */}
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0a0f0c] mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[#555] text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                  {step.desc}
                </p>

                {/* Image */}
                {step.img && (
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#e5e7eb]">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-52 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

            {/* Left — heading + description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-[420px] flex-shrink-0"
            >
              <h2 className="text-4xl sm:text-5xl font-black text-[#0a0f0c] leading-tight mb-6">
                Frequently asked questions
              </h2>
              <p className="text-[#555] text-base sm:text-lg leading-relaxed">
                Browse answers to your questions about program access, certifications, and the Nirvaha journey. Need more help?{' '}
                <a
                  href="mailto:hello@nirvaha.org"
                  className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700 transition-colors"
                >
                  hello@nirvaha.org
                </a>{' '}
                and we'll get back to you ASAP.
              </p>
            </motion.div>

            {/* Right — accordion questions */}
            <div className="flex-1">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-screen Certifications Panel — hidden until button clicked ── */}
      <AnimatePresence>
        {certVisible && (
          <motion.div
            ref={panelRef}
            key="cert-panel"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto"
          >
            {/* Subtle top glow */}
            <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

            {/* Close button */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span className="text-xs uppercase tracking-[0.28em] text-emerald-300 font-bold">
                  Certification Collection
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70 transition-all duration-200 hover:border-emerald-400/40 hover:text-white hover:bg-white/10"
              >
                <X className="h-3.5 w-3.5" />
                Close
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-14 lg:py-20">
              <div className="mx-auto max-w-6xl">

                {/* Section heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-center mb-14"
                >
                  <h2
                    className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-[-0.02em]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Our{' '}
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Certifications
                    </span>
                  </h2>
                  <p className="text-emerald-100/50 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Expert-led, accredited programs designed for personal and professional growth.
                  </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {visibleCerts.map((cert, idx) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, y: 36, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.55, delay: 0.2 + idx * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative group rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 hover:shadow-[0_24px_60px_rgba(0,0,0,0.7)] transition-all duration-300"
                      style={{ minHeight: 220 }}
                    >
                      <div className="flex flex-col sm:flex-row items-stretch h-full">
                        {/* Image */}
                        <div className="sm:w-2/5 w-full h-48 sm:h-auto flex-shrink-0 overflow-hidden relative">
                          <motion.img
                            src={cert.image}
                            alt={cert.title}
                            className="object-cover w-full h-full opacity-75 group-hover:opacity-100 transition-all duration-700"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cert.title)}&background=060a08&color=10b981&bold=true&size=300`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50 pointer-events-none" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] font-black tracking-[0.35em] text-emerald-400 uppercase mb-2 block">
                              {cert.tag}
                            </span>
                            <h3
                              className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-tight"
                              style={{ fontFamily: "'Cinzel', serif" }}
                            >
                              {cert.title}
                            </h3>
                            <p className="text-emerald-100/55 text-sm leading-relaxed font-light">
                              {cert.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/30">
                              <svg className="w-3.5 h-3.5 mr-1.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" />
                              </svg>
                              <span className="uppercase tracking-widest text-[9px] font-bold">Feel:</span>&nbsp;{cert.feel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* View More / Show Less */}
                {allCertifications.length > INITIAL_COUNT && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showAll ? 'less' : 'more'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center mt-12"
                    >
                      <button
                        type="button"
                        onClick={() => setShowAll((prev) => !prev)}
                        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-[0_16px_48px_rgba(16,185,129,0.3)] transition-all duration-300 hover:from-emerald-400 hover:to-teal-400 hover:scale-105"
                      >
                        {showAll ? (
                          <>Show Less <ChevronUp className="h-4 w-4" /></>
                        ) : (
                          <>View More Certifications <ChevronDown className="h-4 w-4" /></>
                        )}
                      </button>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificationsPage;
