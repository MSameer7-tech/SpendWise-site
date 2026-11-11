'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  Home,
  Receipt,
  Users,
  Sparkles,
  PieChart,
  LayoutDashboard,
  CreditCard,
  Zap,
  Search,
  CheckCircle2,
  Split,
  Scale,
  MessageSquare,
  Compass,
  TrendingUp,
  Layers,
  Download,
} from 'lucide-react';

export type AppScreenId = 'home' | 'transactions' | 'groups' | 'assistant' | 'analytics';

export interface FeatureHighlight {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ScreenData {
  id: AppScreenId;
  label: string;
  icon: React.ReactNode;
  eyebrowIcon: React.ReactNode;
  eyebrow: string;
  heading: string;
  description: string;
  imageSrc: string;
  features: FeatureHighlight[];
  glowColor: string;
}

export const SHOWCASE_SCREENS: ScreenData[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="h-4 w-4" />,
    eyebrowIcon: <LayoutDashboard className="h-3.5 w-3.5" />,
    eyebrow: 'YOUR MONEY, AT A GLANCE',
    heading: 'Your entire financial life, in one place.',
    description:
      'See your balances, accounts, income and spending in one clear view. Everything you need to understand your money, right when you open the app.',
    imageSrc: '/screens/spendwise-home.png',
    features: [
      {
        title: 'One clear overview',
        description: 'Your balances and cash flow, together.',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        title: 'All your accounts',
        description: 'Keep bank, cash and credit accounts organized.',
        icon: <CreditCard className="h-4 w-4" />,
      },
      {
        title: 'Quick actions',
        description: 'Add expenses, split bills and scan receipts with ease.',
        icon: <Zap className="h-4 w-4" />,
      },
    ],
    glowColor: 'from-emerald-500/15 via-teal-500/10 to-transparent',
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: <Receipt className="h-4 w-4" />,
    eyebrowIcon: <Receipt className="h-3.5 w-3.5" />,
    eyebrow: 'EVERY RUPEE, ACCOUNTED FOR',
    heading: 'Stay on top of every transaction.',
    description:
      'Keep income, expenses and transfers organized in one timeline. Find what you need with simple filters and clear transaction details.',
    imageSrc: '/screens/spendwise-transactions.png',
    features: [
      {
        title: 'Everything in one timeline',
        description: 'Browse income, expenses and transfers.',
        icon: <Receipt className="h-4 w-4" />,
      },
      {
        title: 'Find it faster',
        description: 'Filter by date, account and category.',
        icon: <Search className="h-4 w-4" />,
      },
      {
        title: 'Clear transaction details',
        description: 'See payment methods, categories and amounts at a glance.',
        icon: <CheckCircle2 className="h-4 w-4" />,
      },
    ],
    glowColor: 'from-blue-500/15 via-indigo-500/10 to-transparent',
  },
  {
    id: 'groups',
    label: 'Groups',
    icon: <Users className="h-4 w-4" />,
    eyebrowIcon: <Users className="h-3.5 w-3.5" />,
    eyebrow: 'BETTER TOGETHER',
    heading: 'Shared expenses, without the awkward maths.',
    description:
      'From apartment bills to weekend trips, keep shared expenses transparent. Know who paid, who owes and how much everyone needs to settle.',
    imageSrc: '/screens/spendwise-groups.png',
    features: [
      {
        title: 'One place for every group',
        description: 'Organize expenses for home, trips and friends.',
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: 'Flexible bill splitting',
        description: 'Divide expenses fairly between members.',
        icon: <Split className="h-4 w-4" />,
      },
      {
        title: 'Clear balances',
        description: 'See outstanding amounts and settle up easily.',
        icon: <Scale className="h-4 w-4" />,
      },
    ],
    glowColor: 'from-emerald-600/15 via-green-500/10 to-transparent',
  },
  {
    id: 'assistant',
    label: 'Assistant',
    icon: <Sparkles className="h-4 w-4" />,
    eyebrowIcon: <Sparkles className="h-3.5 w-3.5" />,
    eyebrow: 'YOUR PERSONAL FINANCE COMPANION',
    heading: 'Ask questions. Understand your money.',
    description:
      'Have a conversation with your finances. Ask about spending, budgets and group balances, and get answers grounded in your financial activity.',
    imageSrc: '/screens/spendwise-assistant.png',
    features: [
      {
        title: 'Ask naturally',
        description: 'No complicated reports or filters.',
        icon: <MessageSquare className="h-4 w-4" />,
      },
      {
        title: 'Understand your spending',
        description: 'Get useful answers about your financial activity.',
        icon: <Sparkles className="h-4 w-4" />,
      },
      {
        title: 'Make informed decisions',
        description: 'Get a clearer picture of your budget and expenses.',
        icon: <Compass className="h-4 w-4" />,
      },
    ],
    glowColor: 'from-indigo-500/15 via-purple-500/10 to-transparent',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <PieChart className="h-4 w-4" />,
    eyebrowIcon: <PieChart className="h-3.5 w-3.5" />,
    eyebrow: 'SEE THE BIGGER PICTURE',
    heading: 'Understand where your money goes.',
    description:
      'Turn everyday transactions into a clearer financial picture. Explore spending trends, track budgets and understand your saving patterns.',
    imageSrc: '/screens/spendwise-analytics.png',
    features: [
      {
        title: 'Spending trends',
        description: 'See how your spending changes over time.',
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        title: 'Budget envelopes',
        description: 'Track progress and stay within your limits.',
        icon: <Layers className="h-4 w-4" />,
      },
      {
        title: 'Category insights',
        description: 'Understand where your money goes.',
        icon: <PieChart className="h-4 w-4" />,
      },
    ],
    glowColor: 'from-teal-500/15 via-emerald-500/10 to-transparent',
  },
];

function AndroidShowcaseContent() {
  const searchParams = useSearchParams();
  const urlScreen = searchParams.get('screen') as AppScreenId | null;

  const initialIndex = urlScreen
    ? Math.max(
        0,
        SHOWCASE_SCREENS.findIndex((s) => s.id === urlScreen)
      )
    : 0;

  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX === null) return;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, SHOWCASE_SCREENS.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    }
    touchStartXRef.current = null;
  };

  // If URL contains ?screen=..., jump directly to that screen's vertical scroll position
  useEffect(() => {
    if (urlScreen) {
      const idx = SHOWCASE_SCREENS.findIndex((s) => s.id === urlScreen);
      if (idx !== -1 && sectionRef.current) {
        setIsManualSelection(true);
        setActiveIndex(idx);
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (isDesktop) {
          const rect = sectionRef.current.getBoundingClientRect();
          const scrollTop = window.scrollY || window.pageYOffset;
          const sectionTop = rect.top + scrollTop;
          const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
          if (totalDistance > 0) {
            const stepSize = totalDistance / SHOWCASE_SCREENS.length;
            window.scrollTo({
              top: sectionTop + (idx + 0.5) * stepSize,
              behavior: 'instant' as ScrollBehavior,
            });
          }
        }
        setTimeout(() => setIsManualSelection(false), 600);
      }
    }
  }, [urlScreen]);

  // Track vertical scroll progress through this section (desktop only)
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;

        // On mobile (<1024px), scrolling is natural document flow; tabs/swipe control activeIndex
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (!isDesktop) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalDistance = rect.height - windowHeight;

        if (totalDistance <= 0) return;

        // Current scroll progress through the track (0.0 to 1.0)
        const currentScrolled = -rect.top;
        const rawProgress = currentScrolled / totalDistance;
        const progress = Math.min(Math.max(rawProgress, 0), 0.9999);

        setScrollProgress(progress);

        // Map progress to the 5 screens with smooth hysteresis buffer
        if (!isManualSelection) {
          const stepSize = 1 / SHOWCASE_SCREENS.length;
          setActiveIndex((prev) => {
            const currentMin = prev * stepSize;
            const currentMax = (prev + 1) * stepSize;
            // 2% hysteresis deadband prevents jumping when scrolling near boundary
            if (prev > 0 && progress < currentMin - 0.02) {
              return Math.max(0, prev - 1);
            }
            if (prev < SHOWCASE_SCREENS.length - 1 && progress > currentMax + 0.02) {
              return Math.min(SHOWCASE_SCREENS.length - 1, prev + 1);
            }
            if (progress >= currentMin && progress <= currentMax) {
              return prev;
            }
            return Math.min(
              Math.max(Math.floor(progress / stepSize), 0),
              SHOWCASE_SCREENS.length - 1
            );
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isManualSelection]);

  // Smoothly scroll page to a specific screen step
  const scrollToStep = (index: number) => {
    setActiveIndex(index);

    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    if (!isDesktop || !sectionRef.current) return;

    setIsManualSelection(true);
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }
    manualTimeoutRef.current = setTimeout(() => {
      setIsManualSelection(false);
    }, 850);

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const sectionTop = rect.top + scrollTop;
    const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;

    if (totalDistance <= 0) return;

    const stepSize = totalDistance / SHOWCASE_SCREENS.length;
    const targetY = sectionTop + (index + 0.5) * stepSize;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="android-app"
      ref={sectionRef}
      className="relative bg-transparent border-b border-border/50 pt-20 sm:pt-24 lg:pt-0 pb-12 sm:pb-16 lg:pb-0 lg:h-[400vh] lg:min-h-[400vh]"
    >
      {/* Sticky Fullscreen Showcase Frame on Desktop / Natural Flow on Mobile */}
      <div className="relative w-full flex flex-col justify-center items-center px-3.5 sm:px-6 lg:px-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:pt-24 lg:pb-6">
        <Container size="lg" className="w-full flex flex-col justify-center max-w-6xl">
          {/* Main Section Heading: Matching Reference Image Typography */}
          <div className="text-center mb-4 sm:mb-6 space-y-1.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] [text-wrap:balance]">
              Your finances,{' '}
              <span className="italic font-semibold text-emerald-700 dark:text-[#34D399]">
                wherever you go.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#B3BAC2] max-w-2xl mx-auto [text-wrap:balance]">
              A complete money manager in your pocket — track, share, analyze and get AI-powered insights.
            </p>
          </div>

          {/* Main Showcase Glass Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-5 sm:p-7 lg:p-9 shadow-2xl shadow-slate-900/5 dark:shadow-black/50 relative flex flex-col justify-between">
            {/* Top Interactive Selector Tabs (Matching Reference Image) */}
            <div className="relative mb-5 sm:mb-7">
              <div className="flex items-center gap-1 sm:gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#15181B] border border-slate-200 dark:border-[#2A3036] max-w-2xl mx-auto overflow-x-auto no-scrollbar justify-start sm:justify-center">
                {SHOWCASE_SCREENS.map((screen, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      className={cn(
                        'relative shrink-0 sm:flex-1 flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer',
                        isActive
                          ? 'bg-emerald-100/90 text-emerald-900 dark:bg-[#1B352E] dark:text-[#34D399] ring-1 ring-emerald-300/70 dark:ring-[#123D32] shadow-xs'
                          : 'text-slate-600 dark:text-[#858E98] hover:text-slate-900 dark:hover:text-[#F5F5F5] hover:bg-slate-200/60 dark:hover:bg-[#22272C]'
                      )}
                    >
                      <span className={isActive ? 'text-emerald-800 dark:text-[#34D399]' : ''}>
                        {screen.icon}
                      </span>
                      <span>{screen.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Thin Continuous Scroll Progress Line underneath tabs */}
              <div className="mt-2.5 h-0.5 w-full max-w-2xl mx-auto bg-slate-200/60 dark:bg-[#2A3036] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 transition-all duration-150 ease-out"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            {/* Split Content: Animated Editorial Copy (Left) + Balanced Smartphone Mockup (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              {/* Left Column: Smoothly Animated Editorial Text */}
              <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
                {/* Dynamic Screen Text Block with Silky Parallax Crossfade */}
                <div className="relative min-h-[260px] xs:min-h-[280px] sm:min-h-[300px] flex items-center">
                  {SHOWCASE_SCREENS.map((screen, idx) => {
                    const isActive = activeIndex === idx;
                    const isPast = activeIndex > idx;
                    return (
                      <div
                        key={screen.id}
                        className={cn(
                          'transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-center text-left w-full',
                          isActive
                            ? 'opacity-100 translate-y-0 relative z-10 pointer-events-auto'
                            : isPast
                            ? 'opacity-0 -translate-y-3 absolute inset-0 pointer-events-none z-0'
                            : 'opacity-0 translate-y-3 absolute inset-0 pointer-events-none z-0'
                        )}
                      >
                        {/* Eyebrow Badge with Icon (Matching Reference Image) */}
                        <div className="inline-flex items-center gap-1.5 mb-2.5">
                          <span className="text-emerald-700 dark:text-[#34D399]">
                            {screen.eyebrowIcon}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 dark:text-[#34D399] tracking-wider uppercase">
                            {screen.eyebrow}
                          </span>
                        </div>

                        {/* Editorial Headline */}
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] mb-2.5 [text-wrap:balance]">
                          {screen.heading}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B3BAC2] leading-relaxed mb-4 sm:mb-5 max-w-xl">
                          {screen.description}
                        </p>

                        {/* Concise Feature Highlights (Icon Badge + Bold Title + Subtitle) */}
                        <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-[#2A3036]">
                          {screen.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100/70 text-emerald-800 dark:bg-[#1B352E] dark:text-[#34D399] shadow-2xs">
                                {feat.icon}
                              </div>
                              <div className="space-y-0.5">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
                                  {feat.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-[#858E98] leading-relaxed">
                                  {feat.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Persistent Primary Actions (Solid, grounded & calm) */}
                <div className="flex flex-wrap items-center gap-3 mt-5 sm:mt-6">
                  <Button
                    variant="primary"
                    size="sm"
                    href="/download"
                    className="group bg-[#064e3b] hover:bg-[#064e3b]/90 text-white dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] shadow-sm font-semibold"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Android APK
                  </Button>
                </div>
              </div>

              {/* Right Column: Premium Smartphone Showcase with Dynamic Notch */}
              <div className="lg:col-span-6 flex justify-center items-center relative order-1 lg:order-2 py-2">
                {/* Balanced Smartphone Chassis (Exact 467/808 Aspect Ratio with Zero Cropping) */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className="relative mx-auto w-[240px] xs:w-[260px] sm:w-[285px] lg:w-[300px] aspect-[467/808] overflow-hidden rounded-[36px] sm:rounded-[42px] border-[5px] sm:border-[6px] border-[#1F2937] dark:border-[#343B42] bg-white shadow-2xl shadow-slate-900/15 dark:shadow-black/60 select-none text-foreground"
                >
                  {/* Authentic Android Centered Punch-Hole Camera */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
                    <div className="h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-black flex items-center justify-center ring-1 ring-white/10 shadow-xs">
                      <span className="h-1 w-1 rounded-full bg-emerald-500/80" />
                    </div>
                  </div>

                  {/* Inner Screen Display Area (Silky Crossfade with Subtle Vertical Parallax, No Scale Warp, Zero Cropping) */}
                  <div className="relative w-full h-full overflow-hidden rounded-[30px] sm:rounded-[36px] bg-white">
                    {SHOWCASE_SCREENS.map((screen, idx) => {
                      const isActive = activeIndex === idx;
                      const isPast = activeIndex > idx;
                      return (
                        <div
                          key={screen.id}
                          className={cn(
                            'absolute inset-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
                            isActive
                              ? 'opacity-100 translate-y-0 z-10 pointer-events-auto'
                              : isPast
                              ? 'opacity-0 -translate-y-2 z-0 pointer-events-none'
                              : 'opacity-0 translate-y-2 z-0 pointer-events-none'
                          )}
                        >
                          <Image
                            src={screen.imageSrc}
                            alt={`SpendWise ${screen.label} Screen`}
                            fill
                            sizes="(max-width: 640px) 260px, 300px"
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
          </div>
        </Container>
      </div>
    </section>
  );
}

export function AndroidShowcaseSection() {
  return (
    <Suspense fallback={null}>
      <AndroidShowcaseContent />
    </Suspense>
  );
}
