'use client';

import React from 'react';
import { Cpu, AlertTriangle, Activity, MapPin, CheckCircle2, Flame, Layers } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function KpiCards() {
  const { state, t } = useSimulation();

  const totalNodes = state.nodes.length;
  const totalZones = state.zones.length;
  const warningCount = state.alerts.filter((a) => !a.acknowledged && a.severity === 'Warning').length;
  const criticalCount = state.alerts.filter((a) => !a.acknowledged && a.severity === 'Critical').length;
  const activeAlerts = warningCount + criticalCount;
  const riskScore = state.zones[0]?.riskScore ?? 18;
  const maxSubsidence = state.kpis.overallSubsidenceMaxMm ?? 1.25;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Sensor Nodes (9 Nodes across 3 Zones) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Sensor Nodes
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalNodes}</span>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            3 Nodes / Zone
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">BNO055 • ADXL345 • VL53L0X</p>
      </div>

      {/* 2. Active Incidents & Subsidence Alerts */}
      <div
        className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between transition-colors ${
          criticalCount > 0
            ? 'bg-rose-50/50 border-rose-300'
            : warningCount > 0
            ? 'bg-amber-50/50 border-amber-300'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Subsidence Alerts
          </span>
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              criticalCount > 0
                ? 'bg-rose-600 text-white animate-pulse'
                : warningCount > 0
                ? 'bg-amber-500 text-white'
                : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {criticalCount > 0 ? (
              <Flame className="w-4 h-4" />
            ) : warningCount > 0 ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={`text-3xl font-extrabold tracking-tight ${
              criticalCount > 0
                ? 'text-rose-600'
                : warningCount > 0
                ? 'text-amber-600'
                : 'text-slate-900'
            }`}
          >
            {activeAlerts}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {criticalCount} Critical • {warningCount} Warning
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          {activeAlerts === 0 ? 'Normal ground equilibrium' : 'Displacement threshold breach'}
        </p>
      </div>

      {/* 3. ML Risk Probability */}
      <div
        className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between transition-colors ${
          riskScore >= 80
            ? 'bg-rose-50/50 border-rose-300'
            : riskScore >= 40
            ? 'bg-amber-50/50 border-amber-300'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Subsidence Risk Score
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={`text-3xl font-extrabold tracking-tight ${
              riskScore >= 80
                ? 'text-rose-600'
                : riskScore >= 40
                ? 'text-amber-600'
                : 'text-emerald-600'
            }`}
          >
            {riskScore}%
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              riskScore >= 80
                ? 'bg-rose-100 text-rose-800'
                : riskScore >= 40
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {riskScore >= 80 ? 'CRITICAL' : riskScore >= 40 ? 'WARNING' : 'SAFE'}
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">Max Disp: {maxSubsidence.toFixed(2)} mm</p>
      </div>

      {/* 4. Monitored Pit Zones */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Mining Sectors
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{totalZones}</span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
            Active Zones
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-400">28 Active mine personnel</p>
      </div>
    </div>
  );
}
