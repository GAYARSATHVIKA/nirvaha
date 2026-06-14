import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Trophy, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { PremiumCertificate } from './PremiumCertificate';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  userName: string;
  completionDate: string;
  duration: string;
  certificateId: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  userName,
  completionDate,
  duration,
  certificateId,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    try {
      setIsDownloading(true);
      
      // Briefly wait to ensure any fonts or styles are fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // 3x scale for high resolution printing
        useCORS: true,
        backgroundColor: '#09100d', // Match the dark luxury theme background
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${courseTitle.replace(/\s+/g, '_')}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate certificate image', error);
      // Fallback or error toast could go here
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl bg-[#09100d]/95 backdrop-blur-3xl rounded-[32px] border border-emerald-500/20 overflow-hidden shadow-[0_20px_60px_rgba(16,185,129,0.15)] flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-emerald-300 transition-colors z-[102]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Body */}
              <div className="p-6 md:p-10 lg:p-12 flex flex-col items-center text-center">
                
                {/* Header Badge */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6"
                >
                  <Trophy className="w-4 h-4 text-emerald-400" />
                  Program Completed
                </motion.div>

                {/* Congratulations Message */}
                <motion.h2
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight uppercase tracking-wide font-sans"
                >
                  Congratulations!
                </motion.h2>

                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-emerald-300/80 text-sm md:text-base max-w-2xl mb-10 font-medium leading-relaxed"
                >
                  You have successfully completed all modules and quizzes for <span className="text-white font-extrabold">{courseTitle}</span>. Your official certification of accomplishment is ready.
                </motion.p>

                {/* Premium Certificate Component Wrapper for html2canvas */}
                <motion.div
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full relative shadow-[0_15px_50px_rgba(0,0,0,0.6)] rounded-lg overflow-hidden border border-emerald-500/30 mb-10"
                >
                  {/* The actual certificate rendered as HTML/CSS */}
                  <div ref={certificateRef}>
                    <PremiumCertificate 
                      userName={userName}
                      courseName={courseTitle}
                      completionDate={completionDate}
                      duration={duration}
                      certificateId={certificateId}
                    />
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#09100d] font-black text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                    {isDownloading ? 'Generating High-Res PDF...' : 'Download Certificate'}
                  </button>

                  <button
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-emerald-300 font-black text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                    Close Preview
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
