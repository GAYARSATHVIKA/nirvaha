import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import BACKEND_CONFIG from '@/config/backend';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
    const backdropRef = useRef<HTMLDivElement | null>(null);
    const [policyContent, setPolicyContent] = useState<string>('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Fetch policy from backend
            axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/privacy-policy`)
                .then(res => setPolicyContent(res.data.content))
                .catch(err => console.error("Error fetching privacy policy:", err));
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
                        className="relative w-full max-w-3xl rounded-3xl p-8 text-center flex flex-col max-h-[90vh]"
                        style={{ background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)' }}
                    >
                        {/* Close */}
                        <button onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 transition-all z-10">
                            ✕
                        </button>

                        {/* Header */}
                        <div className="flex-shrink-0">
                            <div className="mb-5 mx-auto flex justify-center">
                                <img src="/logonew.png" alt="Nirvaha Logo" className="h-24 w-auto object-contain" style={{ filter: 'drop-shadow(0px 2px 8px rgba(16, 185, 129, 0.15))' }} />
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-950 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                                Privacy Policy
                            </h2>
                            <p className="text-emerald-600 text-sm mb-6 font-medium tracking-wide">
                                Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>

                        {/* Scrollable Content */}
                        <div 
                            className="flex-1 overflow-y-auto pr-4 space-y-6 text-left text-emerald-900 text-sm leading-relaxed custom-scrollbar mb-6" 
                            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16, 185, 129, 0.3) transparent' }}
                            dangerouslySetInnerHTML={{ __html: policyContent }}
                        />

                        <div className="flex-shrink-0 pt-4 border-t border-emerald-100">
                            <button onClick={onClose}
                                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(16,185,129,0.2)]"
                                style={{ background: '#059669', color: '#ffffff', border: '1px solid #047857' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#047857')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#059669')}
                            >
                                I Understand
                            </button>
                        </div>
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
                        className="relative w-full max-w-3xl rounded-3xl p-8 text-center flex flex-col max-h-[90vh]"
                        style={{ background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)' }}
                    >
                        {/* Close */}
                        <button onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 transition-all z-10">
                            ✕
                        </button>

                        {/* Header */}
                        <div className="flex-shrink-0">
                            <div className="mb-5 mx-auto flex justify-center">
                                <img src="/logonew.png" alt="Nirvaha Logo" className="h-24 w-auto object-contain" style={{ filter: 'drop-shadow(0px 2px 8px rgba(16, 185, 129, 0.15))' }} />
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-950 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                                Terms of Service
                            </h2>
                            <p className="text-emerald-600 text-sm mb-6 font-medium tracking-wide">
                                Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto pr-4 space-y-6 text-left text-emerald-900 text-sm leading-relaxed custom-scrollbar mb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16, 185, 129, 0.3) transparent' }}>
                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">1. Data Collection</h3>
                                <p>Nirvaha actively collects user data to provide and improve our services. By using the application, you agree to the collection and processing of your information as outlined below.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">2. Personal Information</h3>
                                <p className="mb-2"><strong>Email Address:</strong> We collect your email address strictly for account management and authentication purposes. This information is kept confidential and is not shared with third parties.</p>
                                <p><strong>Name:</strong> The collection of your name is optional and used solely for profile personalization. It is also not shared.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">3. User Content</h3>
                                <p className="mb-2"><strong>Reflection Entries:</strong> We collect reflection entries to support core application functionality.</p>
                                <p className="mb-2"><strong>Voice Reflections:</strong> Voice reflections are collected for speech-to-text processing.</p>
                                <p className="mb-2"><strong>Community Posts:</strong> Community posts are collected for the anonymous reflection space.</p>
                                <p>None of this user content is shared with third parties.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">4. App Activity & Device Information</h3>
                                <p className="mb-2"><strong>App Activity:</strong> We collect application activity data to drive analytics and continuous product improvement.</p>
                                <p><strong>Device Information:</strong> Device information is collected to ensure platform security, facilitate authentication, and perform diagnostics. This diagnostic and activity data is strictly confidential and is not shared.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">5. Data Sharing & Security</h3>
                                <p>Nirvaha does not sell personal data, nor do we share data for advertising purposes. All data is encrypted in transit to ensure its security and protect it from unauthorized access.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">6. Account Deletion</h3>
                                <p>We fully support account deletion. Users maintain the right to permanently remove their data from our systems at any time through the application settings.</p>
                            </section>
                        </div>

                        <div className="flex-shrink-0 pt-4 border-t border-emerald-100">
                            <button onClick={onClose}
                                className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(16,185,129,0.2)]"
                                style={{ background: '#059669', color: '#ffffff', border: '1px solid #047857' }}
                                onMouseEnter={e => (e.currentTarget.style.background = '#047857')}
                                onMouseLeave={e => (e.currentTarget.style.background = '#059669')}
                            >
                                I Agree
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
