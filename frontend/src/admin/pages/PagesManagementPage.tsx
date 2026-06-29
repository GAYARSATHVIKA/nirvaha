import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Edit2, Save, X, Eye } from 'lucide-react';
import BACKEND_CONFIG from '@/config/backend';
import { useAuth } from '@/contexts/AuthContext';

interface Page {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  description?: string;
  color?: string;
  isActive: boolean;
  createdAt: string;
}

export function PagesManagementPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Page>>({
    title: '',
    slug: '',
    content: '',
    image: '',
    description: '',
    color: '#ce93d8',
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await axios.get(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPages(res.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    setUploading(true);
    try {
      const res = await axios.post(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setFormData({ ...formData, image: res.data.url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (page: Page) => {
    setFormData(page);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    try {
      await axios.delete(`${BACKEND_CONFIG.API_BASE_URL}/api/pages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Page deleted successfully');
      fetchPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Failed to delete page');
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
        toast.success('Page updated successfully');
      } else {
        await axios.post(`${BACKEND_CONFIG.API_BASE_URL}/api/pages`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Page created successfully');
      }
      setIsEditing(false);
      setFormData({ title: '', slug: '', content: '', image: '', description: '', color: '#ce93d8', isActive: true });
      fetchPages();
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast.error(error.response?.data?.message || 'Failed to save page');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8 text-emerald-600">Loading pages...</div>;
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-8 max-w-4xl mx-auto my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1b4332]">{formData._id ? 'Edit Page' : 'Create New Page'}</h2>
          <button 
            onClick={() => { setIsEditing(false); setFormData({ title: '', slug: '', content: '', image: '', description: '', color: '#ce93d8', isActive: true }); }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Page Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="e.g. About Us"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Custom Slug (Optional)</label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500"
                placeholder="e.g. about-us"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Short Description (For Dashboard Cards)</label>
              <textarea 
                value={formData.description || ''} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500 h-20"
                placeholder="Short text describing the page or feature..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Card Color (Hex)</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={formData.color || '#ce93d8'} 
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="h-10 w-14 rounded cursor-pointer border border-emerald-200"
                />
                <input 
                  type="text" 
                  value={formData.color || '#ce93d8'} 
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="flex-1 bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-2 outline-none focus:border-emerald-500 font-mono"
                  placeholder="#ce93d8"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cover Image</label>
            <div className="flex items-start gap-6">
              {formData.image && (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-emerald-100 shadow-sm flex-shrink-0">
                  <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-emerald-600 mt-2">Uploading...</p>}
                <p className="text-xs text-gray-400 mt-2">Recommended size: 360x420px. Max size 5MB.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">HTML Content</label>
            <textarea 
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-white text-gray-900 border border-emerald-200 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 font-mono text-sm h-[400px]"
              placeholder="<h1>Your page content here</h1>..."
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
            <label htmlFor="isActive" className="text-sm text-gray-700 font-medium">Publish Page (Make Visible)</label>
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-emerald-100">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              <Save size={18} />
              Save Page
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b4332]">Dynamic Pages</h1>
          <p className="text-gray-500 mt-1">Manage standalone custom pages for your application</p>
        </div>
        <button 
          onClick={() => { setFormData({ title: '', slug: '', content: '', image: '', description: '', color: '#ce93d8', isActive: true }); setIsEditing(true); }}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={20} />
          Create Page
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-emerald-50/50 text-emerald-900 border-b border-emerald-100">
            <tr>
              <th className="px-6 py-4 font-bold">Title</th>
              <th className="px-6 py-4 font-bold">Slug (URL)</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Created</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {pages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No pages found. Create your first page!
                </td>
              </tr>
            ) : (
              pages.map(page => (
                <tr key={page._id} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-[#1b4332]">{page.title}</td>
                  <td className="px-6 py-4 text-emerald-600 text-sm font-mono">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${page.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                      {page.isActive ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <a href={`/page/${page.slug}`} target="_blank" rel="noreferrer" className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Eye size={18} />
                    </a>
                    <button onClick={() => handleEdit(page)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(page._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
