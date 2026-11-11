'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Share2,
  LayoutGrid,
  Clock,
  Wallet,
  BarChart2,
  ChevronDown,
  ChevronRight,
  PiggyBank,
  Flame,
  TrendingUp,
  Sparkles,
  Home,
  Receipt,
  Users,
  PieChart,
  Settings,
  ShoppingBag,
  Utensils,
  Film,
  ShieldCheck,
} from 'lucide-react';

export type AnalyticsTab = 'overview' | 'spending' | 'budget' | 'trends';

export interface AnalyticsPhoneShowcaseProps {
  className?: string;
  activeTab?: AnalyticsTab;
  onTabChange?: (tab: AnalyticsTab) => void;
  autoPlay?: boolean;
  intervalMs?: number;
}

export function AnalyticsPhoneShowcase({
  className,
  activeTab: controlledTab,
  onTabChange,
  autoPlay = true,
  intervalMs = 4500,
}: AnalyticsPhoneShowcaseProps) {
  const [internalTab, setInternalTab] = useState<AnalyticsTab>('overview');
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const activeTab = controlledTab ?? internalTab;

  const tabs: { id: AnalyticsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutGrid className="h-2.5 w-2.5" /> },
    { id: 'spending', label: 'Spending', icon: <Clock className="h-2.5 w-2.5" /> },
    { id: 'budget', label: 'Budget', icon: <Wallet className="h-2.5 w-2.5" /> },
    { id: 'trends', label: 'Trends', icon: <BarChart2 className="h-2.5 w-2.5" /> },
  ];

  const handleTabChange = (tab: AnalyticsTab) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (onTabChange) {
        onTabChange(tab);
      } else {
        setInternalTab(tab);
      }
      setIsTransitioning(false);
    }, 120);
  };

  // IntersectionObserver to pause autoPlay when phone is out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto rotation timer
  useEffect(() => {
    if (!autoPlay || isPaused || !isInView) return;

    // Check prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      const order: AnalyticsTab[] = ['overview', 'spending', 'trends', 'budget'];
      const currentIndex = order.indexOf(activeTab);
      const nextIndex = (currentIndex + 1) % order.length;
      handleTabChange(order[nextIndex]!);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [activeTab, autoPlay, isPaused, isInView, intervalMs]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        'relative mx-auto w-[280px] xs:w-[300px] sm:w-[320px] h-[540px] flex flex-col justify-between overflow-hidden rounded-[38px] border-[5px] border-[#1F2937] dark:border-[#343B42] bg-background dark:bg-[#111315] shadow-2xl shadow-foreground/10 select-none text-foreground transition-all duration-300',
        className
      )}
    >
      {/* Top Phone Frame with Dynamic Island Notch */}
      <div className="relative flex h-8 shrink-0 items-center justify-center bg-background px-6 pt-1">
        <div className="h-4 w-20 rounded-full bg-black/90 dark:bg-black/80 flex items-center justify-end pr-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 flex flex-col justify-between p-3.5 overflow-hidden bg-slate-50/70 dark:bg-[#111315]">
        {/* App Topbar for Analytics */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1.5">
            <Image
              src="/icon.png"
              alt="SpendWise"
              width={22}
              height={22}
              className="h-5.5 w-5.5 rounded-lg shadow-xs object-contain"
              priority
            />
            <span className="text-xs font-bold tracking-tight text-foreground">SpendWise Analytics</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Calendar view"
              className="h-6.5 w-6.5 rounded-full border border-border/80 bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <Calendar className="h-3 w-3" />
            </button>
            <button
              type="button"
              aria-label="Share analytics"
              className="h-6.5 w-6.5 rounded-full border border-border/80 bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            >
              <Share2 className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Top In-App Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 text-[8.5px] font-medium text-center pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'inline-flex items-center justify-center gap-0.5 rounded-full py-1 transition-all duration-300',
                  isActive
                    ? 'bg-[#064e3b] dark:bg-[#064e3b] text-white font-bold shadow-xs'
                    : 'border border-border/70 bg-card text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Insights Dropdown Header */}
        <div className="flex items-center justify-between text-[8.5px] pb-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-foreground">Insights for</span>
            <div className="inline-flex items-center gap-0.5 rounded-full border border-border/80 bg-secondary/60 px-2 py-0.5 font-bold text-foreground">
              <span>Last 30 Days</span>
              <ChevronDown className="h-2.5 w-2.5 text-muted-foreground" />
            </div>
          </div>
          <span className="text-[7.5px] text-muted-foreground">vs. previous 30 days</span>
        </div>

        {/* Animated Screen Content Area */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className={cn(
              'h-full flex flex-col justify-between transition-all duration-300 ease-out',
              isTransitioning ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
            )}
          >
            {/* SCREEN 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                {/* 3 Metric Cards Carousel */}
                <div className="flex gap-1.5 overflow-x-hidden">
                  <div className="flex-1 min-w-0 rounded-2xl border border-border/70 bg-card p-2 space-y-0.5 shadow-2xs">
                    <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <PiggyBank className="h-3 w-3" />
                    </div>
                    <p className="text-[8px] text-muted-foreground truncate">Savings Rate</p>
                    <p className="text-[11px] font-bold tabular-nums text-foreground">83.8%</p>
                    <p className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold">↑ +5.2%</p>
                  </div>

                  <div className="flex-1 min-w-0 rounded-2xl border border-border/70 bg-card p-2 space-y-0.5 shadow-2xs">
                    <div className="h-6 w-6 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                      <Flame className="h-3 w-3" />
                    </div>
                    <p className="text-[8px] text-muted-foreground truncate">Daily Burn</p>
                    <p className="text-[11px] font-bold tabular-nums text-foreground">₹981</p>
                    <p className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold">↓ -12.4%</p>
                  </div>

                  <div className="flex-1 min-w-0 rounded-2xl border border-border/70 bg-card p-2 space-y-0.5 shadow-2xs">
                    <div className="h-6 w-6 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                    <p className="text-[8px] text-muted-foreground truncate">Total Spent</p>
                    <p className="text-[11px] font-bold tabular-nums text-foreground">₹29,450</p>
                    <p className="text-[7.5px] text-orange-500 font-bold">↑ +3.8%</p>
                  </div>
                </div>

                {/* November Budget Envelope (Forest Green) */}
                <div className="rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#054738] to-[#032e23] p-2.5 text-white shadow-md shadow-emerald-950/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold leading-tight text-white">November Budget Envelope</p>
                      <p className="text-[8px] text-white/70">₹29,450 of ₹38,000 spent</p>
                    </div>
                    <div className="inline-flex items-center gap-0.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[8.5px] font-bold text-white">
                      <span>78%</span>
                      <ChevronRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full rounded-full bg-[#34d399] w-[78%]" />
                  </div>
                </div>

                {/* Spending Over Time Bar Chart Preview */}
                <div className="rounded-2xl border border-border/70 bg-card p-2 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BarChart2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[9px] font-bold text-foreground">Spending Over Time</span>
                    </div>
                    <div className="flex items-center rounded-full bg-secondary/80 p-0.5 text-[7px]">
                      <span className="rounded-full bg-[#064e3b] text-white px-1.5 py-0.5 font-bold">Expense</span>
                      <span className="text-muted-foreground px-1 py-0.5">Income</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Nov 21: ₹6,200</span>
                  </div>

                  <div className="flex items-end justify-between h-8 pt-0.5 px-1 gap-1 border-b border-border/50">
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[30%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[45%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[25%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[60%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[40%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[55%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[35%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[50%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[40%]" />
                    <div className="w-1.5 bg-emerald-500/60 rounded-t-xs h-[65%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[48%]" />
                    <div className="w-1.5 bg-[#064e3b] dark:bg-[#34d399] rounded-t-xs h-[95%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[52%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[35%]" />
                  </div>
                  <div className="flex justify-between text-[6.5px] text-muted-foreground px-0.5">
                    <span>Nov 1</span>
                    <span>Nov 7</span>
                    <span>Nov 13</span>
                    <span>Nov 19</span>
                    <span>Nov 25</span>
                    <span>Nov 30</span>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 2: SPENDING BREAKDOWN */}
            {activeTab === 'spending' && (
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                {/* Donut Chart & Category Percentages Card */}
                <div className="rounded-2xl border border-border/70 bg-card p-2.5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-foreground">Top Spending Categories</span>
                    <span className="text-[8px] font-bold text-[#064e3b] dark:text-[#34D399] flex items-center">
                      4 categories <ChevronRight className="h-2.5 w-2.5 ml-0.5" />
                    </span>
                  </div>

                  {/* Donut Chart + Legend */}
                  <div className="flex items-center gap-3">
                    {/* Donut SVG */}
                    <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
                        {/* Groceries: 38% -> dasharray 95.5, circumference 251.2 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="14"
                          strokeDasharray="95.45 155.75"
                          strokeDashoffset="0"
                        />
                        {/* Dining Out: 29% -> dasharray 72.8 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#F97316"
                          strokeWidth="14"
                          strokeDasharray="72.84 178.36"
                          strokeDashoffset="-95.45"
                        />
                        {/* Entertainment: 18% -> dasharray 45.2 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#8B5CF6"
                          strokeWidth="14"
                          strokeDasharray="45.21 205.99"
                          strokeDashoffset="-168.29"
                        />
                        {/* Utilities: 15% -> dasharray 37.7 */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="14"
                          strokeDasharray="37.68 213.52"
                          strokeDashoffset="-213.5"
                        />
                      </svg>
                      {/* Center Total */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-extrabold tabular-nums leading-tight text-foreground">
                          ₹29,450
                        </span>
                        <span className="text-[7px] text-muted-foreground uppercase tracking-wider">Total</span>
                      </div>
                    </div>

                    {/* Category Legend */}
                    <div className="flex-1 space-y-1 text-[8px]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                          <span className="font-semibold text-foreground">Groceries</span>
                        </div>
                        <span className="font-bold tabular-nums text-foreground">38%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                          <span className="font-semibold text-foreground">Dining Out</span>
                        </div>
                        <span className="font-bold tabular-nums text-foreground">29%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
                          <span className="font-semibold text-foreground">Entertainment</span>
                        </div>
                        <span className="font-bold tabular-nums text-foreground">18%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                          <span className="font-semibold text-foreground">Utilities</span>
                        </div>
                        <span className="font-bold tabular-nums text-foreground">15%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itemized Category Breakdown Strip */}
                <div className="rounded-2xl border border-border/70 bg-card p-2 space-y-1.5 shadow-2xs">
                  <span className="text-[9px] font-bold text-foreground">Category Breakdown</span>
                  <div className="space-y-1 text-[8px]">
                    <div className="flex items-center justify-between p-1 rounded-lg bg-secondary/40">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-md bg-amber-500/10 text-amber-600 flex items-center justify-center">
                          <ShoppingBag className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground leading-tight">Groceries &amp; Staples</p>
                          <p className="text-[7px] text-muted-foreground">12 transactions</p>
                        </div>
                      </div>
                      <span className="font-bold tabular-nums text-foreground">₹11,191.00</span>
                    </div>

                    <div className="flex items-center justify-between p-1 rounded-lg bg-secondary/40">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-md bg-orange-500/10 text-orange-600 flex items-center justify-center">
                          <Utensils className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground leading-tight">Dining &amp; Takeout</p>
                          <p className="text-[7px] text-muted-foreground">8 transactions</p>
                        </div>
                      </div>
                      <span className="font-bold tabular-nums text-foreground">₹8,540.00</span>
                    </div>

                    <div className="flex items-center justify-between p-1 rounded-lg bg-secondary/40">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-md bg-purple-500/10 text-purple-600 flex items-center justify-center">
                          <Film className="h-3 w-3" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground leading-tight">Entertainment &amp; OTT</p>
                          <p className="text-[7px] text-muted-foreground">4 transactions</p>
                        </div>
                      </div>
                      <span className="font-bold tabular-nums text-foreground">₹5,301.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: BUDGET & SAVINGS */}
            {activeTab === 'budget' && (
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                {/* Hero Budget Envelope */}
                <div className="rounded-2xl bg-gradient-to-br from-[#064e3b] via-[#054738] to-[#032e23] p-3 text-white shadow-md shadow-emerald-950/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-white/70 uppercase tracking-wider font-semibold">Active Envelope</span>
                      <h4 className="text-[11px] font-extrabold text-white">November Budget</h4>
                    </div>
                    <div className="inline-flex items-center gap-0.5 rounded-full bg-white/15 px-2 py-0.5 text-[8.5px] font-bold text-white">
                      <span>78% Used</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-0.5">
                    <div>
                      <p className="text-[16px] font-extrabold tabular-nums text-white">₹29,450</p>
                      <p className="text-[7.5px] text-white/70">Total spent this cycle</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold tabular-nums text-[#6ee7b7]">₹8,550 left</p>
                      <p className="text-[7.5px] text-white/70">from ₹38,000 envelope</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
                      <div className="h-full rounded-full bg-[#34d399] w-[78%]" />
                    </div>
                    <div className="flex justify-between text-[7px] text-white/75 font-medium">
                      <span>9 days remaining</span>
                      <span>₹950 / day safe pace</span>
                    </div>
                  </div>
                </div>

                {/* Sub-Envelopes & Velocity Guard */}
                <div className="rounded-2xl border border-border/70 bg-card p-2.5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-bold text-foreground">Envelope Allocation</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="h-2.5 w-2.5" /> Pacing On Track
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[8px]">
                    {/* Fixed Outflows */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Essentials &amp; Rent</span>
                        <span className="tabular-nums text-foreground">₹16,000 / ₹16,000 (100%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500 w-[100%]" />
                      </div>
                    </div>

                    {/* Discretionary */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Dining &amp; Groceries</span>
                        <span className="tabular-nums text-foreground">₹8,450 / ₹12,000 (70%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-amber-500 w-[70%]" />
                      </div>
                    </div>

                    {/* Leisure */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Discretionary Splits</span>
                        <span className="tabular-nums text-foreground">₹5,000 / ₹10,000 (50%)</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-purple-500 w-[50%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Daily Burn Rate Card */}
                <div className="rounded-xl bg-secondary/50 border border-border/60 p-2 flex items-center justify-between text-[8px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <Flame className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Burn Velocity: ₹981/day</p>
                      <p className="text-[7px] text-muted-foreground">↓ 12.4% lower than last cycle</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.5 text-[7.5px]">
                    Safe Range
                  </span>
                </div>
              </div>
            )}

            {/* SCREEN 4: TRENDS & CASH VELOCITY */}
            {activeTab === 'trends' && (
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                {/* Spending Over Time Bar Chart */}
                <div className="rounded-2xl border border-border/70 bg-card p-2.5 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <BarChart2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[9.5px] font-bold text-foreground">Spending Over Time</span>
                    </div>
                    <div className="flex items-center rounded-full bg-secondary/80 p-0.5 text-[7.5px]">
                      <span className="rounded-full bg-[#064e3b] text-white px-1.5 py-0.5 font-bold">Expense</span>
                      <span className="text-muted-foreground px-1.5 py-0.5">Income</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[7.5px]">
                    <span className="text-muted-foreground font-mono">30-day velocity</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Nov 21: ₹6,200 (Weekend Peak)
                    </span>
                  </div>

                  {/* 14 High-Contrast Vertical Bar Chart */}
                  <div className="flex items-end justify-between h-14 pt-1 px-1 gap-1 border-b border-border/50">
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[30%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[45%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[25%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[60%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[40%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[55%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[35%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[50%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[40%]" />
                    <div className="w-1.5 bg-emerald-500/60 rounded-t-xs h-[65%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[48%]" />
                    <div className="w-1.5 bg-[#064e3b] dark:bg-[#34d399] rounded-t-xs h-[95%]" />
                    <div className="w-1.5 bg-emerald-500/50 rounded-t-xs h-[52%]" />
                    <div className="w-1.5 bg-emerald-500/40 rounded-t-xs h-[35%]" />
                  </div>
                  <div className="flex justify-between text-[7px] text-muted-foreground px-0.5">
                    <span>Nov 1</span>
                    <span>Nov 7</span>
                    <span>Nov 13</span>
                    <span>Nov 19</span>
                    <span>Nov 25</span>
                    <span>Nov 30</span>
                  </div>
                </div>

                {/* Cash Flow Summary Inflow vs Outflow */}
                <div className="rounded-2xl border border-border/70 bg-card p-2.5 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="font-bold text-foreground">Cash Flow Balance</span>
                    <span className="text-[7.5px] text-emerald-600 dark:text-emerald-400 font-bold">+81.3% Net Retained</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[8px]">
                    <div className="p-1.5 rounded-xl bg-secondary/50 space-y-0.5">
                      <span className="text-[7px] text-muted-foreground">Monthly Inflow</span>
                      <p className="font-bold tabular-nums text-foreground">₹1,57,500.00</p>
                      <span className="text-[7px] text-emerald-600 dark:text-emerald-400 font-semibold">Salary &amp; deposits</span>
                    </div>

                    <div className="p-1.5 rounded-xl bg-secondary/50 space-y-0.5">
                      <span className="text-[7px] text-muted-foreground">Total Outflows</span>
                      <p className="font-bold tabular-nums text-foreground">₹29,450.00</p>
                      <span className="text-[7px] text-muted-foreground">Envelopes &amp; bills</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Native Mobile Bottom Navigation Bar (6 Tabs matching current UI) */}
        <div className="flex items-center justify-between border-t border-border/60 pt-2 pb-0.5 text-[8.5px] text-muted-foreground shrink-0">
          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 flex items-center justify-center">
              <Home className="h-3.5 w-3.5" />
            </div>
            <span className="pt-0.5">Home</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 flex items-center justify-center">
              <Receipt className="h-3.5 w-3.5" />
            </div>
            <span className="pt-0.5">Transactions</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 flex items-center justify-center">
              <Users className="h-3.5 w-3.5" />
            </div>
            <span className="pt-0.5">Groups</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative px-2 py-0.5 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="absolute top-0 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="pt-0.5">Assistant</span>
          </div>

          <div className="flex flex-col items-center text-[#064e3b] dark:text-[#34D399] font-bold">
            <div className="rounded-full px-2 py-0.5 flex items-center justify-center bg-emerald-500/15">
              <PieChart className="h-3.5 w-3.5" />
            </div>
            <span className="pt-0.5">Analytics</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="px-2 py-0.5 flex items-center justify-center">
              <Settings className="h-3.5 w-3.5" />
            </div>
            <span className="pt-0.5">Settings</span>
          </div>
        </div>
      </div>

      {/* iPhone Home Indicator bar */}
      <div className="flex h-4 shrink-0 items-center justify-center bg-background pb-1">
        <div className="h-1 w-24 rounded-full bg-foreground/20" />
      </div>
    </div>
  );
}
