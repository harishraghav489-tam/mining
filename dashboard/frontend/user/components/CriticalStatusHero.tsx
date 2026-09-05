'use client';

import React, { useState } from 'react';
import { Flame, ShieldAlert, CheckCircle2, ArrowRight, Navigation } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SimpleMineMap } from './SimpleMineMap';

interface CriticalStatusHeroProps {
  onViewSafeRoute: () => void;
}

export function CriticalStatusHero({ onViewSafeRoute }: CriticalStatusHeroProps) {
  const { state, t, markSeen } = useSimulation();
  const [showSeenBanner, setShowSeenBanner] = useState(false);

  const handleSeen = () => {
    markSeen();
    setShowSeenBanner(true);
  };

  return (
    <div className="space-y-4">
      {/* Greeting Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {t('user.greeting', { name: state.workerProfile.name })}
        </h2>
        <p className="text-xs text-rose-700 font-extrabold mt-0.5 flex items-center gap-1.5 animate-pulse">
          <Flame className="w-3.5 h-3.5 text-rose-600" />
          <span>EMERGENCY SAFETY DIRECTIVE IN EFFECT</span>
        </p>
      </div>

      {/* Main Critical Alert Card */}
      <div className="bg-rose-50 border-2 border-rose-400 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-700/30 animate-pulse">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-900 bg-rose-200 px-2.5 py-0.5 rounded-full border border-rose-400 inline-block animate-pulse">
              🚨 {t('user.criticalCard.badge')}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1 leading-tight">
              {t('user.criticalCard.desc')}
            </h3>
          </div>
        </div>

        {/* Emergency Directive */}
        <div className="p-4 rounded-2xl bg-rose-600 text-white space-y-1 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-100 shrink-0" />
            <span className="font-extrabold text-xs uppercase tracking-wider">
              {t('user.criticalCard.instructionTitle')}
            </span>
          </div>
          <p className="text-xs font-medium text-rose-100 leading-relaxed pl-6">
            {t('user.criticalCard.instruction')}
          </p>
        </div>

        {/* 3D Satellite Map highlighting Hazard and Safe Path */}
        <SimpleMineMap isCritical={true} />

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={onViewSafeRoute}
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2.5"
          >
            <Navigation className="w-4 h-4" />
            <span>{t('user.criticalCard.viewRoute')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {state.seenAlertAcknowledged || showSeenBanner ? (
            <div className="w-full py-2.5 px-3 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{t('user.criticalCard.seenSuccess')}</span>
            </div>
          ) : (
            <button
              onClick={handleSeen}
              className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs transition"
            >
              {t('user.criticalCard.seenAlert')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
