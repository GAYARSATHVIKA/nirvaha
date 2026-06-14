import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    const backdropRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === backdropRef.current) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    ref={backdropRef}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-md rounded-3xl p-8 text-center"
                        style={{ background: '#0d2b1e', border: '1px solid rgba(74,222,128,0.15)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
                    >
                        {/* Close */}
                        <button onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                            ✕
                        </button>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                            Privacy Policy & Ethics
                        </h2>
                        <p className="text-white/55 text-sm leading-relaxed mb-6">
                            At Nirvaha, your privacy and trust are sacred. We collect only what is necessary, never sell your data, and treat your inner journey with the same respect we bring to every experience on this platform.
                        </p>

                        <div className="space-y-3 text-left">
                            {[
                                { label: 'Your data stays yours', desc: 'We never sell or share personal information.' },
                                { label: 'Ethical AI', desc: 'Our AI is designed to uplift, never manipulate.' },
                                { label: 'Full transparency', desc: 'You can request or delete your data at any time.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                                        style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                                            <path d="M2 6l2.5 2.5L10 3.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/90 text-sm font-semibold">{item.label}</p>
                                        <p className="text-white/45 text-xs mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={onClose}
                            className="w-full mt-7 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all animate-pulse"
                            style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,222,128,0.2)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,222,128,0.12)')}
                        >
                            Got it
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const TermsOfServiceModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    const backdropRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === backdropRef.current) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    ref={backdropRef}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                        className="relative w-full max-w-md rounded-3xl p-8 text-center"
                        style={{ background: '#0d2b1e', border: '1px solid rgba(74,222,128,0.15)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}
                    >
                        {/* Close */}
                        <button onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                            ✕
                        </button>

                        {/* Icon */}
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 mx-auto"
                            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375M9 9h3.375M11.25 21a9 9 0 1 1 9-9 9.004 9.004 0 0 1-9 9Z" />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                            Terms of Service
                        </h2>
                        <p className="text-white/55 text-sm leading-relaxed mb-6">
                            By using Nirvaha, you join a community grounded in self-reflection, mutual respect, and growth. We provide tools for spiritual and emotional support.
                        </p>

                        <div className="space-y-3 text-left">
                            {[
                                { label: 'Respectful Engagement', desc: 'Interact with guides and other community members constructively.' },
                                { label: 'Intellectual Property', desc: 'All educational pathways, designs, and content belong to Nirvaha.' },
                                { label: 'Discretionary Tool', desc: 'Our platform is for wellness support, not a replacement for clinical therapy.' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                                        style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)' }}>
                                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                                            <path d="M2 6l2.5 2.5L10 3.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/90 text-sm font-semibold">{item.label}</p>
                                        <p className="text-white/45 text-xs mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={onClose}
                            className="w-full mt-7 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all animate-pulse"
                            style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(74,222,128,0.2)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(74,222,128,0.12)')}
                        >
                            I Agree
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
