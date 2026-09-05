'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Globe,
  Shield,
  AlertTriangle,
  Flame,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  User,
  Sliders,
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { Language } from '../../shared/utils';

export function AdminHeader() {
  const { state, t, setMode, changeLanguage, ackAlert } = useSimulation();
  const [timeStr, setTimeStr] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
          ' ' +
          now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadAlerts = state.alerts.filter((a) => !a.acknowledged);
  const criticalAlerts = unreadAlerts.filter((a) => a.severity === 'Critical');

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English (EN)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Mine Location & Live Status */}
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-slate-900 tracking-tight">
              Mine Site Alpha
            </h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Sector IV • Open Pit
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>{timeStr || '03 Sep 2026, 10:30:00'}</span>
          </div>
        </div>
      </div>

      {/* Center: SIH Demo Mode Controller */}
      <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-inner">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-700 px-2 flex items-center gap-1.5">
          <Sliders className="w-3 h-3 text-slate-600" />
          <span>Demo Controller:</span>
        </span>
        <button
          onClick={() => setMode('SAFE')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
            state.mode === 'SAFE'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
          title="Set baseline normal operations (18% Risk)"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Normal (18%)</span>
        </button>
        <button
          onClick={() => setMode('WARNING')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
            state.mode === 'WARNING'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
          title="Simulate bench displacement and tilt alert (76% Risk)"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Warning (76%)</span>
        </button>
        <button
          onClick={() => setMode('CRITICAL')}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
            state.mode === 'CRITICAL'
              ? 'bg-rose-600 text-white shadow-sm animate-pulse'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
          title="Simulate imminent slope failure and evacuation alert (91% Risk)"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Critical (91%)</span>
        </button>
        <button
          onClick={() => setMode('SAFE')}
          className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200/80 transition"
          title="Reset to initial state"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Right Controls: Language, Notifications, Admin Profile */}
      <div className="flex items-center gap-3">
        {/* PWA Install Button */}
        <button
          onClick={() => {
            const event = new CustomEvent('trigger-pwa-install');
            window.dispatchEvent(event);
          }}
          id="pwa-install-btn"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition shadow-xs"
          title="Install Desktop PWA for offline monitoring"
        >
          <Shield className="w-3.5 h-3.5 text-emerald-700" />
          <span>PWA App</span>
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase font-semibold">{state.language}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    state.language === lang.code ? 'font-bold text-mineguard-800 bg-rose-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{lang.label}</span>
                  {state.language === lang.code && <CheckCircle2 className="w-3.5 h-3.5 text-mineguard-800" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${criticalAlerts.length > 0 ? 'bg-rose-600 animate-pulse' : 'bg-amber-500'}`}>
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Active Alerts ({unreadAlerts.length})
                </span>
                <span className="text-[10px] text-slate-400">Live feed</span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {unreadAlerts.length === 0 ? (
                  <div className="px-4 py-6 text-center text-xs text-slate-500">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                    All alert queues clear. Operations nominal.
                  </div>
                ) : (
                  unreadAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 hover:bg-slate-50 transition text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`font-semibold text-[11px] px-1.5 py-0.5 rounded ${
                            alert.severity === 'Critical'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                      </div>
                      <p className="font-medium text-slate-800 text-[12px]">{alert.title}</p>
                      <p className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{alert.message}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => {
                            ackAlert(alert.id, 'Rajesh Sharma (Admin)');
                          }}
                          className="px-2 py-1 bg-slate-900 hover:bg-mineguard-800 text-white rounded text-[10px] font-semibold transition"
                        >
                          Acknowledge
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Administrator Profile Dropdown */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-inner">
              RS
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-none">Rajesh Sharma</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Site Safety Eng.</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-800">Rajesh Sharma</p>
                <p className="text-[11px] text-slate-500">ID: ENG-4012 • Dhanbad</p>
              </div>
              <div className="py-1">
                <div className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin Credentials</span>
                </div>
                <div className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Security & Audit Log</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
