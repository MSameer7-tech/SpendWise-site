import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeScript } from '@/components/theme/theme-script';
import { ThemeProvider } from '@/components/theme/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://spendwise.app'),
  title: {
    default: 'SpendWise — Money, made clearer.',
    template: '%s | SpendWise',
  },
  description:
    'Apple-inspired editorial minimalism and financial intelligence for individuals, roommates, and groups. Integer precision. Zero awkward math.',
  keywords: [
    'personal finance',
    'expense splitting',
    'roommate expenses',
    'group debt simplification',
    'UPI settlements',
    'budget tracker',
    'financial intelligence',
  ],
  authors: [{ name: 'SpendWise Team' }],
  creator: 'SpendWise',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spendwise.app',
    title: 'SpendWise — Money, made clearer.',
    description:
      'Apple-inspired editorial minimalism and financial intelligence for individuals, roommates, and groups. Integer precision. Zero awkward math.',
    siteName: 'SpendWise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpendWise — Money, made clearer.',
    description:
      'Personal finance and shared expenses engineered with Apple-inspired minimalism and integer precision.',
    creator: '@SpendWiseApp',
  },
  alternates: {
    canonical: 'https://spendwise.app',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#111315' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SpendWise',
  operatingSystem: 'Android, Web, iOS (PWA)',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'Apple-inspired editorial minimalism and financial intelligence for individuals, roommates, and groups. Integer precision. Zero awkward math.',
  featureList: [
    'Integer Minor-Unit Financial Engine',
    'Hamilton-Hare Equal Expense Splitting',
    'Greedy Minimum Cash Flow Debt Simplification',
    'Instant NPCI-Compliant UPI Settlements',
    'PostgreSQL Row Level Security (RLS)',
    'Multi-Currency Conversion with Historical Rate Locking',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased transition-colors duration-150 relative">
        {/* Subtle Animated Light-Mode Mint Organic Background Canvas */}
        <div aria-hidden="true" className="light-ambient-glow pointer-events-none" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <ThemeProvider>{children}</ThemeProvider>
        </div>
      </body>
    </html>
  );
}
