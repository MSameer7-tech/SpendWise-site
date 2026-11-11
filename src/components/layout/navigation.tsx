'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThemeToggle } from '../theme/theme-toggle';
import { MobileNav, NavLinkItem } from './mobile-nav';
import { cn } from '@/lib/utils';

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: 'Download', href: '/download' },
  { label: 'FAQ', href: '/faq' },
];

export interface NavigationProps {
  links?: NavLinkItem[];
}

export function Navigation({
  links = DEFAULT_LINKS,
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 12;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    // Check initial scroll offset
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{ top: 'max(0.75rem, env(safe-area-inset-top, 0.75rem))' }}
        className="fixed inset-x-0 z-40 flex justify-center px-3.5 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300 w-full max-w-full box-border"
      >
        <div className="mx-auto max-w-5xl w-full pointer-events-auto min-w-0">
          <nav
            className={cn(
              'relative flex items-center justify-between px-3.5 sm:px-6 transition-all duration-300 ease-out motion-reduce:transition-none w-full max-w-full min-w-0 box-border',
              isScrolled
                ? 'navbar-pill-scrolled h-13 sm:h-14'
                : 'navbar-pill h-14 sm:h-15'
            )}
            aria-label="Main Navigation"
          >
            {/* Logo Brandmark */}
            <a
              href="/"
              className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full px-1 shrink-0"
              aria-label="SpendWise home"
            >
              <Image
                src="/icon.png"
                alt="SpendWise"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg shadow-sm object-contain"
                priority
              />
              <span className="text-sm sm:text-base font-bold tracking-tight">SpendWise</span>
            </a>

            {/* Desktop Right Navigation Links & Actions (Grouped on right side) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
              <div className="flex items-center gap-1 text-xs lg:text-[13px] font-medium text-muted-foreground mr-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-foreground hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <ThemeToggle size="sm" />
            </div>

            {/* Mobile Right Actions: Theme Toggle + Hamburger Drawer */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              <ThemeToggle size="sm" />
              <MobileNav links={links} />
            </div>
          </nav>
        </div>
      </header>

      {/* Structural spacer so page content starts cleanly below the fixed floating pill */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />
    </>
  );
}
