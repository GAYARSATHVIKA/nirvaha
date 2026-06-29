import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_CONFIG from '@/config/backend';
import { FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageLink {
  title: string;
  slug: string;
}

export function DynamicPagesSection() {
  const [pages, setPages] = useState<PageLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages`);
        setPages(res.data);
      } catch (error) {
        console.error('Error fetching dynamic pages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  if (loading || pages.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1b4332] mb-4">Discover More</h2>
          <p className="text-gray-600 text-lg">Explore additional resources and custom content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page, idx) => (
            <motion.div
              key={page.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/page/${page.slug}`}
                className="group flex flex-col items-center text-center bg-[#EEF7F1] hover:bg-[#E3F2EB] p-8 rounded-[2rem] transition-all hover:-translate-y-1 shadow-sm hover:shadow-md h-full border border-emerald-100"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform text-emerald-600">
                  <FileText size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#1b4332] mb-2">{page.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                  READ MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
