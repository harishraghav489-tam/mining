'use client';

import React from 'react';
import { MapPin, ShieldCheck, Navigation } from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';

interface SimpleMineMapProps {
  isCritical?: boolean;
}

export function SimpleMineMap({ isCritical = false }: SimpleMineMapProps) {
  const { state, t } = useSimulation();

  const isModeCritical = isCritical || state.mode === 'CRITICAL';
  const isModeWarning = state.mode === 'WARNING';

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 shadow-lg overflow-hidden relative select-none">
      <div className="flex items-center justify-between text-white text-[11px] mb-2 px-1">
        <span className="flex items-center gap-1.5 font-bold tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-mineguard-400" />
          <span>3D SATELLITE MINE MAP</span>
        </span>
        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
          Zone 01 Safe Corridor
        </span>
      </div>

      <div
        className="relative h-56 w-full bg-radial-gradient rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          perspective: '800px',
          background: 'radial-gradient(ellipse at center, #111827 0%, #030712 100%)',
        }}
      >
        <div
          className="relative transition-transform duration-300 w-[380px] h-[220px] flex items-center justify-center"
          style={{
            transform: 'scale(1) rotateX(55deg) rotateZ(-20deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 400 240" className="w-full h-full overflow-visible drop-shadow-2xl">
            <defs>
              <radialGradient id="userDangerPulse3D" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* 3D Terraced Highwall Benches */}
            <polygon
              points="40,50 360,40 380,200 60,220"
              fill="#0a0f1d"
              stroke="#1e293b"
              strokeWidth="2"
            />

            {/* Bench Step 1 */}
            <path
              d="M 60 70 Q 200 45 340 60 Q 360 170 330 190 Q 200 210 60 190 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Bench Step 2 & Pit Floor */}
            <path
              d="M 120 100 Q 200 85 280 95 Q 300 150 270 170 Q 200 180 120 165 Z"
              fill="#0f172a"
              stroke="#1e293b"
              strokeWidth="1.5"
            />

            {/* Haul Ramp 2 Corridor */}
            <path
              d="M 60 190 Q 150 160 200 130 Q 260 100 320 80"
              fill="none"
              stroke="#d97706"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* 3D Zone 01 Hazard Area */}
            <polygon
              points="200,60 340,70 300,160 180,140"
              fill={isModeCritical ? '#dc2626' : isModeWarning ? '#f59e0b' : '#10b981'}
              fillOpacity={isModeCritical ? 0.4 : isModeWarning ? 0.25 : 0.15}
              stroke={isModeCritical ? '#dc2626' : isModeWarning ? '#f59e0b' : '#10b981'}
              strokeWidth="2.5"
              strokeDasharray={isModeCritical ? 'none' : '4 2'}
              className={isModeCritical ? 'animate-pulse' : ''}
            />

            {/* Critical Pulse */}
            {isModeCritical && (
              <circle
                cx="250"
                cy="105"
                r="45"
                fill="url(#userDangerPulse3D)"
                className="animate-ping opacity-80"
              />
            )}

            {/* Glowing Safe Evacuation Path (Laser Line) */}
            <path
              d="M 240 120 Q 160 150 110 180 Q 75 195 55 205"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="6 3"
              className="animate-pulse"
            />

            {/* Worker 3D Position Pin */}
            <g transform="translate(240, 115)">
              <line x1="0" y1="0" x2="0" y2="-28" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="0" cy="-28" r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="-25" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                YOU
              </text>
              <g transform="translate(10, -36)">
                <rect width="64" height="16" rx="3" fill="#030712" stroke="#3b82f6" strokeWidth="1" />
                <text x="6" y="11" fill="#93c5fd" fontSize="8" fontWeight="bold">
                  Your Location
                </text>
              </g>
            </g>

            {/* 3D Assembly Point A Marker */}
            <g transform="translate(55, 205)">
              <circle cx="0" cy="0" r="12" fill="#059669" stroke="#ffffff" strokeWidth="2" />
              <ShieldCheck className="w-3.5 h-3.5 text-white" x="-6" y="-6" />
              <g transform="translate(14, -8)">
                <rect width="90" height="18" rx="3" fill="#030712" stroke="#10b981" strokeWidth="1" />
                <text x="8" y="12" fill="#6ee7b7" fontSize="8" fontWeight="bold">
                  ASSEMBLY POINT A
                </text>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
