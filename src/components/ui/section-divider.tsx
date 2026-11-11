import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionDividerProps {
  className?: string;
  variant?: 'line' | 'gradient';
}

export function SectionDivider({
  className,
  variant = 'line',
}: SectionDividerProps) {
  if (variant === 'gradient') {
    return (
      <div
        role="separator"
        className={cn(
          'h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-12 sm:my-16 md:my-20',
          className
        )}
      />
    );
  }

  return (
    <div
      role="separator"
      className={cn('h-px w-full bg-border my-12 sm:my-16 md:my-20', className)}
    />
  );
}
