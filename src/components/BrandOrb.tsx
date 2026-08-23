import React, { useEffect, useRef } from 'react';
import { ORB_MODES, OrbMode } from '../utils/brandOrbsEngine';

interface BrandOrbProps {
  mode: OrbMode | string;
  size?: number;
  className?: string;
  isDark?: boolean;
}

export const BrandOrb: React.FC<BrandOrbProps> = ({
  mode,
  size = 40,
  className = '',
  isDark = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const orbConfig = ORB_MODES[mode] || ORB_MODES['react'] || ORB_MODES['gemini'];
    const dpr = Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1);

    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isVisible = true;
    let animId = 0;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
      }
    });
    observer.observe(canvas);

    const isMini = size < 32;

    const render = () => {
      if (isVisible && document.visibilityState !== 'hidden') {
        const t = performance.now() / 1000;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);
        orbConfig.draw(ctx, size, t * orbConfig.speed * (isMini ? 1.25 : 1), {
          mini: isMini,
          accent: orbConfig.accent,
          isDark
        });
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [mode, size, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`inline-block shrink-0 select-none pointer-events-none ${className}`}
      data-mode={mode}
      data-size={size}
      aria-hidden="true"
    />
  );
};

interface BrandOrbPillProps {
  mode: OrbMode | string;
  label: string;
  statusText?: string;
  concept?: string;
  size?: 'mini' | 'normal' | 'compact';
  onClick?: () => void;
  className?: string;
}

export const BrandOrbPill: React.FC<BrandOrbPillProps> = ({
  mode,
  label,
  statusText,
  concept,
  size = 'normal',
  onClick,
  className = ''
}) => {
  const orbSize = size === 'mini' ? 24 : size === 'compact' ? 32 : 44;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-full border border-[#E5E5E5] bg-[#FAF9F5] dark:bg-[#111113] hover:border-[#111111] hover:bg-white shadow-2xs hover:shadow-xs transition-all duration-300 group cursor-default select-none ${
        size === 'mini'
          ? 'px-3 py-1 text-xs'
          : size === 'compact'
          ? 'px-3.5 py-1.5 text-xs'
          : 'px-4 py-2 text-sm'
      } ${className}`}
    >
      <BrandOrb mode={mode} size={orbSize} isDark={false} />
      <div className="flex flex-col text-left">
        <span className="font-bold text-[#111111] tracking-tight leading-tight group-hover:text-black">
          {label}
        </span>
        {(statusText || concept) && (
          <span className="text-[10px] text-[#777777] font-medium tracking-wide leading-none mt-0.5">
            {statusText || concept}
          </span>
        )}
      </div>
    </div>
  );
};
