import React, { useState, useEffect, useRef } from 'react';

export default function WordGlowText({
  text,
  className = '',
  autoPlay = true,
  speed = 180, // ms per word
  onWordGlowProgress = null
}) {
  const containerRef = useRef(null);
  const words = text.split(' ');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to detect when section comes into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic + Scroll-guided word illumination loop
  useEffect(() => {
    if (!isInView || !autoPlay) return;

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => {
        if (prev < words.length) {
          const next = prev + 1;
          if (onWordGlowProgress) {
            onWordGlowProgress(next / words.length);
          }
          return next;
        }
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, autoPlay, speed, words.length]);

  // Also update progress on scroll position inside component
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the element is scrolled
      const progress = Math.max(0, Math.min(1, (windowHeight * 0.8 - rect.top) / (rect.height + windowHeight * 0.4)));
      const scrollIndex = Math.floor(progress * words.length);
      
      setActiveWordIndex((prev) => {
        const newIdx = Math.max(prev, scrollIndex);
        if (onWordGlowProgress) {
          onWordGlowProgress(newIdx / words.length);
        }
        return newIdx;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <p ref={containerRef} className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] leading-relaxed ${className}`}>
      {words.map((word, idx) => {
        const isGlowing = idx < activeWordIndex;
        return (
          <span
            key={idx}
            className={`inline-block transition-all duration-300 select-none ${
              isGlowing
                ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] drop-shadow-[0_0_25px_rgba(56,176,248,0.5)] opacity-100 font-normal'
                : 'text-white/25 opacity-40 font-light'
            }`}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
