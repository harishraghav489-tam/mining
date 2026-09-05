'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import { Satellite, Radio, Globe2, ShieldCheck, TrendingDown } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function SatellitePage() {
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
                Satellite InSAR Ground Deformation Radar
              </h1>
              <p className="text-xs text-slate-500">
                Interferometric Synthetic Aperture Radar • Sentinel-1 & NISAR Line-of-Sight measurements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-sky-100 text-sky-800 border border-sky-300 rounded-md text-xs font-bold flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-sky-700" />
                Next Orbital Pass: 08 Sep 2026 (Sentinel-1B)
              </span>
            </div>
          </div>

          {/* InSAR Deformation Timeline Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Multi-Temporal Cumulative Subsidence / Uplift (mm)
              </h3>
              <span className="text-xs text-slate-500">Coherence: &gt;0.88</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={state.insarData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="mm" domain={[-8, 0]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Line
                    type="monotone"
                    dataKey="cumulativeSubsidenceMm"
                    name="Cumulative Line-of-Sight Subsidence (mm)"
                    stroke="#0284c7"
                    strokeWidth={2.5}
                    dot={{ r: 5, fill: '#0284c7' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* InSAR Satellite Passes Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-900 uppercase">
              Recent Satellite Interferometric Acquisitions
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold text-[10px] uppercase">
                    <th className="py-2.5 px-4">Pass Date</th>
                    <th className="py-2.5 px-4">Satellite Constellation</th>
                    <th className="py-2.5 px-4 text-right">Cumulative Shift</th>
                    <th className="py-2.5 px-4 text-right">Annualized Velocity</th>
                    <th className="py-2.5 px-4 text-right">Coherence Index</th>
                    <th className="py-2.5 px-4 text-center">Zone Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {state.insarData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono">{item.timestamp}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-800">{item.satellite}</td>
                      <td className="py-2.5 px-4 text-right font-mono text-rose-600 font-bold">{item.cumulativeSubsidenceMm} mm</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-600">{item.velocityMmPerYear} mm/yr</td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-600 font-bold">{item.coherence}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                          {item.zone}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
