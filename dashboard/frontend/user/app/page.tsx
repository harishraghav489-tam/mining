'use client';

import React, { useState } from 'react';
import { UserMobileNav } from '../components/UserMobileNav';
import { UserDesktopSidebar } from '../components/UserDesktopSidebar';
import { UserHeader } from '../components/UserHeader';
import { OfflineBanner } from '../components/OfflineBanner';
import { SafeStatusHero } from '../components/SafeStatusHero';
import { WarningStatusHero } from '../components/WarningStatusHero';
import { CriticalStatusHero } from '../components/CriticalStatusHero';
import { SafeRouteModal } from '../components/SafeRouteModal';
import { useSimulation } from '../hooks/useSimulation';
import Link from 'next/link';
import { Bell, ChevronRight, PhoneCall } from 'lucide-react';

export default function UserHomePage() {
  const { state, t } = useSimulation();
  const [showRouteModal, setShowRouteModal] = useState(false);

  const isCritical = state.mode === 'CRITICAL';
  const isWarning = state.mode === 'WARNING';

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Desktop Responsive Sidebar */}
      <UserDesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader />
        <OfflineBanner />

        <main className="flex-1 p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-5">
          {/* Dynamic 3D Satellite Status Hero */}
          {isCritical ? (
            <CriticalStatusHero onViewSafeRoute={() => setShowRouteModal(true)} />
          ) : isWarning ? (
            <WarningStatusHero onViewMap={() => setShowRouteModal(true)} />
          ) : (
            <SafeStatusHero onViewMap={() => setShowRouteModal(true)} />
          )}

          {/* Emergency Safety Call Quick Action */}
          <div className="p-4 rounded-3xl bg-slate-900 text-white shadow-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 text-rose-400 flex items-center justify-center shrink-0 border border-slate-700">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Safety Control Room Hotline</h4>
                <p className="text-[11px] text-slate-400 font-mono">+91 326 220 4012 (24/7)</p>
              </div>
            </div>
            <a
              href="tel:+913262204012"
              className="px-4 py-2 rounded-xl bg-mineguard-800 hover:bg-mineguard-900 text-white font-bold text-xs shadow-xs transition shrink-0"
            >
              Call Hotline
            </a>
          </div>

          {/* Recent Bulletins Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-mineguard-800" />
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Latest Safety Bulletins
                </span>
              </div>
              <Link
                href="/updates"
                className="text-xs font-bold text-mineguard-800 hover:text-mineguard-900 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2">
              {state.alerts.slice(0, 2).map((alert) => (
                <div key={alert.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span className="font-bold text-slate-700">{alert.timestamp}</span>
                    <span
                      className={`px-2 py-0.2 rounded-full font-bold ${
                        alert.severity === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 text-xs">{alert.title}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <UserMobileNav />
      </div>

      {/* Safe Route Evacuation Modal */}
      <SafeRouteModal isOpen={showRouteModal} onClose={() => setShowRouteModal(false)} />
    </div>
  );
}
