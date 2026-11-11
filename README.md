# SpendWise Marketing Website

The official marketing and documentation website for SpendWise — an intelligent personal finance & group expense-sharing app.

Built with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Apple-Inspired Editorial Design**: Clean surfaces, mint-green gradients, emerald accents, and graphite dark mode.
- **Hero & Interactive Mockups**: Multi-device composition with desktop dashboard and Android phone mockup.
- **Comprehensive Help Center & FAQ**: 89 questions across 5 core categories with real-time fuzzy search (`⌘ K`) and accessible accordions.
- **Android App Download Page**: Official APK release distribution hub with versioning and SHA checksums.
- **Responsive Architecture**: Engineered for seamless display across mobile (320px–430px), tablet, and desktop (1024px–1920px).

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+ (Node 22 recommended)
- `npm`, `pnpm`, or `yarn`

### Installation

```bash
npm install
# or
pnpm install
```

### Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Framework preset will automatically detect **Next.js**.
4. Click **Deploy**. Zero additional configuration required.

### Netlify

1. Connect the repository in Netlify.
2. Build command: `npm run build`
3. Publish directory: `.next`
