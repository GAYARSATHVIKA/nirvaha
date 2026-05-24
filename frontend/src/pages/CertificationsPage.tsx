import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronDown, ChevronUp, X } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';

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
    window.scrollTo(0, 0);
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

      {/* ── Hero — always visible ── */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/healing.jpg"
            alt="Wellness background"
            className="h-full w-full object-cover object-center blur-md scale-[1.04]"
          />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/60" />
        </div>

        {/* Ambient glows */}
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(209,250,229,0.5),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-[30%] h-[420px] w-[420px] rounded-full bg-[#c7f3d7]/30 blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-[#d9f7e5]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full px-6 py-24 lg:py-32 flex items-center justify-center min-h-screen">
          <div className="mx-auto max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.45)] px-8 py-10 sm:px-12 sm:py-14 space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="inline-flex items-center gap-3 rounded-full border border-emerald-300/25 bg-white/10 px-5 py-2.5 backdrop-blur-xl shadow-lg"
              >
                <Sparkles className="h-4 w-4 text-emerald-300" />
                <span className="text-[11px] uppercase tracking-[0.32em] text-emerald-200 font-bold">
                  Signature Certification Collection
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-1">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="text-base sm:text-lg font-light text-white/60 tracking-[0.14em] uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Immersive wellness certifications
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[1.05] tracking-[-0.03em] text-white"
                  style={{
                    fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                    fontFamily: "'Cinzel', serif",
                  }}
                >
                  designed for
                </motion.h1>

                {['emotional balance,', 'mindful living,', 'and conscious growth.'].map((line, i) => (
                  <motion.h1
                    key={line}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.42 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="font-black leading-[1.08] tracking-[-0.02em]"
                    style={{
                      fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                      fontFamily: "'Cinzel', serif",
                      background: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 45%, #10b981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {line}
                  </motion.h1>
                ))}
              </div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.82 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2"
              >
                <button
                  type="button"
                  onClick={handleViewCertifications}
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-9 py-4 text-sm font-bold uppercase tracking-[0.24em] text-white shadow-[0_20px_60px_rgba(16,185,129,0.4)] transition-all duration-300 hover:bg-emerald-400 hover:scale-105"
                >
                  View Certifications
                  <ChevronDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-9 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-all duration-300 hover:border-emerald-300/50 hover:bg-white/15"
                >
                  Back to home
                </button>
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
