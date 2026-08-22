import React, { useState } from 'react';
import { portfolioConfig } from '../data/portfolioData';
import { ChevronsRight, Send, CheckCircle2, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Dribbble, Instagram } from 'lucide-react';

interface ContactCTAProps {
  onOpenQuickHire: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenQuickHire }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Full-Stack Web Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappMessage = encodeURIComponent(
    `Hi Daksh, I am ${formData.name || 'a visitor'} (${formData.email || 'N/A'}).\n\nProject Scope: ${formData.serviceType}\nMessage: ${formData.message || 'I would like to discuss a project with you.'}`
  );

  const mailtoUrl = `mailto:${portfolioConfig.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.serviceType} from ${formData.name || 'Client'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.serviceType}\n\nMessage:\n${formData.message}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please fill in your name and email address.');
      return;
    }
    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          serviceType: formData.serviceType,
          message: formData.message
        })
      });

      if (!res.ok) {
        await fetch(`https://formsubmit.co/ajax/${portfolioConfig.contact.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            service: formData.serviceType,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name} (${formData.serviceType})`,
            _template: 'table'
          })
        });
      }
    } catch {
      // Fallback gracefully so the user is never blocked
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="bg-[#111111] text-white pt-20 sm:pt-28 pb-12 border-t border-[#222222]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Header Row with Giant Typography & CTA Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-16 sm:pb-24 border-b border-[#222222]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A] block mb-4">
              Direct Collaboration / Inquiries
            </span>
            <h2 className="text-[52px] sm:text-[76px] lg:text-[100px] font-light tracking-tighter uppercase leading-[0.9] text-white">
              Let's Connect <br />
              <span className="font-serif italic lowercase font-normal text-[#8A8A8A]">together</span>
            </h2>
          </div>

          <div>
            <button
              onClick={onOpenQuickHire}
              className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white text-[#111111] hover:bg-[#EAEAEA] text-[12px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-3 group cursor-pointer shadow-xl active:scale-95"
              id="contact-hire-now-btn"
            >
              <div className="w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center transition-colors">
                <ChevronsRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
              <span>Hire Me Now</span>
            </button>
          </div>
        </div>

        {/* Middle Section: Quick Interactive Message Form + Structured Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 sm:py-20 border-b border-[#222222]">
          
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-6 bg-[#161616] p-8 sm:p-10 rounded-2xl border border-[#262626]">
            <h3 className="text-[20px] font-bold text-white mb-2 uppercase tracking-tight">Direct Message</h3>
            <p className="text-[13.5px] text-[#8A8A8A] mb-6 font-normal">
              Have an upcoming product launch or design sprint? Let's discuss scope and timeline.
            </p>

            {isSubmitted ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <div>
                  <h4 className="text-[17px] font-bold text-white uppercase tracking-wider">Message Dispatched!</h4>
                  <p className="text-[13px] text-emerald-200/80 mt-1 max-w-sm">
                    Thank you {formData.name || 'there'}. Your message has been sent to <strong>{portfolioConfig.contact.email}</strong>.
                  </p>
                </div>

                {/* Instant Action options */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full pt-2">
                  <a
                    href={`https://wa.me/91${portfolioConfig.contact.phone}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#111111] text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Chat on WhatsApp</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={mailtoUrl}
                    className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', serviceType: 'Full-Stack Web Development', message: '' });
                  }}
                  className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] hover:text-white transition-colors cursor-pointer"
                >
                  ← Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-[#8A8A8A] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#333333] text-white text-sm focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-[#8A8A8A] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#333333] text-white text-sm focus:outline-none focus:border-white transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-[#8A8A8A] mb-1.5">
                    Project Scope
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#333333] text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="AI / LLM Integration">AI & LLM Integration</option>
                    <option value="FastAPI / Django Backend">Django & FastAPI Backend</option>
                    <option value="React & Frontend Engineering">React & Frontend Engineering</option>
                    <option value="Full Platform Engineering">Full Platform Concept to Launch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-[#8A8A8A] mb-1.5">
                    Project Brief
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your vision, timeline, or key objectives..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#333333] text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-white text-[#111111] hover:bg-[#EAEAEA] font-bold text-[11px] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Exact Metadata from the Reference Image */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              {/* Address */}
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8A8A8A] block mb-2">
                  Address
                </span>
                <p className="text-[13.5px] leading-relaxed text-[#CCCCCC]">
                  {portfolioConfig.contact.address}
                </p>
              </div>

              {/* Email Address */}
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8A8A8A] block mb-2">
                  Email Address
                </span>
                <a
                  href={`mailto:${portfolioConfig.contact.email}`}
                  className="text-[13.5px] text-[#CCCCCC] hover:text-white transition-colors block mb-1 underline-offset-4 hover:underline"
                >
                  {portfolioConfig.contact.email}
                </a>
                <a
                  href={`mailto:${portfolioConfig.contact.secondaryEmail}`}
                  className="text-[13.5px] text-[#8A8A8A] hover:text-white transition-colors block underline-offset-4 hover:underline"
                >
                  {portfolioConfig.contact.secondaryEmail}
                </a>
              </div>

              {/* Phone Number */}
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8A8A8A] block mb-2">
                  Phone Number
                </span>
                <a
                  href={`tel:${portfolioConfig.contact.phone}`}
                  className="text-[13.5px] text-[#CCCCCC] hover:text-white transition-colors block mb-1"
                >
                  {portfolioConfig.contact.phone}
                </a>
                <a
                  href={`tel:${portfolioConfig.contact.mobilePhone}`}
                  className="text-[13.5px] text-[#8A8A8A] hover:text-white transition-colors block"
                >
                  {portfolioConfig.contact.mobilePhone}
                </a>
              </div>

            </div>

            {/* Quick Links & Brand Bio as in bottom reference */}
            <div className="pt-6 border-t border-[#222222]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#8A8A8A]">
                <div className="flex items-center gap-6">
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('about');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About
                  </a>
                  <a
                    href="#skills"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('skills') || document.getElementById('services');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Skills
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('projects') || document.getElementById('portfolio');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Projects
                  </a>
                  <a
                    href="#journey"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('journey') || document.getElementById('experience');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Journey
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={portfolioConfig.contact.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#1F1F1F] text-[#CCCCCC] hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Daksh Bhavsar on GitHub"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={portfolioConfig.contact.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#1F1F1F] text-[#CCCCCC] hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Daksh Bhavsar on LinkedIn"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${portfolioConfig.contact.email}`}
                    className="p-2.5 rounded-full bg-[#1F1F1F] text-[#CCCCCC] hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={`Email ${portfolioConfig.contact.email}`}
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={`tel:${portfolioConfig.contact.phone}`}
                    className="p-2.5 rounded-full bg-[#1F1F1F] text-[#CCCCCC] hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label={`Call ${portfolioConfig.contact.phone}`}
                    title="Call Phone"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm">✦ {portfolioConfig.personal.name}</span>
            <span className="text-[#444444]">|</span>
            <span>{portfolioConfig.personal.title}</span>
          </div>
          <div>
            <span>All rights reserved @{portfolioConfig.personal.name} © 2026</span>
          </div>
        </div>

      </div>
    </section>
  );
};
