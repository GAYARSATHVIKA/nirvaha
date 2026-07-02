import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Save, Check, Loader2, MessageCircle, Heart, Trash2, Reply } from 'lucide-react';
import { toast } from 'react-toastify';
import BACKEND_CONFIG from '../../config/backend';

export const StoryManager = ({ user }: { user: any }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [story, setStory] = useState<any>(null);
  
  const [title, setTitle] = useState('');
  const [quote, setQuote] = useState('');
  const [trauma, setTrauma] = useState('');
  const [nirvahaHelp, setNirvahaHelp] = useState('');
  const [image, setImage] = useState('');
  const [favorites, setFavorites] = useState({ chant: '', music: '', feature: '' });

  const [activeTab, setActiveTab] = useState<'editor' | 'comments'>('editor');
  
  useEffect(() => {
    fetchMyStory();
  }, []);

  const fetchMyStory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories/user/my-story`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setStory(data);
        setTitle(data.title || '');
        setQuote(data.quote || '');
        setTrauma(data.trauma || '');
        setNirvahaHelp(data.nirvahaHelp || '');
        setImage(data.image || '');
        setFavorites(data.favorites || { chant: '', music: '', feature: '' });
      }
    } catch (e) {
      console.error('Error fetching story:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories/my-story`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title, quote, trauma, nirvahaHelp, image, favorites
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setStory(data.story);
        toast.success('Story saved successfully!');
      } else {
        toast.error('Failed to save story');
      }
    } catch (e) {
      toast.error('Error connecting to server');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteStory = async () => {
    if (!window.confirm("Are you sure you want to completely delete your story? This cannot be undone.")) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories/my-story`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        toast.success('Your story has been deleted');
        setStory(null);
        setTitle('');
        setQuote('');
        setTrauma('');
        setNirvahaHelp('');
        setImage('');
        setFavorites({ chant: '', music: '', feature: '' });
      } else {
        toast.error('Failed to delete story');
      }
    } catch (e) {
      toast.error('Error connecting to server');
    } finally {
      setSaving(false);
    }
  };

  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = async (commentId: string) => {
    const text = replyText[commentId];
    if (!text?.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/stories/${story._id}/comments/${commentId}/reply`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ text: text.trim() })
      });
      
      if (res.ok) {
        toast.success('Reply added!');
        setReplyText(prev => ({ ...prev, [commentId]: '' }));
        setReplyingTo(null);
        fetchMyStory();
      } else {
        toast.error('Failed to reply');
      }
    } catch (e) {
      toast.error('Error adding reply');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-emerald-700"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="bg-white rounded-[28px] border border-emerald-100 shadow-sm overflow-hidden">
      <div className="flex border-b border-emerald-100">
        <button 
          onClick={() => setActiveTab('editor')}
          className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === 'editor' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Edit Story
        </button>
        <button 
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-4 font-bold text-sm transition-colors ${activeTab === 'comments' ? 'text-emerald-700 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Comments & Replies {story?.comments?.length > 0 && `(${story.comments.length})`}
        </button>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === 'editor' && (
          <div className="space-y-6">
            {/* Banner Image */}
            <div>
              <label className="block text-sm font-bold text-[#1B4332] mb-2">Banner Image</label>
              <div className="relative h-48 rounded-xl border-2 border-dashed border-emerald-200 bg-emerald-50 overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:border-emerald-400 transition-colors">
                {image ? (
                  <>
                    <img src={image} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-bold flex items-center gap-2"><Upload className="w-4 h-4" /> Change Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-sm font-medium text-emerald-600">Click to upload banner (max 5MB)</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Title & Quote */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1B4332] mb-2">Story Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-[#1B4332] font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Finding My Breath After Burnout"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1B4332] mb-2">Featured Quote</label>
                <input 
                  type="text" 
                  value={quote} 
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-[#1B4332] font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Breathe. You are exactly where you need to be."
                />
              </div>
            </div>

            {/* Content Textareas */}
            <div>
              <label className="block text-sm font-bold text-[#1B4332] mb-2">The Struggle (Your Story)</label>
              <textarea 
                value={trauma} 
                onChange={(e) => setTrauma(e.target.value)}
                className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-[#1B4332] font-medium min-h-[120px] focus:ring-2 focus:ring-emerald-500 outline-none resize-y"
                placeholder="Share your personal struggle or background..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[#1B4332] mb-2">Finding Nirvaha (How it helped)</label>
              <textarea 
                value={nirvahaHelp} 
                onChange={(e) => setNirvahaHelp(e.target.value)}
                className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-[#1B4332] font-medium min-h-[120px] focus:ring-2 focus:ring-emerald-500 outline-none resize-y"
                placeholder="Share how practices or Nirvaha helped you heal..."
              />
            </div>

            {/* Favorites */}
            <div>
              <h4 className="text-sm font-bold text-[#1B4332] mb-3">My Favorites</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-emerald-700 mb-1">Favorite Chant</label>
                  <input type="text" value={favorites.chant} onChange={(e) => setFavorites({...favorites, chant: e.target.value})} className="w-full bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. Cosmic OM" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-700 mb-1">Favorite Music</label>
                  <input type="text" value={favorites.music} onChange={(e) => setFavorites({...favorites, music: e.target.value})} className="w-full bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. 432Hz Healing" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-700 mb-1">Top Feature</label>
                  <input type="text" value={favorites.feature} onChange={(e) => setFavorites({...favorites, feature: e.target.value})} className="w-full bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none" placeholder="e.g. Daily Check-ins" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-emerald-100">
              {story && (
                <button 
                  onClick={handleDeleteStory}
                  disabled={saving}
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
                  title="Permanently delete your story"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Story
                </button>
              )}
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save My Story
              </button>
            </div>
            {story && (
               <div className="text-right mt-2 text-xs text-emerald-600 font-medium">
                 Your story will be publicly available at: <code>/inspiration-story/{story._id}</code>
               </div>
            )}
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="space-y-6">
            {!story ? (
              <p className="text-gray-500 text-center py-8">Publish your story first to receive comments.</p>
            ) : !story.comments || story.comments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No comments yet. Share your story link to get started!</p>
            ) : (
              <div className="space-y-4">
                {story.comments.map((comment: any) => (
                  <div key={comment._id} className="bg-emerald-50/30 border border-emerald-100 p-4 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <img src={comment.userAvatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${comment.userName}`} alt="Avatar" className="w-10 h-10 rounded-full border border-emerald-200" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-bold text-[#1B4332] text-sm">{comment.userName}</h5>
                          <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <Heart className="w-3.5 h-3.5" /> {comment.likes}
                          </span>
                          <button 
                            onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                            className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-800"
                          >
                            <Reply className="w-3.5 h-3.5" /> Reply
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 space-y-3 pl-4 border-l-2 border-emerald-200">
                            {comment.replies.map((reply: any) => (
                              <div key={reply._id} className="flex gap-2">
                                <img src={reply.userAvatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${reply.userName}`} alt="Avatar" className="w-6 h-6 rounded-full" />
                                <div>
                                  <span className="font-bold text-xs text-[#1B4332]">{reply.userName}</span>
                                  <span className="text-xs text-gray-500 ml-2">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                  <p className="text-xs text-gray-700 mt-0.5">{reply.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply Input */}
                        {replyingTo === comment._id && (
                          <div className="mt-3 flex gap-2">
                            <input 
                              type="text" 
                              value={replyText[comment._id] || ''}
                              onChange={(e) => setReplyText({...replyText, [comment._id]: e.target.value})}
                              placeholder="Write a reply..."
                              className="flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                            />
                            <button 
                              onClick={() => handleReply(comment._id)}
                              className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-700"
                            >
                              Post
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
