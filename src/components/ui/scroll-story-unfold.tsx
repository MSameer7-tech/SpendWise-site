'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollStoryUnfoldProps {
  children: React.ReactNode | ((progress: number) => React.ReactNode);
  className?: string;
  containerClassName?: string;
  maxRotation?: number; // Max degrees of 3D tilt when closed, default 14
  minScale?: number; // Scale when closed, default 0.94
  translateY?: number; // Vertical translation when closed, default 24
  origin?: 'top' | 'bottom';
  thresholdStart?: number; // Fraction of viewport where opening begins (e.g. 0.92)
  thresholdEnd?: number; // Fraction of viewport where fully opened (e.g. 0.38)
  enableSheen?: boolean;
}

/**
 * ScrollStoryUnfold
 * 
 * Apple-inspired storytelling scroll-to-open 3D container.
 * Smoothly unfolds/elevates a product card or device mockup as it scrolls into viewport.
 * 
 * - GPU accelerated via CSS 3D transforms & will-change
 * - Batched via requestAnimationFrame and IntersectionObserver
 * - Fully respects prefers-reduced-motion
 * - SSR safe (defaults to fully open on server, avoiding layout shifts)
 */
export function ScrollStoryUnfold({
  children,
  className,
  containerClassName,
  maxRotation = 14,
  minScale = 0.94,
  translateY = 24,
  origin = 'top',
  thresholdStart = 0.92,
  thresholdEnd = 0.38,
  enableSheen = true,
}: ScrollStoryUnfoldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default to 1 (fully open) during SSR for SEO & accessibility
  const [progress, setProgress] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    let ticking = false;

    const updateProgress = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * thresholdStart;
      const end = vh * thresholdEnd;

      if (start === end) {
        setProgress(1);
        return;
      }

      // Progress goes 0.0 -> 1.0 as element travels from bottom towards center
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial measurement
    updateProgress();

    // IntersectionObserver guarantees zero scroll overhead when element is not on screen
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          window.addEventListener('scroll', onScrollOrResize, { passive: true });
          window.addEventListener('resize', onScrollOrResize, { passive: true });
          updateProgress();
        } else {
          window.removeEventListener('scroll', onScrollOrResize);
          window.removeEventListener('resize', onScrollOrResize);
        }
      },
      { rootMargin: '250px 0px' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [thresholdStart, thresholdEnd]);

  // Derived style transformations
  const effectiveProgress = mounted ? progress : 1;
  const currentRotation = (1 - effectiveProgress) * maxRotation;
  const currentScale = minScale + effectiveProgress * (1 - minScale);
  const currentY = (1 - effectiveProgress) * translateY;
  const sheenOpacity = (1 - effectiveProgress) * 0.20;

  return (
    <div
      ref={containerRef}
      className={cn('relative scroll-unfold-perspective', containerClassName)}
      style={{
        perspective: '1200px',
        perspectiveOrigin: origin === 'top' ? '50% 20%' : '50% 80%',
      }}
    >
      <div
        className={cn('scroll-unfold-card relative', className)}
        style={{
          transformOrigin: origin === 'top' ? 'center top' : 'center bottom',
          transform: `perspective(1200px) rotateX(${currentRotation.toFixed(2)}deg) scale(${currentScale.toFixed(3)}) translateY(${currentY.toFixed(1)}px)`,
          willChange: 'transform, opacity',
        }}
      >
        {typeof children === 'function' ? children(effectiveProgress) : children}

        {/* Specular 3D Light Sheen when folded/opening */}
        {enableSheen && effectiveProgress < 0.98 && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-150"
            style={{
              opacity: sheenOpacity,
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
