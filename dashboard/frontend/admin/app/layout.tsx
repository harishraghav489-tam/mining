import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { PwaRegister } from '../components/PwaRegister';

export const metadata: Metadata = {
  title: 'MineGuard AI | Admin Safety & Geotechnical Center',
  description: 'Industrial Mining Safety, Slope Stability Monitoring & Early Warning Platform - SIH 2026',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MineGuard Admin',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-100 text-slate-900 min-h-screen antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}

