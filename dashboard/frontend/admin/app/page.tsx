'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { CriticalAlertBanner } from '../components/CriticalAlertBanner';
import { KpiCards } from '../components/KpiCards';
import { Satellite3DMineMap } from '../../shared/components/Satellite3DMineMap';
import { GisMineMap } from '../components/GisMineMap';
import { LiveSensorTable } from '../components/LiveSensorTable';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { AiInsightPanel } from '../components/AiInsightPanel';
import { RecentAlertsList } from '../components/RecentAlertsList';
import { CriticalAlertModal } from '../components/CriticalAlertModal';
import { useSimulation } from '../hooks/useSimulation';
import { Satellite, Rotate3d } from 'lucide-react';

export default function AdminDashboardPage() {
  const { state } = useSimulation();
  const [showModal, setShowModal] = useState(false);
  const [mapEngine, setMapEngine] = useState<'insar-sdk' | '3d-twin'>('insar-sdk');

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Persistent Left Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader />

        {/* Critical Emergency Alert Banner */}
        <CriticalAlertBanner onViewDetails={() => setShowModal(true)} />

        {/* Dashboard Main Scrollable View */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {/* 1. KPI Summary Cards */}
          <KpiCards />

          {/* 2. Core Monitoring Row: Sentinel InSAR Map & Live Sensor Table */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Map Column (7 cols on XL) */}
            <div className="xl:col-span-7 flex flex-col space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-extrabold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
                  <Satellite className="w-3.5 h-3.5 text-sky-600" />
                  Live Subsidence Geotechnical Map
                </span>
                <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 shadow-xs">
                  <button
                    onClick={() => setMapEngine('insar-sdk')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                      mapEngine === 'insar-sdk'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Satellite className="w-3 h-3 text-sky-400" />
                    Sentinel InSAR SDK
                  </button>
                  <button
                    onClick={() => setMapEngine('3d-twin')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                      mapEngine === '3d-twin'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Rotate3d className="w-3 h-3 text-amber-400" />
                    3D Digital Twin
                  </button>
                </div>
              </div>

              {mapEngine === 'insar-sdk' ? (
                <GisMineMap />
              ) : (
                <Satellite3DMineMap />
              )}
            </div>

            {/* Live Sensor Telemetry Table (5 cols on XL) */}
            <div className="xl:col-span-5 flex flex-col">
              <LiveSensorTable />
            </div>
          </div>

          {/* 3. Analytical Insights & Incident Log Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Multi-Threshold Recharts Analytics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <AnalyticsCharts />
            </div>

            {/* AI Geotechnical Insight (5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <AiInsightPanel />
            </div>
          </div>

          {/* 4. Incident & Event Log */}
          <div>
            <RecentAlertsList />
          </div>
        </main>
      </div>

      {/* Emergency Protocol Details Modal */}
      <CriticalAlertModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
