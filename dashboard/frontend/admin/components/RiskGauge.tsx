'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Flame, Cpu } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function RiskGauge() {
  const { state, t } = useSimulation();
  const riskScore = state.zones[0]?.riskScore ?? 18;
  const isCritical = state.mode === 'CRITICAL';
  const isWarning = state.mode === 'WARNING';

  // Degree calculation for semi-circular needle (0% -> -90deg, 100% -> +90deg)
  const rotationDeg = -90 + (riskScore / 100) * 180;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {t('risk.title')}
          </h2>
          <p className="text-[11px] text-slate-500">{t('risk.subTitle')}</p>
        </div>
        <div className="p-1.5 rounded-md bg-slate-100 text-slate-700">
          <Cpu className="w-4 h-4 text-mineguard-800" />
        </div>
      </div>

      {/* Semi-Circular Radial Gauge */}
      <div className="my-4 flex flex-col items-center justify-center relative">
        <svg viewBox="0 0 200 110" className="w-48 overflow-visible">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Active Gradient Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Gauge Center Needle */}
          <g transform={`translate(100, 100) rotate(${rotationDeg})`}>
            <line x1="0" y1="0" x2="0" y2="-68" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="6" fill="#0f172a" />
          </g>
        </svg>

        {/* Big Risk Value Readout */}
        <div className="text-center -mt-2">
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={`text-4xl font-extrabold tracking-tight ${
                isCritical
                  ? 'text-rose-600'
                  : isWarning
                  ? 'text-amber-600'
                  : 'text-emerald-600'
              }`}
            >
              {riskScore}%
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border mt-1 ${
              isCritical
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : isWarning
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
            }`}
          >
            {isCritical ? (
              <>
                <Flame className="w-3.5 h-3.5 text-rose-700" />
                CRITICAL HAZARD
              </>
            ) : isWarning ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                WARNING ADVISORY
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                SAFE STABILITY
              </>
            )}
          </span>
        </div>
      </div>

      {/* Threshold Bands Indicator */}
      <div className="grid grid-cols-3 gap-1 text-[10px] text-center pt-2 border-t border-slate-100">
        <div className="p-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="font-bold block">0 - 40%</span>
          <span>Nominal</span>
        </div>
        <div className="p-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
          <span className="font-bold block">41 - 80%</span>
          <span>Warning</span>
        </div>
        <div className="p-1 rounded bg-rose-50 text-rose-800 border border-rose-200">
          <span className="font-bold block">81 - 100%</span>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
}
