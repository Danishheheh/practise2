import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart, Star } from 'lucide-react';
import GlassCard from './GlassCard';
import WordGlowText from './WordGlowText';

const TIMELINE_EVENTS = [
  {
    chapter: "Chapter I",
    date: "The First Moment",
    title: "Where Our Story Began",
    description: "It started with a simple glance that somehow felt like remembering a song I had known all my life. Every word we shared built a quiet world that only belonged to us.",
    icon: Sparkles
  },
  {
    chapter: "Chapter II",
    date: "Unforgettable Days",
    title: "Laughter in the Rain",
    description: "Through long conversations and late night talks, time seemed to slow down. You became my favorite destination and my safest sanctuary.",
    icon: Heart
  },
  {
    chapter: "Chapter III",
    date: "A Lifetime Promise",
    title: "Blossoming Together",
    description: "Like delicate porcelain lilies crafted to last forever, our love grows richer with each passing season. You are my favorite story and my sweetest miracle.",
    icon: Star
  }
];

export default function MemoryTimeline() {
  return (
    <section className="relative py-24 sm:py-36 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-porcelain-300 bg-porcelain-500/10 px-4 py-1.5 rounded-full border border-porcelain-400/20">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mt-4 font-normal tracking-wide">
          Timeline of Us
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mt-3 font-light">
          Milestones carved in porcelain, blooming forever across time.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative border-l border-white/10 sm:mx-auto ml-4 sm:ml-auto">
        {TIMELINE_EVENTS.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative pl-8 sm:pl-12 pb-16 last:pb-0"
            >
              {/* Glowing Node Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-black border border-porcelain-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(56,176,248,0.5)] z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-porcelain-300 animate-pulse" />
              </div>

              {/* Event Glass Card */}
              <GlassCard className="max-w-2xl">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono tracking-widest text-porcelain-300 uppercase">
                    {item.chapter}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-porcelain-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif text-white mb-3">
                  {item.title}
                </h3>

                {/* Word Glow Text Reading Animation */}
                <WordGlowText
                  text={item.description}
                  className="text-sm sm:text-base font-light leading-relaxed"
                />
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
