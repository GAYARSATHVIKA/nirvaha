import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DecorativeShapes from './DecorativeShapes';

const ClosingSection: React.FC = () => {
    const navigate = useNavigate();
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleStartJourney = () => {
        navigate('/login');
    };

    const openPrivacyModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setPrivacyOpen(true);
    };

    const closePrivacyModal = () => {
        setPrivacyOpen(false);
    };

    useEffect(() => {
        if (privacyOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closePrivacyModal();
            }
        };

        if (privacyOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [privacyOpen]);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === modalRef.current) {
            closePrivacyModal();
        }
    };

    const handleAboutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const target = document.getElementById('what-is-nirvaha');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.href = '/#what-is-nirvaha';
        }
    };

    return (
        <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#0c3328' }}>
            <DecorativeShapes variant={1} color="#4ade80" />
            {/* Curved Section Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, #333333 0%, transparent 70%)', filter: 'blur(100px)' }} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-12 md:space-y-16"
                >
                    {/* Tagline */}
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Where technology, culture, and <span className="text-[#86efac] font-medium">consciousness meet.</span>
                    </h2>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
                        <motion.a
                            href="#what-is-nirvaha"
                            onClick={handleAboutClick}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-[#4ade80] transition-all duration-300 cursor-pointer"
                            style={{ transitionProperty: 'color, transform', transitionDuration: '300ms' }}
                        >
                            About Nirvaha
                        </motion.a>
                        <motion.a
                            href="#privacy"
                            onClick={openPrivacyModal}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-[#4ade80] transition-all duration-300 cursor-pointer"
                            style={{ transitionProperty: 'color, transform', transitionDuration: '300ms' }}
                        >
                            Privacy & Ethics
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-white/80 text-lg md:text-xl font-medium hover:text-white transition-all duration-300"
                        >
                            Contact
                        </motion.a>
                    </div>

                    {/* Clean Privacy popup — stays in footer / overlay */}
                    <AnimatePresence>
                        {privacyOpen && (
                            <div 
                                ref={modalRef}
                                onClick={handleBackdropClick}
                                className="fixed inset-0 z-[100] flex items-end justify-center pb-8 bg-black/60 backdrop-blur-sm px-4"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 100 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                                    className="relative w-full max-w-md rounded-3xl p-8"
                                    style={{ background: '#0d2b1e', border: '1px solid rgba(74,222,128,0.15)', boxShadow: '0 -8px 40px rgba(0,0,0,0.5)' }}
                                >
                                    {/* Close */}
                                    <button onClick={closePrivacyModal}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                                        ✕
                                    </button>

                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                        style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-emerald-400" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                                        Privacy & Ethics
                                    </h2>
                                    <p className="text-white/55 text-sm leading-relaxed mb-6">
                                        At Nirvaha, your privacy and trust are sacred. We collect only what is necessary, never sell your data, and treat your inner journey with the same respect we bring to every experience on this platform.
                                    </p>

                                    <div className="space-y-3">
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

                                    <button onClick={closePrivacyModal}
                                        className="w-full mt-7 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all"
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

                    {/* Call to action text */}
                    <div className="space-y-8">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-100/60" style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Begin your journey inward.
                        </motion.h3>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleStartJourney}
                            className="px-12 py-5 bg-white text-[#0c3328] font-bold text-lg rounded-full shadow-2xl transition-all duration-300 inline-block hover:bg-gray-50"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Start Your Journey
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ClosingSection;
