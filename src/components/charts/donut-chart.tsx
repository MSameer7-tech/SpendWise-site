'use client';

import React, { useState } from 'react';

export interface DonutCategory {
  name: string;
  amount: number;
  formattedAmount: string;
  pct: number;
  color: string;
}

const DEFAULT_CATEGORIES: DonutCategory[] = [
  { name: 'Rent & Living', amount: 25000, formattedAmount: '₹25,000', pct: 54, color: 'var(--accent)' },
  { name: 'Food & Dining', amount: 8450, formattedAmount: '₹8,450', pct: 18, color: 'var(--success)' },
  { name: 'Groceries (Split)', amount: 5800, formattedAmount: '₹5,800', pct: 13, color: 'var(--warning)' },
  { name: 'Utilities & Bills', amount: 4310, formattedAmount: '₹4,310', pct: 9, color: 'var(--violet)' },
  { name: 'Subscriptions', amount: 2790, formattedAmount: '₹2,790', pct: 6, color: 'var(--secondary-foreground)' },
];

export function DonutChart({
  categories = DEFAULT_CATEGORIES,
  totalAmount = '₹46,350',
  totalLabel = 'Total Outflow',
}: {
  categories?: DonutCategory[];
  totalAmount?: string;
  totalLabel?: string;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // SVG parameters
  const size = 196;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets
  let accumulatedPercent = 0;
  const segments = categories.map((cat, idx) => {
    // Add small visual gap (0.8%) between segments for premium feel
    const gap = 1.0;
    const effectivePct = Math.max(0.5, cat.pct - gap);
    const strokeDasharray = `${(effectivePct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += cat.pct;
    return {
      ...cat,
      strokeDasharray,
      strokeDashoffset,
      idx,
    };
  });

  const activeCategory = activeIdx !== null ? categories[activeIdx] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pt-1">
      {/* SVG Donut */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90 transition-transform duration-500"
          role="img"
          aria-label="Spending breakdown donut chart"
        >
          {/* Subtle Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary/50 dark:text-secondary/30"
          />

          {/* Slices with smooth stroke animation and hover lift */}
          {segments.map((seg) => (
            <circle
              key={seg.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={activeIdx === seg.idx ? strokeWidth + 5 : strokeWidth}
              strokeDasharray={seg.strokeDasharray}
              strokeDashoffset={seg.strokeDashoffset}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setActiveIdx(seg.idx)}
              onMouseLeave={() => setActiveIdx(null)}
            />
          ))}
        </svg>

        {/* Center Readout with Smooth Transition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate max-w-[110px]">
            {activeCategory ? activeCategory.name : totalLabel}
          </span>
          <span className="text-lg sm:text-xl font-bold tabular-nums text-foreground tracking-tight mt-0.5">
            {activeCategory ? activeCategory.formattedAmount : totalAmount}
          </span>
          <span className="text-[10px] font-semibold text-accent font-mono mt-0.5">
            {activeCategory ? `${activeCategory.pct}% of total` : '100% Reconciled'}
          </span>
        </div>
      </div>

      {/* Interactive Legend List */}
      <div className="flex-1 w-full space-y-1 text-xs">
        {categories.map((cat, idx) => (
          <button
            key={cat.name}
            type="button"
            onMouseEnter={() => setActiveIdx(idx)}
            onMouseLeave={() => setActiveIdx(null)}
            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-left ${
              activeIdx === idx
                ? 'bg-secondary text-foreground shadow-sm scale-[1.01]'
                : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0 transition-transform duration-200"
                style={{
                  backgroundColor: cat.color,
                  transform: activeIdx === idx ? 'scale(1.3)' : 'scale(1)',
                }}
              />
              <span className="font-medium text-foreground truncate max-w-[130px] sm:max-w-none">
                {cat.name}
              </span>
            </div>
            <div className="flex items-center gap-3 tabular-nums">
              <span className="font-semibold text-foreground">{cat.formattedAmount}</span>
              <span className="text-[11px] text-muted-foreground font-mono w-8 text-right">
                {cat.pct}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
