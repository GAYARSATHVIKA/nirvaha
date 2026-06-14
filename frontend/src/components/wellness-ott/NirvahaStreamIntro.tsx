import { useEffect, useRef, useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NirvahaStreamIntro() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const seriesId = searchParams.get('seriesId');
  const videoRef = useRef<HTMLVideoElement>(null);
  const didNavigate = useRef(false);

  const [videoError, setVideoError] = useState(false);

  const goToContent = useCallback(() => {
    if (didNavigate.current) return;
    didNavigate.current = true;
    if (seriesId) {
      navigate(`/wellness-ott/series/${seriesId}`, { replace: true });
    } else {
      navigate('/wellness-ott', { replace: true });
    }
  }, [navigate, seriesId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.error("Autoplay prevented or failed:", err);
        setVideoError(true);
      });
    }

    video.addEventListener('error', (e) => {
      console.error("Video error:", e);
      setVideoError(true);
    });

    // Navigate when the video naturally ends
    video.addEventListener('ended', goToContent);

    // Safety fallback — if video stalls or errors, skip after 30s
    const fallbackTimer = setTimeout(goToContent, 30000);

    return () => {
      video.removeEventListener('ended', goToContent);
      video.removeEventListener('error', goToContent);
      clearTimeout(fallbackTimer);
    };
  }, [goToContent]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src="/nirvaha_ott_well.mp4"
        className="w-full h-full object-contain"
        style={{ filter: "contrast(1.1) saturate(1.1) brightness(1.05)" }}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-40 text-white">
          <p className="mb-4 text-lg">Tap to start the intro</p>
          <button 
            onClick={() => {
              setVideoError(false);
              videoRef.current?.play();
            }}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full font-bold transition-all"
          >
            Play Video
          </button>
        </div>
      )}
      <button 
        onClick={goToContent}
        className="absolute bottom-8 right-8 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-medium tracking-wide transition-all z-50"
      >
        Skip Intro
      </button>
    </div>
  );
}
