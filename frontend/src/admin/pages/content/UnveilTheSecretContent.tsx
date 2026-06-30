import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import BACKEND_CONFIG from "../../../config/backend";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function UnveilTheSecretContent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/landing`);
      if (res.ok) {
        const result = await res.json();
        // Ensure unveil array exists
        if (!result.unveil) {
          result.unveil = [];
        }
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast.error('Failed to load Unveil The Secret content');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/landing/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        toast.success('Unveil The Secret updated successfully!');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const updateSlide = (idx: number, field: string, value: string) => {
    const newData = { ...data };
    newData.unveil[idx][field] = value;
    setData(newData);
  };

  const addSlide = () => {
    const newData = { ...data };
    newData.unveil.push({
      title: "New Slide",
      subtitle: "Subtitle here",
      desc: "Description...",
      image: "",
      btn: "Learn More",
      route: "/stories"
    });
    setData(newData);
  };

  const removeSlide = (idx: number) => {
    const newData = { ...data };
    newData.unveil.splice(idx, 1);
    setData(newData);
  };

  const handleImageUpload = async (idx: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', 'unveil-upload-' + Date.now());

    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      const uploaded = await res.json();
      if (uploaded && uploaded.fileUrl) {
        updateSlide(idx, 'image', uploaded.fileUrl);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(uploaded.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Failed to upload image');
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="animate-spin text-emerald-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b4332] flex items-center gap-3">
            <ImageIcon className="text-emerald-500" /> Unveil The Secret CMS
          </h1>
          <p className="text-gray-500 mt-1">Manage the dynamic 'About Us' slideshow on the landing page.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchData}
            className="p-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl transition-colors"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
          >
            {saving ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
            Save All Changes
          </button>
        </div>
      </div>

      {/* Editor Main */}
      <div className="bg-white shadow-sm border border-emerald-200 rounded-[2rem] p-8 md:p-12 min-h-[600px]">
        <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4 mb-8">Slides Management</h3>
        
        <div className="grid grid-cols-1 gap-12">
          <AnimatePresence>
            {data.unveil.map((slide: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 bg-[#f8fdf9] border border-emerald-100 rounded-3xl relative flex flex-col lg:flex-row gap-8 shadow-sm"
              >
                {/* Delete Button */}
                <button 
                  onClick={() => removeSlide(idx)}
                  className="absolute top-6 right-6 p-2 bg-white text-red-400 hover:bg-red-50 hover:text-red-500 rounded-full shadow-sm border border-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                
                {/* Left: Image Editor */}
                <div className="w-full lg:w-1/3 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-emerald-500 uppercase tracking-widest">Slide #{idx + 1}</span>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-emerald-200 relative group">
                    {slide.image ? (
                      <img src={slide.image} alt="Slide preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer bg-white text-[#1b4332] hover:bg-emerald-50 px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
                        <Upload size={16} /> Upload Image
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleImageUpload(idx, e.target.files[0]);
                          }} 
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={slide.image || ''}
                    onChange={(e) => updateSlide(idx, 'image', e.target.value)}
                    className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-2 text-sm text-[#1b4332] focus:border-emerald-500/50 outline-none"
                    placeholder="Or paste Image URL here"
                  />
                </div>

                {/* Right: Content Editor */}
                <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                    <input
                      type="text"
                      value={slide.title || ''}
                      onChange={(e) => updateSlide(idx, 'title', e.target.value)}
                      className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subtitle (Green Text)</label>
                    <input
                      type="text"
                      value={slide.subtitle || ''}
                      onChange={(e) => updateSlide(idx, 'subtitle', e.target.value)}
                      className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
                    <textarea
                      value={slide.desc || ''}
                      onChange={(e) => updateSlide(idx, 'desc', e.target.value)}
                      className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Button Text</label>
                    <input
                      type="text"
                      value={slide.btn || ''}
                      onChange={(e) => updateSlide(idx, 'btn', e.target.value)}
                      className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Button Route</label>
                    <input
                      type="text"
                      value={slide.route || ''}
                      onChange={(e) => updateSlide(idx, 'route', e.target.value)}
                      className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                      placeholder="e.g. /stories or /dashboard"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Slide Button */}
          <button
            onClick={addSlide}
            className="w-full p-6 border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 rounded-3xl flex flex-col items-center justify-center gap-3 text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
              <Plus size={24} />
            </div>
            <span className="font-bold">Add New Slide</span>
          </button>

        </div>
      </div>
    </div>
  );
}
