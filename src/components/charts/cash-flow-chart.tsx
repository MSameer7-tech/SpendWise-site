'use client';

import React, { useState } from 'react';

interface MonthlyData {
  month: string;
  inflow: number;
  outflow: number;
  savings: number;
}

const MONTHS: MonthlyData[] = [
  { month: 'May', inflow: 78000, outflow: 43000, savings: 35000 },
  { month: 'Jun', inflow: 80000, outflow: 45000, savings: 35000 },
  { month: 'Jul', inflow: 82000, outflow: 42000, savings: 40000 },
  { month: 'Aug', inflow: 82000, outflow: 49000, savings: 33000 },
  { month: 'Sep', inflow: 85000, outflow: 44000, savings: 41000 },
  { month: 'Oct', inflow: 85000, outflow: 46350, savings: 38650 },
];

export function CashFlowChart() {
  const [activeMonth, setActiveMonth] = useState<number>(5); // default to Oct
  const current = MONTHS[activeMonth] ?? MONTHS[5]!;

  // SVG dimensions
  const width = 480;
  const height = 160;
  const paddingX = 28;
  const paddingY = 24;

  const maxVal = 92000;
  const getY = (val: number) => height - paddingY - (val / maxVal) * (height - 2 * paddingY);
  const getX = (idx: number) => paddingX + (idx / (MONTHS.length - 1)) * (width - 2 * paddingX);

  // Generate SVG path for inflow (emerald curve)
  const inflowPoints = MONTHS.map((m, i) => `${getX(i)},${getY(m.inflow)}`).join(' ');
  const inflowArea = `M ${getX(0)},${height - paddingY} ${MONTHS.map((m, i) => `L ${getX(i)},${getY(m.inflow)}`).join(' ')} L ${getX(MONTHS.length - 1)},${height - paddingY} Z`;

  // Generate SVG path for outflow (blue curve)
  const outflowPoints = MONTHS.map((m, i) => `${getX(i)},${getY(m.outflow)}`).join(' ');
  const outflowArea = `M ${getX(0)},${height - paddingY} ${MONTHS.map((m, i) => `L ${getX(i)},${getY(m.outflow)}`).join(' ')} L ${getX(MONTHS.length - 1)},${height - paddingY} Z`;

  const savingsRate = ((current.savings / current.inflow) * 100).toFixed(1);

  return (
    <div className="space-y-3.5">
      {/* Top Interactive Metric Legend & Live Tooltip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-border/50 pb-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-muted-foreground">Inflow:</span>
            <span className="font-bold text-foreground tabular-nums">
              ₹{current.inflow.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">Outflow:</span>
            <span className="font-bold text-foreground tabular-nums">
              ₹{current.outflow.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Dynamic Month Retained Tag */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-success font-semibold bg-success/10 px-2.5 py-1 rounded-md border border-success/20">
          <span>{current.month}:</span>
          <span>+₹{current.savings.toLocaleString('en-IN')} ({savingsRate}%)</span>
        </div>
      </div>

      {/* SVG Chart with Smooth Hover Cursors */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          role="img"
          aria-label="6-month cashflow trend"
        >
          <defs>
            <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--success)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--success)" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Baseline */}
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="currentColor"
            className="text-border/60"
            strokeWidth="1"
          />

          {/* Inflow Area & Path */}
          <path d={inflowArea} fill="url(#inflowGrad)" />
          <polyline
            fill="none"
            stroke="var(--success)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={inflowPoints}
          />

          {/* Outflow Area & Path */}
          <path d={outflowArea} fill="url(#outflowGrad)" />
          <polyline
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={outflowPoints}
          />

          {/* Month Columns & Interactive Dots */}
          {MONTHS.map((m, idx) => {
            const x = getX(idx);
            const yIn = getY(m.inflow);
            const yOut = getY(m.outflow);
            const isActive = activeMonth === idx;

            return (
              <g
                key={m.month}
                className="cursor-pointer group"
                onMouseEnter={() => setActiveMonth(idx)}
                onClick={() => setActiveMonth(idx)}
              >
                {/* Transparent wider hover target strip */}
                <rect
                  x={x - 22}
                  y={0}
                  width={44}
                  height={height}
                  fill="transparent"
                />

                {/* Vertical cursor guide */}
                {isActive && (
                  <line
                    x1={x}
                    y1={paddingY - 6}
                    x2={x}
                    y2={height - paddingY}
                    stroke="currentColor"
                    className="text-foreground/25 dark:text-foreground/40"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Inflow Marker Dot */}
                <circle
                  cx={x}
                  cy={yIn}
                  r={isActive ? 5 : 3.5}
                  className="fill-background stroke-success stroke-[2.5] transition-all duration-150"
                />

                {/* Outflow Marker Dot */}
                <circle
                  cx={x}
                  cy={yOut}
                  r={isActive ? 5 : 3.5}
                  className="fill-background stroke-accent stroke-[2.5] transition-all duration-150"
                />

                {/* Month Label */}
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  className={`text-[11px] font-mono transition-colors ${
                    isActive ? 'fill-foreground font-bold' : 'fill-muted-foreground'
                  }`}
                >
                  {m.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
