'use client';

import React from 'react';
import { Flame, ShieldAlert, CheckCircle2, Radio, MapPin, X, AlertTriangle } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

interface CriticalAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CriticalAlertModal({ isOpen, onClose }: CriticalAlertModalProps) {
  const { state, t, ackAlert } = useSimulation();

  if (!isOpen) return null;

  const criticalAlert = state.alerts.find((a) => a.severity === 'Critical') || state.alerts[0];
  const node1 = state.nodes.find((n) => n.id === 'N01') || state.nodes[0];

  const handleAcknowledgeAndDispatch = () => {
    ackAlert(criticalAlert.id, 'Rajesh Sharma (Safety Admin)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] isolate flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-rose-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-900 to-rose-950 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-800 text-white border border-rose-700 animate-pulse">
              <Flame className="w-6 h-6 text-rose-200" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-rose-950 px-2 py-0.5 rounded text-rose-300 border border-rose-800">
                CRITICAL EMERGENCY PROTOCOL
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Zone 01 Slope Instability Detected
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-rose-300 hover:text-white p-1 rounded hover:bg-rose-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Geotechnical Telemetry Snapshot */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Displacement
              </span>
              <span className="text-xl font-extrabold text-rose-700 font-mono">
                {node1.displacement.toFixed(2)} mm
              </span>
              <span className="text-[10px] text-rose-600 block mt-0.5 font-semibold">
                Limit: 3.0 mm
              </span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                Triaxial Tilt
              </span>
              <span className="text-xl font-extrabold text-rose-700 font-mono">
                {node1.tiltX.toFixed(2)}°
              </span>
              <span className="text-[10px] text-rose-600 block mt-0.5 font-semibold">
                Critical &gt; 3.0°
              </span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                ML Risk Score
              </span>
              <span className="text-xl font-extrabold text-rose-700 font-mono">
                91%
              </span>
              <span className="text-[10px] text-rose-600 block mt-0.5 font-semibold">
                Imminent Hazard
              </span>
            </div>
          </div>

          {/* Emergency Directives */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
              Immediate Safety Actions:
            </span>
            <div className="space-y-1.5 text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Audio siren triggered on Dhanbad Sector IV highwall perimeter.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Worker PWA Emergency Push Broadcast initiated to 14 active personnel.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Primary Evacuation Corridor: <strong>Ramp 2 → Assembly Point A</strong>.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition"
          >
            Close
          </button>
          <button
            onClick={handleAcknowledgeAndDispatch}
            className="px-5 py-2 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-lg shadow-md transition flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Acknowledge & Confirm Protocol</span>
          </button>
        </div>
      </div>
    </div>
  );
}
