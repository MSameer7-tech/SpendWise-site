import React from 'react';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { DesktopMockup } from '../mockups/desktop-mockup';
import { PhoneMockup } from '../mockups/phone-mockup';
import { Check, ArrowRight, Download } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 border-b border-border/50 bg-transparent">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-center lg:text-left">
          {/* Left Column: Narrative & Primary Actions (5 cols on lg:) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Premium Eyebrow Announcement Pill Tag */}
            <a
              href="#android-app"
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 dark:border-[#343B42] bg-white/85 dark:bg-[#1C2024]/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-slate-800 dark:text-[#F5F5F5] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_0_rgba(15,23,42,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_2px_8px_-2px_rgba(0,0,0,0.5)] transition-all duration-200 hover:border-slate-300 dark:hover:border-[#3A424A] dark:hover:bg-[#22272C] hover:scale-[1.02] cursor-pointer mb-3.5 sm:mb-4"
              aria-label="Introducing SpendWise announcement"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 opacity-75 duration-1000" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-sm" />
              </span>
              <span className="tracking-tight font-medium">Introducing SpendWise</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </a>

            <h1 className="text-fluid-h1 font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] [text-wrap:balance] mb-3.5 sm:mb-4">
              Money,{' '}
              <span className="italic font-semibold text-emerald-700 dark:text-[#34D399]">
                made clearer.
              </span>
            </h1>

            <p className="text-fluid-lead text-slate-600 dark:text-[#B3BAC2] [text-wrap:balance] max-w-xl mb-6 sm:mb-7">
              Track your spending, split expenses with the people around you, and understand where your money goes.
            </p>

            <div className="w-full xs:w-auto flex flex-col xs:flex-row items-center gap-3 mb-6 sm:mb-8">
              <Button
                variant="primary"
                size="lg"
                href="/download"
                fullWidthMobile
                className="w-full xs:w-auto group bg-[#064e3b] hover:bg-[#064e3b]/90 text-white dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] shadow-sm font-semibold"
              >
                <Download className="mr-2 h-4 w-4" />
                Download App
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="#android-app"
                fullWidthMobile
                className="w-full xs:w-auto border-slate-300 dark:border-[#3A424A] dark:bg-[#22272C] dark:text-[#F5F5F5] dark:hover:bg-[#30373E] hover:bg-slate-100/80"
              >
                Explore SpendWise
              </Button>
            </div>

            {/* Supporting product benefits */}
            <div className="pt-5 lg:pt-6 border-t border-slate-200/80 dark:border-[#30363D] grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-[#B3BAC2] text-left w-full max-w-md lg:max-w-none">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-[#34D399] shrink-0" />
                <span>Exact to the paisa</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-[#34D399] shrink-0" />
                <span>Simplified group debts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-[#34D399] shrink-0" />
                <span>Instant UPI settlement</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600 dark:text-[#34D399] shrink-0" />
                <span>Private by design</span>
              </div>
            </div>
          </div>

          {/* Right Column: Balanced multi-device mockup composition (7 cols on lg:) */}
          <div className="lg:col-span-7 relative flex items-center justify-end w-full">
            {/* Desktop Composition (>=1024px): Desktop dashboard + overlapping floating Android phone frame */}
            <div className="hidden lg:flex relative items-center justify-end w-full">
              <div className="w-[520px] xl:w-[600px] shrink-0 transform transition-transform duration-500 hover:scale-[1.01]">
                <DesktopMockup />
              </div>

              {/* Overlapping Dedicated Android/Mobile Mockup */}
              <div className="absolute -bottom-10 -left-6 xl:-left-10 z-10 w-[240px] xl:w-[260px] drop-shadow-2xl animate-float">
                <PhoneMockup screen="home" />
              </div>
            </div>

            {/* Mobile Composition (<1024px): Prominent single dedicated phone mockup */}
            <div className="block lg:hidden w-full pt-4">
              <PhoneMockup screen="home" className="shadow-2xl" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
