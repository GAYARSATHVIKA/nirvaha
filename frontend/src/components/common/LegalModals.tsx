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
                        <div className="flex-1 overflow-y-auto pr-4 space-y-6 text-left text-emerald-900 text-sm leading-relaxed custom-scrollbar mb-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(16, 185, 129, 0.3) transparent' }}>
                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">1. Introduction</h3>
                                <p>Nirvaha respects and protects user privacy. This Privacy Policy explains what information is collected, how it is used, stored, and protected when using the Nirvaha application.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">2. Information We Collect</h3>
                                <div className="space-y-4">
                                    <p>
                                        <strong>Account Information:</strong> When creating an account, we collect your email address, authentication provider information, a unique user identifier, and an optional name. This information is utilized for account creation, authentication, managing user preferences, and facilitating account recovery.
                                    </p>
                                    <p>
                                        <strong>Reflection Content:</strong> When using the reflection features, we collect your text entries, voice transcripts, reflection history, and user-selected emotional states. This data enables us to generate meaningful reflections, improve personalization, and provide you with pattern awareness.
                                    </p>
                                    <p>
                                        <strong>Community Content:</strong> When participating in the anonymous reflection space, we collect your post content, interaction activity, and reflection insights to maintain community functionality, ensure moderation, and promote safety.
                                    </p>
                                    <p>
                                        <strong>Usage Information:</strong> We automatically collect diagnostic and usage information, such as your device model, operating system, application version, feature usage, and session activity. This information is essential to improve application performance, detect bugs, and enhance the overall user experience.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">3. Data Sharing</h3>
                                <p>Nirvaha does not sell personal data, nor is user data shared with advertisers. Information may be processed by trusted third-party service providers solely to operate and maintain the Nirvaha application. These trusted partners include authentication providers, cloud hosting providers, analytics providers, and AI infrastructure providers.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">4. Data Security</h3>
                                <p>Nirvaha employs industry-standard security measures to protect your information, including encryption of data in transit, secure authentication protocols, and strict access controls. However, please note that no electronic transmission or storage system can guarantee absolute security.</p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">5. User Rights & Account Deletion</h3>
                                <p className="mb-2">Users maintain the right to access their account information, update profile details, and request the deletion of their personal data.</p>
                                <p>
                                    You may permanently delete your account at any time by navigating to <strong>Settings → Privacy & Data → Delete Account</strong>. Account deletion permanently removes your account information, preferences, reflection history, voice transcripts, and community activity. Please note that certain data may remain temporarily in secure backups as required for security, legal, or operational purposes.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-emerald-800 mb-2">6. Children's Privacy</h3>
                                <p>Nirvaha is intended strictly for users aged 18 years and older. Users below the minimum required age should not use the service or submit any personal information through the application.</p>
                            </section>
                        </div>

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
