'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function AnalyticsCharts() {
  const { state, t } = useSimulation();
  const [metric, setMetric] = useState<'displacement' | 'tilt' | 'vibration'>('displacement');

  const data = state.historicalTelemetry;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs text-slate-200">
          <p className="font-bold text-slate-400 mb-1">Time: {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 py-0.5">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white">
                {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                {metric === 'displacement' ? ' mm' : metric === 'tilt' ? '°' : ' g'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col p-5 space-y-3">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-mineguard-800" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Mining Subsidence & Sensor Dynamics
          </h2>
        </div>

        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
          <button
            onClick={() => setMetric('displacement')}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${
              metric === 'displacement'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            VL53L0X Laser (mm)
          </button>
          <button
            onClick={() => setMetric('tilt')}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${
              metric === 'tilt'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            BNO055 Tilt (°)
          </button>
          <button
            onClick={() => setMetric('vibration')}
            className={`px-3 py-1 rounded-md text-[11px] font-bold transition ${
              metric === 'vibration'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            ADXL-345 Vibration (g)
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        {metric === 'displacement' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 16]} tickLine={false} unit="mm" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />

              <ReferenceLine y={3.0} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Safe (3mm)', fill: '#10b981', fontSize: 10 }} />
              <ReferenceLine y={8.0} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warning (8mm)', fill: '#f59e0b', fontSize: 10 }} />
              <ReferenceLine y={12.0} stroke="#dc2626" strokeWidth={1.5} label={{ value: 'Critical (12mm)', fill: '#dc2626', fontSize: 10 }} />

              <Line
                type="monotone"
                dataKey="vl53l0xDisplacementZ1"
                name="Zone 01 (North-East)"
                stroke="#991b1b"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#991b1b' }}
              />
              <Line
                type="monotone"
                dataKey="vl53l0xDisplacementZ2"
                name="Zone 02 (South Crest)"
                stroke="#3b82f6"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="vl53l0xDisplacementZ3"
                name="Zone 03 (Deep Pit)"
                stroke="#059669"
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metric === 'tilt' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[-1, 6]} tickLine={false} unit="°" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />

              <ReferenceLine y={3.0} stroke="#dc2626" strokeDasharray="4 4" label={{ value: 'Critical (3.0°)', fill: '#dc2626', fontSize: 10 }} />

              <Line
                type="monotone"
                dataKey="bno055TiltPitch"
                name="BNO055 Pitch Tilt (°)"
                stroke="#991b1b"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="bno055TiltRoll"
                name="BNO055 Roll Tilt (°)"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {metric === 'vibration' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 1.5]} tickLine={false} unit="g" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />

              <ReferenceLine y={0.5} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Warning (0.5g)', fill: '#f59e0b', fontSize: 10 }} />
              <ReferenceLine y={1.0} stroke="#dc2626" strokeWidth={1.5} label={{ value: 'Critical (1.0g)', fill: '#dc2626', fontSize: 10 }} />

              <Line
                type="monotone"
                dataKey="adxl345Vibration"
                name="ADXL-345 Dynamic Vibration (g)"
                stroke="#e11d48"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#e11d48' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
