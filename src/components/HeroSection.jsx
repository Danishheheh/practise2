import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 py-16 z-10 select-none">
      {/* Top Tagline Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-input text-xs text-porcelain-200 tracking-widest uppercase border border-white/10"
      >
        <Sparkles className="w-3.5 h-3.5 text-porcelain-400 animate-pulse" />
        <span>Ellloooooooooo Babbbyyyyyyyyyyyyyyy</span>
        <Heart className="w-3.5 h-3.5 text-porcelain-400 fill-porcelain-400/20" />
      </motion.div>

      {/* Hero Central Title - Minimal & Non-blocking so lilies shine through */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl my-auto py-12"
      >
        <h1 className="text-4xl sm:text-7xl font-serif text-white tracking-tight font-normal leading-[1.15] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          Amnaaawwwwwwwwwwwww <br />
          <span className="italic font-light text-porcelain-200 drop-shadow-[0_0_30px_rgba(56,176,248,0.3)]">
            Jeeeeeeeeeeeeeee
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light tracking-wide max-w-lg mx-auto leading-relaxed">
          prettyyyy lameeee of meee butt whateverrr ehehhe 🤭
        </p>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] font-mono">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-porcelain-300" />
        </motion.div>
      </motion.div>
    </section>
  );
}
