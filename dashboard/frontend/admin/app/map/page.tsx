'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { GisMineMap } from '../../components/GisMineMap';
import { useSimulation } from '../../hooks/useSimulation';
import { Satellite } from 'lucide-react';

export default function MapPage() {
  const { state, t } = useSimulation();

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Sentinel-1 InSAR Satellite Geotechnical Map
              </h1>
              <p className="text-xs text-slate-500">
                Leaflet InSAR Satellite SDK • Sentinel-1 SAR Subsidence Heatmap • 9 Field IoT Nodes (BNO055 + ADXL-345 + VL53L0X)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Satellite Stream Active
              </span>
            </div>
          </div>

          {/* Full-Height Map Container */}
          <div className="h-[660px]">
            <GisMineMap fullHeight={true} />
          </div>
        </main>
      </div>
    </div>
  );
}

