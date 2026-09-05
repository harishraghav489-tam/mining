'use client';

import React from 'react';
import Link from 'next/link';
import { TriangleAlert, CheckCircle2, ChevronRight, BellRing } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { getAlertSeverityColors } from '../../shared/utils';

export function RecentAlertsList() {
  const { state, t, ackAlert } = useSimulation();

  const alerts = state.alerts.slice(0, 6);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <TriangleAlert className="w-4 h-4 text-mineguard-800" />
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {t('alerts.recentTitle')}
          </h2>
        </div>
        <Link
          href="/alerts"
          className="text-xs font-semibold text-mineguard-800 hover:text-mineguard-900 flex items-center gap-0.5 transition"
        >
          <span>{t('alerts.viewAll')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-80">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
              !alert.acknowledged && alert.severity === 'Critical'
                ? 'bg-rose-50/30'
                : !alert.acknowledged && alert.severity === 'Warning'
                ? 'bg-amber-50/20'
                : ''
            }`}
          >
            {/* Left Info */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getAlertSeverityColors(alert.severity)}`}>
                  {alert.severity}
                </span>
                <span className="font-mono text-[11px] text-slate-500">{alert.timestamp}</span>
                <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] border border-slate-200">
                  {alert.nodeName}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">{alert.title}</p>
              <p className="text-slate-600 text-[11px] line-clamp-1">{alert.message}</p>
            </div>

            {/* Right Action */}
            <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
              {alert.acknowledged ? (
                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{alert.acknowledgedBy || 'Acknowledged'}</span>
                </div>
              ) : (
                <button
                  onClick={() => ackAlert(alert.id, 'Rajesh Sharma (Safety Admin)')}
                  className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-mineguard-800 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5"
                >
                  <BellRing className="w-3 h-3 text-rose-300" />
                  <span>{t('alerts.acknowledge')}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
