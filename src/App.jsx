import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

import PasscodeScreen from './components/PasscodeScreen';
import LilyCanvas from './components/LilyCanvas';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ProposalSection from './components/ProposalSection';
import FooterSection from './components/FooterSection';
import BackgroundAudio from './components/BackgroundAudio';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-porcelain-500/30">
      {/* Background Mood Music (WhatsApp Audio MPEG track) */}
      <BackgroundAudio isUnlocked={isUnlocked} />

      {/* iOS Keypad Passcode Screen */}
      <PasscodeScreen onSuccess={() => setIsUnlocked(true)} />

      {/* Ultra Smooth Porcelain Lily Background Canvas */}
      <LilyCanvas />

      {/* Main Content View */}
      <main className={`relative z-10 transition-opacity duration-1000 ${
        isUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Hero Section */}
        <HeroSection />

        {/* Story Reader Component with 13 Synchronized Picture Checkpoints */}
        <StorySection />

        {/* Proposal Section ("Wanna marry me?" + Image 1 + Side-by-side celebration grid) */}
        <ProposalSection />

        {/* Clean Heart Text Animation & Meme Footer */}
        <FooterSection />
      </main>
    </div>
  );
}
