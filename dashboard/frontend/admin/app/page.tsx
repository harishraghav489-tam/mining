'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { CriticalAlertBanner } from '../components/CriticalAlertBanner';
import { KpiCards } from '../components/KpiCards';
import { GisMineMap } from '../components/GisMineMap';
import { LiveSensorTable } from '../components/LiveSensorTable';
import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { AiInsightPanel } from '../components/AiInsightPanel';
import { RecentAlertsList } from '../components/RecentAlertsList';
import { CriticalAlertModal } from '../components/CriticalAlertModal';
import { useSimulation } from '../hooks/useSimulation';
import { Satellite } from 'lucide-react';

export default function AdminDashboardPage() {
  const { state } = useSimulation();
  const [showModal, setShowModal] = useState(false);

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
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  Sentinel-1 InSAR Radar Active
                </span>
              </div>

              <GisMineMap />
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
