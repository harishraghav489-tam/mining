'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '../../components/AdminSidebar';
import { AdminHeader } from '../../components/AdminHeader';
import { useSimulation } from '../../hooks/useSimulation';
import {
  TriangleAlert,
  Search,
  Filter,
  CheckCircle2,
  BellRing,
  Flame,
  AlertTriangle,
  Info,
  Calendar,
} from 'lucide-react';
import { getAlertSeverityColors } from '../../../shared/utils';

export default function AlertsPage() {
  const { state, t, ackAlert } = useSimulation();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = state.alerts.filter((alert) => {
    if (filterSeverity !== 'ALL' && alert.severity !== filterSeverity) return false;
    if (
      searchQuery &&
      !alert.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.nodeName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alert.message.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Incident & Geotechnical Alert Log
              </h1>
              <p className="text-xs text-slate-500">
                Audit trail of safety events, displacement threshold breaches & acknowledgement records
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search alerts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-mineguard-800 w-56 shadow-xs"
                />
              </div>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none shadow-xs"
              >
                <option value="ALL">All Severities</option>
                <option value="Critical">Critical Only</option>
                <option value="Warning">Warning Only</option>
                <option value="Info">Info / System</option>
              </select>
            </div>
          </div>

          {/* Alert Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Severity</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Sensor Node</th>
                    <th className="py-3 px-4">Incident Details</th>
                    <th className="py-3 px-4">Status / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredAlerts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500">
                        No alerts matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <tr
                        key={alert.id}
                        className={`hover:bg-slate-50/80 transition ${
                          !alert.acknowledged && alert.severity === 'Critical'
                            ? 'bg-rose-50/40'
                            : ''
                        }`}
                      >
                        {/* Severity */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold border ${getAlertSeverityColors(
                              alert.severity
                            )}`}
                          >
                            {alert.severity === 'Critical' ? (
                              <Flame className="w-3 h-3 text-rose-700" />
                            ) : alert.severity === 'Warning' ? (
                              <AlertTriangle className="w-3 h-3 text-amber-700" />
                            ) : (
                              <Info className="w-3 h-3 text-blue-600" />
                            )}
                            {alert.severity}
                          </span>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                          {alert.timestamp}
                        </td>

                        {/* Node */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{alert.nodeName}</div>
                          <div className="text-[10px] text-slate-500">{alert.zoneName}</div>
                        </td>

                        {/* Incident Description */}
                        <td className="py-3 px-4 max-w-md">
                          <div className="font-bold text-slate-900 text-xs">{alert.title}</div>
                          <div className="text-slate-600 text-[11px] mt-0.5">{alert.message}</div>
                        </td>

                        {/* Status / Acknowledge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          {alert.acknowledged ? (
                            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 text-[11px] font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{alert.acknowledgedBy || 'Acknowledged'}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => ackAlert(alert.id, 'Rajesh Sharma (Safety Admin)')}
                              className="px-3 py-1.5 bg-mineguard-800 hover:bg-mineguard-900 text-white font-bold text-xs rounded-md shadow-xs transition flex items-center gap-1.5"
                            >
                              <BellRing className="w-3 h-3 text-rose-200" />
                              <span>{t('alerts.acknowledge')}</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
