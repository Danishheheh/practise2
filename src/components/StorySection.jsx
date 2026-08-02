import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';

// 10 text segments mapped to 10 uploaded meme images in /memes/
const STORY_SEGMENTS = [
  {
    id: 1,
    text: "elllllllooooooooooooooooooo babyyyyyyyyyyyyyyyyyy jeeeeeeeeeee 💋💋💋💗💗💗💗💗 ",
    img: "/memes/meme-1.jpg"
  },
  {
    id: 2,
    text: "I LOVEEEEEEEE YOUUUUUUUU SOOO MUCHHHHHHH AMNAA JEEEEEEE ",
    img: "/memes/meme-2.jpg"
  },
  {
    id: 3,
    text: ", aap sabse pyaare hoooo🤭💗💗💗 aapke jitna koiii bhiii kubsurat nhiii haiii myyyy loveeeee💗💗💗 aapki awaaz bohott pyaari haiii ",
    img: "/memes/meme-3.jpg"
  },
  {
    id: 4,
    text: "🤭💗💗💗💗💗💗 itni pyaari me 24/7 sunna chahunga hehehehe and jantyyy hooo jab bhi aapke pictures milty haii dil karta ne screen lick karduu🤭💗💗💗 ",
    img: "/memes/meme-4.jpg"
  },
  {
    id: 5,
    text: ". Aap sabse cuteeeweeeeeeeeeiiiiiii hoooooo🤭💗💗💗",
    img: "/memes/meme-5.jpg"
  },
  {
    id: 6,
    text: "ik hamare beech arguments horhi hai bohot saari but i dont care about them,jo hona chahiye tha woh hogaya, they gonneeeeeee ehehehehehehehehe🤭💗💗💗 ",
    img: "/memes/meme-6.jpg"
  },
  {
    id: 7,
    text: "but srly i wanna marrryyy youuuuu senoritaaaa🤭💗💗 ",
    img: "/memes/meme-7.jpg"
  },
  {
    id: 8,
    text: "aapke ankheinn bhott pyaari haiii🤭💗💗💗 ",
    img: "/memes/meme-8.jpg"
  },
  {
    id: 9,
    text: "yeh dekho screen ke right me, pixelated one🤭💗💗💗 perfect face you have and aapke lipss,eyebrows,skin, ears and pretyyy hands heheheh and the bodyyy bhiii,🤭💗💗💗 ",
    img: "/memes/meme-9.jpg"
  },
  {
    id: 10,
    text: "not like in the bad way i really lovee all those little chubby belly of yoursss🤭💗💗💗 and snowwyyyy blowwyyyy toh exception nhiiii and izaaan and afaan ko bhii lane haiii🤭💗💗💗 isi bahane mere hath khahin idar udar slip hojayengee hehehe and kuch Zaida slip hogaye toh aap kahin maaro nhiii imaooo and i really loveee your character and your softtt gigglesss🤭💗💗💗and i'll be looking forward to seeee youuuuu🤭💗💗💗 mwahhhhhhhhhhhhh mwahhhhhhhhhhhh🤭💗💗💗",
    img: "/memes/meme-10.jpg"
  }
];

export default function StorySection() {
  const containerRef = useRef(null);
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [activeWordCount, setActiveWordCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Flatten words with segment mapping
  const allWords = [];
  STORY_SEGMENTS.forEach((seg, sIdx) => {
    const words = seg.text.trim().split(/\s+/);
    words.forEach((word) => {
      allWords.push({ word, segmentIndex: sIdx });
    });
  });

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pure word-by-word glow animation
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveWordCount((prev) => {
        if (prev < allWords.length) {
          const next = prev + 1;
          const currentWordObj = allWords[Math.min(next - 1, allWords.length - 1)];
          if (currentWordObj) {
            setActiveSegmentIndex(currentWordObj.segmentIndex);
          }
          return next;
        }
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isInView, allWords.length]);

  const currentSegment = STORY_SEGMENTS[activeSegmentIndex] || STORY_SEGMENTS[0];

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 px-4 max-w-6xl mx-auto z-10 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Story Text Reader Column (No extra header badges/titles) */}
        <div className="lg:col-span-7">
          <GlassCard className="h-full flex flex-col justify-center p-8 sm:p-12">
            {/* Word Glow Paragraph Only */}
            <div className="flex flex-wrap gap-x-[0.35em] gap-y-[0.25em] text-base sm:text-lg leading-relaxed font-sans">
              {allWords.map((item, idx) => {
                const isGlowing = idx < activeWordCount;
                const isCurrentSegment = item.segmentIndex === activeSegmentIndex;

                return (
                  <span
                    key={idx}
                    className={`inline-block transition-all duration-300 ${
                      isGlowing
                        ? isCurrentSegment
                          ? 'text-white font-medium drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] drop-shadow-[0_0_25px_rgba(56,176,248,0.7)] scale-105'
                          : 'text-white/90 font-normal drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                        : 'text-white/20 font-light opacity-30'
                    }`}
                  >
                    {item.word}
                  </span>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Dynamic Synchronized Meme Component Column (Images ONLY) */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSegmentIndex}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -15 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative glass-card rounded-3xl p-4 sm:p-5 border border-porcelain-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-float"
            >
              {/* Image Box Only (No headers, quotes, or captions) */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/70 border border-white/10 flex items-center justify-center">
                <img
                  src={currentSegment.img}
                  alt={`Meme ${activeSegmentIndex + 1}`}
                  onError={(e) => {
                    e.currentTarget.src = "/prop-img1.jpg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
