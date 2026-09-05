'use client';

import React, { useState } from 'react';
import { Flame, CheckCircle, X, ShieldAlert, ChevronRight } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

interface CriticalAlertBannerProps {
  onViewDetails?: () => void;
}

export function CriticalAlertBanner({ onViewDetails }: CriticalAlertBannerProps) {
  const { state, t, ackAlert, dismiss } = useSimulation();
  const [showAckSuccess, setShowAckSuccess] = useState(false);
  const [ackTime, setAckTime] = useState('');

  if (state.mode !== 'CRITICAL' || state.activeBannerDismissed) {
    return null;
  }

  const criticalAlert = state.alerts.find((a) => a.severity === 'Critical') || state.alerts[0];
  const isAcknowledged = criticalAlert?.acknowledged;

  const handleAcknowledge = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAckTime(time);
    ackAlert(criticalAlert.id, 'Rajesh Sharma (Safety Admin)');
    setShowAckSuccess(true);
    setTimeout(() => {
      setShowAckSuccess(false);
    }, 4000);
  };

  return (
    <aside aria-label="Critical Emergency Alert" className="bg-rose-900 border-b border-rose-950 text-white px-6 py-3 shadow-md relative overflow-hidden transition-all duration-300">
      {/* Background subtle warning stripe accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 opacity-90 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 max-w-7xl mx-auto">
        {/* Left: Icon & Alert Statement */}
        <div className="flex items-center gap-3.5">
          <div className="p-2 rounded-lg bg-rose-700/80 text-rose-100 border border-rose-600 shrink-0 animate-pulse">
            <Flame className="w-5 h-5 text-rose-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs uppercase tracking-wider bg-rose-950 text-rose-200 px-2 py-0.5 rounded border border-rose-800">
                {t('alerts.criticalBannerTitle')}
              </span>
              <span className="text-[11px] text-rose-300 font-mono">
                {criticalAlert?.timestamp || '03 Sep 10:30 AM'}
              </span>
            </div>
            <p className="text-sm font-semibold text-white mt-0.5 leading-snug">
              {t('alerts.criticalBannerDesc')}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          {showAckSuccess ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-900/90 text-emerald-200 border border-emerald-700 text-xs font-semibold animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{t('alerts.ackSuccess', { time: ackTime })}</span>
            </div>
          ) : isAcknowledged ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-950/80 text-rose-300 border border-rose-800 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acknowledged by Admin</span>
            </div>
          ) : (
            <button
              onClick={handleAcknowledge}
              className="px-3.5 py-1.5 bg-white hover:bg-rose-50 text-rose-900 font-bold text-xs rounded-md shadow transition flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span>{t('alerts.acknowledge')}</span>
            </button>
          )}

          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="px-3 py-1.5 bg-rose-800/80 hover:bg-rose-800 text-rose-100 font-medium text-xs rounded-md border border-rose-700/80 transition flex items-center gap-1"
            >
              <span>{t('alerts.viewDetails')}</span>
              <ChevronRight className="w-3 h-3 text-rose-300" />
            </button>
          )}

          <button
            onClick={dismiss}
            className="p-1.5 rounded-md hover:bg-rose-800 text-rose-300 hover:text-white transition"
            title={t('alerts.dismiss')}
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
