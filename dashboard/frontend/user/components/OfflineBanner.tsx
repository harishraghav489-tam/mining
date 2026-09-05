'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function OfflineBanner() {
  const { state, t } = useSimulation();

  if (state.isOnline) return null;

  return (
    <div className="bg-slate-900 text-amber-300 px-4 py-2.5 border-b border-amber-500/40 text-xs flex items-center justify-center gap-2 shadow-sm font-medium">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{t('user.offline.banner', { time: state.lastUpdated })}</span>
    </div>
  );
}
