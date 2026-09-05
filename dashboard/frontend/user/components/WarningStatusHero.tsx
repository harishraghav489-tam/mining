'use client';

import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SimpleMineMap } from './SimpleMineMap';

interface WarningStatusHeroProps {
  onViewMap?: () => void;
}

export function WarningStatusHero({ onViewMap }: WarningStatusHeroProps) {
  const { state, t } = useSimulation();

  return (
    <div className="space-y-4">
      {/* Greeting Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {t('user.greeting', { name: state.workerProfile.name })}
        </h2>
        <p className="text-xs text-amber-700 font-semibold mt-0.5 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Elevated Caution Advised</span>
        </p>
      </div>

      {/* Primary Warning Status Card */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-600/20">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 inline-block">
              {t('user.warningCard.badge')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1 leading-tight">
              {t('user.warningCard.desc')}
            </h3>
          </div>
        </div>

        {/* Advisory Message */}
        <p className="p-3.5 bg-white/90 rounded-2xl border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
          {t('user.warningCard.instruction')}
        </p>

        {/* 3D Satellite Map */}
        <SimpleMineMap isCritical={false} />

        {/* CTA */}
        <button
          onClick={onViewMap}
          className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
        >
          <span>View Evacuation Protocol & Safety Procedure</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
