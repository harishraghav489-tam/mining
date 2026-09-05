'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import { FileText, Download, Printer, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';

export default function ReportsPage() {
  const { state, t } = useSimulation();

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                DGMS Safety Compliance Reports
              </h1>
              <p className="text-xs text-slate-500">
                Automated geotechnical audit dossiers & shift safety certification
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-mineguard-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-mineguard-900 transition shadow-sm">
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF Summary</span>
              </button>
            </div>
          </div>

          {/* Report Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Daily Geotechnical Shift Report</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">READY</span>
              </div>
              <p className="text-xs text-slate-500">
                Continuous 24-hour sensor telemetry logs from ESP32 Node 01 and Gateway 01.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">03 Sep 2026</span>
                <button className="text-mineguard-800 font-bold hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">InSAR Satellite Interferometry Pass</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">READY</span>
              </div>
              <p className="text-xs text-slate-500">
                Sentinel-1 & NISAR multi-temporal baseline displacement comparison for Sector IV.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">12-Day Cycle</span>
                <button className="text-mineguard-800 font-bold hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Incident & Siren Audit Log</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">UPDATED</span>
              </div>
              <p className="text-xs text-slate-500">
                Timestamped records of all threshold breaches, siren activations, and worker acknowledgements.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Live Audit Log</span>
                <button className="text-mineguard-800 font-bold hover:underline flex items-center gap-1">
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
