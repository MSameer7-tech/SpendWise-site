import React from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export interface DesktopMockupProps {
  className?: string;
}

export function DesktopMockup({ className }: DesktopMockupProps) {
  return (
    <div
      className={cn(
        'w-full max-w-4xl overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] shadow-2xl shadow-slate-900/10 dark:shadow-black/70 transition-all duration-300 select-none',
        className
      )}
    >
      {/* Browser Title Bar */}
      <div className="flex h-10 items-center justify-between border-b border-slate-200/80 dark:border-[#2A3036] bg-slate-50/90 dark:bg-[#191D21] px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#EF4444]/80" />
          <span className="h-3 w-3 rounded-full bg-[#F59E0B]/80" />
          <span className="h-3 w-3 rounded-full bg-[#10B981]/80" />
        </div>
        <div className="flex items-center gap-2 rounded-md border border-slate-200 dark:border-[#343B42] bg-white/95 dark:bg-[#22272C] px-3 py-1 text-[11px] font-mono text-slate-600 dark:text-[#B3BAC2]">
          <ShieldCheck className="h-3 w-3 text-emerald-600 dark:text-[#34D399]" />
          <span>spendwise.app/dashboard</span>
        </div>
        <div className="w-10" />
      </div>

      {/* Internal Dashboard Mockup */}
      <div className="p-4 sm:p-5 space-y-4 bg-slate-50/40 dark:bg-[#15181B]">
        {/* Top metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-[#858E98] font-medium truncate block">
              Net Liquidity
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold tabular-nums tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                ₹42,500
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-[#34D399] flex items-center">
                +12.4% <TrendingUp className="h-2.5 w-2.5 ml-0.5" />
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-[#858E98] font-medium truncate block">
              Group Credit
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold tabular-nums tracking-tight text-emerald-600 dark:text-[#34D399]">
                +₹3,850
              </span>
              <span className="text-[10px] text-slate-400 dark:text-[#858E98]">
                4 friends
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-[#858E98] font-medium truncate block">
              Monthly Inflow
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold tabular-nums tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                ₹85,000
              </span>
              <ArrowDownRight className="h-3 w-3 text-emerald-600 dark:text-[#34D399]" />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3 shadow-2xs">
            <span className="text-[11px] text-slate-500 dark:text-[#858E98] font-medium truncate block">
              Monthly Outflow
            </span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold tabular-nums tracking-tight text-slate-900 dark:text-[#F5F5F5]">
                ₹46,350
              </span>
              <ArrowUpRight className="h-3 w-3 text-slate-400 dark:text-[#858E98]" />
            </div>
          </div>
        </div>

        {/* Mid section: Split ledger + Cashflow simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Recent transactions (2 cols on desktop) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F5F5F5] tracking-tight">
                Recent Activity &amp; Splits
              </h4>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-[#34D399]">
                View All
              </span>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-[#2A3036]/80 text-xs">
              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 dark:bg-[#123D32] text-xs">
                    🛒
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-[#F5F5F5] truncate text-xs">
                      Nature&apos;s Basket
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-[#858E98] truncate">
                      Flat 302 Groceries • 3 members
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <p className="font-bold tabular-nums text-slate-900 dark:text-[#F5F5F5] text-xs">
                    ₹2,850
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-600 dark:text-[#34D399]">
                    You are owed ₹1,900
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 dark:bg-amber-950/40 text-xs">
                    ⚡
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-[#F5F5F5] truncate text-xs">
                      Bescom Electricity Bill
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-[#858E98] truncate">
                      Shared Utilities • Paid by Bob
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <p className="font-bold tabular-nums text-slate-900 dark:text-[#F5F5F5] text-xs">
                    ₹1,440
                  </p>
                  <p className="text-[10px] font-semibold text-rose-500">
                    You owe ₹480
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-[#22272C] text-xs">
                    ☕
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-[#F5F5F5] truncate text-xs">
                      Third Wave Coffee
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-[#858E98] truncate">
                      Personal • Dining
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-2">
                  <p className="font-bold tabular-nums text-slate-900 dark:text-[#F5F5F5] text-xs">
                    ₹380
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-[#858E98]">
                    Self
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Greedy Debt Minimization card */}
          <div className="rounded-xl border border-slate-200/90 dark:border-[#343B42] bg-white dark:bg-[#1C2024] p-3.5 space-y-2.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-[#F5F5F5]">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-[#34D399]" />
                <span>Smart Debt Route</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#858E98] leading-tight">
                Greedy graph engine reduced 6 bilateral IOUs down to 2 optimal settlements.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200/80 dark:border-[#2A3036] bg-slate-50/70 dark:bg-[#15181B] p-2.5 space-y-1 text-xs">
              <div className="flex items-center justify-between font-medium">
                <span className="text-[11px] text-slate-700 dark:text-[#B3BAC2]">
                  Charlie pays Alice
                </span>
                <span className="font-bold tabular-nums text-emerald-600 dark:text-[#34D399]">
                  ₹1,900
                </span>
              </div>
              <div className="flex items-center justify-between font-medium pt-1 border-t border-slate-200/60 dark:border-[#2A3036]">
                <span className="text-[11px] text-slate-700 dark:text-[#B3BAC2]">
                  Bob pays Alice
                </span>
                <span className="font-bold tabular-nums text-emerald-600 dark:text-[#34D399]">
                  ₹1,950
                </span>
              </div>
            </div>

            <div className="pt-0.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-[#858E98]">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> Flat 302
              </span>
              <span className="text-emerald-600 dark:text-[#34D399] font-semibold">
                Balanced (Σ = 0)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
