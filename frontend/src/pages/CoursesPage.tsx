import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { coursesData } from '../data/coursesData';

const courses = coursesData.map(c => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  subtitle: c.subtitle,
  description: c.description,
  image: c.image,
}));

// Card accent colors — each harmonises with the mint-green page background
const cardAccents = [
  { bg: 'rgba(209,250,229,0.85)', border: '#6ee7b7', title: '#064e3b', sub: '#059669', desc: '#065f46' },  // emerald mint
  { bg: 'rgba(220,252,231,0.85)', border: '#86efac', title: '#14532d', sub: '#16a34a', desc: '#166534' },  // soft green
  { bg: 'rgba(187,247,208,0.85)', border: '#4ade80', title: '#052e16', sub: '#15803d', desc: '#14532d' },  // fresh green
  { bg: 'rgba(236,253,245,0.9)',  border: '#6ee7b7', title: '#064e3b', sub: '#10b981', desc: '#065f46' },  // pale mint
  { bg: 'rgba(204,251,241,0.85)', border: '#5eead4', title: '#134e4a', sub: '#0d9488', desc: '#115e59' },  // teal mint
  { bg: 'rgba(209,250,229,0.85)', border: '#34d399', title: '#064e3b', sub: '#059669', desc: '#065f46' },  // emerald
  { bg: 'rgba(220,252,231,0.85)', border: '#86efac', title: '#14532d', sub: '#16a34a', desc: '#166534' },  // soft green
  { bg: 'rgba(187,247,208,0.85)', border: '#4ade80', title: '#052e16', sub: '#15803d', desc: '#14532d' },  // fresh green
  { bg: 'rgba(204,251,241,0.85)', border: '#5eead4', title: '#134e4a', sub: '#0d9488', desc: '#115e59' },  // teal mint
  { bg: 'rgba(236,253,245,0.9)',  border: '#6ee7b7', title: '#064e3b', sub: '#10b981', desc: '#065f46' },  // pale mint
];

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'linear-gradient(135deg, #f0fdf8 0%, #ecfdf5 40%, #f7fffe 100%)', color: '#0a1a12' }}>
      <SEOHead
        title="Choose Your Certification | Nirvaha"
        description="Explore Nirvaha's 10 immersive wellness certifications designed for emotional balance, mindful living, and conscious growth."
      />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-emerald-100/60 px-6 lg:px-16 py-4 flex items-center gap-4" style={{ background: 'rgba(240,253,248,0.9)' }}>
        <button
          type="button"
          onClick={() => navigate('/certifications')}
          className="inline-flex items-center gap-2 text-[#2d6a4f] hover:text-[#065f46] transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Certifications
        </button>
      </div>

      <div className="px-4 lg:px-10 py-14 lg:py-20 w-full max-w-[1600px] mx-auto">

        {/* ── Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0a1a12] uppercase tracking-tight leading-[1.0] mb-14"
        >
          Choose Your Certification
        </motion.h1>

        {/* ── Course cards ── */}
        <div className="flex flex-col gap-6">
          {courses.map((course, idx) => {
            const accent = cardAccents[idx % cardAccents.length];
            return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300"
              style={{ minHeight: 160, border: `1px solid ${accent.border}`, boxShadow: `0 4px 24px ${accent.border}33` }}
            >
              {/* Full-bleed background image — fills entire card */}
              <div className="absolute inset-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=0d0d0d&color=10b981&bold=true&size=800`;
                  }}
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 50%, ${accent.bg} 70%)` }} />
              </div>

              {/* Content — right-aligned panel */}
              <div className="relative z-10 flex items-center justify-end h-full min-h-[160px] px-6 lg:px-12 py-5">
                <div className="w-full max-w-xl text-left rounded-xl px-6 py-5 lg:px-10 lg:py-7"
                  style={{ background: accent.bg, backdropFilter: 'blur(8px)', border: `1px solid ${accent.border}55` }}
                >
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide leading-[1.05] mb-2"
                    style={{ color: accent.title }}>
                    {course.title}<br />
                    <span className="font-light text-lg sm:text-xl tracking-[0.12em]" style={{ color: accent.sub }}>
                      {course.subtitle}
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: accent.desc }}>
                    {course.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-[0.18em] hover:scale-105 transition-all duration-300"
                    style={{ background: `linear-gradient(135deg, ${accent.sub}, ${accent.border})`, boxShadow: `0 4px 16px ${accent.border}66` }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
