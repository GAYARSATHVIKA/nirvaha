import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, BarChart2, BookOpen, X, Sparkles, GraduationCap } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { coursesData } from '../data/coursesData';
import { useAuth } from '../contexts/AuthContext';
import BACKEND_CONFIG from '../config/backend';

/* ── Registration Modal ── */
const RegistrationModal: React.FC<{
  course: { id: number; slug: string; title: string };
  onClose: () => void;
  onSuccess: () => void;
}> = ({ course, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_URL}/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || null,
          userName: form.name,
          userEmail: form.email,
          phone: form.phone,
          courseId: course.slug,
          courseName: `${course.title} Certification`,
          message: form.message,
        }),
      });
      if (!res.ok) {
        let msg = `Registration failed (${res.status})`;
        try {
          const data = await res.json();
          msg = data?.error || msg;
        } catch (parseErr) {
          try {
            const text = await res.text();
            if (text) msg = text;
          } catch (_) {
            // ignore
          }
        }
        throw new Error(msg);
      }
      setStep('success');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const field = (label: string, key: keyof typeof form, type = 'text', required = false, placeholder = '') => (
    <div className="relative">
      <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-white/40 mb-2">{label}{required && ' *'}</label>
      <input
        type={type}
        required={required}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all placeholder:text-white/20"
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 32 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/[0.08]"
        style={{ background: '#0f0f0f', boxShadow: '0 40px_100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)' }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.15), transparent)' }} />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-5 right-5 z-10 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-3.5 h-3.5 text-white/60" />
        </button>

        {step === 'success' ? (
          /* ── Success State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-14 text-center relative z-10"
          >
            {/* Animated check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}>
                <Check className="w-9 h-9 text-emerald-400" strokeWidth={2.5} />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 mb-5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-emerald-400 font-bold">Registration Complete</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                You're Enrolled!
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto mb-2">
                Your registration for <span className="text-emerald-400 font-semibold">{course.title} Certification</span> has been received.
              </p>
              <p className="text-white/30 text-xs mb-8">We'll contact you within 24 hours to confirm and share next steps.</p>

              {/* Confirmation card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 mb-8 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{course.title}</p>
                    <p className="text-white/40 text-xs">Certification Program</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Registration submitted successfully</span>
                </div>
              </div>

              <button onClick={onClose}
                className="w-full py-4 rounded-xl bg-emerald-500 text-white font-black text-sm uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_8px_32px_rgba(16,185,129,0.3)]">
                Continue Exploring
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Form State ── */
          <div className="relative z-10">
            {/* Header */}
            <div className="px-8 pt-10 pb-6 border-b border-white/[0.06]">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.28em] text-emerald-400 font-bold">Enroll Now</span>
              </div>
              <h3 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                {course.title}
              </h3>
              <p className="text-white/40 text-sm tracking-[0.1em] uppercase mt-1">Certification Program</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {field('Full Name', 'name', 'text', true, 'Your full name')}
                {field('Phone', 'phone', 'tel', false, '+91 00000 00000')}
              </div>
              {field('Email Address', 'email', 'email', true, 'your@email.com')}

              <div className="relative">
                <label className="block text-[10px] font-black uppercase tracking-[0.22em] text-white/40 mb-2">Why do you want to enroll?</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Share your goals and what transformation you're seeking..."
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all resize-none placeholder:text-white/20"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <X className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl bg-emerald-500 text-white font-black text-sm uppercase tracking-[0.22em] shadow-[0_8px_32px_rgba(16,185,129,0.35)] hover:bg-emerald-400 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Submitting...
                  </>
                ) : 'Submit Registration'}
              </button>
              <p className="text-center text-white/25 text-xs">We'll contact you within 24 hours to confirm your enrollment.</p>
            </form>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};


const CertificationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const course = coursesData.find(c => c.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Check if user already enrolled in this course
  useEffect(() => {
    if (!user?.id || !course) return;
    fetch(`${BACKEND_CONFIG.API_URL}/enrollments/user/${user.id}`)
      .then(r => r.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.some((e: any) => e.courseId === course.slug)) {
          setIsEnrolled(true);
        }
      })
      .catch(() => {});
  }, [user, course]);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  // Hide enroll button if user is logged in AND already enrolled
  const showEnrollButton = !isEnrolled;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0d0d0d' }}>
        <div className="text-center">
          <p className="text-2xl font-bold text-white mb-4">Certification not found</p>
          <button onClick={() => navigate('/courses')} className="text-emerald-400 underline">Back to courses</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0d0d0d', color: '#fff' }}>
      <SEOHead title={`${course.title} Certification | Nirvaha`} description={course.description} />

      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <RegistrationModal
            course={course}
            onClose={() => setShowModal(false)}
            onSuccess={() => { setIsEnrolled(true); }}
          />
        )}
      </AnimatePresence>

      {/* ── Sticky Nav ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4 flex items-center justify-between backdrop-blur-xl border-b border-white/[0.06]"
        style={{ background: 'rgba(13,13,13,0.92)' }}
      >
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          All Certifications
        </button>
        {showEnrollButton ? (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.35)]"
          >
            Enroll Now
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Check className="w-3.5 h-3.5" /> Enrolled
          </span>
        )}
      </div>
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#0d0d0d' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(16,185,129,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold">Nirvaha Certification</span>
              </div>

              <h1
                className="font-black text-white uppercase tracking-[-0.02em] leading-[0.9] mb-5"
                style={{
                  fontSize: 'clamp(4rem, 8vw, 9rem)',
                  fontFamily: "'Cinzel', serif",
                }}
              >
                {course.title}
              </h1>

              <p className="text-lg sm:text-xl font-light text-emerald-400 tracking-[0.18em] uppercase mb-4">
                {course.subtitle}
              </p>

              <p className="text-base sm:text-lg text-white/60 font-light italic max-w-lg mb-10">
                "{course.tagline}"
              </p>

              <div className="flex flex-wrap gap-6 mb-12">
                {[
                  { icon: <Clock className="w-4 h-4" />, label: course.duration },
                  { icon: <BarChart2 className="w-4 h-4" />, label: course.level },
                  { icon: <BookOpen className="w-4 h-4" />, label: `${course.modules} Modules` },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/50 text-sm font-medium">
                    {s.icon}
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {showEnrollButton ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-emerald-500 text-white font-bold text-sm uppercase tracking-[0.22em] shadow-[0_12px_40px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
                  >
                    Begin Your Journey
                  </button>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-sm uppercase tracking-[0.22em]">
                    <Check className="w-4 h-4" /> Already Enrolled
                  </span>
                )}
                <button
                  onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-white/20 text-white font-semibold text-sm uppercase tracking-[0.22em] hover:border-emerald-400/60 hover:text-emerald-300 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right: decorative emerald glow orb only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="w-[420px] h-[420px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.04) 50%, transparent 70%)' }} />
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── Transformation Banner ── */}
      <section
        className="py-8 px-6 lg:px-20 border-y border-white/[0.06]"
        style={{ background: '#111' }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0 w-1 h-10 rounded-full bg-emerald-500 hidden sm:block" />
          <span className="text-emerald-400 text-xs uppercase tracking-[0.3em] font-bold flex-shrink-0 sm:ml-4">
            Your Transformation
          </span>
          <div className="w-px h-5 bg-white/10 hidden sm:block" />
          <p className="text-white/70 text-base sm:text-lg font-light italic">{course.transformation}</p>
        </div>
      </section>

      {/* ── Overview ── */}
      <section id="overview" className="py-24 lg:py-32 px-6 lg:px-20" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">
              Program Overview
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white tracking-[-0.02em] leading-[1.05] mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              What This<br />
              <span style={{ background: 'linear-gradient(135deg,#059669,#34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Journey Holds
              </span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed font-light">{course.overview}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-center justify-center min-h-[380px]"
          >
            {/* Central glowing orb */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(16,185,129,0.05) 60%, transparent 80%)' }}
            />
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-64 h-64 rounded-full border border-emerald-500/20"
              style={{ borderStyle: 'dashed' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="absolute w-80 h-80 rounded-full border border-emerald-400/10"
              style={{ borderStyle: 'dashed' }}
            />

            {/* Floating stat cards */}
            {[
              { label: 'Duration', value: course.duration, posStyle: { top: '8%', left: '0%' }, dy: -8 },
              { label: 'Modules', value: `${course.modules} Modules`, posStyle: { top: '8%', right: '0%' }, dy: 8 },
              { label: 'Level', value: course.level, posStyle: { bottom: '8%', left: '0%' }, dy: 8 },
              { label: 'Access', value: 'Lifetime', posStyle: { bottom: '8%', right: '0%' }, dy: -8 },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                animate={{ y: [0, card.dy, 0] }}
                className="absolute rounded-2xl border border-white/[0.08] px-5 py-4 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', ...card.posStyle }}
              >
                <p className="text-[9px] uppercase tracking-[0.28em] text-emerald-400 font-bold mb-1">{card.label}</p>
                <p className="text-base font-black text-white whitespace-nowrap">{card.value}</p>
              </motion.div>
            ))}

            {/* Center badge */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-28 h-28 rounded-full flex flex-col items-center justify-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              style={{ background: 'rgba(16,185,129,0.1)', backdropFilter: 'blur(12px)' }}
            >
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="1.2" />
                <path d="M24 14v10l6 4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="3" fill="#10b981" fillOpacity="0.5" />
              </svg>
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 font-bold mt-1">Program</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-20" style={{ background: '#111' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">Curriculum</span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white tracking-[-0.02em]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              What You'll Learn
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.whatYouLearn.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="flex items-start gap-4 rounded-2xl p-5 border border-white/[0.07] hover:border-emerald-500/30 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ── What's Included ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-20" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">Program Features</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-[-0.02em]" style={{ fontFamily: "'Cinzel', serif" }}>
              What's Included
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0 divide-y divide-white/[0.06]">
            {[
              {
                num: '01',
                title: 'Live Mentor Sessions',
                desc: 'Weekly live sessions with certified Nirvaha mentors — deeply focused, transformational, and recorded for lifetime access.',
                bullets: [
                  'Weekly live sessions with certified Nirvaha mentors',
                  'Get your most pressing questions answered in real time',
                  'Recordings available for every session — learn at your pace',
                  '60 mins per session, deeply focused and transformational',
                ],
                icon: (
                  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12">
                    <circle cx="28" cy="28" r="26" stroke="#10b981" strokeWidth="1.2" strokeDasharray="4 3" />
                    <circle cx="28" cy="22" r="7" stroke="#10b981" strokeWidth="1.5" />
                    <path d="M14 42c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="28" cy="22" r="3" fill="#10b981" fillOpacity="0.3" />
                  </svg>
                ),
                accent: 'from-emerald-500/10 to-teal-500/5',
                tag: 'Live · Weekly',
              },
              {
                num: '02',
                title: 'Immersive Course Modules',
                desc: 'Cinematic, beautifully produced video lessons with guided practices, meditations, and journaling prompts — self-paced with lifetime access.',
                bullets: [
                  'Cinematic, beautifully produced video lessons',
                  'Guided practices, meditations, and journaling prompts',
                  'Self-paced — complete modules on your own schedule',
                  'Lifetime access to all content and future updates',
                ],
                icon: (
                  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12">
                    <rect x="6" y="14" width="44" height="28" rx="4" stroke="#10b981" strokeWidth="1.5" />
                    <path d="M23 22l12 6-12 6V22z" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.2" strokeLinejoin="round" />
                    <path d="M6 38h44" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 2" />
                  </svg>
                ),
                accent: 'from-teal-500/10 to-emerald-500/5',
                tag: 'Self-Paced · Lifetime',
              },
              {
                num: '03',
                title: 'Global Practitioner Community',
                desc: 'Connect with certified practitioners worldwide — peer coaching, accountability partnerships, private forums, and ongoing support.',
                bullets: [
                  'Connect with certified practitioners from around the world',
                  'Peer coaching exchanges and accountability partnerships',
                  'Private community forums and group challenges',
                  'Ongoing support long after you complete the program',
                ],
                icon: (
                  <svg viewBox="0 0 56 56" fill="none" className="w-12 h-12">
                    <circle cx="28" cy="28" r="22" stroke="#10b981" strokeWidth="1.5" />
                    <ellipse cx="28" cy="28" rx="10" ry="22" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                    <path d="M6 28h44M28 6a22 22 0 010 44" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
                    <circle cx="28" cy="28" r="3" fill="#10b981" />
                  </svg>
                ),
                accent: 'from-emerald-500/10 to-teal-500/5',
                tag: 'Global · Community',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 py-12 lg:py-14 items-start hover:bg-white/[0.015] transition-colors duration-300 px-4 rounded-2xl -mx-4"
              >
                {/* Left — number + icon + tag */}
                <div className="flex flex-row lg:flex-col items-center lg:items-start gap-5">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.accent} border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/40 transition-colors duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-5xl font-black text-white/[0.06] leading-none block" style={{ fontFamily: "'Cinzel', serif" }}>{item.num}</span>
                    <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">{item.tag}</span>
                  </div>
                </div>

                {/* Right — title + desc + bullets */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight group-hover:text-emerald-100 transition-colors duration-300" style={{ fontFamily: "'Cinzel', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-light">{item.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="text-white/60 text-sm leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey / Timeline ── */}
      <section className="py-24 lg:py-32 px-6 lg:px-20" style={{ background: '#0d0d0d' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-4 block">Your Path</span>
            <h2
              className="text-4xl sm:text-5xl font-black text-white tracking-[-0.02em]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              The Journey
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical emerald line */}
            <div className="absolute left-6 top-0 bottom-0 w-px hidden sm:block" style={{ background: 'linear-gradient(to bottom, transparent, #10b981 10%, #10b981 90%, transparent)' }} />

            <div className="flex flex-col gap-6">
              {course.journey.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="sm:pl-16 relative"
                >
                  {/* Numbered circle */}
                  <div
                    className="hidden sm:flex absolute left-0 top-2 w-12 h-12 rounded-full items-center justify-center text-emerald-400 font-black text-sm border border-emerald-500/40"
                    style={{ background: 'rgba(16,185,129,0.1)' }}
                  >
                    {idx + 1}
                  </div>

                  <div
                    className="rounded-2xl p-7 border border-white/[0.07] hover:border-emerald-500/30 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.28em] text-emerald-400 font-bold mb-2 block">
                      {step.week}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-white/55 text-sm sm:text-base leading-relaxed font-light">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}


      {/* ── FAQ ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-20 border-t border-white/[0.06]" style={{ background: '#111' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black text-white tracking-[-0.02em]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.07]">
            {course.faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-start gap-5 py-6 text-left group"
                >
                  <span className="mt-0.5 flex-shrink-0 text-2xl font-light text-white/30 group-hover:text-emerald-400 transition-colors w-6">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-white/80 group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      key="a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-11 text-white/50 text-sm sm:text-base leading-relaxed font-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CertificationDetailPage;
