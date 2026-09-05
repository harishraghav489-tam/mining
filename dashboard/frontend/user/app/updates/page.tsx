'use client';

import React, { useState } from 'react';
import { UserMobileNav } from '../../components/UserMobileNav';
import { UserDesktopSidebar } from '../../components/UserDesktopSidebar';
import { UserHeader } from '../../components/UserHeader';
import { OfflineBanner } from '../../components/OfflineBanner';
import { useSimulation } from '../../hooks/useSimulation';
import { Bell, Filter, TriangleAlert, ShieldCheck, CheckCircle2, Flame, Info } from 'lucide-react';

export default function UpdatesPage() {
  const { state, t } = useSimulation();
  const [filter, setFilter] = useState<'ALL' | 'ALERTS' | 'SAFETY' | 'SYSTEM'>('ALL');

  const updatesList = [
    {
      id: 'UPD-1',
      time: '10:30 AM',
      type: 'ALERTS',
      severity: state.mode === 'CRITICAL' ? 'Critical' : state.mode === 'WARNING' ? 'Warning' : 'Info',
      title: state.mode === 'CRITICAL' ? 'CRITICAL ALERT: Ground instability detected in Zone 01' : state.mode === 'WARNING' ? 'WARNING: Elevated ground movement detected near Zone 01' : 'Nominal monitoring in Zone 01',
      body: state.mode === 'CRITICAL' ? 'Immediate pit evacuation advised. Move along designated safe route Ramp 2 to Assembly Point A.' : state.mode === 'WARNING' ? 'Stay alert for audio alarms and report any visible bench cracking.' : 'All highwall sensors reporting nominal parameters. Shift operations approved.',
    },
    {
      id: 'UPD-2',
      time: '09:10 AM',
      type: 'SAFETY',
      severity: 'Normal',
      title: 'SAFETY ADVISORY: Day Shift PPE & Highwall Inspection',
      body: 'All operations crews must wear high-visibility vests, hard hats, and steel-toe safety boots before entering open pit tier.',
    },
    {
      id: 'UPD-3',
      time: '08:00 AM',
      type: 'SYSTEM',
      severity: 'Info',
      title: 'SYSTEM: Telemetry Gateway 01 Verified Online',
      body: 'LoRaWAN base station check complete. All wireless sensor beacons operational with 100% signal coverage.',
    },
    {
      id: 'UPD-4',
      time: 'Yesterday',
      type: 'SAFETY',
      severity: 'Normal',
      title: 'SAFETY DRILL: Evacuation Run Time: 3 mins 45 secs',
      body: 'Successful simulation drill conducted for North-East pit section.',
    },
  ];

  const filteredUpdates = updatesList.filter((item) => {
    if (filter === 'ALL') return true;
    return item.type === filter;
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <UserDesktopSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader />
        <OfflineBanner />

        <main className="flex-1 p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-5">
          {/* Header */}
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {t('user.updatesPage.title')}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('user.updatesPage.subtitle')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                filter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('user.updatesPage.filterAll')}
            </button>
            <button
              onClick={() => setFilter('ALERTS')}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                filter === 'ALERTS'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('user.updatesPage.filterAlerts')}
            </button>
            <button
              onClick={() => setFilter('SAFETY')}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                filter === 'SAFETY'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('user.updatesPage.filterSafety')}
            </button>
            <button
              onClick={() => setFilter('SYSTEM')}
              className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
                filter === 'SYSTEM'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t('user.updatesPage.filterSystem')}
            </button>
          </div>

          {/* Timeline Feed */}
          <div className="space-y-3">
            {filteredUpdates.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border p-4 shadow-xs space-y-1.5 transition ${
                  item.severity === 'Critical'
                    ? 'border-rose-300 bg-rose-50/40'
                    : item.severity === 'Warning'
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        item.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                          : item.severity === 'Warning'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 font-bold">{item.time}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </main>

        <UserMobileNav />
      </div>
    </div>
  );
}
