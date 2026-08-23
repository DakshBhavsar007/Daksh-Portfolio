import React, { useState, useRef } from 'react';
import { experiences } from '../data/portfolioData';
import { MapPin, CheckCircle2, ArrowDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'motion/react';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'down' | 'up'>('down');

  // Track scroll progress within the sticky journey section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive spring with quick responsiveness for 1-scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clampedProgress = Math.max(0, Math.min(0.999, latest));
    const calculatedIndex = Math.floor(clampedProgress * experiences.length);

    if (calculatedIndex !== activeIndex && calculatedIndex >= 0 && calculatedIndex < experiences.length) {
      setDirection(calculatedIndex > activeIndex ? 'down' : 'up');
      setActiveIndex(calculatedIndex);
    }
  });

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const stepProgress = (index + 0.05) / experiences.length;
    const targetScroll = containerTop + totalHeight * stepProgress;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const activeItem = experiences[activeIndex] || experiences[0];
  const sequenceNumber = `0${activeIndex + 1}`.slice(-2);
  const totalCount = `0${experiences.length}`.slice(-2);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[220vh] sm:h-[240vh] bg-white border-t border-[#E5E5E5] scroll-mt-0"
    >
      <div id="experience" className="hidden" aria-hidden="true"></div>

      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-[1400px] mx-auto z-10">
        
        {/* Background Architectural Watermark */}
        <div
          className="absolute -top-4 right-0 sm:right-6 pointer-events-none select-none text-[#F1F1EE] -z-10"
          aria-hidden="true"
        >
          <span className="text-[90px] sm:text-[150px] lg:text-[200px] font-bold tracking-tighter uppercase leading-none block font-mono opacity-80">
            JOURNEY
          </span>
        </div>

        {/* Top Header & Section Progress Meta */}
        <div className="shrink-0">
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A8A8A]">
                Career & Trajectory
              </span>
              <span className="text-[#CCCCCC] text-[12px]">•</span>
              <motion.span
                key={sequenceNumber}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-bold uppercase tracking-wider text-[#111111] bg-[#F5F5F3] px-2.5 py-0.5 rounded-full border border-[#E5E5E5]"
              >
                Milestone {sequenceNumber} / {totalCount}
              </motion.span>
            </div>

            {/* Step indicators / Clickable timeline scrubbers */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {experiences.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToStep(idx)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 sm:w-10 bg-[#111111]'
                      : idx < activeIndex
                      ? 'w-2.5 sm:w-3 bg-[#888888]'
                      : 'w-2.5 sm:w-3 bg-[#E5E5E5] hover:bg-[#CCCCCC]'
                  }`}
                  aria-label={`Go to journey item ${idx + 1}`}
                  title={`Milestone 0${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-end group">
            <div className="lg:col-span-8">
              <h2 className="text-[28px] sm:text-[38px] md:text-[44px] font-light tracking-tighter uppercase text-[#111111] leading-[0.98] interactive-heading cursor-default">
                A Yearly snapshot of my <span className="font-serif italic lowercase font-normal transition-transform duration-300 group-hover:scale-105 inline-block">engineering</span> growth.
              </h2>
            </div>
            <div className="lg:col-span-4 hidden lg:block">
              <p className="text-[13px] text-[#666666] leading-relaxed hover:text-[#111111] transition-colors duration-300">
                Scroll through sequential milestones — from academic computer engineering at LJ University to live production architectures.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Scroll-Driven Animated Journey Div / Card */}
        <div className="my-auto py-4 relative min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{
                opacity: 0,
                y: direction === 'down' ? 24 : -24,
                scale: 0.99,
                filter: 'blur(2px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                opacity: 0,
                y: direction === 'down' ? -20 : 20,
                scale: 0.99,
                filter: 'blur(2px)',
              }}
              transition={{
                duration: 0.48,
                ease: [0.22, 1, 0.36, 1], // Smooth premium cubic-bezier ease out
              }}
              className="w-full"
            >
              <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-white border border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#CCCCCC] group interactive-card">
                {/* Top Role & Milestone Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F0F0F0]">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="text-[14px] sm:text-[16px] font-mono font-bold text-[#111111] bg-[#F5F5F3] px-3 py-1 rounded-lg border border-[#E5E5E5] shrink-0 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                      {sequenceNumber}
                    </span>
                    <div>
                      <div className="flex items-baseline flex-wrap gap-2 mb-1">
                        <h3 className="text-[22px] sm:text-[28px] font-bold tracking-tight text-[#111111] transition-transform duration-300 group-hover:translate-x-1">
                          {activeItem.role}
                        </h3>
                        <span className="font-serif italic text-[#666666] text-[18px] sm:text-[22px]">at</span>
                        <span className="text-[20px] sm:text-[24px] font-semibold text-[#333333] group-hover:text-black transition-colors">
                          {activeItem.company}
                        </span>
                      </div>
                      <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] leading-relaxed max-w-3xl group-hover:text-[#222222] transition-colors">
                        {activeItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="shrink-0 flex items-center md:flex-col md:items-end justify-between gap-2">
                    <span className="text-[26px] sm:text-[34px] lg:text-[40px] font-light tracking-tighter text-[#111111] whitespace-nowrap group-hover:scale-105 transition-transform duration-300">
                      {activeItem.period}
                    </span>
                    {activeItem.location && (
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#777777]">
                        <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                        <span>{activeItem.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
                  {/* Highlights Column */}
                  <div className="lg:col-span-8 space-y-2.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#777777] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#111111] animate-spin-slow" />
                      <span>Key Highlights & Engineering Deliverables</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeItem.highlights?.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-[13.5px] text-[#222222] leading-snug hover:text-black transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#F0F0F0] pt-4 lg:pt-0 lg:pl-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#777777] mb-3">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.skills?.map((s, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-[#F5F5F3] border border-[#E5E5E5] text-[10px] font-bold uppercase tracking-wider text-[#333333] interactive-pill hover:text-[#111111] hover:bg-[#EAEAEA] cursor-default"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Navigation & Scroll Hint */}
        <div className="shrink-0 border-t border-[#E5E5E5] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#777777]">
          {/* Quick Jump Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {experiences.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToStep(idx)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  idx === activeIndex
                    ? 'bg-[#111111] text-white shadow-xs scale-102'
                    : 'bg-[#F5F5F3] text-[#666666] hover:text-[#111111] hover:bg-[#EAEAEA]'
                }`}
              >
                {idx + 1}. {item.company.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Scroll Guidance Helper */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#8A8A8A]">
            <span>
              {activeIndex < experiences.length - 1
                ? `Scroll down for next milestone (0${activeIndex + 2})`
                : 'Scroll down to explore featured projects'}
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-[#111111] animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};


