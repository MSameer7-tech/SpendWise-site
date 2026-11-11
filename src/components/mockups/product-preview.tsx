import React from 'react';
import { cn } from '@/lib/utils';
import { DesktopMockup } from './desktop-mockup';
import { PhoneMockup } from './phone-mockup';

export interface ProductPreviewProps {
  mode?: 'auto' | 'desktop' | 'mobile' | 'both';
  className?: string;
}

export function ProductPreview({
  mode = 'auto',
  className,
}: ProductPreviewProps) {
  if (mode === 'desktop') {
    return (
      <div className={cn('w-full flex justify-center', className)}>
        <DesktopMockup />
      </div>
    );
  }

  if (mode === 'mobile') {
    return (
      <div className={cn('w-full flex justify-center', className)}>
        <PhoneMockup />
      </div>
    );
  }

  if (mode === 'both') {
    return (
      <div className={cn('w-full flex flex-col lg:flex-row items-center justify-center gap-8', className)}>
        <DesktopMockup className="lg:w-2/3" />
        <PhoneMockup className="lg:w-1/3" />
      </div>
    );
  }

  // mode === 'auto':
  // Mobile (<768px): Shows PhoneMockup
  // Tablet & Desktop (>=768px): Shows DesktopMockup
  return (
    <div className={cn('w-full flex justify-center', className)}>
      <div className="block md:hidden w-full">
        <PhoneMockup />
      </div>
      <div className="hidden md:block w-full">
        <DesktopMockup />
      </div>
    </div>
  );
}
