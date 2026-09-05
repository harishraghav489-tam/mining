'use client';

import React, { useState } from 'react';
import { Activity, Radio, Cpu, Filter } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { getNodeStatusColors } from '../../shared/utils';

export function LiveSensorTable() {
  const { state, t } = useSimulation();
  const [selectedZone, setSelectedZone] = useState<'ALL' | 'ZONE-01' | 'ZONE-02' | 'ZONE-03'>('ALL');

  const filteredNodes = state.nodes.filter((node) => {
    if (selectedZone === 'ALL') return true;
    return node.zoneId === selectedZone;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header with Zone Filter */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-mineguard-800" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Live Subsidence Sensor Telemetry (9 Nodes)
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Zone:</span>
          <button
            onClick={() => setSelectedZone('ALL')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              selectedZone === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All (9)
          </button>
          <button
            onClick={() => setSelectedZone('ZONE-01')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              selectedZone === 'ZONE-01'
                ? 'bg-mineguard-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Zone 01 (3)
          </button>
          <button
            onClick={() => setSelectedZone('ZONE-02')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              selectedZone === 'ZONE-02'
                ? 'bg-mineguard-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Zone 02 (3)
          </button>
          <button
            onClick={() => setSelectedZone('ZONE-03')}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
              selectedZone === 'ZONE-03'
                ? 'bg-mineguard-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Zone 03 (3)
          </button>
        </div>
      </div>

      {/* Sensor Data Rows */}
      <div className="overflow-x-auto flex-1 max-h-[380px]">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 bg-slate-50 z-10">
            <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-4">Node ID / Zone</th>
              <th className="py-2.5 px-4 text-right">VL53L0X Laser Disp.</th>
              <th className="py-2.5 px-4 text-right">BNO055 Tilt (X/Y)</th>
              <th className="py-2.5 px-4 text-right">ADXL-345 Vibration</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredNodes.map((node) => {
              const statusColors = getNodeStatusColors(node.status);
              const isDispCrit = node.displacement >= 8.0;
              const isDispWarn = node.displacement >= 3.0 && node.displacement < 8.0;

              return (
                <tr
                  key={node.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    node.status === 'CRITICAL' ? 'bg-rose-50/50' : node.status === 'WARNING' ? 'bg-amber-50/30' : ''
                  }`}
                >
                  {/* Node Name & Zone */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                        {node.id}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{node.name}</span>
                        <span className="text-[10px] text-slate-500">{node.zoneName}</span>
                      </div>
                    </div>
                  </td>

                  {/* VL53L0X Laser Displacement */}
                  <td className="py-2.5 px-4 text-right font-mono">
                    <span
                      className={`font-bold ${
                        isDispCrit
                          ? 'text-rose-600 font-extrabold text-sm'
                          : isDispWarn
                          ? 'text-amber-600 font-bold'
                          : 'text-slate-800'
                      }`}
                    >
                      {node.displacement.toFixed(2)} mm
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {node.vl53l0x.subsidenceVelocityMmDay} mm/d
                    </span>
                  </td>

                  {/* BNO055 Tilt */}
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    <div>{node.tiltX > 0 ? `+${node.tiltX.toFixed(2)}` : node.tiltX.toFixed(2)}° P</div>
                    <div className="text-[10px] text-slate-400">{node.tiltY > 0 ? `+${node.tiltY.toFixed(2)}` : node.tiltY.toFixed(2)}° R</div>
                  </td>

                  {/* ADXL-345 Vibration */}
                  <td className="py-2.5 px-4 text-right font-mono">
                    <span className={`font-bold ${node.vibration > 0.4 ? 'text-amber-600' : 'text-slate-700'}`}>
                      {node.vibration.toFixed(3)} g
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {node.accelerationZ.toFixed(2)} g Z
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors.badge}`}>
                      {node.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
