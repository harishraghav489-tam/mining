'use client';

import React, { useState } from 'react';
import { Shield, Globe, Wifi, WifiOff, ChevronDown, CheckCircle2, Sliders, CheckCircle, AlertTriangle, Flame } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { Language } from '../../shared/utils';

export function UserHeader() {
  const { state, t, changeLanguage, setMode, toggleNetwork } = useSimulation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-mineguard-800 text-white flex items-center justify-center font-bold shadow-xs">
            <Shield className="w-4 h-4 text-rose-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight text-slate-900">
                MINEGUARD
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-mineguard-100 text-mineguard-900">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none">
              Safety First
            </p>
          </div>
        </div>

        {/* Right Controls: Demo Switcher, Language Pills & Connection Status */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Mode Selector for Judges */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
            <button
              onClick={() => setMode('SAFE')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                state.mode === 'SAFE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Safe State"
            >
              Safe
            </button>
            <button
              onClick={() => setMode('WARNING')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                state.mode === 'WARNING'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Warning State"
            >
              Warning
            </button>
            <button
              onClick={() => setMode('CRITICAL')}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold transition ${
                state.mode === 'CRITICAL'
                  ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Switch to Critical State"
            >
              Critical
            </button>
          </div>

          {/* PWA Install Button */}
          <button
            onClick={() => {
              const event = new CustomEvent('trigger-pwa-install');
              window.dispatchEvent(event);
            }}
            id="user-pwa-install-btn"
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition shadow-xs"
            title="Install Mobile PWA App"
          >
            <Shield className="w-3 h-3 text-emerald-700" />
            <span>Install</span>
          </button>

          {/* Network Offline toggle for testing PWA */}
          <button
            onClick={() => toggleNetwork()}
            className={`p-1.5 rounded-lg border text-xs transition flex items-center gap-1 ${
              state.isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
            }`}
            title="Toggle Online / Offline PWA mode for demonstration"
          >
            {state.isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-600" /> : <WifiOff className="w-3.5 h-3.5 text-rose-600" />}
            <span className="text-[10px] font-bold hidden sm:inline">{state.isOnline ? 'Online' : 'Offline'}</span>
          </button>

          {/* Accessible Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition"
              aria-label="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span className="uppercase text-[11px]">{state.language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      state.language === lang.code ? 'font-bold text-mineguard-800 bg-rose-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {state.language === lang.code && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-mineguard-800" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
