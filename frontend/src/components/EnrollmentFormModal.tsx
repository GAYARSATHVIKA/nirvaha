import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, BookOpen, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEnrollment } from '../hooks/useEnrollment';
import BACKEND_CONFIG from '../config/backend';
import { toast } from 'react-toastify';

interface EnrollmentFormModalProps {
  open: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  onEnrolled?: () => void;
}

type Step = 'form' | 'loading' | 'payment' | 'success';

export const EnrollmentFormModal: React.FC<EnrollmentFormModalProps> = ({
  open,
  onClose,
  courseId,
  courseTitle,
  onEnrolled,
}) => {
  const { user, syncUserFromServer } = useAuth();
  const { enroll } = useEnrollment();
  const isLoggedIn = !!user;

  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Pre-fill user data if logged in
  useEffect(() => {
    if (open) {
      setStep('form');
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhone(user?.profile?.mobile || '');
      setReason('');
      setError(null);
    }
  }, [open, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    setStep('loading');

    try {
      const authHeader = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';

      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/enrollments/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader ? { Authorization: authHeader } : {})
        },
        body: JSON.stringify({
          courseId,
          courseTitle,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          reason: reason.trim()
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      // Important: refresh user state so the app knows about the new enrollment
      if (user && syncUserFromServer) {
        await syncUserFromServer();
      }

      toast.success('Enrollment request submitted successfully!');
      onEnrolled?.();
      onClose();
    } catch (err: any) {
      setStep('form');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handlePaymentDone = () => {
    setStep('success');
    toast.success('Enrollment request submitted successfully!');
    setTimeout(() => {
      onEnrolled?.();
      onClose();
    }, 3000);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
          style={{ background: 'rgba(4, 20, 12, 0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f7fffe 100%)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(15,122,85,0.12)',
            }}
          >
            {/* Top accent bar */}
            <div className="h-2 w-full flex-shrink-0" style={{ background: 'linear-gradient(90deg, #0f7a55, #34d399, #0f7a55)' }} />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-emerald-50 text-[#5c7868] z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              <AnimatePresence mode="wait">
                {/* ── SUCCESS ── */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                      className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                      style={{ background: 'linear-gradient(135deg, #0f7a55, #1a9c6d)', boxShadow: '0 0 40px rgba(15,122,85,0.4)' }}
                    >
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0a1a12] mb-3 font-sans">Payment Confirmed! 🎉</h2>
                    <p className="text-[#3d5249] text-sm sm:text-base mb-6 max-w-[320px] leading-relaxed">
                      Thank you for applying to <span className="font-bold text-[#0f7a55]">{courseTitle}</span>.
                    </p>
                    <div className="px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                      <p className="text-[#1a5d47] text-sm font-medium">
                        Our admissions team will verify your payment and approve your enrollment shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── PAYMENT ── */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0a1a12] mb-2 font-sans tracking-tight">Complete Payment</h2>
                    <p className="text-[#5c7868] text-sm mb-6 leading-relaxed max-w-[300px]">
                      Scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to complete your payment for <span className="font-bold text-[#0f7a55]">{courseTitle}</span>.
                    </p>

                    <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 mb-8 w-64 h-64 flex items-center justify-center">
                      {/* Placeholder QR Code SVG */}
                      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="#ffffff"/>
                        <rect x="20" y="20" width="40" height="40" stroke="#0a1a12" strokeWidth="10"/>
                        <rect x="30" y="30" width="20" height="20" fill="#0a1a12"/>
                        <rect x="140" y="20" width="40" height="40" stroke="#0a1a12" strokeWidth="10"/>
                        <rect x="150" y="30" width="20" height="20" fill="#0a1a12"/>
                        <rect x="20" y="140" width="40" height="40" stroke="#0a1a12" strokeWidth="10"/>
                        <rect x="30" y="150" width="20" height="20" fill="#0a1a12"/>
                        <rect x="80" y="20" width="40" height="20" fill="#0a1a12"/>
                        <rect x="80" y="50" width="20" height="40" fill="#0a1a12"/>
                        <rect x="110" y="80" width="70" height="20" fill="#0a1a12"/>
                        <rect x="20" y="80" width="40" height="40" fill="#0a1a12"/>
                        <rect x="80" y="140" width="20" height="40" fill="#0a1a12"/>
                        <rect x="110" y="140" width="70" height="40" fill="#0a1a12"/>
                        <rect x="110" y="110" width="20" height="20" fill="#0a1a12"/>
                        <rect x="150" y="50" width="30" height="20" fill="#0a1a12"/>
                        <rect x="70" y="100" width="30" height="30" fill="#0f7a55"/>
                      </svg>
                    </div>

                    <motion.button
                      onClick={handlePaymentDone}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-sm tracking-wider text-white shadow-lg"
                      style={{
                        background: 'linear-gradient(135deg, #0f7a55 0%, #1a9c6d 100%)',
                        boxShadow: '0 8px 25px rgba(15,122,85,0.35)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Payment Done
                    </motion.button>
                    
                    <button onClick={onClose} className="mt-4 text-sm font-medium text-gray-400 hover:text-gray-600">
                      I'll pay later
                    </button>
                  </motion.div>
                )}

                {/* ── LOADING ── */}
                {step === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-14 h-14 rounded-full border-4 border-emerald-100 border-t-[#0f7a55] mb-6"
                    />
                    <p className="text-lg font-bold text-[#0a1a12]">Submitting your application…</p>
                    <p className="text-sm text-[#5c7868] mt-2">Please wait a moment.</p>
                  </motion.div>
                )}

                {/* ── FORM ── */}
                {step === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #0f7a55, #1a9c6d)' }}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="pr-8">
                        <h2 className="text-xl sm:text-2xl font-black text-[#0a1a12] leading-tight font-sans tracking-tight">
                          Course Enrollment
                        </h2>
                        <p className="text-sm text-[#0f7a55] font-semibold mt-1 line-clamp-2" title={courseTitle}>
                          {courseTitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-[#5c7868] text-sm mb-6 leading-relaxed">
                      Please provide your details below. Once submitted, our team will reach out with the payment gateway link and further instructions.
                    </p>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6 px-4 py-3 rounded-xl text-sm font-medium"
                          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626' }}
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#1a5d47] mb-2 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b998a]" />
                          <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium text-[#0a1a12] placeholder-[#a3b8ae] outline-none transition-all shadow-sm"
                            style={{ background: '#f0fdf8', border: '1.5px solid #d1f0e0' }}
                            onFocus={e => { e.target.style.borderColor = '#0f7a55'; e.target.style.background = '#ffffff'; }}
                            onBlur={e => { e.target.style.borderColor = '#d1f0e0'; e.target.style.background = '#f0fdf8'; }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-[#1a5d47] mb-2 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b998a]" />
                          <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium text-[#0a1a12] placeholder-[#a3b8ae] outline-none transition-all shadow-sm"
                            style={{ background: '#f0fdf8', border: '1.5px solid #d1f0e0' }}
                            onFocus={e => { e.target.style.borderColor = '#0f7a55'; e.target.style.background = '#ffffff'; }}
                            onBlur={e => { e.target.style.borderColor = '#d1f0e0'; e.target.style.background = '#f0fdf8'; }}
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-[#1a5d47] mb-2 uppercase tracking-wider">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b998a]" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            required
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium text-[#0a1a12] placeholder-[#a3b8ae] outline-none transition-all shadow-sm"
                            style={{ background: '#f0fdf8', border: '1.5px solid #d1f0e0' }}
                            onFocus={e => { e.target.style.borderColor = '#0f7a55'; e.target.style.background = '#ffffff'; }}
                            onBlur={e => { e.target.style.borderColor = '#d1f0e0'; e.target.style.background = '#f0fdf8'; }}
                          />
                        </div>
                      </div>

                      {/* Motivation / Reason */}
                      <div>
                        <label className="block text-xs font-bold text-[#1a5d47] mb-2 uppercase tracking-wider">
                          Why are you joining? (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#7b998a]" />
                          <textarea
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            placeholder="Tell us a bit about your background and what you hope to achieve..."
                            rows={3}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm font-medium text-[#0a1a12] placeholder-[#a3b8ae] outline-none transition-all shadow-sm resize-none custom-scrollbar"
                            style={{ background: '#f0fdf8', border: '1.5px solid #d1f0e0' }}
                            onFocus={e => { e.target.style.borderColor = '#0f7a55'; e.target.style.background = '#ffffff'; }}
                            onBlur={e => { e.target.style.borderColor = '#d1f0e0'; e.target.style.background = '#f0fdf8'; }}
                          />
                        </div>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-black text-sm tracking-wider text-white mt-4 shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #0f7a55 0%, #1a9c6d 100%)',
                          boxShadow: '0 8px 25px rgba(15,122,85,0.35)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        <Sparkles className="w-5 h-5" />
                        Submit Application
                      </motion.button>
                    </form>

                    {/* Privacy note */}
                    <div className="mt-6 flex items-start gap-2 px-2">
                      <div className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7b998a]">
                        <CheckCircle2 className="w-full h-full" />
                      </div>
                      <p className="text-[11px] text-[#7b998a] leading-relaxed">
                        By submitting this application, you agree to Nirvaha's terms. We will keep your information secure and only use it to contact you regarding this course.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

