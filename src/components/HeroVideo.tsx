import { useRef, useEffect, memo } from 'react';
import Hls from 'hls.js';

const HLS_URL = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

const HeroVideo = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_URL;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10 }}>
      {/* Edge fade gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 15,
          background: 'linear-gradient(to bottom, #000000 0%, transparent 20%, transparent 60%, #000000 100%)'
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ mixBlendMode: 'screen' }}
      />
    </div>
  );
});

HeroVideo.displayName = 'HeroVideo';

export default HeroVideo;
