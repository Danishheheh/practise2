import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, PartyPopper } from 'lucide-react';
import GlassCard from './GlassCard';

const NO_HINTS = [
  "Nice try! 😜",
  "Nope, try again! 💖",
  "Button escaped! 😂",
  "Only YES allowed! 💕",
  "Too slow! 🚀",
  "You can't catch me! 🙈",
  "Forbidden button! 🔒"
];

const CELEBRATION_IMAGES = [
  { id: 1, src: '/yes-img2.jpg' },
  { id: 2, src: '/yes-img3.jpg' },
  { id: 3, src: '/yes-img4.jpg' },
  { id: 4, src: '/yes-img5.jpg' }
];

export default function ProposalSection() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noHintIndex, setNoHintIndex] = useState(0);
  const [hasSaidYes, setHasSaidYes] = useState(false);

  // Evasive "No" button dodge logic with strict bounds so it stays within visible view
  const dodgeNoButton = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const randomAngle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 70;
    const nextX = Math.cos(randomAngle) * distance;
    const nextY = Math.sin(randomAngle) * distance;

    // Strictly bounded to prevent button from hiding below container
    const clampedX = Math.max(-100, Math.min(100, nextX));
    const clampedY = Math.max(-45, Math.min(45, nextY));

    setNoPos({ x: clampedX, y: clampedY });
    setNoHintIndex((prev) => (prev + 1) % NO_HINTS.length);
  };

  return (
    <section className="relative py-24 sm:py-36 px-4 max-w-5xl mx-auto z-10 text-center">
      <GlassCard className="relative overflow-hidden py-12 px-6 sm:px-12 border-porcelain-400/40 min-h-[520px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <AnimatePresence mode="wait">
          {!hasSaidYes ? (
            /* Proposal Card View */
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              {/* Floating Heart Icon */}
              <div className="w-16 h-16 rounded-full glass-input flex items-center justify-center text-porcelain-300 mb-6 shadow-[0_0_30px_rgba(56,176,248,0.3)]">
                <Heart className="w-8 h-8 text-porcelain-300 fill-porcelain-400/30 animate-pulse" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-porcelain-300 bg-porcelain-500/10 px-4 py-1.5 rounded-full border border-porcelain-400/20 mb-4">
                The Big Question
              </span>

              {/* Main Proposal Title */}
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-wide mb-3 leading-tight">
                Wanna marry me?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto mb-6 leading-relaxed">
                dhyan se sochke answer karna warna pata haina aapka kya haal hoga imao hehehe
              </p>

              {/* First Image (Cat with Rose in Mouth) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-48 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden border border-porcelain-400/30 shadow-[0_0_30px_rgba(56,176,248,0.3)] mb-8 bg-black/60 group"
              >
                <img
                  src="/prop-img1.jpg"
                  alt="Cat with Rose in mouth"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              {/* Buttons Container */}
              <div className="relative min-h-[120px] w-full max-w-md flex items-center justify-center gap-6 overflow-visible">
                {/* YES Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, boxShadow: "0 0 35px rgba(56, 176, 248, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setHasSaidYes(true)}
                  className="px-10 py-4 text-base font-medium text-white bg-gradient-to-r from-porcelain-500 to-blue-600 rounded-full shadow-[0_0_25px_rgba(56,176,248,0.4)] border border-porcelain-300/40 transition-all duration-300 flex items-center gap-2 cursor-pointer z-20"
                >
                  <Sparkles className="w-5 h-5 text-white animate-spin" />
                  <span>YES! 💗💗</span>
                </motion.button>

                {/* Evasive NO Button (Strictly bounded) */}
                <motion.button
                  type="button"
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  onMouseEnter={dodgeNoButton}
                  onPointerOver={dodgeNoButton}
                  onTouchStart={dodgeNoButton}
                  onClick={dodgeNoButton}
                  className="px-8 py-3.5 text-sm font-medium text-slate-300 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full transition-colors cursor-pointer select-none z-10"
                >
                  {noPos.x !== 0 ? NO_HINTS[noHintIndex] : "No 😜"}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* YES Celebration View */
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="flex flex-col items-center text-center py-4 w-full"
            >
              {/* Confetti Header */}
              <div className="w-20 h-20 rounded-full bg-porcelain-500/20 border border-porcelain-400/40 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(56,176,248,0.5)]">
                <PartyPopper className="w-10 h-10 text-porcelain-300 animate-bounce" />
              </div>

              {/* Cute Celebration Heading */}
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-4 tracking-wide">
                i knew youd click on yess heheh! 🤭💗💗💗💕✨
              </h2>

              <p className="text-sm sm:text-base text-porcelain-200 font-light max-w-xl mx-auto mb-8 leading-relaxed">
                You just made me the happiest person in the entire world! Luckyyy to haveee youuuu heheh youu the god giftedd
              </p>

              {/* 4 Celebration Pictures Side-by-Side (NO text captions below images) */}
              <div className="w-full max-w-4xl mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {CELEBRATION_IMAGES.map((img) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: img.id * 0.1 }}
                      className="glass-card rounded-2xl p-2 border border-porcelain-400/30 hover:border-porcelain-300 transition-all duration-300 group shadow-lg"
                    >
                      {/* Image Only - No captions below */}
                      <div className="relative aspect-square rounded-xl overflow-hidden bg-black/60">
                        <img
                          src={img.src}
                          alt="Celebration photo"
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      setHasSaidYes(false);
                      setNoPos({ x: 0, y: 0 });
                    }}
                    className="text-xs text-porcelain-400 hover:text-white transition-colors underline underline-offset-4 font-mono"
                  >
                    Ask me again!
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </section>
  );
}
