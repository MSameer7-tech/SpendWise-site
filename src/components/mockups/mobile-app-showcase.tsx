'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Home,
  Receipt,
  Users,
  Sparkles,
  PieChart,
  CheckCircle2,
  Download,
} from 'lucide-react';

export type AppScreenId = 'home' | 'transactions' | 'groups' | 'assistant' | 'analytics';

export interface ScreenData {
  id: AppScreenId;
  label: string;
  icon: React.ReactNode;
  badge: string;
  headline: string;
  description: string;
  imageSrc: string;
  highlights: string[];
}

export const APP_SCREENS: Record<AppScreenId, ScreenData> = {
  home: {
    id: 'home',
    label: 'Home',
    icon: <Home className="h-4 w-4" />,
    badge: 'Cash Flow & Accounts',
    headline: 'Your financial life, at a glance.',
    description: 'See your balances, accounts and cash flow in one place. Instant visibility into daily net cash flow, bank liquidity, and roommate settlement alerts.',
    imageSrc: '/screens/spendwise-home.png',
    highlights: [
      'Multi-account liquidity across HDFC, ICICI, and Cash in hand',
      'Net cash flow hero with real-time monthly surplus tracking',
      'One-tap roommate settlement reminders and quick actions',
    ],
  },
  transactions: {
    id: 'transactions',
    label: 'Transactions',
    icon: <Receipt className="h-4 w-4" />,
    badge: 'Transaction Ledger',
    headline: 'Every transaction, organized.',
    description: 'Keep track of income, expenses and transfers without losing sight of the details. Instant search, date grouping, and category color coding.',
    imageSrc: '/screens/spendwise-transactions.png',
    highlights: [
      'Fast filtering by income, expense, transfer, date and category',
      'Daily sub-totals and clear positive/negative amount hierarchy',
      'Floating quick-add button for instant receipt recording',
    ],
  },
  groups: {
    id: 'groups',
    label: 'Groups',
    icon: <Users className="h-4 w-4" />,
    badge: 'Shared Expense Ledgers',
    headline: 'Shared expenses, sorted.',
    description: 'Know who paid, who owes and what needs to be settled. Multi-group expense tracking with equal, exact, and percentage splits.',
    imageSrc: '/screens/spendwise-groups.png',
    highlights: [
      'Shared group carousels for apartments, trips, and office teams',
      'Transparent itemized expenses with member split breakdowns',
      'Instant 1-tap NPCI UPI debt settlement with zero awkward math',
    ],
  },
  assistant: {
    id: 'assistant',
    label: 'Assistant',
    icon: <Sparkles className="h-4 w-4" />,
    badge: 'Financial Intelligence',
    headline: 'Your finances, explained.',
    description: 'Ask questions and understand your spending through the SpendWise Assistant. Conversational intelligence for your budget, burn pace, and balances.',
    imageSrc: '/screens/spendwise-assistant.png',
    highlights: [
      'Natural queries: monthly spend, category outlays, who owes you',
      'Context-aware answers derived from your actual financial data',
      'Strictly private and encrypted with on-device AI safeguards',
    ],
  },
  analytics: {
    id: 'analytics',
    label: 'Analytics',
    icon: <PieChart className="h-4 w-4" />,
    badge: 'Spending Intelligence',
    headline: 'Understand your money better.',
    description: 'Explore spending patterns, cash flow and budget performance. Proactive budget envelopes, daily burn velocity, and category donut charts.',
    imageSrc: '/screens/spendwise-analytics.png',
    highlights: [
      'Detailed spending over time charts with daily velocity peaks',
      'Proactive budget envelopes with automated daily pace limits',
      'Category breakdowns: Groceries, Dining, Entertainment, Utilities',
    ],
  },
};

export interface MobileAppShowcaseProps {
  className?: string;
  availableScreens?: AppScreenId[];
  defaultScreen?: AppScreenId;
  autoPlay?: boolean;
  intervalMs?: number;
  showEditorial?: boolean;
}

export function MobileAppShowcase({
  className,
  availableScreens = ['home', 'transactions', 'groups', 'assistant', 'analytics'],
  defaultScreen = 'home',
  autoPlay = true,
  intervalMs = 5000,
  showEditorial = true,
}: MobileAppShowcaseProps) {
  const [activeScreen, setActiveScreen] = useState<AppScreenId>(defaultScreen);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Filter available screen items
  const screensList = availableScreens.map((id) => APP_SCREENS[id]).filter(Boolean);
  const current = APP_SCREENS[activeScreen] || screensList[0] || APP_SCREENS.home;

  // Viewport intersection observer to pause autoPlay when not in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatic rotation timer
  useEffect(() => {
    if (!autoPlay || isPaused || !isInView || screensList.length <= 1) return;

    // Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      const currentIndex = availableScreens.indexOf(activeScreen);
      const nextIndex = (currentIndex + 1) % availableScreens.length;
      const nextScreen = availableScreens[nextIndex];
      if (nextScreen) {
        setActiveScreen(nextScreen);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [activeScreen, autoPlay, isPaused, isInView, intervalMs, availableScreens, screensList.length]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn('w-full max-w-5xl mx-auto space-y-8 sm:space-y-10', className)}
    >
      {/* 1. Screen Selector Pills (Home | Transactions | Groups | Assistant | Analytics) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/60 border border-border/60 max-w-2xl mx-auto overflow-x-auto no-scrollbar sm:justify-center">
        {screensList.map((screen) => {
          const isActive = activeScreen === screen.id;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() => {
                setActiveScreen(screen.id);
                setIsPaused(true);
              }}
              className={cn(
                'shrink-0 sm:flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300',
                isActive
                  ? 'bg-background text-foreground shadow-sm ring-1 ring-border/80'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <span className={isActive ? 'text-[#064e3b] dark:text-[#34D399]' : ''}>
                {screen.icon}
              </span>
              <span>{screen.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Responsive Presentation: Desktop 2-column or Centered Phone */}
      {showEditorial ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Synchronized Apple-style Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-1">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {current.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground transition-all duration-300">
                {current.headline}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed transition-all duration-300">
                {current.description}
              </p>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-3 pt-1 border-t border-border/50 pt-4">
              {current.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[#064e3b] dark:text-[#34D399] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Primary Marketing Actions */}
            <div className="pt-2 flex flex-col xs:flex-row gap-3">
              <Button variant="primary" size="md" href="/download" className="group justify-center">
                <Download className="mr-2 h-4 w-4" />
                Download Android APK
              </Button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Authentic screen capture from SpendWise for Android • Pauses on hover
            </p>
          </div>

          {/* Right Column: Premium Smartphone Showcase (Uniform h-[540px] with Notch) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-2 py-2 relative">
            {/* Subtle Ambient Radial Glow */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
            </div>

            {/* Balanced Smartphone Chassis (Exact 467/808 Aspect Ratio with Zero Cropping) */}
            <div className="relative mx-auto w-[240px] xs:w-[260px] sm:w-[285px] md:w-[300px] aspect-[467/808] overflow-hidden rounded-[36px] sm:rounded-[42px] border-[5px] sm:border-[6px] border-[#1F2937] dark:border-[#343B42] bg-white shadow-2xl shadow-slate-900/15 dark:shadow-black/60 select-none text-foreground transition-all duration-300 hover:scale-[1.01]">
              {/* Authentic Android Centered Punch-Hole Camera */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
                <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-black flex items-center justify-center ring-1 ring-white/10 shadow-xs">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Inner Screen Display Area - Exact 467/808 Aspect Ratio with Zero Cropping */}
              <div className="relative w-full h-full overflow-hidden rounded-[30px] sm:rounded-[36px] bg-white">
                {screensList.map((screen) => {
                  const isActive = activeScreen === screen.id;
                  return (
                    <div
                      key={screen.id}
                      className={cn(
                        'absolute inset-0 transition-opacity duration-350 ease-out',
                        isActive
                          ? 'opacity-100 z-10 pointer-events-auto'
                          : 'opacity-0 z-0 pointer-events-none'
                      )}
                    >
                      <Image
                        src={screen.imageSrc}
                        alt={`SpendWise ${screen.label} Screen`}
                        fill
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 285px, 300px"
                        priority={true}
                        className="object-cover object-top select-none"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Authentic Subtle Bottom Navigation Indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <div className="h-1 w-20 sm:w-24 rounded-full bg-black/25 dark:bg-white/25 backdrop-blur-xs" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standalone Showcase (Phone Only with Selector) */
        <div className="flex justify-center py-4 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
            <div className="h-80 w-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
          </div>

          <div className="relative mx-auto w-[240px] xs:w-[260px] sm:w-[285px] md:w-[300px] aspect-[467/808] overflow-hidden rounded-[36px] sm:rounded-[42px] border-[5px] sm:border-[6px] border-[#1F2937] dark:border-[#343B42] bg-background dark:bg-[#111315] shadow-2xl shadow-slate-900/15 dark:shadow-black/60 select-none text-foreground">
            {/* Authentic Android Centered Punch-Hole Camera */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
              <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-black flex items-center justify-center ring-1 ring-white/10 shadow-xs">
                <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            {/* Inner Screen Display Area - Exact 467/808 Aspect Ratio with Zero Cropping */}
            <div className="relative w-full h-full overflow-hidden rounded-[30px] sm:rounded-[36px] bg-background dark:bg-[#111315]">
              {screensList.map((screen) => {
                const isActive = activeScreen === screen.id;
                return (
                  <div
                    key={screen.id}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-350 ease-out',
                      isActive
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none'
                    )}
                  >
                    <Image
                      src={screen.imageSrc}
                      alt={`SpendWise ${screen.label} Screen`}
                      fill
                      sizes="(max-width: 640px) 260px, (max-width: 1024px) 285px, 300px"
                      priority={true}
                      className="object-contain object-top select-none"
                    />
                  </div>
                );
              })}
            </div>

            {/* Authentic Subtle Bottom Navigation Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="h-1 w-20 sm:w-24 rounded-full bg-black/25 dark:bg-white/25 backdrop-blur-xs" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
