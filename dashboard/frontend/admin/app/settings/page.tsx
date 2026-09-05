'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import { Settings, Save, Sliders, Cpu, Radio, Shield, Bell, Database } from 'lucide-react';

export default function SettingsPage() {
  const { state, t } = useSimulation();
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
                System Thresholds & Hardware Architecture Configuration
              </h1>
              <p className="text-xs text-slate-500">
                ESP32 telemetry ingestion parameters, LoRa gateway frequency & ML risk sensitivity
              </p>
            </div>
            {saved && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold animate-in fade-in">
                Settings Successfully Saved!
              </span>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
            {/* Sensor Safety Limits */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
                Geotechnical Safety Thresholds
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Safe Displacement Max (mm)
                  </label>
                  <input
                    type="number"
                    defaultValue="3.0"
                    step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Warning Displacement Max (mm)
                  </label>
                  <input
                    type="number"
                    defaultValue="8.0"
                    step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Critical Evacuation Threshold (mm)
                  </label>
                  <input
                    type="number"
                    defaultValue="12.0"
                    step="0.1"
                    className="w-full bg-slate-50 border border-rose-200 rounded-lg p-2 font-mono text-rose-700 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Gateway LoRa & MQTT Pipeline */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
                LoRa Gateway & MQTT Broker Pipeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Raspberry Pi Gateway IP
                  </label>
                  <input
                    type="text"
                    defaultValue="192.168.1.105 (Gateway 01)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    MQTT Broker Topic
                  </label>
                  <input
                    type="text"
                    defaultValue="mineguard/dhanbad/zone01/telemetry"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* ML Risk Engine Configuration */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
                Machine Learning Risk Engine
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    Risk Engine Model Version
                  </label>
                  <input
                    type="text"
                    defaultValue="XGBoost-SlopeFail-v2.4.1"
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 font-mono text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">
                    LLM Synthesis Engine Provider
                  </label>
                  <input
                    type="text"
                    defaultValue="Gemini 1.5 Pro (Explanation Layer)"
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2 font-mono text-slate-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-mineguard-800 hover:bg-mineguard-900 text-white font-bold text-xs rounded-lg shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save System Configuration</span>
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
