'use client';

import React, { useState } from 'react';
import {
  Compass,
  Rotate3d,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  MapPin,
  Activity,
  Layers,
  Radio,
  Sliders,
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SensorNode } from '../types';

interface Satellite3DMineMapProps {
  isUserView?: boolean;
  fullHeight?: boolean;
}

export function Satellite3DMineMap({
  isUserView = false,
  fullHeight = false,
}: Satellite3DMineMapProps) {
  const { state, t } = useSimulation();

  const [activeZoneFilter, setActiveZoneFilter] = useState<'ALL' | 'ZONE-01' | 'ZONE-02' | 'ZONE-03'>('ALL');
  const [viewMode, setViewMode] = useState<'3d-isometric' | 'satellite-ortho'>('3d-isometric');
  const [mapLayer, setMapLayer] = useState<'satellite' | 'insar-subsidence'>('satellite');
  const [zoom, setZoom] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(null);

  const isCritical = state.mode === 'CRITICAL';
  const isWarning = state.mode === 'WARNING';

  // Filter nodes according to selected zone tab
  const visibleNodes = state.nodes.filter((n) => {
    if (activeZoneFilter === 'ALL') return true;
    return n.zoneId === activeZoneFilter;
  });

  const get3DTransform = () => {
    if (viewMode === 'satellite-ortho') {
      return `scale(${zoom}) rotateX(0deg) rotateZ(0deg)`;
    }
    return `scale(${zoom}) rotateX(55deg) rotateZ(-22deg)`;
  };

  return (
    <div
      className={`bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col relative select-none ${
        fullHeight ? 'h-full min-h-[580px]' : isUserView ? 'h-[340px]' : 'h-[480px]'
      }`}
    >
      {/* 3D Map Top HUD: Controls & Zone Selector */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 py-3 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-transparent flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-mineguard-800/90 text-white flex items-center justify-center border border-mineguard-600/40 shadow-sm">
            <Compass className="w-4 h-4 text-rose-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                3D Mining Subsidence Digital Twin
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                9 Nodes • 3 Zones
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              BNO055 (Tilt) • ADXL-345 (Vibration) • VL53L0X (Laser Displacement)
            </p>
          </div>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs shadow-md">
            <button
              onClick={() => setActiveZoneFilter('ALL')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                activeZoneFilter === 'ALL'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Zones
            </button>
            <button
              onClick={() => setActiveZoneFilter('ZONE-01')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                activeZoneFilter === 'ZONE-01'
                  ? 'bg-mineguard-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Zone 01</span>
            </button>
            <button
              onClick={() => setActiveZoneFilter('ZONE-02')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                activeZoneFilter === 'ZONE-02'
                  ? 'bg-mineguard-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Zone 02
            </button>
            <button
              onClick={() => setActiveZoneFilter('ZONE-03')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                activeZoneFilter === 'ZONE-03'
                  ? 'bg-mineguard-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Zone 03
            </button>
          </div>

          {!isUserView && (
            <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs">
              <button
                onClick={() => setViewMode(viewMode === '3d-isometric' ? 'satellite-ortho' : '3d-isometric')}
                className="px-2.5 py-1 rounded text-[11px] font-semibold text-slate-300 hover:text-white transition flex items-center gap-1"
                title="Toggle 3D Perspective"
              >
                <Rotate3d className="w-3.5 h-3.5" />
                <span>{viewMode === '3d-isometric' ? '3D' : 'Top-Down'}</span>
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
                className="p-1.5 text-slate-400 hover:text-white border-l border-slate-800"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
                className="p-1.5 text-slate-400 hover:text-white border-l border-slate-800"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3D Perspective Canvas */}
      <div
        className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center"
        style={{
          perspective: '1200px',
          background: 'radial-gradient(ellipse at center, #111827 0%, #030712 100%)',
        }}
      >
        <div
          className="relative transition-transform duration-500 ease-out origin-center flex items-center justify-center w-[820px] h-[540px]"
          style={{
            transform: get3DTransform(),
            transformStyle: 'preserve-3d',
          }}
        >
          <svg viewBox="0 0 850 600" className="w-full h-full drop-shadow-2xl overflow-visible">
            <defs>
              <linearGradient id="rockSlope1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="40%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="rockSlope2" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#151f32" />
              </linearGradient>
              <radialGradient id="subsidenceAlarmPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </radialGradient>
              <filter id="shadow3D" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#000000" floodOpacity="0.9" />
              </filter>
            </defs>

            {/* 3D Open Cast Mine Terrain Relief Mesh */}
            <g filter="url(#shadow3D)">
              {/* Foundation Slab */}
              <polygon points="60,80 780,60 810,480 80,520" fill="#090d16" stroke="#1e293b" strokeWidth="2" />

              {/* Bench Tier +240m Crest */}
              <path
                d="M 100,100 Q 420,60 740,90 Q 780,280 740,460 Q 420,500 120,450 Q 70,280 100,100 Z"
                fill="url(#rockSlope1)"
                stroke="#475569"
                strokeWidth="2"
              />

              {/* Bench Tier +220m Mid Slope */}
              <path
                d="M 160,140 Q 420,110 680,130 Q 720,280 690,410 Q 420,450 170,400 Q 130,280 160,140 Z"
                fill="url(#rockSlope2)"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Bench Tier +200m Lower Shelf */}
              <path
                d="M 220,180 Q 420,160 620,170 Q 650,280 630,360 Q 420,400 230,360 Q 190,280 220,180 Z"
                fill="#131b2e"
                stroke="#243048"
                strokeWidth="1.5"
              />

              {/* Deep Pit Floor (+180m Sump) */}
              <path
                d="M 290,220 Q 420,210 550,220 Q 570,280 550,310 Q 420,330 290,310 Q 270,270 290,220 Z"
                fill="#070c18"
                stroke="#0f172a"
                strokeWidth="2"
              />

              {/* Main Haulage Ramp 2 Corridor */}
              <path
                d="M 120,450 Q 200,380 230,360 Q 320,310 440,290"
                fill="none"
                stroke="#d97706"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            {/* ZONE 01: North-East Highwall Section (Nodes N01, N02, N03) */}
            {(activeZoneFilter === 'ALL' || activeZoneFilter === 'ZONE-01') && (
              <g id="zone01_polygon">
                <polygon
                  points="450,120 700,130 650,270 420,240"
                  fill={isCritical ? '#dc2626' : isWarning ? '#f59e0b' : '#10b981'}
                  fillOpacity={isCritical ? 0.38 : isWarning ? 0.22 : 0.12}
                  stroke={isCritical ? '#dc2626' : isWarning ? '#f59e0b' : '#10b981'}
                  strokeWidth={isCritical ? 3.5 : 2}
                  strokeDasharray={isCritical ? 'none' : '6 3'}
                  className={isCritical ? 'animate-pulse' : ''}
                />
                {isCritical && (
                  <circle cx="560" cy="190" r="90" fill="url(#subsidenceAlarmPulse)" className="animate-ping opacity-70" />
                )}
                <g transform="translate(470, 125)">
                  <rect width="140" height="20" rx="4" fill="#030712" stroke="#334155" strokeWidth="1" />
                  <text x="10" y="14" fill="#f8fafc" fontSize="9" fontWeight="bold">
                    ZONE 01 • North-East
                  </text>
                </g>
              </g>
            )}

            {/* ZONE 02: South Haulage Crest Section (Nodes N04, N05, N06) */}
            {(activeZoneFilter === 'ALL' || activeZoneFilter === 'ZONE-02') && (
              <g id="zone02_polygon">
                <polygon
                  points="140,320 360,290 320,440 120,430"
                  fill="#10b981"
                  fillOpacity={0.1}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <g transform="translate(150, 330)">
                  <rect width="140" height="20" rx="4" fill="#030712" stroke="#334155" strokeWidth="1" />
                  <text x="10" y="14" fill="#f8fafc" fontSize="9" fontWeight="bold">
                    ZONE 02 • South Crest
                  </text>
                </g>
              </g>
            )}

            {/* ZONE 03: Central Deep Pit Section (Nodes N07, N08, N09) */}
            {(activeZoneFilter === 'ALL' || activeZoneFilter === 'ZONE-03') && (
              <g id="zone03_polygon">
                <polygon
                  points="300,220 540,220 530,300 290,300"
                  fill="#10b981"
                  fillOpacity={0.1}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <g transform="translate(320, 225)">
                  <rect width="140" height="20" rx="4" fill="#030712" stroke="#334155" strokeWidth="1" />
                  <text x="10" y="14" fill="#f8fafc" fontSize="9" fontWeight="bold">
                    ZONE 03 • Deep Pit Floor
                  </text>
                </g>
              </g>
            )}

            {/* Evacuation Corridor Laser Line */}
            <path
              d="M 530,190 Q 380,260 250,340 Q 180,390 120,450"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="8 4"
              className="animate-pulse"
            />

            {/* Assembly Point A Shelter Pin */}
            <g id="assemblyPtA" transform="translate(110, 455)">
              <circle cx="0" cy="0" r="15" fill="#065f46" stroke="#34d399" strokeWidth="2" />
              <ShieldCheck className="w-4 h-4 text-emerald-100" x="-8" y="-8" />
              <rect x="18" y="-9" width="115" height="20" rx="4" fill="#030712" stroke="#059669" strokeWidth="1" />
              <text x="24" y="5" fill="#6ee7b7" fontSize="9" fontWeight="bold">
                ASSEMBLY POINT A
              </text>
            </g>

            {/* 3D SENSOR BEACONS (9 NODES ACROSS 3 ZONES) */}
            {/* Zone 01 Nodes: N01, N02, N03 */}
            {visibleNodes.map((node) => {
              // Custom map coordinates for each node
              const coords: Record<string, { x: number; y: number }> = {
                N01: { x: 570, y: 170 },
                N02: { x: 480, y: 220 },
                N03: { x: 640, y: 230 },
                N04: { x: 200, y: 350 },
                N05: { x: 280, y: 370 },
                N06: { x: 170, y: 410 },
                N07: { x: 370, y: 250 },
                N08: { x: 450, y: 260 },
                N09: { x: 410, y: 280 },
              };

              const pos = coords[node.id] || { x: 400, y: 250 };
              const isNodeCrit = node.status === 'CRITICAL';
              const isNodeWarn = node.status === 'WARNING';

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Vertical Light Column */}
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="-38"
                    stroke={isNodeCrit ? '#dc2626' : isNodeWarn ? '#f59e0b' : '#10b981'}
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    className={isNodeCrit ? 'animate-pulse' : ''}
                  />

                  {/* Pulse Ring */}
                  {isNodeCrit && (
                    <circle cx="0" cy="0" r="24" fill="none" stroke="#dc2626" strokeWidth="2.5" className="animate-ping" />
                  )}

                  {/* Glowing 3D Beacon Head */}
                  <circle
                    cx="0"
                    cy="-38"
                    r="9"
                    fill={isNodeCrit ? '#dc2626' : isNodeWarn ? '#d97706' : '#059669'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="0" y="-35" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                    {node.id.replace('N', '')}
                  </text>

                  {/* Beacon Label Card */}
                  <g transform="translate(12, -48)">
                    <rect
                      width="68"
                      height="18"
                      rx="3"
                      fill="#030712"
                      stroke={isNodeCrit ? '#dc2626' : isNodeWarn ? '#f59e0b' : '#334155'}
                      strokeWidth="1"
                    />
                    <text x="6" y="12" fill="#f8fafc" fontSize="8" fontWeight="bold">
                      {node.id} • {node.displacement.toFixed(1)}mm
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Telemetry HUD */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 z-30 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 text-white shadow-2xl w-72 text-xs animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
              <div>
                <span className="font-extrabold text-sm text-white block">{selectedNode.name}</span>
                <span className="text-[10px] text-slate-400">{selectedNode.zoneName}</span>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {/* 3 Dedicated Sensors Breakdown */}
            <div className="space-y-2 text-[11px]">
              {/* VL53L0X Laser ToF Displacement */}
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">VL53L0X Laser Displacement</span>
                  <strong className={`font-mono text-xs ${selectedNode.displacement > 8 ? 'text-rose-400' : selectedNode.displacement > 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {selectedNode.displacement.toFixed(2)} mm
                  </strong>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedNode.vl53l0x.subsidenceVelocityMmDay} mm/d
                </span>
              </div>

              {/* BNO055 9-DOF Orientation / Tilt */}
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">BNO055 Triaxial Tilt</span>
                  <strong className="font-mono text-slate-200">
                    Pitch {selectedNode.bno055.pitchDeg.toFixed(2)}° • Roll {selectedNode.bno055.rollDeg.toFixed(2)}°
                  </strong>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Yaw {selectedNode.bno055.yawDeg.toFixed(0)}°
                </span>
              </div>

              {/* ADXL-345 3-Axis Vibration & Acceleration */}
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">ADXL-345 Vibration</span>
                  <strong className="font-mono text-amber-300">
                    {selectedNode.adxl345.vibrationG.toFixed(3)} g
                  </strong>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Acc Z: {selectedNode.adxl345.accelZ.toFixed(2)}g
                </span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Status: <strong className="text-white">{selectedNode.status}</strong></span>
              <span>Bat: {selectedNode.batteryLevel}% • RSSI: {selectedNode.signalRssi}dBm</span>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-3 right-3 z-20 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-2 text-[10px] text-slate-300 shadow-lg flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Stable Nodes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Subsidence Breach</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>Assembly Pt A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
