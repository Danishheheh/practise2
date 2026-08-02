import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import GlassCard from './GlassCard';

const INITIAL_BENCHMARK_MS = (589 * 86400 + 0 * 3600 + 12 * 60) * 1000;

function LoveStopwatch() {
  const [elapsedMs, setElapsedMs] = useState(INITIAL_BENCHMARK_MS);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const diff = Date.now() - startTime;
      setElapsedMs(INITIAL_BENCHMARK_MS + diff);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalSeconds = Math.floor(elapsedMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-porcelain-300 mb-2 flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-porcelain-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Love Stopwatch • Loving You For</span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3 bg-white/5 border border-porcelain-400/30 px-5 py-3 rounded-2xl backdrop-blur-md shadow-[0_0_25px_rgba(56,176,248,0.2)]">
        <div className="flex flex-col items-center px-1.5">
          <span className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{days}</span>
          <span className="text-[9px] font-mono text-porcelain-300 uppercase">Days</span>
        </div>
        <span className="text-porcelain-400 text-lg font-mono font-light">:</span>
        <div className="flex flex-col items-center px-1.5">
          <span className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{String(hours).padStart(2, '0')}</span>
          <span className="text-[9px] font-mono text-porcelain-300 uppercase">Hours</span>
        </div>
        <span className="text-porcelain-400 text-lg font-mono font-light">:</span>
        <div className="flex flex-col items-center px-1.5">
          <span className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{String(minutes).padStart(2, '0')}</span>
          <span className="text-[9px] font-mono text-porcelain-300 uppercase">Mins</span>
        </div>
        <span className="text-porcelain-400 text-lg font-mono font-light">:</span>
        <div className="flex flex-col items-center px-1.5">
          <span className="text-xl sm:text-2xl font-bold font-mono text-porcelain-400 drop-shadow-[0_0_12px_rgba(56,176,248,0.9)]">{String(seconds).padStart(2, '0')}</span>
          <span className="text-[9px] font-mono text-porcelain-300 uppercase">Secs</span>
        </div>
      </div>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="relative py-16 sm:py-24 px-4 max-w-3xl mx-auto z-10 text-center select-none">
      <GlassCard className="relative overflow-hidden py-10 px-6 sm:px-12 border-porcelain-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-black/80 backdrop-blur-2xl">
        <div className="flex flex-col items-center justify-center">

          {/* 1. Heart Animation consisting of letters scrolling smoothly in heart shape */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto flex items-center justify-center my-2">
            {/* Central Pulsing Heart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-porcelain-300 fill-porcelain-400/40 animate-pulse drop-shadow-[0_0_30px_rgba(56,176,248,0.7)]" />
            </div>

            {/* SVG Heart Text-Path Scrolling Animation */}
            <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(56,176,248,0.6)]">
              <defs>
                <path
                  id="heartTextPath"
                  d="M 150,260 C 70,180 20,125 20,70 A 55,55 0 0,1 125,30 L 150,60 L 175,30 A 55,55 0 0,1 280,70 C 280,125 230,180 150,260 Z"
                />
              </defs>

              {/* Heart Guide Line */}
              <path
                d="M 150,260 C 70,180 20,125 20,70 A 55,55 0 0,1 125,30 L 150,60 L 175,30 A 55,55 0 0,1 280,70 C 280,125 230,180 150,260 Z"
                fill="none"
                stroke="rgba(56, 176, 248, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Scrolling Text along Heart Path */}
              <text fill="#ffffff" fontSize="13" fontWeight="700" letterSpacing="2.5" className="font-sans">
                <textPath href="#heartTextPath" startOffset="0%">
                  I lovee youuu 💕 I lovee youuu 💕 I lovee youuu 💕 I lovee youuu 💕 I lovee youuu 💕
                  <animate attributeName="startOffset" from="0%" to="100%" dur="12s" repeatCount="indefinite" />
                </textPath>
              </text>
            </svg>
          </div>

          {/* 2. Cute Exclamation Text */}
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl font-serif text-white tracking-wide text-center max-w-lg mx-auto my-6 font-normal leading-relaxed drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]"
          >
            NOOOO I'LL ALWAYSSSS LOVEEEEEE YOUUUUU BABYYYYYYYYYY 🤭💗💗
          </motion.h3>

          {/* 3. Small Attached Cat Meme Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group mt-2"
          >
            <img
              src="/cat-meme.jpg"
              alt="Cute Crying Cat Heart Meme"
              className="w-48 sm:w-56 rounded-2xl border border-porcelain-400/50 shadow-[0_0_35px_rgba(56,176,248,0.5)] hover:scale-105 transition-transform duration-500 mx-auto"
            />
          </motion.div>

          {/* 4. Live Love Stopwatch Counter starting from 589 days, 00 hours, 12 mins */}
          <LoveStopwatch />

        </div>
      </GlassCard>
    </footer>
  );
}
