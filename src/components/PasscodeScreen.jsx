import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, HelpCircle, Heart } from 'lucide-react';

const CORRECT_PASSCODE = '0211';

export default function PasscodeScreen({ onSuccess }) {
  const [digits, setDigits] = useState([]);
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleKeyPress = (num) => {
    if (error) setError(false);
    if (digits.length < 4) {
      const nextDigits = [...digits, num];
      setDigits(nextDigits);

      if (nextDigits.length === 4) {
        const fullCode = nextDigits.join('');
        if (fullCode === CORRECT_PASSCODE) {
          setIsUnlocked(true);
          setTimeout(() => {
            onSuccess();
          }, 800);
        } else {
          setError(true);
          setTimeout(() => {
            setDigits([]);
          }, 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    if (error) setError(false);
    setDigits((prev) => prev.slice(0, -1));
  };

  // Keyboard listener for desktop key presses
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [digits, isUnlocked, error]);

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(20px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-3xl px-4 select-none"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-500/10 rounded-full blur-[130px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`relative max-w-sm w-full glass-card p-8 sm:p-10 rounded-3xl text-center border ${
              error ? 'border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-white/10'
            }`}
          >
            {/* Top Pixelated Red Heart */}
            <div className="mx-auto w-12 h-12 mb-6 flex items-center justify-center">
              <motion.div
                animate={error ? { rotate: [-10, 10, -10, 10, 0] } : { scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: error ? 0 : Infinity, repeatDelay: 2 }}
              >
                <svg width="42" height="42" viewBox="0 0 16 16" fill="none" className="drop-shadow-[0_0_12px_rgba(255,45,85,0.7)]">
                  <path d="M2 5h2v2H2V5zm2-2h3v2H4V3zm3 2h2v2H7V5zm2-2h3v2H9V3zm3 2h2v2h-2V5zm-8 4h2v2H4V9zm2 2h4v2H6v-2zm4-2h2v2h-2V9z" fill="#ff2d55"/>
                </svg>
              </motion.div>
            </div>

            {/* 4 Passcode Indicator Dots */}
            <motion.div
              animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-4 mb-8"
            >
              {[0, 1, 2, 3].map((idx) => {
                const isFilled = digits.length > idx;
                return (
                  <motion.div
                    key={idx}
                    animate={isFilled ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      error
                        ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                        : isFilled
                        ? 'bg-red-500 shadow-[0_0_14px_rgba(255,45,85,0.8)]'
                        : 'bg-white/20 border border-white/20'
                    }`}
                  />
                );
              })}
            </motion.div>

            {/* Touch Keypad Grid (1-9, 0, Backspace) */}
            <div className="grid grid-cols-3 gap-4 max-w-[260px] mx-auto mb-6">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="w-16 h-16 rounded-full glass-input text-2xl font-light text-white hover:bg-white/20 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-md mx-auto"
                >
                  {num}
                </button>
              ))}

              {/* Empty placeholder */}
              <div />

              {/* Zero button */}
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="w-16 h-16 rounded-full glass-input text-2xl font-light text-white hover:bg-white/20 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-md mx-auto"
              >
                0
              </button>

              {/* Backspace button */}
              <button
                type="button"
                onClick={handleBackspace}
                className="w-16 h-16 rounded-full glass-input text-white hover:bg-white/20 active:scale-95 transition-all duration-200 flex items-center justify-center shadow-md mx-auto text-slate-300 hover:text-white"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            {/* Footer Hint */}
            <div className="mt-4 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-full hover:bg-white/5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-porcelain-400" />
                <span>{showHint ? 'Passcode: 0211' : 'uhmm someones bday month and year'}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
