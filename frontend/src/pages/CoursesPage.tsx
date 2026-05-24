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

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      <SEOHead
        title="Choose Your Certification | Nirvaha"
        description="Explore Nirvaha's 10 immersive wellness certifications designed for emotional balance, mindful living, and conscious growth."
      />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/5 px-6 lg:px-16 py-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/certifications')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
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
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.0] mb-14"
        >
          Choose Your Certification
        </motion.h1>

        {/* ── Course cards ── */}
        <div className="flex flex-col gap-6">
          {courses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 transition-all duration-300"
              style={{ minHeight: 160 }}
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent from-55% to-black/80" />
              </div>

              {/* Content — right-aligned panel */}
              <div className="relative z-10 flex items-center justify-end h-full min-h-[160px] px-6 lg:px-12 py-5">
                <div className="w-full max-w-xl text-left bg-black/40 backdrop-blur-sm rounded-xl px-6 py-5 lg:px-10 lg:py-7">

                  {/* Title */}
                  <h2
                    className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wide leading-[1.05] mb-2"
                    style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
                  >
                    {course.title}<br />
                    <span className="font-light text-lg sm:text-xl tracking-[0.12em] text-white/80">
                      {course.subtitle}
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-3">
                    {course.description}
                  </p>

                  {/* CTA */}
                  <button
                    type="button"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.18em] shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:scale-105 transition-all duration-300"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
