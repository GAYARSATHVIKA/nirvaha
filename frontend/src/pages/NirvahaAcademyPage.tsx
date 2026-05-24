import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { DashboardFooter } from '../components/dashboard/DashboardFooter';
import { CertificationHero } from '../components/academy/CertificationHero';

// --- Programs Data ---
const programs = [
    {
        title: 'Mindfulness Meditation Certification',
        description: 'Learn the art and science of mindfulness meditation and become a certified instructor.',
        cta: 'Begin Your Calm Journey',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
        feel: 'Calm & Focused',
        videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM', // Mindfulness meditation video
    },
    {
        title: 'Emotional Intelligence Mastery',
        description: 'Deep dive into emotional intelligence with practical tools and certification.',
        cta: 'Unlock Your Inner Strength',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
        feel: 'Empowered & Aware',
        videoUrl: 'https://www.youtube.com/watch?v=LgUCyWhJf6s', // Emotional Intelligence video
    },
    {
        title: 'Holistic Wellness Coach',
        description: 'Comprehensive training to guide others on their holistic wellness journey.',
        cta: 'Become a Wellness Guide',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
        feel: 'Balanced & Inspired',
        videoUrl: 'https://www.youtube.com/watch?v=m8v1uC5rV8U', // Holistic Wellness video
    },
    {
        title: 'Spiritual Counseling Program',
        description: 'Integrate ancient wisdom and modern psychology for spiritual counseling.',
        cta: 'Start Your Spiritual Path',
        image: 'https://images.unsplash.com/photo-1528319725582-ddc0b610113c?auto=format&fit=crop&w=600&q=80',
        feel: 'Connected & Uplifted',
        videoUrl: 'https://www.youtube.com/watch?v=4p_P7_9p_P8', // Spiritual psychology/counseling
    },
];

const programCardStyles = [
    'bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/30 text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300',
    'bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300',
    'bg-white/[0.02] border-white/[0.06] hover:border-emerald-500/30 text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300',
    'bg-white/[0.02] border-white/[0.06] hover:border-teal-500/30 text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300',
];

// --- Impact Skills ---
const impactSkills = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-emerald-400">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M24 14l4 6h-8l4-6z M18 26h12 M20 30h8 M24 34v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="18" r="2" stroke="currentColor" strokeWidth="1" />
                <circle cx="32" cy="18" r="2" stroke="currentColor" strokeWidth="1" />
                <line x1="18" y1="18" x2="22" y2="16" stroke="currentColor" strokeWidth="1" />
                <line x1="30" y1="18" x2="26" y2="16" stroke="currentColor" strokeWidth="1" />
            </svg>
        ),
        label: 'Structured Reasoning',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-emerald-400">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <rect x="18" y="14" width="3" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="23" y="18" width="3" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <rect x="28" y="10" width="3" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
        label: 'Bias Awareness',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-emerald-400">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M18 34c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="24" cy="20" r="2" fill="currentColor" />
            </svg>
        ),
        label: 'Attention Control',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=400&q=80',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-emerald-400">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 28h6l2-4 4 8 4-12 3 8h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'Clear Communication',
        image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80',
    },
];

// --- Tags ---
const tags = ['Skill-Focused', 'Assessment-Based', 'Industry Relevant', 'No Prior Expertise Needed'];

const NirvahaAcademyPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050806] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <Navigation currentPage="academy" theme="dark" />

            {/* ===== HERO SECTION ===== */}
            <CertificationHero />

            {/* ===== TAGS BAR ===== */}
            <section className="border-b border-white/5 bg-[#050806]/85 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-sm text-emerald-100/50 font-medium tracking-widest uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR PROGRAMS ===== */}
            <section id="programs" className="bg-[#050806] py-20 lg:py-32 relative">
                {/* Subtle background glow */}
                <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none z-0" />
                
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-16 tracking-wider"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        Our Programs
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {programs.map((program, idx) => (
                            <motion.a
                                key={idx}
                                href={program.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className={`relative group rounded-2xl border flex flex-col sm:flex-row items-stretch overflow-hidden cursor-pointer no-underline ${programCardStyles[idx % programCardStyles.length]}`}
                                style={{ minHeight: 220 }}
                            >
                                {/* Image holder */}
                                <div className="sm:w-2/5 w-full h-48 sm:h-auto flex items-center justify-center bg-white/[0.02] overflow-hidden relative">
                                    <motion.img
                                        src={program.image}
                                        alt={program.title}
                                        className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(program.title)}&background=060a08&color=10b981&bold=true&size=300`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050806]/40 pointer-events-none" />
                                </div>
                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors drop-shadow-sm">
                                            {program.title}
                                        </h3>
                                        <p className="text-emerald-100/60 text-sm leading-relaxed mb-4">
                                            {program.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/30">
                                            <svg className="w-4 h-4 mr-1 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                                            <span className="uppercase tracking-widest text-[9px] font-bold">FEEL:</span>&nbsp;{program.feel}
                                        </span>
                                    </div>
                                </div>
                                {/* Hover CTA overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="opacity-0 group-hover:opacity-100 pointer-events-auto flex items-center justify-center transition-all duration-300 w-full h-full">
                                        <div className="backdrop-blur-md bg-[#050806]/85 rounded-2xl flex items-center justify-center w-full h-full absolute z-0 transition-all duration-300" />
                                        <div className="relative z-10 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-white/10 hover:scale-105 transition-all duration-300">
                                            {program.cta} <ArrowRight className="w-4 h-4 inline ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DIVIDER ===== */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="border-white/5" />
            </div>

            {/* ===== WHY NIRVAHA ACADEMY EXISTS ===== */}
            <section className="bg-[#050806] py-20 lg:py-28 relative">
                <div className="absolute bottom-[10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.05),transparent_70%)] pointer-events-none z-0" />
                
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
                        {/* Left image */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7 }}
                            className="flex-1 w-full"
                        >
                            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-gradient-to-br from-white/[0.01] to-emerald-950/20">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"
                                    alt="Professional thinking and reasoning"
                                    className="w-full h-64 sm:h-80 object-cover opacity-80"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Why+Academy&background=060a08&color=10b981&bold=true&size=500';
                                    }}
                                />
                            </div>
                        </motion.div>
                        {/* Right text */}
                        <div className="flex-1 text-center lg:text-left">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.7 }}
                                className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-wide"
                                style={{ fontFamily: "'Cinzel', serif" }}
                            >
                                Why Nirvaha Academy Exists
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.7, delay: 0.15 }}
                                className="text-emerald-100/60 text-base sm:text-lg font-light leading-relaxed"
                            >
                                Building the core thinking skills essential for navigating complexity, distraction, and uncertainty in today's work environment.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== DIVIDER ===== */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <hr className="border-white/5" />
            </div>

            {/* ===== DESIGNED FOR PROFESSIONAL IMPACT ===== */}
            <section id="impact" className="bg-[#050806] py-20 lg:py-28">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-wide"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        Designed for Professional Impact
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-emerald-100/60 text-base sm:text-lg max-w-3xl mx-auto mb-16 font-light leading-relaxed"
                    >
                        Certifications to enhance structured thinking, bias awareness, and communication precision.
                    </motion.p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {impactSkills.map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: idx * 0.12 }}
                                whileHover={{ y: -6, scale: 1.03 }}
                                className="flex flex-col items-center gap-4 group"
                            >
                                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-white/5">
                                    <motion.img
                                        src={skill.image}
                                        alt={skill.label}
                                        className="w-full h-36 sm:h-44 object-cover opacity-75 group-hover:opacity-90 transition-all duration-700"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(skill.label)}&background=060a08&color=10b981&bold=true&size=300`;
                                        }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050806]/80 to-transparent pointer-events-none" />
                                    {/* Icon badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded-full p-2.5 shadow-lg border border-white/10 text-emerald-400">
                                        {skill.icon}
                                    </div>
                                </div>
                                <span className="text-sm text-emerald-100 font-semibold text-center leading-snug tracking-wide group-hover:text-emerald-400 transition-colors">
                                    {skill.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CONTACT / QUERIES ===== */}
            <section className="bg-[#070b09] py-20 lg:py-28 border-t border-white/5 relative">
                <div className="absolute top-0 left-[40%] w-[25vw] h-[25vw] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.04),transparent_70%)] pointer-events-none z-0" />
                
                <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center tracking-wide"
                        style={{ fontFamily: "'Cinzel', serif" }}
                    >
                        Questions or Queries?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-emerald-100/60 text-base sm:text-lg text-center max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        If you'd like to learn more about a program, have specific queries, or need help choosing the right certification, reach out — we're here to help.
                    </motion.p>

                    <form className="mt-10 max-w-3xl mx-auto grid grid-cols-1 gap-5">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="w-full px-4 py-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none placeholder:text-emerald-100/30 transition-all"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none placeholder:text-emerald-100/30 transition-all"
                        />
                        <textarea
                            name="message"
                            placeholder="How can we help?"
                            rows={5}
                            className="w-full px-4 py-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 outline-none resize-none placeholder:text-emerald-100/30 transition-all"
                        />
                        <div className="flex justify-center mt-4">
                            <button
                                type="button"
                                onClick={() => window.location.href = 'mailto:hello@nirvaha.org'}
                                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105"
                            >
                                Contact Us
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <DashboardFooter />
        </div>
    );
};

export default NirvahaAcademyPage;
