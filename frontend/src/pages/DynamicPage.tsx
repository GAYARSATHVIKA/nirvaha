import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_CONFIG from '@/config/backend';
import { Navigation } from '@/components/Navigation';
import { DashboardFooter } from '@/components/dashboard/DashboardFooter';
import { FileText, ArrowLeft } from 'lucide-react';

interface PageData {
  title: string;
  content: string;
  createdAt: string;
}

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/${slug}`);
        setPage(res.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching page:', err);
        setError(err.response?.data?.message || 'Page not found');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF7F1] flex items-center justify-center">
        <div className="text-emerald-600 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-medium">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-[#EEF7F1] flex flex-col">
        <Navigation currentPage="" />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
            <FileText size={40} />
          </div>
          <h1 className="text-4xl font-bold text-[#1b4332] mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8 max-w-md">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
        <DashboardFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF7F1] flex flex-col">
      <Navigation currentPage="" />
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-800 mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>
        
        <article className="bg-white rounded-[2rem] shadow-sm border border-emerald-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-emerald-50">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1b4332] mb-4 leading-tight">
              {page.title}
            </h1>
            <p className="text-emerald-600/70 font-medium">
              Last updated {new Date(page.createdAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="p-8 md:p-12 prose prose-emerald prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
      </main>

      <DashboardFooter />
    </div>
  );
}
