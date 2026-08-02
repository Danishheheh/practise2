import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import MemeCard from './MemeCard';
import WordGlowText from './WordGlowText';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function ContentSection({
  tag = "Story Section",
  title = "A Special Reflection",
  paragraphs = [],
  imageTitle = "Captured Moment",
  imageCaption = "A memory preserved forever",
  imageTag = "Memory #01",
  reverseLayout = false
}) {
  return (
    <section className="relative py-20 sm:py-32 px-4 max-w-6xl mx-auto z-10">
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
        reverseLayout ? 'lg:flex-row-reverse' : ''
      }`}>
        {/* Text Card Column */}
        <div className={`lg:col-span-7 ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
          <GlassCard className="h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-porcelain-300 bg-porcelain-500/10 px-3 py-1 rounded-full border border-porcelain-400/20">
                {tag}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-porcelain-400 opacity-70" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-6 font-medium tracking-wide">
              {title}
            </h2>

            <div className="space-y-4">
              {paragraphs.map((pText, i) => (
                <WordGlowText
                  key={i}
                  text={pText}
                  className="text-sm sm:text-base text-slate-300 font-light leading-relaxed"
                />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Meme / Image Card Column */}
        <div className={`lg:col-span-5 ${reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
          <MemeCard
            title={imageTitle}
            caption={imageCaption}
            tag={imageTag}
          />
        </div>
      </div>
    </section>
  );
}
