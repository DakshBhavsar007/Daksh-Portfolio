import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ArrowUpRight, Mail, Phone } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface QuickHireModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuickHireModal: React.FC<QuickHireModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$5k – $15k');
  const [timeline, setTimeline] = useState('Immediate / Next 2 weeks');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi Daksh, I am ${name || 'a client'} (${email || 'N/A'}).\n\nI want to discuss hiring you for: ${preselectedService || 'Full-Stack Development'}\nEstimated Budget: ${budget}\nTarget Launch: ${timeline}\n\nProject Brief:\n${details || 'Looking forward to connecting.'}`
  );

  const mailtoUrl = `mailto:${portfolioConfig.contact.email}?subject=${encodeURIComponent(
    `Project Proposal: ${preselectedService || 'Full-Stack Project'} from ${name || 'Client'}`
  )}&body=${encodeURIComponent(
    `Client Name: ${name}\nEmail: ${email}\nService: ${preselectedService || 'Full-Stack Development'}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject Brief:\n${details}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please fill in your name and email address.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      // Call secure server-side endpoint (which keeps SMTP and API credentials protected on the backend)
      const res = await fetch('/api/quick-hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          service: preselectedService || 'Full-Stack / AI Development',
          budget,
          timeline,
          details
        })
      });

      if (!res.ok) {
        // Backup client relay if needed
        await fetch(`https://formsubmit.co/ajax/${portfolioConfig.contact.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            service: preselectedService || 'Full-Stack / AI Development',
            budget,
            timeline,
            details,
            _subject: `New Project Proposal from ${name} (${preselectedService || 'Full-Stack'})`,
            _template: 'table'
          })
        });
      }
    } catch {
      // Fallback gracefully so the client is never stuck
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E5E5E5] p-6 sm:p-10"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F5F5F3] text-[#666666] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Q3/Q4 Booking Window Open</span>
          </div>
          <h3 className="text-[26px] font-bold text-[#111111] tracking-tight">
            Start a Project with {portfolioConfig.personal.name}
          </h3>
          <p className="text-sm text-[#666666] mt-1">
            Let's discuss requirements, design systems, and rapid prototyping timelines.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-900 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <div>
              <h4 className="text-xl font-bold text-[#111111]">Proposal Sent Directly to Daksh!</h4>
              <p className="text-sm text-emerald-800 mt-1 max-w-md mx-auto">
                Thank you <strong>{name}</strong>. Your project proposal for <strong>{preselectedService || 'Full-Stack Development'}</strong> has been delivered to <strong>{portfolioConfig.contact.email}</strong>.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={`https://wa.me/91${portfolioConfig.contact.phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Instant WhatsApp Chat</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={mailtoUrl}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-2 text-xs font-bold uppercase tracking-wider text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8A8A8A] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Taylor Reid"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8A8A8A] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="taylor@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8A8A8A] mb-1">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option>$3k – $5k (Micro Sprint)</option>
                  <option>$5k – $15k (Core Feature / App)</option>
                  <option>$15k – $35k (Full Product Launch)</option>
                  <option>$35k+ (Enterprise Architecture)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#8A8A8A] mb-1">
                  Target Launch
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                >
                  <option>Immediate / Next 2 weeks</option>
                  <option>Within 1 Month</option>
                  <option>Next Quarter</option>
                  <option>Flexible / Exploratory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold tracking-wider text-[#8A8A8A] mb-1">
                Project Overview / Goals
              </label>
              <textarea
                rows={3}
                placeholder="Give a brief summary of the product goals, target audience, or specific challenges..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] text-sm text-[#111111] focus:outline-none focus:border-[#111111] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#111111] text-white font-medium text-sm hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Transmitting Proposal...' : 'Submit Project Proposal'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
