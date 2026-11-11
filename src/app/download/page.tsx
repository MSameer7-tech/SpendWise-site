import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { PhoneMockup } from '@/components/mockups/phone-mockup';
import {
  Download,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Download SpendWise for Android — SpendWise',
  description:
    'Download the SpendWise Android app or launch the Web PWA. Smooth animations, offline sync, and 1-tap UPI settlements in your pocket.',
};

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Navigation />

      <main className="flex-1">
        {/* Compact Hero focused on Android App */}
        <section className="pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 border-b border-border/50 bg-transparent">
          <Container size="lg" className="space-y-5 sm:space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h1 className="text-fluid-h1 font-extrabold tracking-tight text-slate-900 dark:text-[#F5F5F5] [text-wrap:balance]">
                SpendWise{' '}
                <span className="italic font-semibold text-emerald-700 dark:text-[#34D399]">
                  in your pocket.
                </span>
              </h1>
              <p className="text-fluid-lead text-slate-600 dark:text-[#B3BAC2] [text-wrap:balance] max-w-xl mx-auto">
                Fast, tactile, and designed for your phone. Track expenses on the go, view group balances, and settle via UPI in seconds.
              </p>

              {/* Primary Download CTAs */}
              <div className="pt-2 flex flex-col xs:flex-row items-center justify-center gap-3">
                <Button variant="primary" size="md" href="#apk-download" fullWidthMobile className="group font-semibold bg-[#064e3b] hover:bg-[#064e3b]/90 text-white dark:bg-[#10B981] dark:text-[#071A14] dark:hover:bg-[#34D399] shadow-sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Android APK (v0.1.0)
                </Button>
                <Button variant="outline" size="md" href="/dashboard" fullWidthMobile className="group border-slate-300 dark:border-[#3A424A] dark:bg-[#22272C] dark:text-[#F5F5F5] dark:hover:bg-[#30373E]">
                  <Globe className="mr-2 h-4 w-4" />
                  Launch Web App
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Hardware Trust Badges */}
              <div className="pt-1.5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-[#34D399]" /> Android 10+ Compatible
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-[#34D399]" /> Biometric Unlock
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-[#34D399]" /> Offline-First Sync
                </span>
              </div>
            </div>

            {/* 3-Screen App Showcase Gallery */}
            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start justify-items-center">
                {/* Screen 1: Home Dashboard */}
                <div className="flex flex-col items-center space-y-2.5 text-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Cash Flow &amp; Liquidity
                  </span>
                  <div className="hover-lift">
                    <PhoneMockup screen="home" className="shadow-2xl" />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xs pt-1">
                    See your liquid balance after obligations and recent transactions at a glance.
                  </p>
                </div>

                {/* Screen 2: Groups & Balances */}
                <div className="flex flex-col items-center space-y-2.5 text-center">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Shared Ledgers &amp; UPI
                  </span>
                  <div className="hover-lift">
                    <PhoneMockup screen="groups" className="shadow-2xl" />
                  </div>
                  <p className="text-xs text-foreground font-medium max-w-xs pt-1">
                    Track group expenses and settle balances instantly with 1-tap UPI links.
                  </p>
                </div>

                {/* Screen 3: Category Analytics */}
                <div className="flex flex-col items-center space-y-2.5 text-center">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category Breakdown &amp; Analytics
                  </span>
                  <div className="hover-lift">
                    <PhoneMockup screen="analytics" className="shadow-2xl" />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xs pt-1">
                    Visual distribution curves and proactive budget utilization for the month.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Quick Install Details */}
        <section className="py-12 sm:py-16">
          <Container size="md" className="space-y-6">
            <div className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7 space-y-3.5 hover-lift">
              <h2 className="text-base sm:text-lg font-bold text-foreground">How to Install the APK</h2>
              <ol className="space-y-2.5 text-xs sm:text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
                <li>Download the SpendWise `.apk` file to your Android phone.</li>
                <li>Tap the downloaded file in your notifications or Downloads folder.</li>
                <li>If prompted, allow your browser to install unknown apps (Android standard security prompt).</li>
                <li>Open SpendWise and sign in or try the offline demo immediately.</li>
              </ol>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
