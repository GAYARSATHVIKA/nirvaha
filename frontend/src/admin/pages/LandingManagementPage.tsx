import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  RefreshCw, 
  Layout, 
  Shield, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  Image as ImageIcon,
  Type,
  ToggleLeft,
  BookOpen,
  Upload,
  X,
  MessageSquare
} from 'lucide-react';
import BACKEND_CONFIG from '../../config/backend';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  // { id: 'hero', label: 'Hero Section', icon: <ImageIcon size={18} /> },
  { id: 'pillars', label: 'What is Nirvaha?', icon: <ToggleLeft size={18} /> },
  // { id: 'academy', label: 'Academy', icon: <BookOpen size={18} /> },
  { id: 'library', label: 'Vast Library', icon: <BookOpen size={18} /> },
  // { id: 'stats', label: 'Trusted Stats', icon: <Plus size={18} /> },
  { id: 'wisdom', label: 'Ancient Wisdom', icon: <Type size={18} /> },
  // { id: 'settings', label: 'Access Controls', icon: <Shield size={18} /> }
];

export function LandingManagementPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('library');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<{ idx: number; data: any } | null>(null);
  const [editingLibraryItem, setEditingLibraryItem] = useState<{ idx: number; data: any } | null>(null);

  useEffect(() => {
    fetchLandingData();
  }, []);

  const defaultLibraryItems = [
      { id: "agni-the-sacred-fire", title: "Agni - The Sacred Fire", category: "Transformation", image: "/agni.jpg", duration: "15 min", story: "Agni is the element of transformation.\nIt burns away the impurities of the ego." },
      { id: "sadvritta-ethical-living", title: "Sadvritta - Ethical Living", category: "Ethics", image: "/sadvrita.jpg", duration: "Practice", story: "Right conduct is the foundation of a spiritual life." },
      { id: "satmya-holistic-adaptability", title: "Satmya - Holistic Adaptability", category: "Adaptability", image: "/satmya.jpg", duration: "10 min", story: "Satmya is the art of adapting to one's environment." },
      { id: "bramhacharya-energy-mastery", title: "Bramhacharya - Energy Mastery", category: "Discipline", image: "/bramhacharya.jpg", duration: "Series", story: "Bramhacharya is the preservation of vital energy." },
      { id: "dhinacharya-daily-routine", title: "Dhinacharya - Daily Routine", category: "Lifestyle", image: "/dhinacharya.jpg", duration: "Practice", story: "Dhinacharya aligns our daily rhythm with nature." },
      { id: "manas-shuddhi-mental-clarity", title: "Manas Shuddhi - Mental Clarity", category: "Mind", image: "/manas shuddhi.jpg", duration: "20 min", story: "Purifying the mind is like cleaning a temple." },
      { id: "saradhi-the-divine-guide", title: "Saradhi - The Divine Guide", category: "Guidance", image: "/saradhi.jpg", duration: "Journey", story: "The guide is the lighthouse in the storm of existence." },
      { id: "vyayama-sacred-movement", title: "Vyayama - Sacred Movement", category: "Discipline", image: "/vyayama.jpg", duration: "Movement", story: "The body is the temple of the living soul." },
      { id: "indriya-nigraha-sensory-control", title: "Indriya Nigraha - Sensory Control", category: "Senses", image: "/indriya.jpg", duration: "10 min", story: "Master the senses to master the mind." },
      { id: "civilizational-wisdom", title: "Civilizational Wisdom", category: "Heritage", image: "/civilizational.jpg", duration: "Lecture", story: "Our ancient civilization holds profound truths." },
      { id: "ritucharya-seasonal-harmony", title: "Ritucharya - Seasonal Harmony", category: "Nature", image: "/ritucharya.jpg", duration: "Series", story: "Ritucharya is the wisdom of seasonal living." }
  ];

  const fetchLandingData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/landing`);
      if (res.ok) {
        const result = await res.json();
        // If library is empty or missing, populate with defaults
        if (!result.library || result.library.length === 0) {
          result.library = defaultLibraryItems;
        }
        setData(result);
      }
    } catch (error) {
      console.error('Failed to fetch landing data:', error);
      toast.error('Failed to load landing page content');
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
        toast.success('Landing page updated successfully!');
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

  const updateNestedField = (path: string, value: any) => {
    const newData = { ...data };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setData(newData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="animate-spin text-emerald-500" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b4332] flex items-center gap-3">
            <BookOpen className="text-emerald-500" /> Library & Ancient Wisdom CMS
          </h1>
          <p className="text-gray-500 mt-1">Manage all public-facing content for the Library and Ancient Wisdom sections dynamically.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchLandingData}
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

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar Tabs */}
        <aside className="space-y-2">
          {SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all ${
                activeTab === section.id 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                : 'text-gray-500 hover:bg-white shadow-sm border border-emerald-100 hover:text-[#1b4332] border border-transparent'
              }`}
            >
              {section.icon}
              <span className="font-medium text-sm">{section.label}</span>
            </button>
          ))}
        </aside>

        {/* Content Editor */}
        <main className="bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-[2rem] p-8 md:p-12 min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {/* Render editors based on tab */}
              {activeTab === 'hero' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Hero Section Content</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Headline</label>
                      <input 
                        type="text" 
                        value={data.hero?.title}
                        onChange={(e) => updateNestedField('hero.title', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Button Label</label>
                      <input 
                        type="text" 
                        value={data.hero?.buttonText}
                        onChange={(e) => updateNestedField('hero.buttonText', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Sub-headline</label>
                      <textarea 
                        value={data.hero?.subtitle}
                        onChange={(e) => updateNestedField('hero.subtitle', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'library' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Vast Library Section</h3>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Library Items</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {data.library?.map((item: any, idx: number) => (
                        <div key={idx} className="p-4 bg-white shadow-sm border border-emerald-100 border border-emerald-100 rounded-2xl flex flex-col gap-3">
                          <img src={item.image || item.imageUrl} className="w-full h-32 rounded-lg object-cover bg-white shadow-inner" />
                          <div>
                            <span className="text-sm font-bold text-[#1b4332] block truncate">{item.title || 'Untitled'}</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase">{item.category}</span>
                              <span className="text-[10px] text-gray-500">{item.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2 pt-3 border-t border-emerald-100">
                            <button 
                                onClick={() => setEditingLibraryItem({ idx, data: { ...item } })}
                                className="flex-1 py-2 text-xs font-bold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Settings size={14} /> Edit
                            </button>
                            <button 
                                onClick={() => {
                                  const newItems = (data.library || []).filter((_: any, i: number) => i !== idx);
                                  updateNestedField('library', newItems);
                                }}
                                className="px-3 py-2 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                            const newItem = {
                                id: `lib-${Date.now()}`,
                                title: 'New Library Item',
                                category: 'Wellness',
                                duration: '10 min',
                                image: '',
                                story: '',
                                description: '',
                                whyTheyMatter: '',
                                impact: [''],
                                quotes: [''],
                                galleryImages: ['', '', '']
                            };
                            updateNestedField('library', [...(data.library || []), newItem]);
                        }}
                        className="p-4 min-h-[220px] border border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-emerald-700 transition-colors"
                      >
                        <Plus size={24} /> 
                        <span className="text-sm font-bold">Add Library Item</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'academy' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Academy Section</h3>
                    <div className="flex items-center gap-3 p-2 bg-white shadow-inner rounded-xl border border-emerald-100">
                      <span className="text-xs text-gray-500 font-bold px-2">LOGIN REQUIRED?</span>
                      <button 
                        onClick={() => updateNestedField('academy.isLoginRequired', !data.academy?.isLoginRequired)}
                        className={`p-1 w-12 h-6 rounded-full transition-colors flex items-center ${data.academy?.isLoginRequired ? 'bg-emerald-500' : 'bg-emerald-50'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${data.academy?.isLoginRequired ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Title</label>
                      <input 
                        type="text" 
                        value={data.academy?.title}
                        onChange={(e) => updateNestedField('academy.title', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Explore Button Text</label>
                      <input 
                        type="text" 
                        value={data.academy?.exploreButtonText}
                        onChange={(e) => updateNestedField('academy.exploreButtonText', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Subtitle</label>
                      <textarea 
                        value={data.academy?.subtitle}
                        onChange={(e) => updateNestedField('academy.subtitle', e.target.value)}
                        className="w-full bg-white shadow-inner border border-emerald-200 rounded-xl px-4 py-3 text-[#1b4332] focus:border-emerald-500/50 outline-none h-20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Academy Cards ( Teasers )</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.academy?.courses?.map((course: any, idx: number) => (
                        <div key={idx} className="p-4 bg-white shadow-sm border border-emerald-100 border border-emerald-100 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={course.image} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                                <span className="text-sm font-medium block">{course.title}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-black">Instructor: {course.instructor?.name || 'Not Set'}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setEditingCourse({ idx, data: { ...course } })}
                                className="p-2 text-emerald-400/60 hover:text-emerald-400"
                            >
                                <Settings size={16} />
                            </button>
                            <button 
                                onClick={() => {
                                const newCourses = (data.academy?.courses || []).filter((_: any, i: number) => i !== idx);
                                updateNestedField('academy.courses', newCourses);
                                }}
                                className="p-2 text-red-400/60 hover:text-red-400"
                            >
                                <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                            const newCourse = {
                                id: `course-${Date.now()}`,
                                title: 'New Course',
                                description: '',
                                feel: '',
                                image: '',
                                bgColor: 'bg-emerald-50',
                                instructor: { name: '', title: '', avatar: '', bio: '', experience: '', certifications: '', coursesHandled: '', expertise: '', socialLinks: '', website: '', rating: 4.8, reviewsCount: 0 }
                            };
                            updateNestedField('academy.courses', [...(data.academy?.courses || []), newCourse]);
                        }}
                        className="p-4 border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-700 transition-colors"
                      >
                        <Plus size={18} /> Add Teaser Card
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-12">
                  <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Global Site Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Take the site offline for updates.' },
                      { key: 'showCollaborators', label: 'Show Collaborators', desc: 'Toggle the collaborators section.' },
                      { key: 'showContactForm', label: 'Show Contact Form', desc: 'Toggle the contact us section.' }
                    ].map(setting => (
                      <div key={setting.key} className="p-6 bg-white shadow-sm border border-emerald-100 border border-emerald-100 rounded-3xl flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="font-bold text-[#1b4332]">{setting.label}</p>
                          <p className="text-xs text-gray-400">{setting.desc}</p>
                        </div>
                        <button 
                          onClick={() => updateNestedField(`settings.${setting.key}`, !(data.settings?.[setting.key]))}
                          className={`p-1 w-12 h-6 rounded-full transition-colors flex items-center ${data.settings?.[setting.key] ? 'bg-emerald-500' : 'bg-emerald-50'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${data.settings?.[setting.key] ? 'translate-x-7' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'pillars' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Core Pillars</h3>
                    <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                      📸 Recommended Image Size: <span className="font-bold">1000x1200px (Portrait)</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {(data.pillars || []).map((pillar: any, idx: number) => (
                      <div key={idx} className="p-6 bg-white shadow-sm border border-emerald-100 rounded-3xl space-y-4 relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-emerald-500">Pillar #{idx + 1}</span>
                            <button 
                                onClick={() => {
                                    const newPillars = [...data.pillars];
                                    newPillars.splice(idx, 1);
                                    updateNestedField('pillars', newPillars);
                                }}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <input
                          type="text"
                          value={pillar.title || ''}
                          onChange={e => {
                            const newPillars = [...data.pillars];
                            newPillars[idx].title = e.target.value;
                            updateNestedField('pillars', newPillars);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                          placeholder="Pillar Title"
                        />
                        <textarea
                          value={pillar.desc || pillar.description || ''}
                          onChange={e => {
                            const newPillars = [...data.pillars];
                            newPillars[idx].desc = e.target.value;
                            newPillars[idx].description = e.target.value;
                            updateNestedField('pillars', newPillars);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[80px]"
                          placeholder="Pillar Description"
                        />
                        <div className="space-y-2">
                          {(pillar.image) && (
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2 border border-emerald-100 shadow-sm">
                               <img src={pillar.image} className="w-full h-full object-cover bg-gray-50" />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={pillar.image || ''}
                              onChange={e => {
                                const newPillars = [...data.pillars];
                                newPillars[idx].image = e.target.value;
                                updateNestedField('pillars', newPillars);
                              }}
                              className="flex-1 w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                              placeholder="Image URL"
                            />
                            <label className="cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors">
                              <Upload size={16} />
                              <span className="text-sm font-bold whitespace-nowrap">Upload</span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('key', 'pillar-upload-' + Date.now()); 
                                    
                                    try {
                                        const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, {
                                            method: 'POST',
                                            body: formData
                                        });
                                        const uploaded = await res.json();
                                        if (uploaded && uploaded.fileUrl) {
                                            const newPillars = [...data.pillars];
                                            newPillars[idx].image = uploaded.fileUrl;
                                            updateNestedField('pillars', newPillars);
                                            toast.success('Image uploaded successfully');
                                        } else {
                                            toast.error(uploaded.error || 'Upload failed');
                                        }
                                    } catch (err) {
                                        console.error('Upload error:', err);
                                        toast.error('Failed to upload image');
                                    }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newPillars = [...(data.pillars || [])];
                        newPillars.push({ id: `p-${Date.now()}`, title: 'New Pillar', desc: '', image: '' });
                        updateNestedField('pillars', newPillars);
                      }}
                      className="p-4 border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-700 transition-colors"
                    >
                      <Plus size={18} /> Add Pillar
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'wisdom' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Ancient Wisdom (Goals)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.goals || []).map((goal: any, idx: number) => (
                      <div key={idx} className="p-6 bg-white shadow-sm border border-emerald-100 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-emerald-500">Goal #{idx + 1}</span>
                            <button 
                                onClick={() => {
                                    const newGoals = [...data.goals];
                                    newGoals.splice(idx, 1);
                                    updateNestedField('goals', newGoals);
                                }}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <input
                          type="text"
                          value={goal.title || ''}
                          onChange={e => {
                            const newGoals = [...data.goals];
                            newGoals[idx].title = e.target.value;
                            updateNestedField('goals', newGoals);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                          placeholder="Goal Title (e.g. INNER PEACE)"
                        />
                        <input
                          type="text"
                          value={goal.subtitle || ''}
                          onChange={e => {
                            const newGoals = [...data.goals];
                            newGoals[idx].subtitle = e.target.value;
                            updateNestedField('goals', newGoals);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                          placeholder="Subtitle (e.g. I'm looking to find)"
                        />
                        <textarea
                          value={goal.desc || goal.description || ''}
                          onChange={e => {
                            const newGoals = [...data.goals];
                            newGoals[idx].desc = e.target.value;
                            newGoals[idx].description = e.target.value;
                            updateNestedField('goals', newGoals);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[80px]"
                          placeholder="Goal Description"
                        />
                        <div className="space-y-2">
                          {(goal.image || goal.imageUrl) && (
                            <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2 border border-emerald-100 shadow-sm">
                               <img src={goal.image || goal.imageUrl} className="w-full h-full object-cover bg-gray-50" />
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={goal.image || goal.imageUrl || ''}
                              onChange={e => {
                                const newGoals = [...data.goals];
                                newGoals[idx].image = e.target.value;
                                newGoals[idx].imageUrl = e.target.value;
                                updateNestedField('goals', newGoals);
                              }}
                              className="flex-1 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                              placeholder="Image URL"
                            />
                            <label className="cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors">
                              <Upload size={16} />
                              <span className="text-sm font-bold whitespace-nowrap">Upload</span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('key', 'goal-upload-' + Date.now()); 
                                    
                                    try {
                                        const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, {
                                            method: 'POST',
                                            body: formData
                                        });
                                        const uploaded = await res.json();
                                        if (uploaded && uploaded.fileUrl) {
                                            const newGoals = [...data.goals];
                                            newGoals[idx].image = uploaded.fileUrl;
                                            newGoals[idx].imageUrl = uploaded.fileUrl;
                                            updateNestedField('goals', newGoals);
                                            toast.success('Image uploaded successfully');
                                        } else {
                                            toast.error(uploaded.error || 'Upload failed');
                                        }
                                    } catch (err) {
                                        console.error('Upload error:', err);
                                        toast.error('Failed to upload image');
                                    }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newGoals = [...(data.goals || [])];
                        newGoals.push({ id: Date.now(), title: 'NEW GOAL', subtitle: 'I am looking for', desc: '', image: '' });
                        updateNestedField('goals', newGoals);
                      }}
                      className="p-4 border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-700 transition-colors md:col-span-2"
                    >
                      <Plus size={18} /> Add Goal
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Trusted Stats & Partners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(data.partners || []).map((partner: any, idx: number) => (
                      <div key={idx} className="p-6 bg-white shadow-sm border border-emerald-100 rounded-3xl space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-emerald-500">Stat/Partner #{idx + 1}</span>
                            <button 
                                onClick={() => {
                                    const newPartners = [...data.partners];
                                    newPartners.splice(idx, 1);
                                    updateNestedField('partners', newPartners);
                                }}
                                className="text-red-400 hover:text-red-600"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <input
                          type="text"
                          value={partner.value || partner.name || ''}
                          onChange={e => {
                            const newPartners = [...data.partners];
                            newPartners[idx].value = e.target.value;
                            newPartners[idx].name = e.target.value;
                            updateNestedField('partners', newPartners);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                          placeholder="Value / Name (e.g. 50,000+ or Google)"
                        />
                        <input
                          type="text"
                          value={partner.label || ''}
                          onChange={e => {
                            const newPartners = [...data.partners];
                            newPartners[idx].label = e.target.value;
                            updateNestedField('partners', newPartners);
                          }}
                          className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                          placeholder="Label (e.g. Active Members)"
                        />
                        <div className="flex gap-4">
                            <input
                              type="text"
                              value={partner.icon || ''}
                              onChange={e => {
                                const newPartners = [...data.partners];
                                newPartners[idx].icon = e.target.value;
                                updateNestedField('partners', newPartners);
                              }}
                              className="w-1/3 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                              placeholder="Emoji/Icon"
                            />
                            <input
                              type="text"
                              value={partner.logoUrl || ''}
                              onChange={e => {
                                const newPartners = [...data.partners];
                                newPartners[idx].logoUrl = e.target.value;
                                updateNestedField('partners', newPartners);
                              }}
                              className="w-2/3 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                              placeholder="Logo URL (optional)"
                            />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newPartners = [...(data.partners || [])];
                        newPartners.push({ value: '', label: '', icon: '', name: '', logoUrl: '' });
                        updateNestedField('partners', newPartners);
                      }}
                      className="p-4 border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-700 transition-colors md:col-span-2"
                    >
                      <Plus size={18} /> Add Stat / Partner
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Course Editor Modal */}
      <AnimatePresence>
        {editingCourse && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white border border-emerald-200 rounded-[2.5rem] w-full max-w-4xl p-10 relative my-auto"
                >
                    <button 
                        onClick={() => setEditingCourse(null)}
                        className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 hover:text-[#1b4332]"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#1b4332]">Edit Academy Course</h2>
                            <p className="text-gray-500 text-sm">Configure course details and instructor information.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Course Details */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest">COURSE INFO</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Course Title</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.title}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, title: e.target.value } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Course Focus (e.g. Calm & Focused)</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.feel}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, feel: e.target.value } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Image URL</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.image}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, image: e.target.value } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Background Color Class (Tailwind)</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.bgColor}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, bgColor: e.target.value } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Instructor Details */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest">INSTRUCTOR PROFILE</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.name}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, name: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.title}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, title: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Experience</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.experience}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, experience: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Certifications</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.certifications}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, certifications: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Courses Handled</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.coursesHandled}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, coursesHandled: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Specialties</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.expertise}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, expertise: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Social Link</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.socialLinks}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, socialLinks: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Website URL</label>
                                    <input 
                                        type="text" 
                                        value={editingCourse.data.instructor?.website}
                                        onChange={(e) => setEditingCourse({ ...editingCourse, data: { ...editingCourse.data, instructor: { ...editingCourse.data.instructor, website: e.target.value } } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-emerald-100 flex justify-end gap-4">
                        <button 
                            onClick={() => setEditingCourse(null)}
                            className="px-8 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (!editingCourse) return;
                                const newCourses = [...(data.academy?.courses || [])];
                                newCourses[editingCourse.idx] = editingCourse.data;
                                updateNestedField('academy.courses', newCourses);
                                setEditingCourse(null);
                                toast.success('Course updated in staging. Remember to Save All Changes.');
                            }}
                            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all"
                        >
                            Confirm Updates
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Library Item Editor Modal */}
      <AnimatePresence>
        {editingLibraryItem && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="bg-white border border-emerald-200 rounded-[2.5rem] w-full max-w-2xl p-10 relative my-auto"
                >
                    <button 
                        onClick={() => setEditingLibraryItem(null)}
                        className="absolute top-8 right-8 text-gray-400 hover:text-emerald-700 transition-colors"
                    >
                        <Trash2 size={24} className="rotate-45" /> {/* Use Trash2 rotated as close icon if X not available, or just clear text. Wait, Trash2 rotate 45 looks weird. I will just use standard close logic */}
                    </button>
                    
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-[#1b4332] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>Edit Library Item</h2>
                        <p className="text-gray-500">Modify the details of this item to update the Library Carousel.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                                <input 
                                    type="text" 
                                    value={editingLibraryItem.data.title}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, title: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                                <input 
                                    type="text" 
                                    value={editingLibraryItem.data.category}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, category: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Duration</label>
                                <input 
                                    type="text" 
                                    value={editingLibraryItem.data.duration}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, duration: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Image</label>
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Image URL"
                                        value={editingLibraryItem.data.image || editingLibraryItem.data.imageUrl || ''}
                                        onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, image: e.target.value } })}
                                        className="w-full bg-white shadow-sm border border-emerald-100 border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                                    />
                                    <label className="cursor-pointer flex items-center justify-center gap-2 w-full py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold transition-colors text-sm">
                                        <Upload size={16} /> Upload from Computer
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={async (e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    const file = e.target.files[0];
                                                    try {
                                                        const formData = new FormData();
                                                        formData.append('file', file);
                                                        const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, {
                                                            method: 'POST',
                                                            body: formData,
                                                        });
                                                        if (res.ok) {
                                                            const result = await res.json();
                                                            setEditingLibraryItem({ 
                                                                ...editingLibraryItem, 
                                                                data: { ...editingLibraryItem.data, image: result.fileUrl } 
                                                            });
                                                        } else {
                                                            console.error('Upload failed');
                                                        }
                                                    } catch (err) {
                                                        console.error('Upload error', err);
                                                    }
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Short Story</label>
                                <textarea 
                                    value={editingLibraryItem.data.story || ''}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, story: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[80px]"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">The Essence (Detailed Description)</label>
                                <textarea 
                                    value={editingLibraryItem.data.description || ''}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, description: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[120px]"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Modern Application (Why It Matters)</label>
                                <textarea 
                                    value={editingLibraryItem.data.whyTheyMatter || ''}
                                    onChange={(e) => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, whyTheyMatter: e.target.value } })}
                                    className="w-full bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[100px]"
                                />
                            </div>

                            <div className="col-span-2 border-t border-emerald-100 pt-6 mt-2">
                                <h4 className="font-bold text-[#1b4332] mb-4">Gallery Images (Up to 3)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[0, 1, 2].map((imgIdx) => (
                                        <div key={imgIdx} className="space-y-2">
                                            <input 
                                                type="text" 
                                                placeholder={`Image URL ${imgIdx + 1}`}
                                                value={(editingLibraryItem.data.galleryImages && editingLibraryItem.data.galleryImages[imgIdx]) || ''}
                                                onChange={(e) => {
                                                    const newGallery = [...(editingLibraryItem.data.galleryImages || ['', '', ''])];
                                                    newGallery[imgIdx] = e.target.value;
                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, galleryImages: newGallery } });
                                                }}
                                                className="w-full bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-2 text-gray-900 outline-none text-sm"
                                            />
                                            <label className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold transition-colors text-xs">
                                                <Upload size={14} /> Upload
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    className="hidden" 
                                                    onChange={async (e) => {
                                                        if (e.target.files && e.target.files[0]) {
                                                            try {
                                                                const formData = new FormData();
                                                                formData.append('file', e.target.files[0]);
                                                                const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, { method: 'POST', body: formData });
                                                                if (res.ok) {
                                                                    const result = await res.json();
                                                                    const newGallery = [...(editingLibraryItem.data.galleryImages || ['', '', ''])];
                                                                    newGallery[imgIdx] = result.fileUrl;
                                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, galleryImages: newGallery } });
                                                                }
                                                            } catch (err) {}
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 border-t border-emerald-100 pt-6 mt-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-[#1b4332]">Impact in Focus</h4>
                                    <button 
                                        onClick={() => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, impact: [...(editingLibraryItem.data.impact || []), ''] } })}
                                        className="text-xs flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
                                    ><Plus size={14}/> Add Item</button>
                                </div>
                                <div className="space-y-2">
                                    {(editingLibraryItem.data.impact || []).map((imp: string, i: number) => (
                                        <div key={i} className="flex gap-2">
                                            <input 
                                                type="text" 
                                                value={imp}
                                                onChange={(e) => {
                                                    const newImpact = [...editingLibraryItem.data.impact];
                                                    newImpact[i] = e.target.value;
                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, impact: newImpact } });
                                                }}
                                                className="flex-1 bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-2 text-gray-900 outline-none text-sm"
                                            />
                                            <button 
                                                onClick={() => {
                                                    const newImpact = editingLibraryItem.data.impact.filter((_: any, idx: number) => idx !== i);
                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, impact: newImpact } });
                                                }}
                                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl"
                                            ><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 border-t border-emerald-100 pt-6 mt-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-[#1b4332]">Words of Wisdom (Quotes)</h4>
                                    <button 
                                        onClick={() => setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, quotes: [...(editingLibraryItem.data.quotes || []), ''] } })}
                                        className="text-xs flex items-center gap-1 text-emerald-600 hover:text-emerald-700"
                                    ><Plus size={14}/> Add Quote</button>
                                </div>
                                <div className="space-y-2">
                                    {(editingLibraryItem.data.quotes || []).map((q: string, i: number) => (
                                        <div key={i} className="flex gap-2">
                                            <textarea 
                                                value={q}
                                                onChange={(e) => {
                                                    const newQ = [...editingLibraryItem.data.quotes];
                                                    newQ[i] = e.target.value;
                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, quotes: newQ } });
                                                }}
                                                className="flex-1 bg-white shadow-sm border border-emerald-100 rounded-xl px-4 py-2 text-gray-900 outline-none text-sm min-h-[60px]"
                                            />
                                            <button 
                                                onClick={() => {
                                                    const newQ = editingLibraryItem.data.quotes.filter((_: any, idx: number) => idx !== i);
                                                    setEditingLibraryItem({ ...editingLibraryItem, data: { ...editingLibraryItem.data, quotes: newQ } });
                                                }}
                                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl h-fit"
                                            ><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-emerald-100 flex justify-end gap-4">
                        <button 
                            onClick={() => setEditingLibraryItem(null)}
                            className="px-8 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (!editingLibraryItem) return;
                                const newItems = [...(data.library || [])];
                                newItems[editingLibraryItem.idx] = editingLibraryItem.data;
                                updateNestedField('library', newItems);
                                setEditingLibraryItem(null);
                                toast.success('Library item updated. Remember to Save All Changes.');
                            }}
                            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-all"
                        >
                            Confirm Updates
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
