import React, { useState } from 'react';
import { ArrowUpRight, Eye, ExternalLink, Github } from 'lucide-react';
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
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] interactive-pill px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-[#E5E5E5] inline-block cursor-default">
          Selected Portfolio / Archive
        </span>
      </div>

      {/* Header Statement & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16 group">
        <div className="max-w-2xl">
          <h2 className="text-[36px] sm:text-[46px] md:text-[52px] font-light tracking-tighter uppercase text-[#111111] leading-[0.95] mb-4 interactive-heading cursor-default">
            Explore my archive of <span className="font-serif italic lowercase font-normal transition-transform duration-300 group-hover:scale-105 inline-block">production</span> platforms.
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#666666] leading-relaxed font-normal hover:text-[#111111] transition-colors duration-300">
            A curated index of production-grade platforms, multi-provider LLM integrations, and scalable full-stack applications.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer interactive-pill ${
                activeCategory === cat
                  ? 'bg-[#111111] text-white shadow-xs hover:bg-[#222222]'
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
              className="group relative rounded-2xl overflow-hidden bg-[#F5F5F3] border border-[#E5E5E5] transition-all duration-500 hover:shadow-2xl hover:border-[#CCCCCC] cursor-pointer flex flex-col interactive-card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectProject(project);
                }
              }}
            >
              {/* Media Image Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111]">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] transition-all duration-700 ease-out group-hover:scale-108 group-hover:contrast-105"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-black/10 opacity-80 group-hover:opacity-75 transition-opacity"></div>

                {/* Subtle glass hover sweep shimmer */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                {/* Floating Tags at Top */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20 hover:border-white/50 transition-colors shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Top-Right Arrow Action */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#111111] group-hover:scale-110 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Bottom Overlay Title & Subtext */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10 flex flex-col justify-end">
                  <h3 className="text-[17px] sm:text-[19px] font-bold tracking-tight leading-snug mb-1 transition-all duration-300 group-hover:translate-x-0.5">
                    {project.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-white/80 line-clamp-2 leading-relaxed font-normal group-hover:text-white transition-colors">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="p-4 bg-white flex items-center justify-between text-[11px] text-[#666666] border-t border-[#E5E5E5]/80 group-hover:bg-[#FAFAFA] transition-colors">
                <span className="font-bold uppercase tracking-wider text-[#111111]">{project.category}</span>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-full hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] transition-all hover:scale-110"
                      title="Launch Live App"
                      aria-label={`Launch ${project.title} live`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-full hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] transition-all hover:scale-110"
                      title="View GitHub Repository"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <div className="flex items-center gap-1.5 font-semibold text-[#8A8A8A] group-hover:text-[#111111] transition-colors ml-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
