'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Layers,
  Satellite,
  Radio,
  Flame,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ShieldCheck,
  Activity,
  Compass,
  Info,
  MapPin,
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SensorNode, RiskZone } from '../types';

interface GisMineMapProps {
  fullHeight?: boolean;
  isUserView?: boolean;
  selectedZoneId?: string;
}

export function GisMineMap({
  fullHeight = false,
  isUserView = false,
  selectedZoneId,
}: GisMineMapProps) {
  const { state, setMode } = useSimulation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const layersRef = useRef<{ [key: string]: any }>({});
  const insarLayerRef = useRef<any>(null);
  const zonePolygonsRef = useRef<{ [key: string]: any }>({});

  const [activeLayer, setActiveLayer] = useState<'satellite' | 'insar' | 'dark'>('satellite');
  const [activeZone, setActiveZone] = useState<string>(selectedZoneId || 'ALL');
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(null);
  const [isLeafletReady, setIsLeafletReady] = useState(false);

  const isCritical = state.mode === 'CRITICAL';
  const isWarning = state.mode === 'WARNING';

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      // Initialize map centered at Dhanbad Open-Cast Mining Pit
      const mineCenter: [number, number] = [23.7945, 86.4315];
      const map = L.map(mapContainerRef.current, {
        center: isUserView ? [23.7965, 86.4312] : mineCenter,
        zoom: isUserView ? 16 : 16,
        minZoom: 13,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: false,
        touchZoom: true,
        dragging: true,
      });

      mapInstanceRef.current = map;

      // Satellite Imagery & Dark Tiles
      const satelliteTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      );

      const darkTile = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      );

      layersRef.current = {
        satellite: satelliteTile,
        dark: darkTile,
      };

      satelliteTile.addTo(map);

      // Sentinel-1 InSAR Subsidence Heatmap Overlay
      const insarHeatmapGroup = L.layerGroup();
      insarLayerRef.current = insarHeatmapGroup;

      const insarPoints = [
        { lat: 23.7975, lng: 86.4320, rate: isCritical ? -14.8 : isWarning ? -7.2 : -1.8, radius: 100, zone: 'Zone 01' },
        { lat: 23.7960, lng: 86.4305, rate: isCritical ? -12.4 : isWarning ? -5.9 : -1.2, radius: 85, zone: 'Zone 01' },
        { lat: 23.7925, lng: 86.4325, rate: isCritical ? -8.6 : isWarning ? -4.1 : -0.9, radius: 75, zone: 'Zone 02' },
        { lat: 23.7915, lng: 86.4300, rate: isCritical ? -6.2 : isWarning ? -3.0 : -0.6, radius: 65, zone: 'Zone 02' },
        { lat: 23.7948, lng: 86.4312, rate: isCritical ? -10.5 : isWarning ? -5.4 : -1.1, radius: 80, zone: 'Zone 03' },
      ];

      insarPoints.forEach((pt) => {
        const color = Math.abs(pt.rate) > 10 ? '#ef4444' : Math.abs(pt.rate) > 5 ? '#f59e0b' : '#10b981';
        const fillOpacity = Math.abs(pt.rate) > 10 ? 0.45 : Math.abs(pt.rate) > 5 ? 0.35 : 0.22;

        const circle = L.circle([pt.lat, pt.lng], {
          radius: pt.radius,
          color: color,
          weight: 1.5,
          fillColor: color,
          fillOpacity: fillOpacity,
          dashArray: Math.abs(pt.rate) > 10 ? '4, 4' : undefined,
        });

        circle.bindTooltip(
          `<div class="text-[11px] font-mono">
            <strong>Sentinel-1 InSAR LOS Subsidence</strong><br/>
            ${pt.zone} • Rate: <strong style="color:${color}">${pt.rate} mm/yr</strong>
          </div>`,
          { permanent: false, direction: 'top' }
        );

        insarHeatmapGroup.addLayer(circle);
      });

      insarHeatmapGroup.addTo(map);

      // Multi-Zone Polygons
      state.zones.forEach((zone) => {
        const isZoneCritical = isCritical && zone.id === 'ZONE-01';
        const isZoneWarning = isWarning && zone.id === 'ZONE-01';

        const strokeColor = isZoneCritical ? '#dc2626' : isZoneWarning ? '#f59e0b' : '#10b981';
        const fillColor = isZoneCritical ? '#dc2626' : isZoneWarning ? '#f59e0b' : '#059669';

        const polygon = L.polygon(zone.coordinates as any, {
          color: strokeColor,
          weight: 2.5,
          dashArray: '6, 6',
          fillColor: fillColor,
          fillOpacity: isZoneCritical ? 0.25 : 0.12,
        });

        polygon.bindTooltip(
          `<div class="text-xs font-bold font-sans">${zone.name}: ${zone.section}</div>`,
          { permanent: false, direction: 'center' }
        );

        polygon.on('click', () => {
          map.flyToBounds(polygon.getBounds(), { padding: [30, 30], duration: 1 });
          setActiveZone(zone.id);
        });

        polygon.addTo(map);
        zonePolygonsRef.current[zone.id] = polygon;
      });

      // Safe Evacuation Route Polyline
      const evacuationPath: [number, number][] = [
        [23.7975, 86.4320],
        [23.7955, 86.4310],
        [23.7935, 86.4295],
        [23.7905, 86.4275],
      ];

      const evacPolyline = L.polyline(evacuationPath, {
        color: '#10b981',
        weight: 3.5,
        dashArray: '8, 6',
        opacity: 0.9,
      });

      evacPolyline.bindTooltip('<strong>Safe Evacuation Route (Ramp 2 → Assembly Point A)</strong>', {
        sticky: true,
      });

      evacPolyline.addTo(map);

      // Assembly Point A Marker
      const musterIcon = L.divIcon({
        className: 'custom-muster-marker',
        html: `
          <div class="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-700 text-white border-2 border-emerald-300 shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const musterMarker = L.marker([23.7905, 86.4275], { icon: musterIcon });
      musterMarker.bindTooltip('<strong>Assembly Point A (Safe Shelter)</strong>', {
        permanent: true,
        direction: 'right',
        className: 'bg-slate-900 text-emerald-300 border border-emerald-600 text-[10px] px-2 py-0.5 rounded shadow-md',
      });
      musterMarker.addTo(map);

      // In User View: Add worker location beacon
      if (isUserView) {
        const workerIcon = L.divIcon({
          className: 'custom-worker-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="absolute -inset-2 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
              <div class="relative w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white shadow-xl">
                YOU
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const workerMarker = L.marker([23.7965, 86.4312], { icon: workerIcon });
        workerMarker.bindTooltip('<strong>Your Current Position (Zone 01)</strong>', {
          permanent: true,
          direction: 'top',
          className: 'bg-slate-900 text-blue-300 border border-blue-600 text-[10px] px-2 py-0.5 rounded shadow-md',
        });
        workerMarker.addTo(map);
      }

      setIsLeafletReady(true);

      // Invalidate size after layout settles to prevent tile duplication
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);

      const handleResize = () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      };
      window.addEventListener('resize', handleResize);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isUserView]);

  // Update Markers dynamically when nodes/state change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLeafletReady) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      const visibleNodes = state.nodes.filter((n) => {
        if (activeZone === 'ALL') return true;
        return n.zoneId === activeZone;
      });

      // Clear existing markers
      Object.values(markersRef.current).forEach((m: any) => m.remove());
      markersRef.current = {};

      visibleNodes.forEach((node) => {
        const isNodeCrit = node.status === 'CRITICAL' || (state.mode === 'CRITICAL' && node.id === 'N01');
        const isNodeWarn = node.status === 'WARNING' || (state.mode === 'WARNING' && node.id === 'N01');

        const bgColor = isNodeCrit ? 'bg-rose-600' : isNodeWarn ? 'bg-amber-500' : 'bg-emerald-600';
        const borderColor = isNodeCrit ? 'border-rose-300' : isNodeWarn ? 'border-amber-200' : 'border-emerald-200';
        const pulseRing = isNodeCrit
          ? '<span class="absolute -inset-2 rounded-full bg-rose-500 opacity-75 animate-ping"></span>'
          : isNodeWarn
          ? '<span class="absolute -inset-1.5 rounded-full bg-amber-400 opacity-50 animate-pulse"></span>'
          : '';

        const customIcon = L.divIcon({
          className: 'custom-sensor-marker',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              ${pulseRing}
              <div class="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full ${bgColor} text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center border-2 ${borderColor} shadow-xl transform transition-transform group-hover:scale-125">
                ${node.id.replace('N', '')}
              </div>
              <div class="absolute -bottom-3.5 bg-slate-950/90 text-[8px] sm:text-[9px] font-mono px-1 py-0.2 rounded border border-slate-700 text-slate-200 whitespace-nowrap shadow-sm">
                ${node.id}
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([node.latitude, node.longitude], { icon: customIcon });

        const popupContent = `
          <div class="p-2 font-sans min-w-[200px] sm:min-w-[230px] text-slate-900">
            <div class="flex items-center justify-between border-b border-slate-200 pb-1 mb-1.5">
              <div>
                <strong class="text-xs font-bold text-slate-900">${node.name}</strong>
                <span class="block text-[9px] text-slate-500 font-mono">${node.zoneName}</span>
              </div>
              <span class="px-1.5 py-0.2 rounded text-[9px] font-bold ${
                isNodeCrit ? 'bg-rose-100 text-rose-800' : isNodeWarn ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }">
                ${isNodeCrit ? 'CRITICAL' : isNodeWarn ? 'WARNING' : 'NORMAL'}
              </span>
            </div>
            <div class="space-y-1 text-xs">
              <div class="flex justify-between bg-slate-50 p-1 rounded">
                <span class="text-slate-600 text-[10px]">VL53L0X Laser:</span>
                <strong class="font-mono text-[10px] ${isNodeCrit ? 'text-rose-600' : 'text-slate-900'}">${node.displacement.toFixed(2)} mm</strong>
              </div>
              <div class="flex justify-between bg-slate-50 p-1 rounded">
                <span class="text-slate-600 text-[10px]">BNO055 Tilt:</span>
                <strong class="font-mono text-[10px] text-slate-900">${node.tiltX.toFixed(2)}° / ${node.tiltY.toFixed(2)}°</strong>
              </div>
              <div class="flex justify-between bg-slate-50 p-1 rounded">
                <span class="text-slate-600 text-[10px]">ADXL-345 Vib:</span>
                <strong class="font-mono text-[10px] text-slate-900">${node.vibration.toFixed(2)} g</strong>
              </div>
              <div class="flex justify-between text-[9px] text-slate-500 pt-0.5">
                <span>LoRa: <strong>${node.signalRssi} dBm</strong></span>
                <span>Bat: <strong>${node.batteryLevel}%</strong></span>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 260 });
        marker.on('click', () => setSelectedNode(node));

        marker.addTo(map);
        markersRef.current[node.id] = marker;
      });
    });
  }, [state.nodes, state.mode, activeZone, isLeafletReady]);

  // Layer Switching
  const handleLayerChange = (layer: 'satellite' | 'insar' | 'dark') => {
    setActiveLayer(layer);
    if (!mapInstanceRef.current || !layersRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(layersRef.current).forEach((l: any) => {
      if (map.hasLayer(l)) map.removeLayer(l);
    });

    if (layer === 'satellite' || layer === 'insar') {
      layersRef.current.satellite.addTo(map);
    } else if (layer === 'dark') {
      layersRef.current.dark.addTo(map);
    }

    if (insarLayerRef.current) {
      if (layer === 'insar' || layer === 'satellite') {
        if (!map.hasLayer(insarLayerRef.current)) insarLayerRef.current.addTo(map);
      } else {
        if (map.hasLayer(insarLayerRef.current)) map.removeLayer(insarLayerRef.current);
      }
    }
  };

  const handleZoneSelect = (zoneId: string) => {
    setActiveZone(zoneId);
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (zoneId === 'ALL') {
      map.flyTo([23.7945, 86.4315], 16, { duration: 1 });
    } else {
      const polygon = zonePolygonsRef.current[zoneId];
      if (polygon) {
        map.flyToBounds(polygon.getBounds(), { padding: [30, 30], duration: 1.2 });
      }
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => mapInstanceRef.current?.flyTo(isUserView ? [23.7965, 86.4312] : [23.7945, 86.4315], 16, { duration: 1 });

  return (
    <div
      className={`bg-slate-950 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col relative select-none w-full ${
        fullHeight ? 'h-full min-h-[500px]' : isUserView ? 'h-[280px] sm:h-[340px]' : 'h-[360px] sm:h-[460px]'
      }`}
    >
      {/* Top HUD Toolbar - Responsive */}
      <div className="absolute top-0 left-0 right-0 z-[400] px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-mineguard-800 text-white flex items-center justify-center border border-mineguard-600/40 shrink-0">
            <Satellite className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-wide uppercase">
                {isUserView ? 'Sentinel-1 InSAR Mine Map' : 'Sentinel-1 InSAR Satellite Map'}
              </span>
              <span className="text-[9px] font-mono px-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold hidden sm:inline">
                LOS Radar
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
              {isUserView ? 'Live Sector Safety & Evacuation Path' : 'InSAR Subsidence Heatmap • 9 Nodes'}
            </p>
          </div>
        </div>

        {/* Controls - Responsive layout */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zone Selector Pills */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs shadow-md">
            <button
              onClick={() => handleZoneSelect('ALL')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition ${
                activeZone === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-01')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition flex items-center gap-1 ${
                activeZone === 'ZONE-01' ? 'bg-mineguard-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Z1
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-02')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition ${
                activeZone === 'ZONE-02' ? 'bg-mineguard-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Z2
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-03')}
              className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition ${
                activeZone === 'ZONE-03' ? 'bg-mineguard-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Z3
            </button>
          </div>

          {/* Layer Selector */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs shadow-md">
            <button
              onClick={() => handleLayerChange('satellite')}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition ${
                activeLayer === 'satellite' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              Sat
            </button>
            <button
              onClick={() => handleLayerChange('insar')}
              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-[11px] font-bold transition flex items-center gap-1 ${
                activeLayer === 'insar' ? 'bg-rose-950 text-rose-300 border border-rose-800/80' : 'text-slate-400'
              }`}
            >
              <Flame className="w-2.5 h-2.5 text-rose-400" />
              InSAR
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 shadow-md">
            <button
              onClick={handleZoomIn}
              className="p-1 sm:p-1.5 text-slate-400 hover:text-white rounded-l"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1 sm:p-1.5 text-slate-400 hover:text-white border-l border-r border-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1 sm:p-1.5 text-slate-400 hover:text-white rounded-r"
              title="Reset"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet SDK Map View */}
      <div className="relative flex-1 w-full h-full bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full min-h-[260px] z-[100]" />
      </div>

      {/* Bottom InSAR Legend Overlay */}
      <div className="absolute bottom-2 left-2 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-white shadow-xl pointer-events-auto max-w-[220px] sm:max-w-xs text-[9px] sm:text-[10px]">
        <div className="flex items-center justify-between mb-1">
          <span className="font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <Satellite className="w-2.5 h-2.5 text-sky-400" />
            Sentinel-1 Subsidence
          </span>
          <span className="font-mono text-slate-500 text-[8px]">InSAR</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 mb-1"></div>
        <div className="flex justify-between text-[8px] font-mono text-slate-400">
          <span className="text-rose-400 font-bold">&gt;12mm (Alert)</span>
          <span className="text-emerald-400 font-bold">&lt;3mm (Safe)</span>
        </div>
      </div>
    </div>
  );
}
