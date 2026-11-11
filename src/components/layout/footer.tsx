import React from 'react';
import Image from 'next/image';
import { ThemeToggle } from '../theme/theme-toggle';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Download App', href: '/download' },
    { label: 'Features Overview', href: '/#features' },
  ];

  const resourceLinks = [
    { label: 'FAQ & Help', href: '/faq' },
    { label: 'Security & Privacy', href: '/faq' },
    { label: 'Support Contact', href: 'mailto:support@spendwise.app' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/faq' },
    { label: 'Terms of Service', href: '/faq' },
    { label: 'Data Protection', href: '/faq' },
  ];

  return (
    <footer className="border-t border-border/50 dark:border-[#343B42] bg-secondary/25 dark:bg-[#15181B] text-foreground transition-colors">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">
        {/* Main 4-Area Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-start">
          {/* Column 1: Brand Info (Wider Column) */}
          <div className="md:col-span-5 space-y-3.5">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              aria-label="SpendWise home"
            >
              <Image
                src="/icon.png"
                alt="SpendWise"
                width={28}
                height={28}
                className="h-7 w-7 rounded-lg shadow-sm object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
              <span className="text-base font-bold tracking-tight text-foreground">
                SpendWise
              </span>
            </a>
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed max-w-[290px] sm:max-w-xs">
              Money, made clearer. Thoughtfully designed personal finance and effortless group expense sharing.
            </p>
          </div>

          {/* Navigation Columns (7 cols on md/lg: Product, Resources, Legal) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 2: Product */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources (Stacked with Legal on small screens < 640px) */}
            <div className="space-y-6 sm:space-y-0">
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                  Resources
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px]">
                  {resourceLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-0.5 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile-only Legal Group: tightly integrated below Resources to balance the 2-column mobile layout */}
              <div className="space-y-3 sm:hidden pt-4 border-t border-border/30">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                  Legal
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-[13px]">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-0.5 inline-block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 4: Legal (Displayed as 3rd column on tablet and desktop screens >= 640px) */}
            <div className="space-y-3 hidden sm:block">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                Legal
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150 py-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-border/40 dark:border-border/50 flex flex-col xs:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="select-none text-center xs:text-left text-xs text-muted-foreground">
            &copy; {currentYear} SpendWise Inc. All rights reserved.
          </p>

          <div className="flex items-center">
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
