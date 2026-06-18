import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, CheckCircle, XCircle, Search, Mail, BookOpen, LayoutTemplate } from 'lucide-react';
import BACKEND_CONFIG from '../../config/backend';
import { CurriculumBuilder } from './CurriculumBuilder';

export function CertificationsManager() {
  const [activeTab, setActiveTab] = useState<'certifications' | 'enrollments'>('enrollments');
  const [certifications, setCertifications] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultCert = { id: '', title: '', description: '', image: '', feel: '', cta: '', price: 0, isFree: false, skillLevel: 'Beginner', duration: 'Self-paced', certificate: 'Professional Certificate', modules: [] };
  const [newCert, setNewCert] = useState<any>(defaultCert);
  const [editorTab, setEditorTab] = useState<'basic' | 'curriculum'>('basic');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [certsRes, enrollRes] = await Promise.all([
        fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/certifications`),
        fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/enrollments`)
      ]);
      const certsData = await certsRes.json();
      const enrollData = await enrollRes.json();
      setCertifications(Array.isArray(certsData) ? certsData : []);
      setEnrollments(Array.isArray(enrollData) ? enrollData : []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = selectedCert 
        ? `${BACKEND_CONFIG.API_BASE_URL}/api/admin/certifications/${selectedCert}` 
        : `${BACKEND_CONFIG.API_BASE_URL}/api/admin/certifications`;
      const method = selectedCert ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert)
      });
      if (res.ok) {
        setShowAddForm(false);
        setSelectedCert(null);
        setNewCert(defaultCert);
        setEditorTab('basic');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certification?')) return;
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/certifications/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveEnrollment = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/enrollments/${id}/approve`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEnrollment = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this enrollment?')) return;
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_BASE_URL}/api/admin/enrollments/${id}/cancel`, { method: 'POST' });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0F131A]">Certifications & Enrollments</h2>
          <p className="text-gray-500 mt-1">Manage certification programs and student applications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('enrollments')}
          className={`pb-3 font-medium text-sm transition-all relative ${
            activeTab === 'enrollments' ? 'text-[#1a5d47]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Enrollment Applications
          {activeTab === 'enrollments' && (
            <motion.div layoutId="cert-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d47]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('certifications')}
          className={`pb-3 font-medium text-sm transition-all relative ${
            activeTab === 'certifications' ? 'text-[#1a5d47]' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Certifications List
          {activeTab === 'certifications' && (
            <motion.div layoutId="cert-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a5d47]" />
          )}
        </button>
      </div>

      {/* Enrollments Tab */}
      {activeTab === 'enrollments' && (
        <div className="space-y-4">
          {enrollments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No enrollment applications found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enrollments.map((env) => (
                    <tr key={env._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{env.name}</div>
                        <div className="text-sm text-gray-500">{env.email}</div>
                        <div className="text-xs text-gray-400">{env.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#1a5d47]">{env.courseTitle}</div>
                        <div className="text-xs text-gray-400">{new Date(env.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-600" title={env.reason}>
                        {env.reason || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          env.status === 'approved' ? 'bg-green-100 text-green-800' :
                          env.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {env.status ? env.status.charAt(0).toUpperCase() + env.status.slice(1) : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {env.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveEnrollment(env._id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#1a5d47] text-white rounded-lg text-xs font-medium hover:bg-[#124233] transition-colors"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              onClick={() => handleCancelEnrollment(env._id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        )}
                        {env.status === 'approved' && (
                          <button
                            onClick={() => handleCancelEnrollment(env._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setNewCert(defaultCert);
                setSelectedCert(null);
                setEditorTab('basic');
                setShowAddForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a5d47] text-white rounded-lg hover:bg-[#124233] transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Certification
            </button>
          </div>

          {/* Modal for Add / Edit */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-4xl max-h-[90vh] flex flex-col">
                
                <div className="flex justify-between items-center p-6 border-b border-gray-200 shrink-0">
                  <h3 className="font-bold text-lg text-[#0F131A]">{selectedCert ? 'Edit Certification' : 'Add New Certification'}</h3>
                  <button onClick={() => setShowAddForm(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex border-b border-gray-200 px-6 shrink-0 pt-2 gap-4">
                  <button onClick={() => setEditorTab('basic')} className={`pb-3 font-medium text-sm flex items-center gap-2 ${editorTab === 'basic' ? 'text-[#1a5d47] border-b-2 border-[#1a5d47]' : 'text-gray-500 hover:text-gray-700'}`}>
                    <LayoutTemplate className="w-4 h-4" /> Basic Details
                  </button>
                  <button onClick={() => setEditorTab('curriculum')} className={`pb-3 font-medium text-sm flex items-center gap-2 ${editorTab === 'curriculum' ? 'text-[#1a5d47] border-b-2 border-[#1a5d47]' : 'text-gray-500 hover:text-gray-700'}`}>
                    <BookOpen className="w-4 h-4" /> Curriculum Builder
                  </button>
                </div>

                <form onSubmit={handleAddCert} className="flex-1 overflow-y-auto p-6 space-y-6">
                  {editorTab === 'basic' ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ID (URL slug)</label>
                          <input type="text" value={newCert.id} disabled={!!selectedCert} onChange={e => setNewCert({...newCert, id: e.target.value})} required className="w-full px-3 py-2 border rounded-lg bg-white text-black disabled:bg-white disabled:text-black disabled:opacity-100" placeholder="e.g. mindfulness-mastery" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input type="text" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} required className="w-full px-3 py-2 border rounded-lg bg-white text-black" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea value={newCert.description} onChange={e => setNewCert({...newCert, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                          <input type="url" value={newCert.image} onChange={e => setNewCert({...newCert, image: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Course Feel / Vibe</label>
                          <input type="text" value={newCert.feel} onChange={e => setNewCert({...newCert, feel: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" placeholder="e.g. Calm & Focused" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                          <input type="text" value={newCert.cta} onChange={e => setNewCert({...newCert, cta: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" placeholder="e.g. Begin Your Journey" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="number" value={newCert.price} onChange={e => setNewCert({...newCert, price: Number(e.target.value)})} disabled={newCert.isFree} className="w-full px-3 py-2 border rounded-lg bg-white text-black disabled:bg-white disabled:text-black disabled:opacity-100" />
                          </div>
                          <div className="flex items-center mt-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" checked={newCert.isFree} onChange={e => setNewCert({...newCert, isFree: e.target.checked, price: e.target.checked ? 0 : newCert.price})} className="w-4 h-4 text-[#1a5d47] rounded focus:ring-[#1a5d47]" />
                              <span className="text-sm font-medium text-gray-700">Is Free?</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                          <input type="text" value={newCert.skillLevel} onChange={e => setNewCert({...newCert, skillLevel: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" placeholder="e.g. Beginner" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <input type="text" value={newCert.duration} onChange={e => setNewCert({...newCert, duration: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" placeholder="e.g. 4 Weeks" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Output</label>
                          <input type="text" value={newCert.certificate} onChange={e => setNewCert({...newCert, certificate: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white text-black" placeholder="e.g. Professional Certificate" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CurriculumBuilder 
                      modules={newCert.modules || []} 
                      onChange={(updatedModules) => setNewCert({...newCert, modules: updatedModules})} 
                    />
                  )}

                  <div className="flex justify-end gap-3 pt-6 border-t mt-4 shrink-0 bg-white sticky bottom-0">
                    <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-[#1a5d47] text-white rounded-lg hover:bg-[#124233] font-medium">{selectedCert ? 'Update' : 'Save'} Certification</button>
                  </div>
                </form>

              </motion.div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Certification</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Feel / Vibe</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {certifications.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-8 text-gray-500">No certifications found.</td></tr>
                  ) : (
                    certifications.map(cert => (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                               {cert.image ? <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">{(cert.title || 'C').charAt(0)}</div>}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{cert.title || 'Untitled'}</div>
                              <div className="text-xs text-gray-500">{cert.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{cert.feel || '-'}</td>
                        <td className="px-6 py-4 text-sm font-medium text-[#1a5d47]">${cert.price || 0}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <button onClick={() => { setSelectedCert(cert.id); setNewCert({ id: cert.id, title: cert.title, description: cert.description || '', image: cert.image || '', feel: cert.feel || '', cta: cert.cta || '', price: cert.price || 0, isFree: cert.isFree || false, skillLevel: cert.skillLevel || 'Beginner', duration: cert.duration || 'Self-paced', certificate: cert.certificate || 'Professional Certificate', modules: cert.modules || [] }); setEditorTab('basic'); setShowAddForm(true); }} className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">Edit</button>
                           <button onClick={() => handleDeleteCert(cert.id)} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
}
