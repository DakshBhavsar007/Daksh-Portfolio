import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronDown, Eye, Printer, Layers, Server, Layout, Cloud, Code2, Sparkles } from 'lucide-react';
import { resumesData, ResumeRole } from '../data/resumeData';
import { openPrintableResume, downloadResumeAsHtml } from '../utils/resumeGenerator';

interface ResumeDropdownProps {
  onOpenPreview: (roleId: string) => void;
  className?: string;
  buttonVariant?: 'nav' | 'hero' | 'compact';
}

const roleIcons: Record<string, React.ReactNode> = {
  'full-stack': <Layers className="w-4 h-4 text-[#111111]" />,
  'backend': <Server className="w-4 h-4 text-blue-600" />,
  'frontend': <Layout className="w-4 h-4 text-teal-600" />,
  'devops': <Cloud className="w-4 h-4 text-rose-600" />,
  'python': <Code2 className="w-4 h-4 text-amber-600" />
};

export const ResumeDropdown: React.FC<ResumeDropdownProps> = ({
  onOpenPreview,
  className = '',
  buttonVariant = 'nav'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownload = (resume: ResumeRole, e: React.MouseEvent) => {
    e.stopPropagation();
    openPrintableResume(resume);
    setIsOpen(false);
  };

  const handlePreview = (resume: ResumeRole, e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenPreview(resume.id);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={
          buttonVariant === 'hero'
            ? 'px-6 py-3 rounded-full border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-white hover:bg-[#F5F5F3] hover:border-[#111111] hover:scale-103 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-2 group'
            : 'px-4 py-2.5 rounded-full border border-[#E5E5E5] text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-white hover:bg-[#F5F5F3] hover:border-[#111111] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5 group'
        }
        id="resume-dropdown-trigger"
        title="View & Download Tailored Resumes"
      >
        <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-[#111111]" />
        <span>Resume</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#666666] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#111111]' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 sm:w-96 origin-top-right rounded-2xl bg-white shadow-2xl border border-[#E5E5E5] ring-1 ring-black/5 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Dropdown Header */}
          <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#E5E5E5] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]">
                Select Role-Tailored Resume
              </span>
            </div>
            <span className="text-[10px] font-medium text-[#777777] bg-[#EAEAEA] px-2 py-0.5 rounded-full">
              5 Formats
            </span>
          </div>

          {/* List of 5 Resume Roles */}
          <div className="py-2 max-h-[360px] overflow-y-auto divide-y divide-[#F0F0F0]">
            {resumesData.map((resume) => (
              <div
                key={resume.id}
                onClick={(e) => handlePreview(resume, e)}
                className="p-3 hover:bg-[#F9F9F8] transition-colors cursor-pointer group flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-[#F4F4F4] group-hover:bg-white group-hover:shadow-xs transition-all shrink-0 mt-0.5">
                    {roleIcons[resume.id]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#111111] group-hover:text-black">
                        {resume.shortRole}
                      </span>
                      {resume.badge && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#EAEAEA] group-hover:bg-[#111111] group-hover:text-white transition-colors text-[#555555]">
                          {resume.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#666666] truncate group-hover:text-[#444444] mt-0.5">
                      {resume.subtitle}
                    </p>
                  </div>
                </div>

                {/* Quick Action Icons */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handlePreview(resume, e)}
                    className="p-1.5 rounded-lg hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] transition-all"
                    title="Preview Resume"
                    aria-label={`Preview ${resume.shortRole} Resume`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => handleDownload(resume, e)}
                    className="p-1.5 rounded-lg bg-[#111111] hover:bg-[#333333] text-white transition-all shadow-xs active:scale-95 flex items-center gap-1 px-2 text-[10px] font-bold"
                    title="Print / Save as PDF"
                    aria-label={`Print ${resume.shortRole} Resume`}
                  >
                    <Download className="w-3 h-3" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Dropdown Footer with Quick Full-View Button */}
          <div className="p-3 bg-[#FAFAFA] border-t border-[#E5E5E5] flex items-center justify-between text-[11px]">
            <span className="text-[#666666]">All versions ATS-optimized</span>
            <button
              onClick={() => {
                onOpenPreview('full-stack');
                setIsOpen(false);
              }}
              className="font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Open Full Viewer</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
