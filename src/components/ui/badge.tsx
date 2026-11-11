import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'violet' | 'outline' | 'muted';
export type BadgeDotColor = 'blue' | 'green' | 'amber' | 'violet' | 'red' | boolean;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  dot?: BadgeDotColor;
  pulse?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  dot,
  pulse = false,
  children,
  ...props
}: BadgeProps) {
  // Ultra-refined, tactile liquid-glass pill surfaces (Apple / Linear aesthetic)
  const variantStyles: Record<BadgeVariant, string> = {
    default:
      'border border-slate-200/90 dark:border-[#343B42] bg-white/85 dark:bg-[#1C2024]/90 backdrop-blur-md text-slate-800 dark:text-[#F5F5F5] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_0_rgba(15,23,42,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_8px_-2px_rgba(0,0,0,0.5)] hover:border-slate-300 dark:hover:border-[#3A424A]',
    accent:
      'border border-slate-200/90 dark:border-[#343B42] bg-white/85 dark:bg-[#1C2024]/90 backdrop-blur-md text-slate-800 dark:text-[#F5F5F5] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_0_rgba(15,23,42,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_8px_-2px_rgba(0,0,0,0.5)] hover:border-slate-300 dark:hover:border-[#3A424A]',
    success:
      'border border-slate-200/90 dark:border-[#343B42] bg-white/85 dark:bg-[#1C2024]/90 backdrop-blur-md text-slate-800 dark:text-[#F5F5F5] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_0_rgba(15,23,42,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_8px_-2px_rgba(0,0,0,0.5)] hover:border-slate-300 dark:hover:border-[#3A424A]',
    warning:
      'border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/80 dark:bg-amber-950/30 backdrop-blur-md text-amber-900 dark:text-amber-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_-2px_rgba(217,119,6,0.1)]',
    violet:
      'border border-purple-200/80 dark:border-purple-900/40 bg-purple-50/80 dark:bg-purple-950/30 backdrop-blur-md text-purple-900 dark:text-purple-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_6px_-2px_rgba(147,51,234,0.1)]',
    outline:
      'border border-slate-200/90 dark:border-[#343B42] bg-transparent text-foreground hover:bg-secondary/40',
    muted:
      'border border-transparent bg-secondary dark:bg-[#22272C] text-muted-foreground dark:text-[#858E98]',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full font-medium tracking-tight',
    md: 'text-xs px-3.5 py-1 rounded-full font-medium tracking-tight',
    lg: 'text-xs sm:text-[13px] px-4 py-1.5 rounded-full font-medium tracking-tight',
  };

  // Status jewel dots
  const renderDot = () => {
    if (!dot) return null;

    let dotColorClass = 'bg-gradient-to-tr from-blue-600 to-indigo-500';
    let pingColorClass = 'bg-blue-500/60';

    if (dot === 'green' || (dot === true && variant === 'success')) {
      dotColorClass = 'bg-gradient-to-tr from-emerald-500 to-teal-400';
      pingColorClass = 'bg-emerald-500/60';
    } else if (dot === 'amber' || (dot === true && variant === 'warning')) {
      dotColorClass = 'bg-gradient-to-tr from-amber-500 to-yellow-400';
      pingColorClass = 'bg-amber-500/60';
    } else if (dot === 'violet' || (dot === true && variant === 'violet')) {
      dotColorClass = 'bg-gradient-to-tr from-violet-500 to-purple-400';
      pingColorClass = 'bg-violet-500/60';
    } else if (dot === 'red') {
      dotColorClass = 'bg-gradient-to-tr from-rose-500 to-red-400';
      pingColorClass = 'bg-rose-500/60';
    }

    return (
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span className={cn('animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 duration-1000', pingColorClass)} />
        )}
        <span className={cn('relative inline-flex rounded-full h-2 w-2 shadow-xs', dotColorClass)} />
      </span>
    );
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-medium transition-all duration-200 select-none cursor-default',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {renderDot()}
      <span>{children}</span>
    </span>
  );
}
