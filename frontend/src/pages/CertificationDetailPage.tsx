import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, BarChart2, BookOpen, X, Sparkles, GraduationCap } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { coursesData } from '../data/coursesData';
import { useAuth } from '../contexts/AuthContext';
import BACKEND_CONFIG from '../config/backend';

/* �"��"� Registration Modal �"��"� */
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
        style={{ background: '#0f0f0f', boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)' }}
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-8 py-14 text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25), rgba(16,185,129,0.05))', border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <Check className="w-9 h-9 text-emerald-400" strokeWidth={2.5} />
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
          <div className="relative z-10">
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
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#020804' }}>
      <SEOHead title={`${course.title} Certification | Nirvaha`} description={course.description} />

      <AnimatePresence>
        {showModal && (
          <RegistrationModal
            course={course}
            onClose={() => setShowModal(false)}
            onSuccess={() => { setIsEnrolled(true); }}
          />
        )}
      </AnimatePresence>

      {/* �"��"� Sticky Nav �"��"� */}
      <div
        className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4 flex items-center justify-between backdrop-blur-2xl border-b border-emerald-950/60"
        style={{ background: 'rgba(2, 8, 4, 0.85)' }}
      >
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-200 transition-all text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          All Certifications
        </button>
        {showEnrollButton ? (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 hover:scale-[1.03] transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)]"
          >
            Enroll Now
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Check className="w-3.5 h-3.5" /> Enrolled
          </span>
        )}
      </div>

      {/* ════════════════════════════════════════════════
          HERO �" Cinematic Full-Screen with CS1.png
      ════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-end overflow-hidden"
        style={{
          backgroundImage: 'url(/CS1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#020804]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

        {/* Floating snapshot card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute top-28 right-8 lg:right-20 hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl p-6 max-w-[240px]" style={{ background: 'rgba(2,8,4,0.75)' }}>
            <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.4), transparent 70%)' }} />
            <div className="relative z-10">
              <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-400 font-bold mb-3">Program Snapshot</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Duration', value: course.duration },
                  { label: 'Modules', value: `${course.modules} Modules` },
                  { label: 'Level', value: course.level },
                  { label: 'Access', value: 'Lifetime' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-white/40 text-xs">{s.label}</span>
                    <span className="text-emerald-300 text-xs font-bold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-20 pb-24 lg:pb-32 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/60 px-4 py-2 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-300 font-bold">Nirvaha Certification Program</span>
            </div>

            <h1
              className="font-black uppercase leading-[0.9] mb-6 text-white"
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                fontFamily: "'Cinzel', serif",
                textShadow: '0 4px 40px rgba(0,0,0,0.6)',
                letterSpacing: '-0.02em',
              }}
            >
              {course.title}
            </h1>

            <p className="text-lg sm:text-xl text-emerald-400 tracking-[0.2em] uppercase font-light mb-4">
              {course.subtitle}
            </p>

            <p className="text-base sm:text-lg text-white/60 font-light italic mb-12 max-w-xl leading-relaxed">
              "{course.tagline}"
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { icon: <Clock className="w-3.5 h-3.5" />, label: course.duration },
                { icon: <BarChart2 className="w-3.5 h-3.5" />, label: course.level },
                { icon: <BookOpen className="w-3.5 h-3.5" />, label: `${course.modules} Modules` },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80 text-sm border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl">
                  {s.icon}
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {showEnrollButton ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-emerald-500 text-white font-bold text-sm uppercase tracking-[0.22em] shadow-[0_12px_50px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Begin Your Journey
                </button>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-sm uppercase tracking-[0.22em]">
                  <Check className="w-4 h-4" /> Already Enrolled
                </span>
              )}
              <button
                onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-10 py-5 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm uppercase tracking-[0.22em] hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
              >
                Explore Program
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-40"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════
          TRANSFORMATION BANNER
      ════════════════════════════════════════════════ */}
      <section className="relative py-10 px-6 lg:px-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #021408 0%, #041a0a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
        <div className="relative max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-shrink-0 h-10 w-px bg-emerald-500 hidden sm:block" />
          <span className="text-emerald-500 text-[10px] uppercase tracking-[0.35em] font-black flex-shrink-0 sm:ml-5">Your Transformation</span>
          <div className="w-px h-5 bg-emerald-800 hidden sm:block" />
          <p className="text-emerald-100/70 text-base sm:text-lg font-light italic leading-relaxed text-center sm:text-left">{course.transformation}</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHAT YOU'LL EXPERIENCE �" Light section
      ════════════════════════════════════════════════ */}
      <section id="overview" className="py-28 lg:py-40 px-6 lg:px-20" style={{ background: '#f7fdf9' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-600 font-black mb-4 block">Program Overview</span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#081c10] leading-[1.0]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>
                What This<br />
                <span style={{ background: 'linear-gradient(135deg, #059669, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Journey Holds</span>
              </h2>
              <p className="text-[#2a4a35] text-base sm:text-lg leading-relaxed font-light max-w-xl">{course.overview}</p>
            </div>
          </motion.div>

          {/* Gallery images */}
          {course.galleryImages && course.galleryImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-14 mb-14">
              {course.galleryImages.slice(0, 3).map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative overflow-hidden rounded-3xl group shadow-[0_8px_32px_rgba(0,0,0,0.08)]" style={{ aspectRatio: '4/3' }}>
                  <img src={src} alt={`${course.title} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081c10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.whatYouLearn.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className="flex items-start gap-4 rounded-2xl p-5 border border-emerald-100 bg-white hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all duration-300"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-[#223b2d] text-base leading-relaxed font-light">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          INTERACTIVE MODULE CARDS �" Dark cinematic
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20 relative overflow-hidden" style={{ background: '#04110a' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />

        <div className="relative max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-500 font-black mb-4 block">Curriculum</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>What You'll Learn</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.whatYouLearn.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] transition-all duration-300 cursor-default"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center mb-5 group-hover:border-emerald-500/40 transition-colors duration-300">
                  <span className="text-emerald-400 font-black text-sm" style={{ fontFamily: "'Cinzel', serif" }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed font-light group-hover:text-white/90 transition-colors duration-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CERTIFICATION JOURNEY TIMELINE �" Light
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20" style={{ background: '#f0faf5' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-600 font-black mb-4 block">Your Path</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#081c10]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>Certification Journey</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, #059669 8%, #059669 92%, transparent)' }} />

            <div className="flex flex-col gap-12">
              {course.journey.map((step, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className="relative lg:grid lg:grid-cols-2 lg:gap-16 items-center"
                  >
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-2 border-emerald-400 bg-white items-center justify-center z-10 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                      <span className="text-emerald-600 font-black text-lg" style={{ fontFamily: "'Cinzel', serif" }}>{idx + 1}</span>
                    </div>

                    <div className={`${isLeft ? 'lg:col-start-1 lg:pr-12' : 'lg:col-start-2 lg:pl-12'} rounded-3xl border border-emerald-100 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)] hover:border-emerald-300 transition-all duration-400`}>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-600 font-black mb-3 block">{step.week}</span>
                      <h3 className="text-2xl font-black text-[#081c10] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{step.title}</h3>
                      <p className="text-[#2a4a35] text-base leading-relaxed font-light">{step.desc}</p>
                    </div>

                    <div className={`hidden lg:block ${isLeft ? 'lg:col-start-2 lg:pl-12' : 'lg:col-start-1 lg:pr-12 lg:row-start-1'} relative overflow-hidden rounded-3xl`} style={{ aspectRatio: '16/9' }}>
                      <img
                        src={`/CS${(idx % 3) + 1}.png`}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081c10]/30 to-transparent" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          WHAT'S INCLUDED �" Dark cinematic rows
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20 relative overflow-hidden" style={{ background: '#020c05' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)' }} />

        <div className="relative max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-500 font-black mb-4 block">Program Features</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>What's Included</h2>
          </motion.div>

          <div className="flex flex-col divide-y divide-white/[0.04]">
            {[
              {
                num: '01', title: 'Live Mentor Sessions',
                desc: 'Weekly live sessions with certified Nirvaha mentors �" deeply focused, transformational, and recorded for lifetime access.',
                bullets: ['Weekly live sessions with certified mentors', 'Real-time Q&A and personal guidance', 'Recordings available lifetime', '60 min deep-focus sessions'],
                tag: 'Live · Weekly', img: '/CS4.png',
              },
              {
                num: '02', title: 'Immersive Course Modules',
                desc: 'Cinematic video lessons with guided practices, meditations, and journaling prompts �" self-paced with lifetime access.',
                bullets: ['Cinematic, beautifully produced video lessons', 'Guided practices and meditations', 'Self-paced �" complete at your own schedule', 'Lifetime access to all content'],
                tag: 'Self-Paced · Lifetime', img: '/CS5.png',
              },
              {
                num: '03', title: 'Global Practitioner Community',
                desc: 'Connect with certified practitioners worldwide �" peer coaching, accountability partnerships, private forums, and ongoing support.',
                bullets: ['Connect with global practitioners', 'Peer coaching and accountability', 'Private community forums', 'Ongoing support after completion'],
                tag: 'Global · Community', img: '/CS6.png',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 lg:gap-14 py-16 items-center"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-black text-emerald-900/80 leading-none" style={{ fontFamily: "'Cinzel', serif" }}>{item.num}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-800/50 bg-emerald-950/50 text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">{item.tag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight group-hover:text-emerald-200 transition-colors duration-300" style={{ fontFamily: "'Cinzel', serif" }}>{item.title}</h3>
                  <p className="text-white/50 text-base leading-relaxed mb-7 font-light max-w-xl">{item.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 w-4 h-4 rounded-full border border-emerald-700/50 bg-emerald-950/60 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        </div>
                        <span className="text-white/50 text-sm leading-relaxed font-light">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-3xl group" style={{ aspectRatio: '4/3' }}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020c05]/60 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REFLECTION ACTIVITIES �" Light
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20" style={{ background: '#f7fdf9' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-600 font-black mb-4 block">Reflection Activities</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#081c10]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>Deepen Your Practice</h2>
            <p className="text-[#2a4a35] text-base mt-5 font-light max-w-xl mx-auto leading-relaxed">Each module includes carefully designed activities to anchor your insights and accelerate transformation.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Journaling Prompts', desc: 'Guided prompts to excavate your inner world and document your transformation.', icon: '✏' },
              { label: 'Somatic Practices', desc: 'Body-based exercises to release stored emotions and build felt-sense awareness.', icon: '◉' },
              { label: 'Contemplative Inquiry', desc: 'Ancient wisdom practices adapted for modern inner exploration and insight.', icon: '◎' },
              { label: 'Partner Exercises', desc: 'Co-created growth activities with fellow practitioners in the community.', icon: '⟡' },
              { label: 'Mindfulness Sequences', desc: 'Guided meditations tailored to each module\'s emotional theme.', icon: '◈' },
              { label: 'Integration Rituals', desc: 'Weekly anchor rituals to ground new insights into daily life.', icon: '☽' },
            ].map((act, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl border border-emerald-100 bg-white p-7 hover:border-emerald-300 hover:shadow-[0_12px_40px_rgba(16,185,129,0.1)] transition-all duration-300"
              >
                <span className="text-3xl mb-5 block">{act.icon}</span>
                <h3 className="text-lg font-black text-[#081c10] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>{act.label}</h3>
                <p className="text-[#2a4a35] text-sm leading-relaxed font-light">{act.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          CERTIFICATE PREVIEW �" Dark cinematic
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20 relative overflow-hidden" style={{ background: '#020c05' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-500 font-black mb-5 block">Upon Completion</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>
                Your Certificate<br />
                <span style={{ background: 'linear-gradient(135deg, #10b981, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Awaits You</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed font-light mb-10 max-w-md">
                Upon completing all modules and reflection activities, you receive a globally recognized Nirvaha Certification �" a testament to your inner journey and professional growth.
              </p>
              <div className="space-y-3">
                {[
                  'Globally recognized certification',
                  'Digital & printable certificate',
                  'LinkedIn shareable credential',
                  'Practitioner community access',
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-emerald-700 bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-white/60 text-sm font-light">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-emerald-800/30" style={{ background: 'linear-gradient(135deg, #041208, #020c05)', boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 80px rgba(16,185,129,0.06)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 60%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

                <div className="relative z-10 p-10 sm:p-14 text-center">
                  <div className="w-16 h-16 rounded-2xl border border-emerald-800/60 bg-emerald-950/60 flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-8 h-8 text-emerald-400" />
                  </div>

                  <p className="text-[9px] uppercase tracking-[0.4em] text-emerald-600 font-black mb-2">Nirvaha Institute</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-8">Certificate of Completion</p>

                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-700/40 to-transparent mx-auto mb-8" />

                  <p className="text-white/25 text-xs mb-2 font-light">This certifies that</p>
                  <p className="text-2xl font-light text-white/60 italic mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Your Name Here</p>

                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-700/40 to-transparent mx-auto my-8" />

                  <p className="text-white/25 text-xs mb-2 font-light">has successfully completed</p>
                  <h3 className="text-xl sm:text-2xl font-black text-emerald-300 mb-1" style={{ fontFamily: "'Cinzel', serif" }}>{course.title}</h3>
                  <p className="text-white/30 text-xs uppercase tracking-[0.2em]">Certification Program</p>

                  <div className="mt-10 flex items-center justify-between">
                    <div className="text-left">
                      <div className="w-20 h-px bg-white/10 mb-1" />
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">Director</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-emerald-800/40 bg-emerald-950/40 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-right">
                      <div className="w-20 h-px bg-white/10 mb-1 ml-auto" />
                      <p className="text-[9px] text-white/20 uppercase tracking-widest">Date</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl opacity-30" style={{ background: 'radial-gradient(ellipse, #10b981, transparent)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          REFLECTION STORIES �" Light grid
      ════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-20" style={{ background: '#f0faf5' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-600 font-black mb-4 block">Reflection Stories</span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#081c10]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>Lives Transformed</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya S.', role: 'Educator', quote: 'This certification didn\'t just teach me about emotions �" it showed me how to live with them. My classroom, my relationships, and my inner world transformed.', img: '/CS4.png' },
              { name: 'Arjun M.', role: 'Entrepreneur', quote: 'The structured journey was exactly what I needed. Each week built beautifully on the last, and the mentor sessions were life-changing.', img: '/CS5.png' },
              { name: 'Kavya R.', role: 'Therapist', quote: 'As a therapist, I thought I knew emotions. This program gave me a depth and visceral understanding I had never accessed before.', img: '/CS6.png' },
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group rounded-3xl overflow-hidden border border-emerald-100 bg-white hover:shadow-[0_20px_60px_rgba(16,185,129,0.12)] hover:border-emerald-200 transition-all duration-400"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-[#2a4a35] text-sm leading-relaxed font-light italic mb-5">"{story.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                      <span className="text-emerald-700 text-xs font-black">{story.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[#081c10] text-sm font-black">{story.name}</p>
                      <p className="text-emerald-600 text-[10px] uppercase tracking-[0.2em]">{story.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FAQ �" Clean white
      ════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-6 lg:px-20" style={{ background: '#ffffff' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-600 font-black mb-4 block">Support</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#081c10]" style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="divide-y divide-emerald-100">
            {course.faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.07 }}>
                <button type="button" onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-start gap-5 py-6 text-left group">
                  <span className="mt-0.5 flex-shrink-0 text-2xl font-light text-emerald-400 group-hover:text-emerald-600 transition-colors w-6">
                    {openFaq === idx ? '-' : '+'}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-[#081c10] group-hover:text-emerald-700 transition-colors leading-snug">
                    {faq.q}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div key="a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="pb-6 pl-11 text-[#2a4a35] text-base leading-relaxed font-light">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FINAL CTA �" Full bleed cinematic with CS2.png
      ════════════════════════════════════════════════ */}
      <section
        className="relative py-36 lg:py-48 px-6 lg:px-20 overflow-hidden"
        style={{
          backgroundImage: 'url(/CS2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/50 px-5 py-2.5 mb-10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-emerald-300 font-bold">Begin Your Transformation</span>
            </div>

            <h2
              className="font-black uppercase leading-[0.9] mb-8 text-white"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                fontFamily: "'Cinzel', serif",
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
                letterSpacing: '-0.02em',
              }}
            >
              Start Your<br />
              <span style={{ background: 'linear-gradient(135deg, #10b981, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {course.title}
              </span><br />
              Journey Today
            </h2>

            <p className="text-white/60 text-base sm:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
              Join thousands of practitioners who have transformed their inner world through the Nirvaha Certification.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              {showEnrollButton ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-emerald-500 text-white font-black text-sm uppercase tracking-[0.22em] shadow-[0_12px_60px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_15px_70px_rgba(16,185,129,0.6)] transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  Enroll Now
                </button>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-bold text-sm uppercase tracking-[0.22em]">
                  <Check className="w-4 h-4" /> You're Enrolled
                </span>
              )}
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center justify-center px-12 py-5 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm uppercase tracking-[0.22em] hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Explore More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default CertificationDetailPage;
