'use client';

import React from 'react';
import { Bot, CheckCircle2, Info } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

export function AiInsightPanel() {
  const { state, t } = useSimulation();
  const insight = state.aiInsight;
  const isCritical = state.mode === 'CRITICAL';

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm flex flex-col justify-between transition-colors ${
        isCritical ? 'bg-rose-50/40 border-rose-200' : 'bg-white border-slate-200'
      }`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Bot className="w-4 h-4 text-rose-200" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                AI Geotechnical Insight
              </h3>
              <p className="text-[11px] text-slate-400">Generated at {insight.generatedAt}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            LLM Layer
          </span>
        </div>

        {/* Summary */}
        <p className="text-xs font-medium text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          {insight.summary}
        </p>

        {/* Recommended Mitigations */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Recommended Action:
          </span>
          {insight.recommendedActions.slice(0, 2).map((action, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-mineguard-800 shrink-0 mt-0.5" />
              <span className="leading-snug">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Disclaimer */}
      <div className="mt-4 pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[10px] text-slate-400">
        <Info className="w-3 h-3 shrink-0 mt-0.5 text-slate-400" />
        <p className="leading-tight">
          Risk calculated by ML Risk Engine. LLM synthesizes operational context.
        </p>
      </div>
    </div>
  );
}
