import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BrandOrb } from './BrandOrb';

interface TechItem {
  name: string;
  mode: string;
  concept: string;
}

const coreEcosystemOrbs: TechItem[] = [
  { name: "Gemini AI", mode: "gemini", concept: "LLM Orchestration" },
  { name: "React 19", mode: "react", concept: "Frontend Architecture" },
  { name: "Claude API", mode: "claude", concept: "AI Fallback" },
  { name: "OpenAI", mode: "openai", concept: "Reasoning Systems" },
  { name: "GitHub", mode: "github", concept: "CI/CD & DevOps" },
  { name: "LinkedIn", mode: "linkedin", concept: "Network & Reach" }
];

export const LogoStrip: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-7 border-y border-[#E5E5E5] bg-[#FAF9F5]">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left: Section label & Live Animated Brand Orbs */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E5E5E5] shrink-0 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#111111]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">
              Core Tech Orbs
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {coreEcosystemOrbs.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E5E5] hover:border-[#111111] hover:shadow-xs transition-all duration-300 group cursor-default select-none shadow-2xs"
                title={`${tech.name} — ${tech.concept}`}
              >
                <BrandOrb mode={tech.mode} size={22} />
                <span className="text-xs font-bold text-[#111111] tracking-tight group-hover:text-black">
                  {tech.name}
                </span>
                <span className="hidden sm:inline text-[9px] font-medium text-[#777777] uppercase tracking-wider bg-[#F5F5F3] px-1.5 py-0.2 rounded-full">
                  {tech.concept}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Featured next highlight link */}
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('projects') || document.getElementById('portfolio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group flex flex-col items-start lg:items-end cursor-pointer shrink-0 pt-1 lg:pt-0"
        >
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#8A8A8A] group-hover:text-[#111111] transition-colors">
            Featured Platform
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:translate-x-0.5 transition-transform">
            <span className="group-hover:underline underline-offset-4">Between AI Platform</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
          </div>
        </a>

      </div>
    </section>
  );
};

