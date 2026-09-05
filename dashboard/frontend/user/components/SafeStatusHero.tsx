'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SimpleMineMap } from './SimpleMineMap';

interface SafeStatusHeroProps {
  onViewMap?: () => void;
}

export function SafeStatusHero({ onViewMap }: SafeStatusHeroProps) {
  const { state, t } = useSimulation();

  return (
    <div className="space-y-4">
      {/* Greeting Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {t('user.greeting', { name: state.workerProfile.name })}
        </h2>
        <p className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t('user.staySafe')}</span>
        </p>
      </div>

      {/* Primary Safe Status Card */}
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 inline-block">
              {t('user.safeCard.title')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 leading-tight">
              {t('user.safeCard.desc')}
            </h3>
          </div>
        </div>

        {/* 3D Satellite Mine Perspective */}
        <SimpleMineMap isCritical={false} />

        {/* Action Button */}
        <button
          onClick={onViewMap}
          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
        >
          <span>View Evacuation Protocol & Safe Assembly Guide</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
        </button>
      </div>
    </div>
  );
}
