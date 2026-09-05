'use client';

import React from 'react';
import {
  X,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  PhoneCall,
  HardHat,
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

interface SafeRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SafeRouteModal({ isOpen, onClose }: SafeRouteModalProps) {
  const { state, t } = useSimulation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] isolate flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in select-none">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-700 text-white border border-emerald-600 shadow-md">
              <Navigation className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t('user.evacuationModal.title')}
              </h3>
              <p className="text-xs text-emerald-200 mt-0.5">
                {t('user.evacuationModal.subtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-300 hover:text-white p-1.5 rounded-xl hover:bg-emerald-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 overflow-y-auto text-xs">
          {/* Evacuation Route Summary Card */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Primary Evacuation Corridor</span>
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                Route #2 (North)
              </span>
            </div>

            {/* Interactive Corridor Path Visualizer */}
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200 text-[11px] font-semibold text-slate-800">
              <div className="text-center">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center mx-auto mb-1">
                  YOU
                </span>
                <span className="text-[10px] text-slate-500">Zone 01 Crest</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-center">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center mx-auto mb-1">
                  R2
                </span>
                <span className="text-[10px] text-slate-500">Haul Ramp 2</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-center">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center mx-auto mb-1">
                  ✓
                </span>
                <span className="text-[10px] text-emerald-800 font-bold">Assembly Pt A</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Est. Walk Time: <strong>3.5 mins (280m)</strong>
              </span>
              <span className="text-emerald-700 font-bold">Slope: 4.2% (Clear)</span>
            </div>
          </div>

          {/* 4 Step Directives */}
          <div className="space-y-2.5">
            <span className="font-extrabold text-slate-900 uppercase text-[11px] tracking-wider block">
              Immediate Safety Instructions:
            </span>
            <div className="space-y-2 text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span className="leading-snug">{t('user.evacuationModal.step1')}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span className="leading-snug font-semibold text-emerald-950">
                  {t('user.evacuationModal.step2')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </span>
                <span className="leading-snug font-semibold text-rose-950">
                  {t('user.evacuationModal.step3')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  4
                </span>
                <span className="leading-snug">{t('user.evacuationModal.step4')}</span>
              </div>
            </div>
          </div>

          {/* Emergency Safety Hotline Action */}
          <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
              <div>
                <span className="text-[11px] font-bold block">Safety Warden On-Duty</span>
                <span className="text-[10px] text-slate-400 font-mono">+91 326 220 4012</span>
              </div>
            </div>
            <a
              href="tel:+913262204012"
              className="px-3 py-1.5 rounded-lg bg-mineguard-800 text-white font-bold text-xs"
            >
              Call Hotline
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl shadow-xs transition"
          >
            {t('user.evacuationModal.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
