import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Save } from 'lucide-react';
import BACKEND_CONFIG from '@/config/backend';

interface Page {
  _id: string;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

export function PrivacyPolicyManagementPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Page>>({
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: '',
    isActive: true,
  });
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/privacy-policy`);
      if (res.data) {
        setFormData(res.data);
      }
    } catch (error) {
      console.error('Error fetching privacy policy:', error);
      // It might not exist yet, but we seeded it so it should be there.
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return toast.error('Title is required');

    try {
      if (formData._id) {
        await axios.put(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Privacy Policy updated successfully');
      } else {
        await axios.post(`${BACKEND_CONFIG.API_BASE_URL}/api/pages`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Privacy Policy created successfully');
      }
      fetchPolicy();
    } catch (error: any) {
      console.error('Error saving privacy policy:', error);
      toast.error(error.response?.data?.message || 'Failed to save Privacy Policy');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8 text-emerald-600">Loading editor...</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b4332]">Privacy Policy Editor</h1>
          <p className="text-gray-500 mt-1">Manage the content of the Privacy Policy modal</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">HTML Content</label>
            <p className="text-xs text-gray-500 mb-2">Edit the HTML to update the structure and content of the Privacy Policy.</p>
            <textarea 
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 font-mono text-sm h-[500px]"
              placeholder="<section>...</section>"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700 font-medium">Publish Privacy Policy</label>
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-emerald-100">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Save Privacy Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
