'use client';

import React from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import { Users, Shield, Smartphone, Radio, UserCheck, AlertCircle } from 'lucide-react';

export default function UsersPage() {
  const { state, t } = useSimulation();

  const workers = [
    {
      id: 'W-1025',
      name: 'Karthik S',
      role: 'Heavy Machinery Operator',
      zone: 'Zone 01 (North-East)',
      phone: '+91 98450 12345',
      appStatus: 'Connected (PWA)',
      pwaInstalled: true,
      lastAck: '10:32 AM',
    },
    {
      id: 'W-1026',
      name: 'Suresh Kumar',
      role: 'Haul Truck Driver',
      zone: 'Zone 01 (Ramp 2)',
      phone: '+91 98450 67891',
      appStatus: 'Connected (PWA)',
      pwaInstalled: true,
      lastAck: '10:15 AM',
    },
    {
      id: 'W-1027',
      name: 'Manoj Patel',
      role: 'Slope Geotech Technician',
      zone: 'Zone 01 (Crest)',
      phone: '+91 98450 45678',
      appStatus: 'Connected (PWA)',
      pwaInstalled: true,
      lastAck: '09:45 AM',
    },
    {
      id: 'W-1028',
      name: 'Vikram Singh',
      role: 'Excavator Lead',
      zone: 'Zone 01 (Bench 2)',
      phone: '+91 98450 33445',
      appStatus: 'Connected (PWA)',
      pwaInstalled: true,
      lastAck: '09:10 AM',
    },
  ];

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
                Mine Worker & Safety PWA Management
              </h1>
              <p className="text-xs text-slate-500">
                14 Active Personnel in Zone 01 • Real-time emergency evacuation broadcast recipients
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md text-xs font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                14/14 Workers PWA Synced
              </span>
            </div>
          </div>

          {/* Workers Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 font-bold text-xs text-slate-900 uppercase">
              Registered Field Personnel (Zone 01)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold text-[10px] uppercase">
                    <th className="py-2.5 px-4">Employee ID</th>
                    <th className="py-2.5 px-4">Worker Name</th>
                    <th className="py-2.5 px-4">Designation</th>
                    <th className="py-2.5 px-4">Assigned Mine Zone</th>
                    <th className="py-2.5 px-4">Contact Phone</th>
                    <th className="py-2.5 px-4 text-center">PWA Status</th>
                    <th className="py-2.5 px-4 text-right">Last Alert Seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {workers.map((worker) => (
                    <tr key={worker.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{worker.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{worker.name}</td>
                      <td className="py-3 px-4 text-slate-600">{worker.role}</td>
                      <td className="py-3 px-4 text-slate-700">{worker.zone}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{worker.phone}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Smartphone className="w-3 h-3 text-emerald-600" />
                          {worker.appStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-500">{worker.lastAck}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
