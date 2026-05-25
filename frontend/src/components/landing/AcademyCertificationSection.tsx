import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DecorativeShapes from './DecorativeShapes';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const allCertificationCourses = [
    {
        title: 'Mindfulness Meditation Certification',
        description: 'Learn the art and science of mindfulness meditation and become a certified instructor.',
        image: '/home1.png',
        feel: 'Calm & Focused',
        cta: 'Begin Your Calm Journey'
    },
    {
        title: 'Emotional Intelligence Mastery',
        description: 'Deep dive into emotional intelligence with practical tools and certification.',
        image: '/home2.png',
        feel: 'Empowered & Aware',
        cta: 'Unlock Your Inner Strength'
    },
    {
        title: 'Holistic Wellness Coach',
        description: 'Comprehensive training to guide others on their holistic wellness journey.',
        image: '/home3.png',
        feel: 'Balanced & Inspired',
        cta: 'Become a Wellness Guide'
    },
    {
        title: 'Spiritual Counseling Program',
        description: 'Integrate ancient wisdom and modern psychology for spiritual counseling.',
        image: '/home4.png',
        feel: 'Connected & Uplifted',
        cta: 'Start Your Spiritual Path'
    },
    {
        title: 'Breathwork Healing Practitioner',
        description: 'Master transformative breathwork techniques to facilitate deep healing and emotional release.',
        image: '/home5.png',
        feel: 'Grounded & Free',
        cta: 'Begin Your Breathwork Journey'
    },
    {
        title: 'Inner Leadership Certification',
        description: 'Develop soulful leadership skills rooted in self-awareness, purpose, and compassionate action.',
        image: '/home6.png',
        feel: 'Purposeful & Clear',
        cta: 'Lead From Within'
    },
];

const cardStyles = [
    'bg-gradient-to-br from-[#f5f5f5] to-[#fffde4] shadow-lg',
    'bg-gradient-to-br from-[#fceabb] to-[#f8b500] shadow-xl',
    'bg-gradient-to-br from-[#f8ffae] to-[#888888] shadow-lg',
    'bg-gradient-to-br from-[#e0c3fc] to-[#8ec5fc] shadow-xl',
    'bg-gradient-to-br from-[#f5f5f5] to-[#d4f5e9] shadow-lg',
    'bg-gradient-to-br from-[#fce4ec] to-[#e8f5e9] shadow-xl',
];

const INITIAL_COUNT = 4;

const AcademyCertificationSection: React.FC = () => {
    const navigate = useNavigate();

    const visibleCourses = allCertificationCourses.slice(0, 4);

    // Animation state for each card heading
    const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const [visible, setVisible] = useState(allCertificationCourses.map(() => false));

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        headingRefs.current.forEach((ref, idx) => {
            if (!ref) return;
            const observer = new window.IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible((prev) => {
                            const updated = [...prev];
                            updated[idx] = true;
                            return updated;
                        });
                        observer.disconnect();
                    }
                },
                { threshold: 0.6 }
            );
            observer.observe(ref);
            observers.push(observer);
        });
        return () => observers.forEach((obs) => obs.disconnect());
    }, [visibleCourses.length]);

    return (
        <section className="py-10 bg-[#f7fafc] relative overflow-hidden">
            <DecorativeShapes variant={3} />
            <div className="max-w-6xl mx-auto px-1 sm:px-2 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F131A] tracking-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                        Nirvaha <span className="text-[#333333]">Certification Courses</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Unlock your potential with our expert-led, accredited programs designed for personal and professional growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {visibleCourses.map((course, idx) => (
                        <motion.div
                            key={course.title}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: (idx % 2) * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className={`relative group rounded-xl border border-[#e2e8f0] flex flex-col sm:flex-row items-stretch overflow-hidden ${cardStyles[idx % cardStyles.length]}`}
                            style={{ minHeight: 180, height: 'auto', maxHeight: 260 }}
                        >
                            <div className="sm:w-2/5 w-full h-40 sm:h-auto flex items-center justify-center bg-white/30 overflow-hidden">
                                <motion.img
                                    src={course.image}
                                    alt={course.title}
                                    className="object-cover w-full h-full"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    onError={e => (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=ffffff&color=1a5d47&bold=true`}
                                />
                            </div>
                            <div className="flex-1 p-5 flex flex-col justify-between">
                                <div>
                                    <h3
                                        ref={el => headingRefs.current[idx] = el}
                                        className={`text-xl md:text-2xl font-semibold text-[#333333] mb-2 drop-shadow-sm transition-all duration-700 ease-out ${visible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                    >
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-700 mb-3 md:mb-4">{course.description}</p>
                                </div>
                                <div className="flex items-center mt-2 gap-2 flex-wrap">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#f5f5f5] to-[#333333]/20 text-[#333333] border border-[#333333]/30 mr-2 mb-2">
                                        <svg className="w-4 h-4 mr-1 text-[#333333]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                                        <span className="uppercase tracking-wide">Course Feel:</span>&nbsp;{course.feel}
                                    </span>
                                </div>
                            </div>
                            {/* CTA Button overlay on hover */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="opacity-0 group-hover:opacity-100 pointer-events-auto flex items-center justify-center transition-all duration-300 w-full h-full">
                                    <div className="backdrop-blur-md bg-white/60 rounded-2xl flex items-center justify-center w-full h-full absolute z-0 transition-all duration-300" />
                                    <button
                                        className="relative z-10 px-8 py-3 rounded-full bg-white/80 backdrop-blur-lg text-[#333333] text-lg font-bold shadow-2xl border border-[#333333]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#333333]/50 hover:bg-gradient-to-r hover:from-[#555555] hover:to-[#777777] hover:text-white hover:border-transparent"
                                    >
                                        {course.cta}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Explore More button — always visible, navigates to /certifications */}
                <div className="flex justify-center mt-10">
                    <button
                        type="button"
                        onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                            navigate('/certifications');
                        }}
                        className="inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-[#333333] text-white text-lg font-bold shadow-lg hover:bg-[#222222] transition-all duration-200"
                    >
                        Explore More
                        <ChevronDown className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AcademyCertificationSection;
