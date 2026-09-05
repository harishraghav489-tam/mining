'use client';

import React, { useEffect, useState } from 'react';
import { Download, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('MineGuard Admin PWA SW registered:', registration.scope);
        })
        .catch((error) => {
          console.warn('MineGuard Admin PWA SW registration failed:', error);
        });
    }

    // Capture install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // App installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
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
      {/* Floating / Header Install Prompt Banner if installable */}
      {isInstallable && (
        <div className="fixed bottom-4 right-4 z-[999] bg-slate-900/95 text-white border border-slate-700 shadow-2xl rounded-xl p-3 flex items-center gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5">
          <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Install MineGuard Desktop App</h4>
            <p className="text-[10px] text-slate-400">Offline geotechnical monitoring & early warning</p>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
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

      {/* Installed Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-[999] bg-emerald-900 text-white border border-emerald-700 shadow-2xl rounded-xl p-3 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-bold">MineGuard AI Desktop PWA installed successfully!</span>
        </div>
      )}
    </>
  );
}
