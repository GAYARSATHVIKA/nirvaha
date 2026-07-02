import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Plus, Trash2, Upload, MessageSquare } from 'lucide-react';
import BACKEND_CONFIG from '../../config/backend';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export function DailyInspirationManagementPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);
  
  const [dbStories, setDbStories] = useState<any[]>([]);

  useEffect(() => {
    fetchLandingData();
    fetchDbStories();
  }, []);

  const fetchLandingData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/landing`);
      if (res.ok) {
        const fetchedData = await res.json();
        if (fetchedData && Array.isArray(fetchedData.inspirations)) {
          setData(fetchedData);
        } else {
          // ensure inspirations array exists
          setData({ ...fetchedData, inspirations: [] });
        }
      } else {
        toast.error('Failed to load daily inspirations data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDbStories = async () => {
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories`);
      if (res.ok) {
        const storiesData = await res.json();
        setDbStories(storiesData);
      }
    } catch (error) {
      console.error('Error fetching db stories:', error);
    }
  };

  const handleDeleteDbStory = async (id: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this blog? This cannot be undone.")) return;
    
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        toast.success('Blog deleted successfully');
        fetchDbStories();
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting db story:', error);
      toast.error('An error occurred while deleting');
    }
  };

  const saveLandingData = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/landing/admin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        toast.success('Daily inspirations updated successfully');
        fetchLandingData(); // Refresh to get latest state
      } else {
        const errData = await res.json();
        toast.error(errData.error || 'Failed to update daily inspirations');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const updateNestedField = (path: string, value: any) => {
    setData((prev: any) => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <RefreshCw className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Daily Inspirations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <MessageSquare size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Inspiration</h1>
            <p className="text-gray-500 text-sm">Manage the inspirational quotes on the dashboard.</p>
          </div>
        </div>
        
        <button
          onClick={saveLandingData}
          disabled={saving}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">Inspirational Quotes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(data?.inspirations || []).map((note: any, idx: number) => (
              <div key={idx} className="p-6 bg-white shadow-sm border border-emerald-100 rounded-3xl space-y-4 relative">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-emerald-500">Quote #{idx + 1}</span>
                    <button 
                        onClick={() => {
                            const newNotes = [...data.inspirations];
                            newNotes.splice(idx, 1);
                            updateNestedField('inspirations', newNotes);
                        }}
                        className="text-red-400 hover:text-red-600"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                <textarea
                  value={note.quote || ''}
                  onChange={e => {
                    const newNotes = [...data.inspirations];
                    newNotes[idx].quote = e.target.value;
                    updateNestedField('inspirations', newNotes);
                  }}
                  className="w-full bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 min-h-[80px]"
                  placeholder="Quote"
                />
                <div className="flex gap-4">
                    <input
                      type="text"
                      value={note.author || ''}
                      onChange={e => {
                        const newNotes = [...data.inspirations];
                        newNotes[idx].author = e.target.value;
                        updateNestedField('inspirations', newNotes);
                      }}
                      className="w-1/2 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                      placeholder="Author Name"
                    />
                    <input
                      type="text"
                      value={note.chant || ''}
                      onChange={e => {
                        const newNotes = [...data.inspirations];
                        newNotes[idx].chant = e.target.value;
                        updateNestedField('inspirations', newNotes);
                      }}
                      className="w-1/2 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50"
                      placeholder="Chant Title (Optional)"
                    />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Author Avatar</label>
                  <div className="flex items-center gap-4">
                    {note.avatar && (
                      <img src={note.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-200" />
                    )}
                    <div className="flex gap-2 flex-1">
                      <input
                        type="text"
                        value={note.avatar || ''}
                        onChange={e => {
                          const newNotes = [...data.inspirations];
                          newNotes[idx].avatar = e.target.value;
                          updateNestedField('inspirations', newNotes);
                        }}
                        className="flex-1 bg-white shadow-sm border border-emerald-200 rounded-xl px-4 py-3 text-gray-900 outline-none focus:border-emerald-500/50 text-sm"
                        placeholder="Avatar URL"
                      />
                      <label className="cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl px-3 flex items-center justify-center gap-2 transition-colors">
                        <Upload size={14} />
                        <span className="text-xs font-bold whitespace-nowrap">Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              
                              const formData = new FormData();
                              formData.append('file', file);
                              formData.append('key', 'avatar-upload-' + Date.now()); 
                              
                              try {
                                  const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/upload`, {
                                      method: 'POST',
                                      body: formData
                                  });
                                  const uploaded = await res.json();
                                  if (uploaded && uploaded.fileUrl) {
                                      const newNotes = [...data.inspirations];
                                      newNotes[idx].avatar = uploaded.fileUrl;
                                      updateNestedField('inspirations', newNotes);
                                      toast.success('Avatar uploaded successfully');
                                  } else {
                                      toast.error(uploaded.error || 'Upload failed');
                                  }
                              } catch (err) {
                                  console.error('Upload error:', err);
                                  toast.error('Failed to upload avatar');
                              }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newNotes = [...(data?.inspirations || [])];
                newNotes.push({ id: Date.now(), quote: '', chant: '', author: '', avatar: '' });
                updateNestedField('inspirations', newNotes);
              }}
              className="p-4 border border-dashed border-emerald-300 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:text-emerald-700 transition-colors md:col-span-2"
            >
              <Plus size={18} /> Add Quote
            </button>
          </div>
        </div>
      </div>

      {/* User Generated Blogs / Stories Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#1b4332] border-l-4 border-emerald-500 pl-4">User Generated Blogs (Full Stories)</h3>
          </div>
          
          {dbStories.length === 0 ? (
             <p className="text-gray-500 italic">No user blogs published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbStories.map((story: any) => (
                <div key={story._id} className="p-6 bg-white shadow-sm border border-emerald-100 rounded-3xl space-y-4 relative">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                          <img src={story.authorAvatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${story.authorName}`} alt="avatar" className="w-10 h-10 rounded-full border border-emerald-200" />
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{story.title}</h4>
                            <p className="text-xs text-emerald-600">By {story.authorName}</p>
                          </div>
                      </div>
                      <button 
                          onClick={() => handleDeleteDbStory(story._id)}
                          className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Blog"
                      >
                          <Trash2 size={18} />
                      </button>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                     <p className="line-clamp-2"><strong>Quote:</strong> {story.quote}</p>
                     <p className="text-xs text-gray-400 mt-1">Published: {new Date(story.createdAt).toLocaleDateString()}</p>
                     <p className="text-xs text-gray-400">Comments: {story.comments?.length || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
