import React, { useEffect, useState, useCallback } from 'react';
import BACKEND_CONFIG from '@/config/backend';
import { Search, GraduationCap, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Enrollment {
  id: string;
  userName: string;
  userEmail: string;
  phone: string;
  courseId: string;
  courseName: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

export function EnrollmentManagementPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selected, setSelected] = useState<Enrollment | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_CONFIG.API_URL}/enrollments`);
      if (res.ok) {
        const data = await res.json();
        setEnrollments(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to fetch enrollments', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEnrollments(); }, [fetchEnrollments]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    setUpdating(true);
    try {
      const res = await fetch(`${BACKEND_CONFIG.API_URL}/enrollments/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
      }
    } finally {
      setUpdating(false);
    }
  };

  const filtered = enrollments.filter(e => {
    const matchSearch = e.userName.toLowerCase().includes(search.toLowerCase()) ||
      e.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      e.courseName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    approved: enrollments.filter(e => e.status === 'approved').length,
    rejected: enrollments.filter(e => e.status === 'rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-emerald-400" />
            Certification Enrollments
          </h1>
          <p className="text-white/50 text-sm mt-1">Manage all certification enrollment requests</p>
        </div>
        <button onClick={fetchEnrollments} className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/30 transition-all">
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-xl p-4 border text-left transition-all ${filter === s ? 'border-emerald-500/50 bg-emerald-500/10' : 'border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.05]'}`}>
            <p className="text-2xl font-black text-white">{counts[s]}</p>
            <p className="text-xs uppercase tracking-wider text-white/50 mt-1 capitalize">{s}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email or course..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.03] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-emerald-500/40 transition-all"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-white/40">Loading enrollments...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-white/40">No enrollments found.</div>
      ) : (
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                {['Student', 'Course', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-white font-semibold">{e.userName}</p>
                    <p className="text-white/40 text-xs mt-0.5">{e.userEmail}</p>
                    {e.phone && <p className="text-white/30 text-xs">{e.phone}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-white/80 font-medium">{e.courseName}</p>
                    <p className="text-white/30 text-xs mt-0.5">{e.courseId}</p>
                  </td>
                  <td className="px-5 py-4 text-white/50 text-xs">
                    {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize ${statusColors[e.status]}`}>
                      {e.status === 'pending' && <Clock className="w-3 h-3" />}
                      {e.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                      {e.status === 'rejected' && <XCircle className="w-3 h-3" />}
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(e)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {e.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(e.id, 'approved')} disabled={updating}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/30 transition-all disabled:opacity-50">
                            Approve
                          </button>
                          <button onClick={() => updateStatus(e.id, 'rejected')} disabled={updating}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/30 transition-all disabled:opacity-50">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#111] p-7 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-white">{selected.userName}</h3>
                <p className="text-white/50 text-sm">{selected.userEmail}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${statusColors[selected.status]}`}>{selected.status}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/40">Course</span><span className="text-white font-medium">{selected.courseName}</span></div>
              {selected.phone && <div className="flex justify-between"><span className="text-white/40">Phone</span><span className="text-white">{selected.phone}</span></div>}
              <div className="flex justify-between"><span className="text-white/40">Enrolled</span><span className="text-white">{new Date(selected.createdAt).toLocaleString()}</span></div>
              {selected.message && (
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Message</p>
                  <p className="text-white/70 leading-relaxed">{selected.message}</p>
                </div>
              )}
            </div>
            {selected.status === 'pending' && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => updateStatus(selected.id, 'approved')} disabled={updating}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-all disabled:opacity-50">
                  Approve
                </button>
                <button onClick={() => updateStatus(selected.id, 'rejected')} disabled={updating}
                  className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/30 transition-all disabled:opacity-50">
                  Reject
                </button>
              </div>
            )}
            <button onClick={() => setSelected(null)} className="w-full mt-3 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm hover:text-white hover:border-white/20 transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
