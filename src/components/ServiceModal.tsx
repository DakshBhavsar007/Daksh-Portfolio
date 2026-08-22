import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Clock, Shield } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E5E5E5] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header bar */}
        <div className={`p-8 ${service.isDark ? 'bg-[#111111] text-white' : 'bg-[#F5F5F3] text-[#111111]'} border-b border-[#E5E5E5]`}>
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/20">
              Capability Details
            </span>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${service.isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white hover:bg-[#E5E5E5] text-[#111111]'} transition-colors cursor-pointer`}
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-tight mb-2">
            {service.title}
          </h2>
          <p className={`text-[15px] ${service.isDark ? 'text-white/80' : 'text-[#666666]'}`}>
            {service.description}
          </p>
        </div>

        {/* Content body */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-wider text-[#8A8A8A] mb-3">
              Included Deliverables & Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.deliverables?.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center gap-2.5 text-[13.5px] text-[#333333]">
                  <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F5F3] border border-[#E5E5E5] flex items-center gap-3 text-xs text-[#555555]">
            <Clock className="w-4 h-4 text-[#111111] shrink-0" />
            <span>Typical engagement timeline: 2 to 4 weeks sprint cycles with weekly reviews.</span>
          </div>

          <div className="pt-4 flex items-center justify-between gap-4 border-t border-[#E5E5E5]">
            <button
              onClick={onClose}
              className="text-[13px] font-medium text-[#8A8A8A] hover:text-[#111111] transition-colors cursor-pointer"
            >
              Back to Overview
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(service.title);
              }}
              className="px-6 py-3 rounded-full bg-[#111111] text-white text-[13px] font-medium hover:bg-[#2A2A2A] transition-colors flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Inquire for this Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
