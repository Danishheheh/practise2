import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

export default function BackgroundAudio({ isUnlocked }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25); // Low volume for mood

  useEffect(() => {
    if (!isUnlocked) return;

    if (audioRef.current) {
      audioRef.current.volume = volume;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Audio autoplay info:', err);
          });
      }
    }
  }, [isUnlocked]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = volume;
        audioRef.current.play().catch((e) => console.log('Audio play error:', e));
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  if (!isUnlocked) return null;

  return (
    <>
      {/* Background audio tag using user's WhatsApp MPEG song */}
      <audio
        ref={audioRef}
        src="/custom-song.mpeg"
        loop
        preload="auto"
      />

      {/* Floating Mood Music Control Badge in Top Right Corner */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-3 bg-black/70 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-porcelain-400/50">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs font-medium text-white hover:text-porcelain-300 transition-colors"
        >
          <Music className={`w-3.5 h-3.5 text-porcelain-300 ${isPlaying ? 'animate-pulse' : ''}`} />
          <span className="hidden sm:inline font-sans text-[11px] tracking-wide text-slate-200">
            Our Special Song 🎵
          </span>
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-porcelain-300" />
          ) : (
            <Play className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>

        {/* Volume slider */}
        <div className="flex items-center gap-1.5 border-l border-white/15 pl-2">
          {volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-porcelain-400" />
          )}
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-porcelain-400"
          />
        </div>
      </div>
    </>
  );
}
