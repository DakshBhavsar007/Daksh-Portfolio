import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, Download, Eye, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';
import { ResumeDropdown } from './ResumeDropdown';
import { resumesData } from '../data/resumeData';
import { openPrintableResume } from '../utils/resumeGenerator';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: (roleId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileResumeAccordion, setMobileResumeAccordion] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check sections for active state
      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'testimonial', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E5E5E5]/60 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo / Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="group flex items-center gap-2.5 cursor-pointer focus:outline-none"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-[11px] tracking-tighter transition-transform group-hover:scale-105">
            <span>DB</span>
          </div>
          <span className="font-semibold text-sm tracking-tighter uppercase text-[#111111] group-hover:opacity-80 transition-opacity">
            {portfolioConfig.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest text-[#666666]">
          <button
            onClick={() => scrollTo('about')}
            className={`transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-[#F5F5F3] ${
              activeSection === 'about' ? 'text-[#111111] font-extrabold bg-[#F5F5F3]' : ''
            }`}
            id="nav-link-about"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('skills')}
            className={`transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-[#F5F5F3] ${
              activeSection === 'skills' ? 'text-[#111111] font-extrabold bg-[#F5F5F3]' : ''
            }`}
            id="nav-link-skills"
          >
            Skills
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className={`transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-[#F5F5F3] ${
              activeSection === 'projects' ? 'text-[#111111] font-extrabold bg-[#F5F5F3]' : ''
            }`}
            id="nav-link-projects"
          >
            Projects
          </button>
          <button
            onClick={() => scrollTo('journey')}
            className={`transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-[#F5F5F3] ${
              activeSection === 'journey' ? 'text-[#111111] font-extrabold bg-[#F5F5F3]' : ''
            }`}
            id="nav-link-journey"
          >
            Journey
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={`transition-all duration-300 hover:text-[#111111] hover:-translate-y-0.5 cursor-pointer py-1 px-2 rounded-md hover:bg-[#F5F5F3] ${
              activeSection === 'contact' ? 'text-[#111111] font-extrabold bg-[#F5F5F3]' : ''
            }`}
            id="nav-link-contact"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA Button & Quick Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ResumeDropdown onOpenPreview={(roleId) => onOpenResume(roleId)} buttonVariant="nav" />

          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2.5 rounded-full border border-[#111111] text-[11px] font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#333333] transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5 group"
            id="nav-talk-btn"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F3] transition-colors focus:outline-none"
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-[#E5E5E5] px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4 text-base font-medium text-[#444444]">
            <button
              onClick={() => scrollTo('about')}
              className="text-left py-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('skills')}
              className="text-left py-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              Skills
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="text-left py-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => scrollTo('journey')}
              className="text-left py-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              Journey
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              Contact
            </button>

            {/* Mobile Resume Section Accordion */}
            <div className="pt-3 border-t border-[#E5E5E5] flex flex-col gap-2">
              <button
                onClick={() => setMobileResumeAccordion(!mobileResumeAccordion)}
                className="w-full py-2.5 px-4 rounded-xl border border-[#E5E5E5] bg-[#F9F9F8] text-[#111111] flex items-center justify-between text-sm font-semibold cursor-pointer hover:bg-[#F0F0EE] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#111111]" />
                  <span>Download Role Resume (5)</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileResumeAccordion ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileResumeAccordion && (
                <div className="flex flex-col gap-1.5 pl-1 pr-1 py-1 animate-in fade-in duration-150">
                  {resumesData.map((res) => (
                    <div
                      key={res.id}
                      className="p-2.5 rounded-lg bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#111111] truncate">{res.shortRole}</div>
                        <div className="text-[10px] text-[#666666] truncate">{res.badge || res.subtitle}</div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onOpenResume(res.id);
                          }}
                          className="p-1.5 rounded-md hover:bg-[#EAEAEA] text-[#555555]"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            openPrintableResume(res);
                            setMobileMenuOpen(false);
                          }}
                          className="px-2.5 py-1 rounded-md bg-[#111111] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollTo('contact');
                }}
                className="w-full py-3 rounded-full bg-[#111111] text-white text-center text-sm font-medium flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
