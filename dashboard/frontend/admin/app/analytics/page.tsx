'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { AnalyticsCharts } from '../../components/AnalyticsCharts';
import { RiskGauge } from '../../components/RiskGauge';
import { useSimulation } from '../../hooks/useSimulation';
import { BarChart3, TrendingUp, AlertOctagon, CheckCircle2, Shield } from 'lucide-react';

export default function AnalyticsPage() {
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
                Geotechnical Analytics & Predictive Risk
              </h1>
              <p className="text-xs text-slate-500">
                Machine Learning slope stability models (XGBoost / Isolation Forest) • Real-time deformation metrics
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 shadow-xs">
                Model: ML Slope-Stability-v2.4
              </span>
            </div>
          </div>

          {/* Core Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <AnalyticsCharts />
            </div>
            <div className="lg:col-span-4">
              <RiskGauge />
            </div>
          </div>

          {/* Statistical Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-sm">Subsidence Velocity (VL53L0X)</span>
              <p className="text-slate-600">
                Current subsidence velocity: <strong className="text-slate-900">{state.nodes[0]?.vl53l0x.subsidenceVelocityMmDay} mm/day</strong>
              </p>
              <p className="text-slate-500 text-[11px]">Safe threshold limit: &lt; 1.0 mm/day</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-sm">Crack Aperture Width (VL53L0X)</span>
              <p className="text-slate-600">
                Surface fissure expansion: <strong className="text-slate-900">{state.nodes[0]?.vl53l0x.crackApertureMm} mm</strong>
              </p>
              <p className="text-slate-500 text-[11px]">Time-of-Flight relative optical precision</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <span className="font-bold text-slate-900 block text-sm">Triaxial Tilt Vector Shift</span>
              <p className="text-slate-600">
                Net tilt angle: <strong className="text-slate-900">{state.nodes[0]?.tiltX.toFixed(2)}°</strong>
              </p>
              <p className="text-slate-500 text-[11px]">BNO055 triaxial sensor calibration: 100%</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
