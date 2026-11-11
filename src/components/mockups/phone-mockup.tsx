import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type PhoneScreenType = 'home' | 'transactions' | 'groups' | 'assistant' | 'analytics';

export interface PhoneMockupProps {
  className?: string;
  screen?: PhoneScreenType;
  priority?: boolean;
}

const SCREEN_ASSETS: Record<PhoneScreenType, { src: string; alt: string }> = {
  home: {
    src: '/screens/spendwise-home.png',
    alt: 'SpendWise Home Screen — Net Cash Flow, Accounts & Settle Up',
  },
  transactions: {
    src: '/screens/spendwise-transactions.png',
    alt: 'SpendWise Transactions Screen — Category Color Coding & Filters',
  },
  groups: {
    src: '/screens/spendwise-groups.png',
    alt: 'SpendWise Groups Screen — Shared Ledgers & UPI Settle',
  },
  assistant: {
    src: '/screens/spendwise-assistant.png',
    alt: 'SpendWise Assistant Screen — Conversational Financial Intelligence',
  },
  analytics: {
    src: '/screens/spendwise-analytics.png',
    alt: 'SpendWise Analytics Screen — Envelopes & Velocity Curves',
  },
};

export function PhoneMockup({
  className,
  screen = 'home',
  priority = false,
}: PhoneMockupProps) {
  const currentAsset = SCREEN_ASSETS[screen] || SCREEN_ASSETS.home;

  return (
    <div
      className={cn(
        'relative mx-auto w-[240px] xs:w-[260px] sm:w-[285px] md:w-[300px] aspect-[467/808] overflow-hidden rounded-[36px] sm:rounded-[42px] border-[5px] sm:border-[6px] border-[#1F2937] dark:border-[#343B42] bg-white shadow-2xl shadow-slate-900/15 dark:shadow-black/60 select-none text-foreground transition-all duration-300',
        className
      )}
    >
      {/* Authentic Android Centered Punch-Hole Camera */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
        <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-black flex items-center justify-center ring-1 ring-white/10 shadow-xs">
          <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      {/* Screen Body Display Area - Seamless Edge-to-Edge with Zero Bottom Gap */}
      <div className="relative w-full h-full overflow-hidden rounded-[30px] sm:rounded-[36px] bg-white">
        <Image
          src={currentAsset.src}
          alt={currentAsset.alt}
          fill
          sizes="(max-width: 640px) 260px, (max-width: 1024px) 285px, 300px"
          priority={priority}
          className="object-cover object-top select-none"
        />
      </div>
    </div>
  );
}
