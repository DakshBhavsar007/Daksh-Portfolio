import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(24);

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

  // Simulate video playback progress
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl bg-[#111111] rounded-3xl overflow-hidden shadow-2xl border border-[#333333] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#222222] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-sm font-medium tracking-tight">
              {portfolioConfig.personal.name} Platform Architecture & Demos
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222222] hover:bg-white hover:text-[#111111] transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Showcase */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden group">
          <img
            src={portfolioConfig.personal.aboutHeroImage}
            alt="Platform Architecture Video"
            className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 scale-102"
          />

          {/* Dynamic Graphic Overlay simulating showreel cuts */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6 sm:p-8">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white/80 border border-white/10">
                REC • 4K 60FPS • PRORES 422
              </span>
              <span className="text-xs font-mono text-white/60">
                00:{Math.floor(progress * 1.05).toString().padStart(2, '0')} / 01:45
              </span>
            </div>

            <div className="space-y-1 text-white">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                Act II: Full-Stack Architecture & Multi-LLM Routing
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Synthesizing Multi-Provider AI with Django, FastAPI & React
              </h3>
            </div>
          </div>

          {/* Center Play/Pause button on hover */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-white" />
            ) : (
              <Play className="w-7 h-7 fill-white translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Video Player Scrub & Control Bar */}
        <div className="p-4 sm:p-5 bg-[#161616] text-white flex flex-col space-y-3">
          {/* Progress bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress((clickX / rect.width) * 100);
            }}
            className="w-full h-1.5 bg-[#333333] rounded-full overflow-hidden cursor-pointer group"
          >
            <div
              className="h-full bg-white transition-all duration-75 group-hover:bg-emerald-400"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#8A8A8A]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                onClick={() => setProgress(0)}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>

            <span>Curated Design Process • 2026 Archive</span>
          </div>
        </div>
      </div>
    </div>
  );
};
