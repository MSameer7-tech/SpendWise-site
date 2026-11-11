import React from 'react';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { AndroidShowcaseSection } from '@/components/sections/android-showcase-section';

export default function SpendWiseHomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground selection:bg-accent selection:text-white">
      {/* Global Header Navigation */}
      <Navigation />

      <main className="flex-1">
        {/* 1. Hero Section (Split-screen on desktop, intentional stacked layout on mobile) */}
        <HeroSection />

        {/* 2. Android Application Showcase (Authentic Five-Screen Interactive Showcase) */}
        <AndroidShowcaseSection />
      </main>

      {/* Global Responsive Footer */}
      <Footer />
    </div>
  );
}
