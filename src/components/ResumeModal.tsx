import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, ExternalLink, Sparkles, Layers, Server, Layout, Cloud, Code2 } from 'lucide-react';
import { resumesData, ResumeRole } from '../data/resumeData';
import { openPrintableResume, downloadResumeAsHtml } from '../utils/resumeGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoleId?: string;
}

const roleIcons: Record<string, React.ReactNode> = {
  'full-stack': <Layers className="w-4 h-4" />,
  'backend': <Server className="w-4 h-4" />,
  'frontend': <Layout className="w-4 h-4" />,
  'devops': <Cloud className="w-4 h-4" />,
  'python': <Code2 className="w-4 h-4" />
};

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  initialRoleId = 'full-stack'
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>(initialRoleId);
  const [copied, setCopied] = useState(false);

  // Sync initial role when opened
  React.useEffect(() => {
    if (initialRoleId) {
      setSelectedRoleId(initialRoleId);
    }
  }, [initialRoleId]);

  if (!isOpen) return null;

  const currentResume = resumesData.find((r) => r.id === selectedRoleId) || resumesData[0];

  const handleCopyText = () => {
    const text = `
BHAVSAR DAKSH NARENDRABHAI
${currentResume.roleTitle}
Email: dakshbhavsar3699@gmail.com | Phone: 8849538117 | Ahmedabad, Gujarat, India
LinkedIn: https://linkedin.com/in/daksh-bhavsar-96b102339 | GitHub: https://github.com/DakshBhavsar007 | Portfolio: https://daksh-portfolio-beta.vercel.app/

PROFESSIONAL SUMMARY
${currentResume.summary}

EDUCATION
${currentResume.education.degree}, ${currentResume.education.institution} — ${currentResume.education.location}
${currentResume.education.period} | ${currentResume.education.semester} | CGPA: ${currentResume.education.cgpa}

TECHNICAL SKILLS
${currentResume.skillsByCategory.map((c) => `${c.category}: ${c.skills}`).join('\n')}

PROJECTS & EXPERIENCE
${currentResume.experienceOrProjects
  .map(
    (p) => `${p.title}
${p.points.map((pt) => `• ${pt}`).join('\n')}${p.techStack ? `\nTech Stack: ${p.techStack}` : ''}`
  )
  .join('\n\n')}

LANGUAGES
${currentResume.languages.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#E5E5E5] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Role Switcher */}
        <div className="p-4 sm:p-5 bg-[#FAFAFA] border-b border-[#E5E5E5] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-[#111111] text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 id="resume-modal-title" className="text-base sm:text-lg font-bold text-[#111111]">
                  Daksh Bhavsar — Specialized Resumes
                </h3>
                <p className="text-[12px] text-[#666666]">
                  Select tailored ATS-ready resume for specific tech roles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openPrintableResume(currentResume)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#333333] transition-all shadow-xs cursor-pointer"
                title="Print or Save PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>

              <button
                onClick={() => downloadResumeAsHtml(currentResume)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[#111111] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F5F5F3] hover:border-[#111111] transition-all shadow-xs cursor-pointer"
                title="Download HTML Resume"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Download</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#EAEAEA] text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 5 Role Selection Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {resumesData.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                      : 'bg-white text-[#666666] border-[#E5E5E5] hover:bg-[#F5F5F3] hover:text-[#111111]'
                  }`}
                >
                  {roleIcons[role.id]}
                  <span>{role.shortRole}</span>
                  {role.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#EAEAEA] text-[#555555]'
                      }`}
                    >
                      {role.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Resume Document Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#F4F4F6]">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-[#E5E5E5] p-6 sm:p-9 text-[#111111]">
            {/* Document Header */}
            <div className="text-center pb-4 border-b border-[#E5E5E5]/60 mb-5">
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-black mb-1">
                BHAVSAR DAKSH NARENDRABHAI
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#333333] mb-2">
                {currentResume.roleTitle}
              </p>
              <div className="text-[11px] sm:text-xs text-[#555555] flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <a href="mailto:dakshbhavsar3699@gmail.com" className="text-[#1D4ED8] hover:underline">
                  dakshbhavsar3699@gmail.com
                </a>
                <span>•</span>
                <span>8849538117</span>
                <span>•</span>
                <span>Ahmedabad, Gujarat, India</span>
                <span>•</span>
                <a
                  href="https://linkedin.com/in/daksh-bhavsar-96b102339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D4ED8] hover:underline"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://github.com/DakshBhavsar007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D4ED8] hover:underline"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href="https://daksh-portfolio-beta.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D4ED8] hover:underline"
                >
                  Portfolio
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-5">
              <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-2">
                Professional Summary
              </h2>
              <p className="text-[12px] sm:text-[12.5px] leading-relaxed text-[#333333] text-justify">
                {currentResume.summary}
              </p>
            </div>

            {/* Education */}
            <div className="mb-5">
              <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-2">
                Education
              </h2>
              <div className="flex items-baseline justify-between text-[12px] sm:text-[12.5px]">
                <div>
                  <span className="font-bold text-[#111111]">{currentResume.education.degree}</span>, {currentResume.education.institution} — {currentResume.education.location}
                </div>
                <div className="text-[#666666] text-xs">{currentResume.education.period}</div>
              </div>
              <div className="text-[11.5px] text-[#555555] mt-0.5">
                {currentResume.education.semester} | CGPA: <strong className="text-[#111111] font-bold">{currentResume.education.cgpa}</strong>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5">
              <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-2">
                Technical Skills
              </h2>
              <div className="space-y-1.5 text-[12px] sm:text-[12.5px]">
                {currentResume.skillsByCategory.map((cat, idx) => (
                  <div key={idx}>
                    <span className="font-bold text-[#111111]">{cat.category}: </span>
                    <span className="text-[#333333]">{cat.skills}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Projects */}
            <div className="mb-5">
              <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-2">
                {currentResume.id === 'devops' ? 'Relevant Infrastructure & Monitoring Experience' : 'Projects'}
              </h2>
              <div className="space-y-4">
                {currentResume.experienceOrProjects.map((item, idx) => (
                  <div key={idx} className="text-[12px] sm:text-[12.5px]">
                    <div className="flex flex-wrap items-baseline gap-1.5 font-bold text-[#0D47A1] mb-1">
                      <span>{item.title}</span>
                      {item.liveUrl && (
                        <>
                          <span className="text-[#888888] font-normal">—</span>
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1D4ED8] font-semibold hover:underline text-[11px] inline-flex items-center gap-0.5"
                          >
                            Live Site <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </>
                      )}
                      {item.githubUrl && (
                        <>
                          <span className="text-[#888888] font-normal">|</span>
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1D4ED8] font-semibold hover:underline text-[11px] inline-flex items-center gap-0.5"
                          >
                            GitHub <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </>
                      )}
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-1 text-[#333333] leading-relaxed">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                    {item.techStack && (
                      <div className="mt-1 pl-4 text-[11px] text-[#555555]">
                        <strong className="text-[#333333]">Tech Stack:</strong> {item.techStack}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-1.5">
                  Certifications
                </h2>
                <a
                  href="https://linkedin.com/in/daksh-bhavsar-96b102339"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#1D4ED8] hover:underline"
                >
                  View all certifications on LinkedIn
                </a>
              </div>
              <div>
                <h2 className="text-[11.5px] font-extrabold uppercase tracking-wider text-[#0D47A1] border-b border-[#0D47A1] pb-0.5 mb-1.5">
                  Languages
                </h2>
                <p className="text-[12px] text-[#333333]">
                  {currentResume.languages.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#FAFAFA] border-t border-[#E5E5E5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#111111] text-xs font-semibold hover:bg-[#F5F5F3] hover:border-[#111111] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openPrintableResume(currentResume)}
              className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#333333] transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
