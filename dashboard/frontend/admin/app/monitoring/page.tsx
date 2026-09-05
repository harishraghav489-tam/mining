'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import {
  Activity,
  Cpu,
  Radio,
  Battery,
  Wifi,
  Thermometer,
  Compass,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { LiveSensorTable } from '../../components/LiveSensorTable';

export default function MonitoringPage() {
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
                Subsidence Telemetry Network (9 Nodes • 3 Zones)
              </h1>
              <p className="text-xs text-slate-500">
                BNO055 (Orientation/Tilt) • ADXL-345 (Vibration/Acceleration) • VL53L0X (Laser Distance)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                LoRa Packet Stream Active (1 Hz)
              </span>
            </div>
          </div>

          {/* Node Hardware Deep Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.nodes.map((node) => (
              <div
                key={node.id}
                className={`bg-white rounded-xl border p-5 shadow-sm space-y-4 ${
                  node.status === 'CRITICAL'
                    ? 'border-rose-300 bg-rose-50/20'
                    : node.status === 'WARNING'
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-slate-200'
                }`}
              >
                {/* Node Title */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      {node.id}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{node.name}</h3>
                      <span className="text-[11px] text-slate-500">{node.zoneName}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    BNO+ADXL+VL53
                  </span>
                </div>

                {/* Primary Geotechnical Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      VL53L0X Laser Disp.
                    </span>
                    <span className={`text-lg font-bold font-mono ${node.displacement > 8 ? 'text-rose-600' : node.displacement > 3 ? 'text-amber-600' : 'text-slate-900'}`}>
                      {node.displacement.toFixed(2)} mm
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Rate: {node.vl53l0x.subsidenceVelocityMmDay} mm/d
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      BNO055 Pitch / Roll
                    </span>
                    <span className="text-lg font-bold font-mono text-slate-900">
                      {node.tiltX.toFixed(2)}°
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Roll: {node.tiltY.toFixed(2)}° • {node.bno055.tiltVelocityDegHr}°/h
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      ADXL-345 Vibration
                    </span>
                    <span className="text-base font-bold font-mono text-amber-700">
                      {node.vibration.toFixed(3)} g
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Acc Z: {node.accelerationZ.toFixed(2)} g
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      LoRa Health
                    </span>
                    <span className="text-base font-bold font-mono text-emerald-600">
                      {node.batteryLevel}% Bat
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      RSSI: {node.signalRssi} dBm
                    </span>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 text-slate-500">
                  <span>Heartbeat: {node.lastHeartbeat}</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    node.status === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : node.status === 'WARNING' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {node.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Full Live Sensor Table */}
          <LiveSensorTable />
        </main>
      </div>
    </div>
  );
}
