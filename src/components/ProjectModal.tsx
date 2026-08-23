import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Layers, Calendar, User, Briefcase } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-[#E5E5E5] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E5E5E5] text-[#111111] hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Image with Grayscale to Color Reveal */}
        <div className="relative aspect-[16/9] w-full bg-[#111111] overflow-hidden group">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter contrast-[1.03] transition-all duration-700 ease-out group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>

          {/* Title on Hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium border border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 id="modal-project-title" className="text-[26px] sm:text-[34px] font-bold tracking-tight leading-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F5F5F3] border border-[#E5E5E5] text-[13px]">
            <div>
              <span className="text-[#8A8A8A] block text-[11px] uppercase tracking-wider font-semibold">Client</span>
              <span className="font-medium text-[#111111]">{project.client || 'Proprietary Project'}</span>
            </div>
            <div>
              <span className="text-[#8A8A8A] block text-[11px] uppercase tracking-wider font-semibold">Year</span>
              <span className="font-medium text-[#111111]">{project.year || '2024–2025'}</span>
            </div>
            <div>
              <span className="text-[#8A8A8A] block text-[11px] uppercase tracking-wider font-semibold">Role</span>
              <span className="font-medium text-[#111111]">{project.role || 'Lead Designer & Dev'}</span>
            </div>
            <div>
              <span className="text-[#8A8A8A] block text-[11px] uppercase tracking-wider font-semibold">Category</span>
              <span className="font-medium text-[#111111]">{project.category}</span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-[18px] font-bold text-[#111111] mb-2">Project Overview</h3>
            <p className="text-[15px] text-[#555555] leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <h4 className="text-[15px] font-bold text-[#111111] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                The Challenge
              </h4>
              <p className="text-[13.5px] text-[#666666] leading-relaxed">
                {project.challenge || 'Balancing complex functional data pipelines with high-speed performance and minimalist, clutter-free aesthetics.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5]">
              <h4 className="text-[15px] font-bold text-[#111111] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                The Solution
              </h4>
              <p className="text-[13.5px] text-[#666666] leading-relaxed">
                {project.solution || 'Implemented component tokenization, optimized rendering passes, and designed intuitive spatial hierarchies.'}
              </p>
            </div>
          </div>

          {/* Deliverables List */}
          {project.deliverables && (
            <div>
              <h3 className="text-[16px] font-bold text-[#111111] mb-3">Key Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13.5px] text-[#444444]">
                    <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live Action Links */}
          <div className="pt-4 border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Live Preview</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-[#E5E5E5] text-[#111111] text-[13px] font-medium hover:bg-[#F5F5F3] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-[13px] font-medium text-[#8A8A8A] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Close Case Study
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
