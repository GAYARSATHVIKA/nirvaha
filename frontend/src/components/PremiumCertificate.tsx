import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface PremiumCertificateProps {
  userName: string;
  courseName: string;
  completionDate: string;
  duration: string;
  certificateId: string;
}

export const PremiumCertificate: React.FC<PremiumCertificateProps> = ({
  userName,
  courseName,
  completionDate,
  duration,
  certificateId,
}) => {
  return (
    <div 
      className="relative w-full aspect-[1.414/1] bg-[#09100d] overflow-hidden flex flex-col items-center justify-between p-6 md:p-8 lg:p-10 text-center select-none"
      style={{
        boxShadow: 'inset 0 0 100px rgba(16, 185, 129, 0.05)',
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Subtle geometric border */}
        <div className="absolute inset-4 md:inset-6 lg:inset-8 border border-emerald-900/40 rounded-xl" />
        <div className="absolute inset-[18px] md:inset-[26px] lg:inset-[34px] border border-emerald-500/10 rounded-lg" />
        
        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-yellow-500/30 rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-yellow-500/30 rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-yellow-500/30 rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-yellow-500/30 rounded-br-xl" />

        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-500/5 blur-[120px]" />
        
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-[100px]" />
      </div>

      {/* Content Container (Glassmorphism) */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full h-full">
        
        {/* Top Section */}
        <div className="flex flex-col items-center gap-3">
          {/* Logo Placeholder (Replace with actual logo image if available) */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Nirvaha Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.2em] text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              NIRVAHA
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] md:text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Verified Digital Credential
            </span>
          </div>
        </div>

        {/* Main Title Section */}
        <div className="flex flex-col items-center gap-2 my-4">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-white to-emerald-100 uppercase tracking-widest drop-shadow-sm" style={{ fontFamily: "'Cinzel', serif" }}>
            Certificate of Achievement
          </h2>
          <p className="text-xs md:text-sm text-emerald-200/60 uppercase tracking-[0.3em] font-medium">
            This Certificate is Proudly Presented To
          </p>
        </div>

        {/* Recipient Section (Focal Point) */}
        <div className="flex flex-col items-center gap-1 mb-4 mt-2">
          <h3 className="text-4xl md:text-5xl lg:text-[60px] font-bold text-yellow-400/90 tracking-tight" style={{ fontFamily: "'Great Vibes', cursive, serif", textShadow: '0 2px 20px rgba(234, 179, 8, 0.15)' }}>
            {userName}
          </h3>
          <p className="text-xs md:text-sm text-emerald-100/70 uppercase tracking-widest mt-4">
            For successfully completing the certified learning program
          </p>
        </div>

        {/* Course Name (Second Focal Point) */}
        <div className="flex flex-col items-center w-full max-w-4xl mb-4">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white text-center leading-tight tracking-wide drop-shadow-md mb-3">
            {courseName}
          </h4>
          <p className="text-[10px] md:text-xs lg:text-sm text-emerald-100/50 leading-relaxed text-center max-w-3xl font-medium">
            This certifies that the above participant has successfully completed all required learning modules, assessments, and program activities associated with this course and has demonstrated dedication toward continuous learning, personal growth, and professional development.
          </p>
        </div>

        {/* Footer Data Section */}
        <div className="w-full flex justify-between items-end mt-auto pt-4 border-t border-emerald-900/50 relative z-20">
          
          {/* Metadata */}
          <div className="flex flex-col items-start gap-1 text-left">
            <div className="text-[9px] md:text-[11px] text-emerald-100/40 uppercase tracking-widest font-semibold mb-1">
              Certificate Information
            </div>
            <div className="text-[10px] md:text-xs text-white/80 font-mono tracking-wider">
              <span className="text-emerald-500/70 mr-2">ID:</span> {certificateId}
            </div>
            <div className="text-[10px] md:text-xs text-white/80 font-mono tracking-wider">
              <span className="text-emerald-500/70 mr-2">DATE:</span> {completionDate}
            </div>
            <div className="text-[10px] md:text-xs text-white/80 font-mono tracking-wider">
              <span className="text-emerald-500/70 mr-2">DUR:</span> {duration}
            </div>
          </div>



          {/* Org Name */}
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="text-[9px] md:text-[11px] text-emerald-100/40 uppercase tracking-widest font-semibold mb-1">
              Organized & Issued By
            </div>
            <div className="text-[11px] md:text-[13px] font-black text-white tracking-[0.2em] uppercase">
              Nirvaha Wellness LLP
            </div>
            <div className="text-[8px] md:text-[9px] text-emerald-400/60 uppercase tracking-widest mt-1">
              Empowering Reflection • Clarity • Growth
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
