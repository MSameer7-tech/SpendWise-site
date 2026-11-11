'use client';

import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';

export function SpendingTrendChart() {
  // 30 days daily spend trajectory simulation (October)
  // Normal days around ₹1,000–₹1,800. Spike on Day 12 (Burma Burma dinner: ₹3,600) and Day 18 (Electricity: ₹1,440)
  const days = [
    1200, 1100, 1400, 950, 1600, 1300, 1800, 1100, 1250, 1500,
    1400, 3600, 1200, 1100, 1350, 1600, 1400, 2440, 1200, 1100,
    1300, 1250, 1400, 1500, 1350, 1200, 1150, 1300, 1200, 1100,
  ];

  const width = 420;
  const height = 110;
  const paddingX = 10;
  const paddingY = 15;
  const maxVal = 4000;

  const getX = (idx: number) => paddingX + (idx / (days.length - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => height - paddingY - (val / maxVal) * (height - 2 * paddingY);

  const points = days.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');
  const areaPath = `M ${getX(0)},${height - paddingY} ${days
    .map((val, idx) => `L ${getX(idx)},${getY(val)}`)
    .join(' ')} L ${getX(days.length - 1)},${height - paddingY} Z`;

  // Anomaly point on day 12 (Burma Burma)
  const anomalyX = getX(11);
  const anomalyY = getY(days[11] ?? 3600);

  return (
    <div className="rounded-xl border border-[#343B42] bg-[#1C2024] p-4 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-accent" />
          <span className="font-semibold text-[#F5F5F5]">Daily Spending Velocity</span>
        </div>
        <span className="text-[11px] font-mono text-[#858E98]">October (30 Days)</span>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label="30-day spending velocity chart with anomaly markers"
        >
          <defs>
            <linearGradient id="aiTrendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8AA8FF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#8AA8FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area & Line */}
          <path d={areaPath} fill="url(#aiTrendGrad)" />
          <polyline
            fill="none"
            stroke="#8AA8FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Normal baseline threshold */}
          <line
            x1={paddingX}
            y1={getY(1800)}
            x2={width - paddingX}
            y2={getY(1800)}
            stroke="#1B1B1B"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Anomaly Highlight Pulse at Day 12 */}
          <circle
            cx={anomalyX}
            cy={anomalyY}
            r="8"
            className="fill-warning/20 animate-ping"
          />
          <circle
            cx={anomalyX}
            cy={anomalyY}
            r="4"
            className="fill-warning stroke-[#111315] stroke-2"
          />
        </svg>
      </div>

      {/* Insight Annotation Strip */}
      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#343B42]">
        <div className="flex items-center gap-1.5 text-warning font-medium">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          <span>Oct 12 dinner spike resolved via group split</span>
        </div>
        <span className="text-[#858E98] font-mono">Daily Avg: ₹1,545</span>
      </div>
    </div>
  );
}
