'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { Satellite3DMineMap } from '../../../shared/components/Satellite3DMineMap';
import { GisMineMap } from '../../components/GisMineMap';
import { useSimulation } from '../../hooks/useSimulation';
import { Layers, Rotate3d, Satellite } from 'lucide-react';

export default function MapPage() {
  const { state, t } = useSimulation();
  const [mapEngine, setMapEngine] = useState<'insar-sdk' | '3d-twin'>('insar-sdk');

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
                Sentinel-1 InSAR Satellite & 3D Geotechnical Digital Twin
              </h1>
              <p className="text-xs text-slate-500">
                Leaflet InSAR Satellite SDK • Sentinel-1 SAR Subsidence Heatmap • 9 Field IoT Nodes (BNO055 + ADXL-345 + VL53L0X)
              </p>
            </div>

            {/* Map Engine Toggle */}
            <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 shadow-xs">
              <button
                onClick={() => setMapEngine('insar-sdk')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                  mapEngine === 'insar-sdk'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Satellite className="w-3.5 h-3.5 text-sky-400" />
                Sentinel InSAR SDK Map
              </button>
              <button
                onClick={() => setMapEngine('3d-twin')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                  mapEngine === '3d-twin'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Rotate3d className="w-3.5 h-3.5 text-amber-400" />
                3D Isometric Twin
              </button>
            </div>
          </div>

          {/* Full-Height Map Container */}
          <div className="h-[660px]">
            {mapEngine === 'insar-sdk' ? (
              <GisMineMap fullHeight={true} />
            ) : (
              <Satellite3DMineMap fullHeight={true} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

