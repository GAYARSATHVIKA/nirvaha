import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Video, 
  MessageSquare, 
  User, 
  Calendar as CalendarIcon 
} from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from 'date-fns';

interface CompanionScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: any[];
}

export function CompanionScheduleModal({ isOpen, onClose, sessions }: CompanionScheduleModalProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Filter only upcoming / approved sessions
  const activeSessions = useMemo(() => {
    return sessions.filter(s => {
      const status = s.status?.toLowerCase();
      return status === "session confirmed" || status === "approved";
    });
  }, [sessions]);

  // Group sessions by date string (YYYY-MM-DD)
  const sessionsByDate = useMemo(() => {
    const grouped: Record<string, any[]> = {};
    activeSessions.forEach(session => {
      if (session.date) {
        const d = new Date(session.date);
        if (!isNaN(d.getTime())) {
          const key = format(d, 'yyyy-MM-dd');
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(session);
        }
      }
    });
    return grouped;
  }, [activeSessions]);

  const selectedDateKey = format(selectedDate, 'yyyy-MM-dd');
  const selectedSessions = sessionsByDate[selectedDateKey] || [];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const dayKey = format(day, 'yyyy-MM-dd');
        const hasSessions = sessionsByDate[dayKey] && sessionsByDate[dayKey].length > 0;
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
            className={`
              relative flex flex-col items-center justify-center h-14 rounded-xl cursor-pointer transition-all
              ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
              ${isSelected ? 'bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/30' : 'hover:bg-emerald-50'}
              ${isToday && !isSelected ? 'border border-emerald-500 text-emerald-600 font-bold' : ''}
            `}
          >
            <span>{formattedDate}</span>
            {hasSessions && (
              <div className="absolute bottom-2 flex gap-1">
                {sessionsByDate[dayKey].slice(0, 3).map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
                ))}
                {sessionsByDate[dayKey].length > 3 && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} />
                )}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mt-4">{rows}</div>;
  };

  const renderDays = () => {
    const dateFormat = "EE";
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="flex justify-center items-center text-xs font-bold text-gray-400 uppercase tracking-wider h-8">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1 mb-2">{days}</div>;
  };

  const getSessionIcon = (type: string = '') => {
    const t = type.toLowerCase();
    if (t.includes('video')) return <Video className="w-4 h-4 text-emerald-600" />;
    if (t.includes('chat')) return <MessageSquare className="w-4 h-4 text-emerald-600" />;
    return <CalendarIcon className="w-4 h-4 text-emerald-600" />;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F291E]/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#F8FAFC] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Calendar Section */}
          <div className="w-full md:w-[55%] p-6 md:p-8 bg-white border-r border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-tight text-[#1B4332]">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-gray-400"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-gray-400"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {renderDays()}
            {renderCells()}
          </div>

          {/* Schedule Section */}
          <div className="w-full md:w-[45%] p-6 md:p-8 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 flex flex-col">
            <h3 className="text-lg font-bold text-[#1B4332] mb-1">
              {format(selectedDate, "EEEE, MMMM d")}
            </h3>
            <p className="text-sm font-medium text-emerald-800/60 mb-6">
              {selectedSessions.length} {selectedSessions.length === 1 ? 'session' : 'sessions'} scheduled
            </p>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {selectedSessions.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-white/40 rounded-3xl border border-dashed border-emerald-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                    <CalendarIcon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className="text-emerald-800/60 font-bold">Your schedule is clear</p>
                  <p className="text-xs text-emerald-800/40 mt-1">No bookings for this date.</p>
                </div>
              ) : (
                selectedSessions.map((session, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={session.id || session._id || idx}
                    className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {session.time || "Time TBD"}
                      </div>
                      <div className="p-1.5 rounded-full bg-gray-50 group-hover:bg-emerald-50 transition-colors">
                        {getSessionIcon(session.type || session.sessionType)}
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-[#1B4332] text-sm mb-1 line-clamp-1">
                      {session.type || session.sessionType || "Wellness Session"}
                    </h4>
                    
                    <div className="flex items-center gap-2 mt-3 text-xs font-medium text-gray-500">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 shrink-0">
                        <User className="w-3 h-3" />
                      </div>
                      <span className="truncate">
                        {session.userName || session.userId?.name || "Client"}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
