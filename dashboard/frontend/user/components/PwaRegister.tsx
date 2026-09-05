'use client';

import React, { useEffect, useState } from 'react';
import { Download, ShieldCheck, CheckCircle2, X, Smartphone } from 'lucide-react';

export function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Register Service Worker with dynamic subpath detection
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      const swUrl = `${basePath}/sw.js`;
      const scopeUrl = `${basePath}/` || '/';

      navigator.serviceWorker
        .register(swUrl, { scope: scopeUrl })
        .then((registration) => {
          console.log('MineGuard Worker PWA SW registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.warn('MineGuard Worker PWA SW registration failed:', error);
        });
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    };

    const handleCustomInstall = () => {
      if (deferredPrompt) {
        handleInstallClick();
      } else {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('trigger-pwa-install', handleCustomInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('trigger-pwa-install', handleCustomInstall);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Mobile Install App Action Bar */}
      {isInstallable && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 z-[999] bg-slate-900/95 text-white border border-slate-700 shadow-2xl rounded-xl p-3 flex items-center justify-between gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Install MineGuard Safety App</h4>
              <p className="text-[10px] text-slate-400">Offline alerts & instant evacuation routes</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
            <button
              onClick={() => setIsInstallable(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Installed Confirmation Toast */}
      {showToast && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 z-[999] bg-emerald-900 text-white border border-emerald-700 shadow-2xl rounded-xl p-3 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
          <span className="text-xs font-bold">MineGuard Safety App installed! Works 100% offline.</span>
        </div>
      )}
    </>
  );
}
