'use client';

import React from 'react';
import { X, Navigation, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SimpleMineMap } from './SimpleMineMap';

interface SafeRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafeRouteModal({ isOpen, onClose }: SafeRouteModalProps) {
  const { state, t } = useSimulation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-700 text-white border border-emerald-600">
              <Navigation className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t('user.evacuationModal.title')}
              </h3>
              <p className="text-[11px] text-emerald-200">
                {t('user.evacuationModal.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Visual Route Schematic */}
          <SimpleMineMap isCritical={true} />

          {/* 4 Step Directives */}
          <div className="space-y-2.5">
            <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wider block">
              Follow Evacuation Procedure:
            </span>
            <div className="space-y-2 text-slate-700">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span className="leading-snug">{t('user.evacuationModal.step1')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span className="leading-snug font-semibold text-emerald-950">
                  {t('user.evacuationModal.step2')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <span className="leading-snug font-semibold text-rose-950">
                  {t('user.evacuationModal.step3')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  4
                </span>
                <span className="leading-snug">{t('user.evacuationModal.step4')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            {t('user.evacuationModal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
