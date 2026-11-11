import React from 'react';
import type { Metadata } from 'next';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { FAQClient } from './faq-client';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Support — SpendWise',
  description:
    'Got questions about SpendWise? Find detailed answers on account management, zero-penny split math, UPI settlements, debt simplification, multi-currency conversion, AI intelligence, and Android APK downloads.',
};

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-foreground">
      <Navigation />

      <main className="flex-1">
        <FAQClient />
      </main>

      <Footer />
    </div>
  );
}
