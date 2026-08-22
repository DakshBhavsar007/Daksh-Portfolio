import React, { useState } from 'react';
import { experiences } from '../data/portfolioData';
import { ChevronDown, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('exp-between'); // Default expand the primary platform milestone

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="journey"
      className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-t border-[#E5E5E5] relative overflow-hidden scroll-mt-20"
    >
      <div id="experience" className="hidden" aria-hidden="true"></div>
      {/* Background Layer 1: Giant Architectural Watermark (High Visibility & Legibility) */}
      <div
        className="absolute -top-6 right-0 sm:right-6 pointer-events-none select-none text-[#E8E8E5] z-0"
        aria-hidden="true"
      >
        <span className="text-[100px] sm:text-[160px] lg:text-[210px] font-bold tracking-tighter uppercase leading-none block font-mono">
          TIMELINE
        </span>
      </div>

      {/* Background Layer 2: Floating Career Span Coordinates (Legible Accent) */}
      <div
        className="absolute bottom-6 left-6 pointer-events-none select-none text-[#E5E5E2] z-0 hidden md:block"
        aria-hidden="true"
      >
        <span className="text-[64px] sm:text-[90px] font-serif italic leading-none block">
          2024 — 2028
        </span>
      </div>

      {/* Category Pill & Career Epoch Header */}
      <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
            Career & Trajectory
          </span>
          <span className="text-[#CCCCCC] text-[12px]">•</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#111111] bg-[#F5F5F3] px-2.5 py-0.5 rounded-full border border-[#E5E5E5]">
            {experiences.length} Milestones
          </span>
        </div>
      </div>

      {/* Header Statement */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 lg:mb-18">
        <div className="lg:col-span-8">
          <h2 className="text-[36px] sm:text-[46px] md:text-[54px] font-light tracking-tighter uppercase text-[#111111] leading-[0.95]">
            A Yearly snapshot of my <span className="font-serif italic lowercase font-normal">engineering</span> growth.
          </h2>
        </div>
        <div className="lg:col-span-4 pt-2">
          <p className="text-[14px] sm:text-[15px] text-[#555555] leading-relaxed font-normal">
            A chronological summary of engineering milestones, academic tenure at LJ University, and live platform releases.
          </p>
        </div>
      </div>

      {/* Full Width Editorial Timeline Rows */}
      <div className="relative z-10 border-t border-[#E5E5E5]">
        {experiences.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const sequenceNumber = `0${index + 1}`.slice(-2);

          return (
            <div
              key={item.id}
              id={item.id}
              onMouseEnter={() => setExpandedId(item.id)}
              onMouseLeave={() => setExpandedId(null)}
              className={`relative border-b border-[#E5E5E5] transition-all duration-300 ${
                isExpanded ? 'bg-[#FAFAFA]/95 shadow-xs' : 'hover:bg-[#FAFAFA]/90'
              }`}
            >
              <div
                onClick={() => toggleExpand(item.id)}
                className="py-8 sm:py-10 px-4 sm:px-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group select-none"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleExpand(item.id);
                  }
                }}
              >
                {/* Left Role & Company with Sequence Badge & Description */}
                <div className="max-w-2xl flex items-start gap-4 sm:gap-6">
                  {/* Sequence Index */}
                  <span className={`text-[12px] sm:text-[13px] font-mono font-bold transition-colors pt-1 ${
                    isExpanded ? 'text-[#111111]' : 'text-[#8A8A8A] group-hover:text-[#111111]'
                  }`}>
                    {sequenceNumber}
                  </span>

                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-[#111111] group-hover:text-black">
                        {item.role} <span className="font-serif italic font-normal text-[#555555] text-[18px] sm:text-[22px]">at</span> {item.company}
                      </h3>
                    </div>
                    <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Year Range with Giant Clean Typography */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[240px] pl-8 sm:pl-0">
                  <span className={`text-[28px] sm:text-[36px] lg:text-[44px] font-light tracking-tighter text-[#111111] whitespace-nowrap transition-transform duration-300 ${
                    isExpanded ? 'translate-x-0.5' : 'group-hover:translate-x-0.5'
                  }`}>
                    {item.period}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#555555] transition-all duration-300 ${
                    isExpanded ? 'rotate-180 bg-[#111111] text-white border-[#111111]' : 'group-hover:border-[#111111] group-hover:text-[#111111]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Expandable Key Highlights & Details */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-8 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] grid grid-cols-1 md:grid-cols-12 gap-6 shadow-xs">
                    <div className="md:col-span-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#777777] mb-3">
                        Key Milestones & Contributions
                      </h4>
                      <ul className="space-y-2.5">
                        {item.highlights?.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#222222]">
                            <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E5E5E5] pt-4 md:pt-0 md:pl-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#777777] mb-3">
                        Skills & Methods
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills?.map((s, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5]/80 text-[10px] font-bold uppercase tracking-wider text-[#333333]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {item.location && (
                        <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-[#666666]">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};


