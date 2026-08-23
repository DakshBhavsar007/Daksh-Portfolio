import React, { useState, useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowUpRight, Camera, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioConfig, roles } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('daksh_hero_portrait') || portfolioConfig.personal.heroPortrait;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setHeroImage(base64);
        try {
          localStorage.setItem('daksh_hero_portrait', base64);
        } catch {
          // Ignore localstorage quota if image is very large
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('daksh_hero_portrait');
    setHeroImage(portfolioConfig.personal.heroPortrait);
  };

  const currentRole = roles[currentRoleIndex];
  const lastSpaceIndex = currentRole.lastIndexOf(' ');
  const prefix = lastSpaceIndex !== -1 ? currentRole.slice(0, lastSpaceIndex) : currentRole;
  const suffix = lastSpaceIndex !== -1 ? currentRole.slice(lastSpaceIndex + 1) : '';

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        
        {/* Left 8 Cols: Giant Headline & Info Blocks */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-6 w-fit interactive-pill cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{portfolioConfig.personal.availability}</span>
          </div>

          {/* Massive Display Title with Italic Serif Accent & Dynamic Transition */}
          <div className="mb-8 select-none group cursor-default">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[72px] sm:text-[108px] md:text-[132px] lg:text-[144px] xl:text-[156px] leading-[0.82] font-light tracking-tighter uppercase text-[#111111] interactive-heading group-hover:tracking-tight transition-all duration-500"
              >
                {prefix}<br />
                <span className="ml-10 sm:ml-20 lg:ml-24 italic font-serif font-normal lowercase tracking-normal text-[#111111] inline-block transition-transform duration-500 group-hover:translate-x-2">
                  {suffix}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Two-column sub-hero area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 lg:gap-12 mt-4 sm:mt-8">
            {/* Bio & Micro Stats */}
            <div className="max-w-[340px]">
              <p className="text-[#666666] text-sm leading-relaxed font-normal hover:text-[#222222] transition-colors duration-300">
                {portfolioConfig.personal.shortBio}
              </p>
              
              <div className="flex items-center gap-5 mt-6 pt-4 border-t border-[#E5E5E5]">
                <div className="flex flex-col interactive-stat cursor-default group">
                  <span className="text-[24px] sm:text-[28px] font-light tracking-tight text-[#111111] stat-num transition-all duration-300 group-hover:text-black">04+</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A] group-hover:text-[#111111] transition-colors">Live Platforms</span>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E5E5]"></div>
                <div className="flex flex-col interactive-stat cursor-default group">
                  <span className="text-[24px] sm:text-[28px] font-light tracking-tight text-[#111111] stat-num transition-all duration-300 group-hover:text-black">8.28</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A] group-hover:text-[#111111] transition-colors">CGPA (Sem 5)</span>
                </div>
              </div>
            </div>

            {/* Action Tags & CTA Pills */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666] interactive-pill cursor-default hover:text-[#111111] hover:bg-[#EAEAEA]">
                  Python & Django
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666] interactive-pill cursor-default hover:text-[#111111] hover:bg-[#EAEAEA]">
                  FastAPI & Flask
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666] interactive-pill cursor-default hover:text-[#111111] hover:bg-[#EAEAEA]">
                  React & Node.js
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666] interactive-pill cursor-default hover:text-[#111111] hover:bg-[#EAEAEA]">
                  AI & LLM Systems
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onExploreWork}
                  className="px-6 py-3 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#2A2A2A] hover:scale-103 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  id="hero-explore-btn"
                >
                  <span>Explore Work</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-full border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:bg-[#F5F5F3] hover:border-[#111111] hover:scale-103 hover:shadow-sm transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                  id="hero-contact-btn"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Framed Editorial Portrait with Floating Badge & Custom Upload Support */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
            {/* Hidden file input for photo updates */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
              aria-label="Upload custom portrait photo"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] bg-[#0E0E0E] rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-[0_16px_40px_rgba(0,0,0,0.12)] relative cursor-pointer group"
              title="Click to update or swap portrait image"
            >
              <img
                src={heroImage}
                alt="Daksh Bhavsar - Full-Stack Developer | AI Enthusiast"
                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if local image not found yet
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
                }}
              />

              {/* Subtle hover gradient depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

              {/* Top-Right Change Photo Floating Action Pill */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-20">
                <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:bg-black/90">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Update Photo</span>
                </div>
              </div>
            </div>

            {/* Floating Award / Status Badge */}
            <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-white border border-[#E5E5E5] rounded-xl p-3.5 flex flex-col justify-between shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">LJ University</span>
              <span className="text-[26px] font-light tracking-tighter text-[#111111]">B.E.</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600">Comp. Eng.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Aesthetic Background Typography Watermark */}
      <div className="absolute top-1/2 -right-12 -translate-y-1/2 text-[260px] sm:text-[360px] lg:text-[420px] font-black text-[#F5F5F3]/80 -z-10 select-none pointer-events-none tracking-tighter leading-none">
        DB
      </div>
    </section>
  );
};
