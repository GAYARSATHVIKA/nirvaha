import React from "react";
import { TrendingUp, BadgeCheck, Plus } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  role?: string;
  specialty: string;
  experience?: string;
  verified?: boolean;
  bio: string;
  followers: number;
  posts: number;
  avatar?: string;
  avatarUrl?: string;
  avatarColor?: string;
  followed: boolean;
  starred: boolean;
}

interface TrendTag { title: string; count: string; }

interface Props {
  trending: TrendTag[];
  mentors: Mentor[];
  activeHashtag: string;
  onCreate: () => void;
  onTrendClick: (tag: string) => void;
  onFollow: (id: string) => void;
  onStar: (id: string) => void;
  onViewProfile: (mentor: Mentor) => void;
}

export default function RightSidebar({
  trending, mentors, activeHashtag,
  onCreate, onTrendClick, onFollow, onStar, onViewProfile,
}: Props) {
  return (
    <aside className="hidden lg:block w-72 sticky top-24 self-start space-y-6">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between px-1">
        <div className="text-sm font-semibold text-[#0f172a] uppercase tracking-wide text-opacity-80 flex items-center gap-2">
          <TrendingUp className="w-[18px] h-[18px] text-[#16a34a]" />
          Trending
        </div>
        <button
          onClick={onCreate}
          className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#16a34a] hover:bg-[#15803d] px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_4px_14px_rgba(22,163,74,0.3)] active:scale-95"
        >
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      {/* ── Trending tags ── */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <ol className="space-y-1">
          {trending.map((t, i) => {
            const isActive = activeHashtag === t.title;
            return (
              <li key={i}>
                <button
                  onClick={() => onTrendClick(t.title)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl transition-all duration-300 text-left group ${
                    isActive ? "bg-[#f0fdf4] shadow-[0_2px_10px_rgba(22,163,74,0.1)]" : "hover:bg-[#f8fafc]"
                   }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-4 ${isActive ? "text-[#16a34a]" : "text-[#94a3b8]"}`}>
                      {i + 1}
                    </span>
                    <span className={`text-sm font-medium transition-colors ${
                      isActive ? "text-[#16a34a]" : "text-[#1e293b] group-hover:text-[#16a34a]"
                    }`}>
                      {t.title}
                    </span>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${
                    isActive
                      ? "bg-[#dcfce7] text-[#15803d]"
                      : "bg-[#f1f5f9] text-[#64748b]"
                  }`}>
                    {t.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>



    </aside>
  );
}
