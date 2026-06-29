import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Save, Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import BACKEND_CONFIG from '@/config/backend';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  image: string;
  isActive: boolean;
  order: number;
}

export function FAQManagementPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
    image: '',
    isActive: true,
    order: 0
  });
  const [uploading, setUploading] = useState(false);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/faqs/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(res.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await axios.post(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setFormData({ ...formData, image: response.data.url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return toast.error('Question and Answer are required');

    try {
      if (formData._id) {
        await axios.put(`${BACKEND_CONFIG.API_BASE_URL}/api/faqs/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FAQ updated successfully');
      } else {
        await axios.post(`${BACKEND_CONFIG.API_BASE_URL}/api/faqs`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('FAQ created successfully');
      }
      setIsEditing(false);
      fetchFaqs();
    } catch (error: any) {
      console.error('Error saving FAQ:', error);
      toast.error(error.response?.data?.message || 'Failed to save FAQ');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      await axios.delete(`${BACKEND_CONFIG.API_BASE_URL}/api/faqs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('FAQ deleted successfully');
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  if (loading) return <div className="flex justify-center p-8 text-emerald-600">Loading FAQs...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b4332]">FAQ Management</h1>
          <p className="text-gray-500 mt-1">Manage frequently asked questions</p>
        </div>
        <button 
          onClick={() => { setFormData({ question: '', answer: '', image: '', isActive: true, order: 0 }); setIsEditing(true); }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={20} />
          <span>Add FAQ</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#1b4332]">{formData._id ? 'Edit FAQ' : 'Create New FAQ'}</h2>
            <button 
              onClick={() => { setIsEditing(false); }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Question</label>
                <input 
                  type="text" 
                  value={formData.question || ''} 
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500"
                  placeholder="e.g. Is Nirvaha suitable for beginners?"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Answer</label>
                <textarea 
                  value={formData.answer || ''} 
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500 min-h-[100px]"
                  placeholder="Provide the answer here..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Display Image</label>
                <div className="flex items-start gap-4">
                  {formData.image ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-emerald-200">
                      <img src={formData.image} alt="FAQ Visual" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-emerald-200 flex flex-col items-center justify-center text-emerald-400 bg-emerald-50/50">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                      disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-emerald-600 mt-2">Uploading...</p>}
                    <p className="text-xs text-gray-400 mt-2">Recommended size: 800x800px. Max size 5MB.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Display Order</label>
                <input 
                  type="number" 
                  value={formData.order || 0} 
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2 flex items-center h-full pt-6">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="isActive"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700 font-medium">Active (Visible)</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-emerald-100">
              <button 
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
              >
                <Save size={20} />
                <span>Save FAQ</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq) => (
            <div key={faq._id} className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col ${faq.isActive ? 'border-emerald-100' : 'border-gray-200 opacity-75'}`}>
              <div className="flex items-start gap-4 mb-4">
                {faq.image ? (
                  <img src={faq.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="text-emerald-300 w-8 h-8" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">{faq.question}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${faq.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {faq.isActive ? 'Active' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Order: {faq.order}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">{faq.answer}</p>
              
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => { setFormData(faq); setIsEditing(true); }}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(faq._id)}
                  className="flex items-center justify-center w-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No FAQs found. Click "Add FAQ" to create one.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
