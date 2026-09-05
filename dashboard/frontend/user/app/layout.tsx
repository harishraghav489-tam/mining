import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { PwaRegister } from '../components/PwaRegister';

export const metadata: Metadata = {
  title: 'MineGuard AI | Worker Safety Portal',
  description: 'Mine Safety & Evacuation Guidance Companion - "Safer Mines. Smarter Tomorrow."',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MineGuard Safety',
  },
};

export const viewport: Viewport = {
  themeColor: '#065f46',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <meta name="theme-color" content="#065f46" />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased">
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}

