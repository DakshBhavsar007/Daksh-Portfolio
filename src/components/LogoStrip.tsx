import React from 'react';
import { ArrowRight } from 'lucide-react';
import { clientLogos } from '../data/portfolioData';

export const LogoStrip: React.FC = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8 border-y border-[#E5E5E5]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left: Section label & Brand logos */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
            Core Ecosystem
          </span>
          
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {clientLogos.map((client, index) => (
              <span
                key={`${client.name}-${index}`}
                className={`text-sm sm:text-base font-bold tracking-tighter uppercase text-[#111111] opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default select-none ${
                  index % 2 === 0 ? 'italic font-serif' : 'font-sans'
                }`}
              >
                {client.name}
              </span>
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
          className="group flex flex-col items-start md:items-end cursor-pointer pt-2 md:pt-0"
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
