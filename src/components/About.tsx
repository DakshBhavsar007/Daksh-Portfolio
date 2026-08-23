import React from 'react';
import { Play } from 'lucide-react';
import { portfolioConfig, statistics } from '../data/portfolioData';

interface AboutProps {
  onOpenVideo: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenVideo }) => {
  return (
    <section id="about" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 scroll-mt-20">
      {/* Category Pill */}
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] interactive-pill px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5] inline-block cursor-default">
          About / Summary
        </span>
      </div>

      {/* Two Column Statement Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 lg:mb-16 group">
        <div className="lg:col-span-8">
          <h2 className="text-[36px] sm:text-[48px] md:text-[58px] font-light tracking-tighter uppercase text-[#111111] leading-[0.95] interactive-heading cursor-default">
            Engineering scalable platforms with <span className="font-serif italic lowercase font-normal transition-transform duration-300 group-hover:scale-105 inline-block">full-stack</span> depth & <span className="font-bold">AI integration</span>.
          </h2>
        </div>
        <div className="lg:col-span-4 pt-2">
          <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed font-normal hover:text-[#111111] transition-colors duration-300">
            Creator of Between, an AI-powered recruitment and resume platform, alongside SevaSetu, StudyVerse, and TestVerse — showcasing expertise in multi-provider LLM systems, cloud deployment, and scalable system design.
          </p>
        </div>
      </div>

      {/* Media & Large Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Large Media Card with Interactive Video Play Trigger */}
        <div className="lg:col-span-8">
          <div
            onClick={onOpenVideo}
            className="relative aspect-[16/9] sm:aspect-[16/8.5] rounded-2xl overflow-hidden bg-[#F5F5F3] group cursor-pointer border border-[#E5E5E5] shadow-xs interactive-card hover:border-[#CCCCCC]"
            role="button"
            tabIndex={0}
            aria-label="Play design process showreel"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenVideo();
              }
            }}
          >
            <img
              src={portfolioConfig.personal.aboutHeroImage}
              alt="Platform Architecture & Engineering Demos"
              className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

            {/* Centered Play Trigger Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#111111] flex items-center justify-center transition-all duration-500 group-hover:scale-115 group-hover:shadow-2xl shadow-xl">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#111111] translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-[#111111]/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white shadow-xs flex items-center gap-2 group-hover:bg-black transition-colors">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>Watch Platform Architecture Demos</span>
            </div>
          </div>
        </div>

        {/* Big Statistics Column matching reference */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-10 sm:space-y-14 pl-0 lg:pl-6">
          {statistics.map((stat, idx) => (
            <div key={idx} className="border-t border-[#E5E5E5] pt-6 first:border-t-0 first:pt-0 interactive-stat cursor-default group">
              <div className="text-[58px] sm:text-[72px] lg:text-[80px] font-light tracking-tighter text-[#111111] leading-none mb-2 stat-num transition-all duration-300 group-hover:text-black">
                {stat.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#111111] mb-1 group-hover:text-black transition-colors">
                {stat.label}
              </div>
              <p className="text-[13px] text-[#8A8A8A] leading-normal max-w-[280px] group-hover:text-[#444444] transition-colors">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
