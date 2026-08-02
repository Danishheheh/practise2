import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Sparkles, Heart, Upload } from 'lucide-react';

export default function MemeCard({
  initialSrc = null,
  title = "Our Favorite Moment",
  caption = "A memory that still makes me smile every single time.",
  tag = "Meme & Memory #01"
}) {
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImgSrc(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY
      }}
      className="relative glass-card rounded-3xl p-6 sm:p-8 animate-float cursor-pointer group border border-white/10 hover:border-porcelain-400/40 transition-all duration-500 shadow-2xl"
    >
      {/* Top Tag & Sparkle Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-porcelain-300 bg-porcelain-500/10 px-3 py-1 rounded-full border border-porcelain-400/20">
          {tag}
        </span>
        <Heart className="w-4 h-4 text-porcelain-400 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/10 mb-5 flex items-center justify-center group/img">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 text-slate-400">
            {/* Aesthetic SVG Placeholder */}
            <div className="w-16 h-16 rounded-2xl bg-porcelain-500/10 border border-porcelain-400/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8 text-porcelain-300" />
            </div>
            <p className="text-xs font-medium tracking-wide text-slate-300 mb-1">
              Add Your Photo / Meme Here
            </p>
            <p className="text-[10px] text-slate-500">
              Click to replace with your favorite picture
            </p>
          </div>
        )}

        {/* Upload Overlay */}
        <label className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 cursor-pointer">
          <Upload className="w-6 h-6 text-porcelain-300" />
          <span className="text-xs font-medium text-white">Click to Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Soft Blue Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-porcelain-500/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {/* Title & Caption */}
      <h3 className="text-xl font-serif text-white mb-1.5 group-hover:text-porcelain-200 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed font-sans">
        {caption}
      </p>
    </motion.div>
  );
}
