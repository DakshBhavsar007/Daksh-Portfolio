import React, { useState } from 'react';
import { testimonials } from '../data/portfolioData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonial: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonial" className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 relative border-t border-[#E5E5E5]">
      {/* Category Pill */}
      <div className="mb-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
          Client Endorsements / Trust
        </span>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Editorial Highlight Quote in italic serif */}
        <p className="text-[28px] sm:text-[38px] md:text-[46px] font-serif italic font-light tracking-tight text-[#111111] leading-[1.15] mb-8">
          "{current.highlightQuote || current.quote}"
        </p>

        {/* Supporting detailed paragraph */}
        {current.quote && current.highlightQuote && (
          <p className="text-[15px] sm:text-[16px] text-[#666666] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            {current.quote}
          </p>
        )}

        {/* Client Bio & Avatar with Grayscale to Color Reveal */}
        <div className="flex flex-col items-center justify-center mt-6 group">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md mb-3 bg-[#E5E5E5] transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg">
            <img
              src={current.avatar}
              alt={current.author}
              className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 hover:grayscale-0 transition-all duration-500 ease-out"
            />
          </div>
          <div className="text-[12px] font-bold uppercase tracking-widest text-[#111111]">
            {current.author}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8A8A] mt-0.5">
            {current.company.includes('linkedin.com') ? (
              <a
                href={`https://${current.company}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#111111] underline-offset-2 hover:underline transition-colors"
              >
                {current.role}, {current.company}
              </a>
            ) : (
              <span>{current.role}, {current.company}</span>
            )}
          </div>

          {/* Testimonial Pagination Controls */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-6 bg-[#111111]' : 'w-1.5 bg-[#D1D1D1]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
