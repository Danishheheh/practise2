import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import WordGlowText from './WordGlowText';

export default function QuoteSection() {
  return (
    <section className="relative py-28 sm:py-40 px-4 max-w-4xl mx-auto z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="glass-card rounded-3xl p-10 sm:p-16 relative overflow-hidden"
      >
        {/* Background glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-porcelain-500/10 rounded-full blur-3xl pointer-events-none" />

        <Quote className="w-12 h-12 text-porcelain-400/40 mx-auto mb-6 rotate-180" />

        <WordGlowText
          text="In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          className="text-2xl sm:text-4xl sm:leading-snug font-serif font-normal justify-center text-center max-w-2xl mx-auto"
        />

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-porcelain-400/40" />
          <span className="text-xs uppercase tracking-[0.25em] text-porcelain-300 font-mono">
            Mwaahhhhhhhhhhhhhhh 💋💋💋
          </span>
          <div className="w-8 h-[1px] bg-porcelain-400/40" />
        </div>
      </motion.div>
    </section>
  );
}
