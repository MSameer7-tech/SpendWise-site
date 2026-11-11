'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ThemeToggle({
  className,
  showLabel = false,
  size = 'md',
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSm = size === 'sm';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle visual theme"
      className={cn(
        'inline-flex items-center justify-center rounded-full border transition-colors outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none',
        isSm
          ? 'h-9 w-9 min-h-[36px] min-w-[36px] border-border/50 bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95'
          : 'min-h-[44px] min-w-[44px] border-border bg-secondary/80 p-2.5 text-foreground hover:bg-muted active:scale-95',
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {mounted ? (
          resolvedTheme === 'dark' ? (
            <Sun className={cn(isSm ? 'h-3.5 w-3.5' : 'h-4 w-4', 'transition-transform duration-200')} />
          ) : (
            <Moon className={cn(isSm ? 'h-3.5 w-3.5' : 'h-4 w-4', 'transition-transform duration-200')} />
          )
        ) : (
          <span className={cn(isSm ? 'h-3.5 w-3.5' : 'h-4 w-4', 'opacity-0')} />
        )}
      </div>
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {mounted ? (resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode') : 'Theme'}
        </span>
      )}
    </button>
  );
}
