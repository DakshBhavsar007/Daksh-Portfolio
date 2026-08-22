import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI & SaaS', 'Web Platform', 'Full-Stack'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeCategory) || p.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase()));

  return (
    <section id="projects" className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-[#E5E5E5] scroll-mt-20">
      <div id="portfolio" className="hidden" aria-hidden="true"></div>
      {/* Category Pill */}
      <div className="mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
          Selected Portfolio / Archive
        </span>
      </div>

      {/* Header Statement & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
        <div className="max-w-2xl">
          <h2 className="text-[36px] sm:text-[46px] md:text-[52px] font-light tracking-tighter uppercase text-[#111111] leading-[0.95] mb-4">
            Explore my archive of <span className="font-serif italic lowercase font-normal">production</span> platforms.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed font-normal">
            A curated index of production-grade platforms, multi-provider LLM integrations, and scalable full-stack applications.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-[#F5F5F3] text-[#666666] hover:text-[#111111] hover:bg-[#EAEAEA] border border-[#E5E5E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Responsive Grid matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl overflow-hidden bg-[#F5F5F3] border border-[#E5E5E5] transition-all duration-300 hover:shadow-xl hover:border-[#CCCCCC] cursor-pointer flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectProject(project);
                }
              }}
            >
              {/* Media Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAEAEA]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Floating Tags at Top */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Top-Right Arrow Action */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Bottom Overlay Title & Subtext */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10 flex flex-col justify-end">
                  <h3 className="text-[18px] sm:text-[20px] font-bold tracking-tight leading-snug mb-1 transition-transform group-hover:-translate-y-0.5">
                    {project.title}
                  </h3>
                  <p className="text-[12.5px] text-white/80 line-clamp-2 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="p-4 bg-white flex items-center justify-between text-[11px] text-[#666666] border-t border-[#E5E5E5]/80">
                <span className="font-bold uppercase tracking-wider text-[#111111]">{project.category}</span>
                <div className="flex items-center gap-1.5 font-semibold text-[#8A8A8A] group-hover:text-[#111111] transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
