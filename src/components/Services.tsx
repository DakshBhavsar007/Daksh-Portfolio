import React from 'react';
import { ArrowRight, ArrowUpRight, MousePointerClick } from 'lucide-react';
import { services } from '../data/portfolioData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenContact }) => {
  return (
    <section id="skills" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-[#E5E5E5] scroll-mt-20">
      <div id="services" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading, description & Action button */}
        <div className="lg:col-span-4 flex flex-col justify-between group">
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] interactive-pill px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5] inline-block cursor-default">
                Expertise & Capabilities
              </span>
            </div>
            <h2 className="text-[36px] sm:text-[44px] font-light tracking-tighter uppercase text-[#111111] leading-[0.95] mb-6 interactive-heading cursor-default">
              Comprehensive look at what I <span className="font-serif italic lowercase font-normal transition-transform duration-300 group-hover:scale-105 inline-block">offer</span> and <span className="font-bold">deliver</span>.
            </h2>
            <p className="text-[14px] text-[#666666] leading-relaxed mb-8 font-normal hover:text-[#111111] transition-colors duration-300">
              High-standard engineering across full-stack web architecture, multi-provider LLM integrations, real-time protocols, and scalable databases.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] hover:scale-103 hover:shadow-lg transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-2 group"
              id="services-cta-btn"
            >
              <span>Inquire for Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: 2x2 Editorial Cards Grid matching reference */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service) => {
            const isDark = service.isDark;

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`relative p-8 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[260px] group interactive-card ${
                  isDark
                    ? 'bg-[#111111] text-white shadow-lg hover:shadow-2xl hover:bg-[#181818] overflow-hidden'
                    : 'bg-white border border-[#E5E5E5] text-[#111111] hover:border-[#CCCCCC] hover:bg-[#FAFAFA] hover:shadow-xl'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectService(service);
                  }
                }}
              >
                {/* Decorative subtle background pattern for the Dark featured card */}
                {isDark && (
                  <div className="absolute right-0 bottom-0 w-48 h-48 opacity-15 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
                    <svg viewBox="0 0 200 200" className="w-full h-full stroke-white fill-none" strokeWidth="1.5">
                      <circle cx="100" cy="100" r="40" />
                      <circle cx="100" cy="100" r="70" />
                      <circle cx="100" cy="100" r="95" />
                    </svg>
                  </div>
                )}

                <div>
                  <h3 className={`text-[22px] sm:text-[24px] font-bold tracking-tight mb-3 transition-transform duration-300 group-hover:translate-x-1 ${
                    isDark ? 'text-white' : 'text-[#111111]'
                  }`}>
                    {service.title}
                  </h3>
                  <p className={`text-[13.5px] leading-relaxed font-normal transition-colors duration-300 ${
                    isDark ? 'text-white/80 group-hover:text-white' : 'text-[#666666] group-hover:text-[#222222]'
                  }`}>
                    {service.description}
                  </p>
                </div>

                {/* Bottom Row with Indicator and Arrow */}
                <div className="pt-6 flex items-center justify-between mt-auto">
                  {isDark ? (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs group-hover:bg-white/20 group-hover:text-white transition-all">
                      <MousePointerClick className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span>Featured Specialization</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] group-hover:text-[#111111] transition-colors">
                      View Deliverables →
                    </span>
                  )}

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    isDark
                      ? 'bg-white text-[#111111] group-hover:shadow-md'
                      : 'border border-[#E5E5E5] text-[#111111] group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
