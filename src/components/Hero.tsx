import React, { useState, useEffect } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioConfig, roles } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenContact }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{portfolioConfig.personal.availability}</span>
          </div>

          {/* Massive Display Title with Italic Serif Accent & Dynamic Transition */}
          <div className="mb-8 select-none">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[72px] sm:text-[108px] md:text-[132px] lg:text-[144px] xl:text-[156px] leading-[0.82] font-light tracking-tighter uppercase text-[#111111]"
              >
                {prefix}<br />
                <span className="ml-10 sm:ml-20 lg:ml-24 italic font-serif font-normal lowercase tracking-normal text-[#111111] inline-block">
                  {suffix}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Two-column sub-hero area */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8 lg:gap-12 mt-4 sm:mt-8">
            {/* Bio & Micro Stats */}
            <div className="max-w-[340px]">
              <p className="text-[#666666] text-sm leading-relaxed font-normal">
                {portfolioConfig.personal.shortBio}
              </p>
              
              <div className="flex items-center gap-5 mt-6 pt-4 border-t border-[#E5E5E5]">
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-light tracking-tight text-[#111111]">04+</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A]">Live Platforms</span>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E5E5]"></div>
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-light tracking-tight text-[#111111]">8.28</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A]">CGPA (Sem 5)</span>
                </div>
              </div>
            </div>

            {/* Action Tags & CTA Pills */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                  Python & Django
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                  FastAPI & Flask
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                  React & Node.js
                </span>
                <span className="px-4 py-1.5 bg-[#F5F5F3] border border-[#E5E5E5]/60 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                  AI & LLM Systems
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={onExploreWork}
                  className="px-6 py-3 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#2A2A2A] transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
                  id="hero-explore-btn"
                >
                  <span>Explore Work</span>
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3 rounded-full border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:bg-[#F5F5F3] hover:border-[#CCCCCC] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
                  id="hero-contact-btn"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Framed Editorial Portrait with Floating Badge */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center pt-4 lg:pt-0">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
            <div className="aspect-[3/4] bg-[#F5F5F3] rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-[0_12px_36px_rgba(0,0,0,0.06)]">
              <img
                src={portfolioConfig.personal.heroPortrait}
                alt="Daksh Bhavsar - Full-Stack Developer | AI Enthusiast"
                className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700"
                loading="eager"
              />
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
