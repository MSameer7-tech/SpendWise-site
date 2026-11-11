'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface MobileNavProps {
  links: NavLinkItem[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center shrink-0">
      {/* Trigger Button: 36x36px rounded button inside the navbar pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="inline-flex min-h-[36px] min-w-[36px] h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-secondary/60 p-2 text-foreground transition-colors hover:bg-secondary outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none active:scale-95"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* 
        Mobile Drawer Overlay:
        Portaled directly into document.body so that:
        1. It is never trapped in the containing block of nav's backdrop-filter.
        2. When collapsed (!isOpen), it is NOT in the DOM at all, guaranteeing zero bleed or overlay.
        3. It never affects the scrollWidth or geometry of the navbar pill.
      */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] md:hidden flex flex-col justify-start">
          {/* Frosted dimmed backdrop */}
          <div
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Liquid Glass floating drawer card */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="drawer-liquid-glass relative z-10 mx-auto w-[calc(100vw-1.75rem)] max-w-sm mt-18 sm:mt-20 rounded-[28px] p-5 sm:p-6 text-foreground"
          >
            {/* Header row with brandmark and close button */}
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
              <a
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2.5 font-semibold text-foreground tracking-tight"
                aria-label="SpendWise home"
              >
                <Image
                  src="/icon.png"
                  alt="SpendWise"
                  width={26}
                  height={26}
                  className="h-6.5 w-6.5 rounded-lg shadow-sm object-contain"
                  priority
                />
                <span className="text-sm font-bold tracking-tight">SpendWise</span>
              </a>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-black/[0.05] dark:hover:bg-white/[0.08] hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1 pt-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground transition-all duration-150 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:bg-black/[0.08] dark:active:bg-white/[0.10]"
                >
                  <span className="tracking-tight">{link.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/70" />
                </a>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
