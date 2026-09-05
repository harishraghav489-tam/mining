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
} from 'lucide-react';
import { useSimulation } from '../hooks/useSimulation';
import { SensorNode } from '../../shared/types';

interface GisMineMapProps {
  fullHeight?: boolean;
  selectedZoneId?: string;
}

export function GisMineMap({ fullHeight = false, selectedZoneId }: GisMineMapProps) {
  const { state, t, setMode } = useSimulation();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const layersRef = useRef<{ [key: string]: any }>({});
  const insarLayerRef = useRef<any>(null);
  const zonePolygonsRef = useRef<{ [key: string]: any }>({});

  const [activeLayer, setActiveLayer] = useState<'satellite' | 'insar' | 'dark' | 'topo'>('satellite');
  const [activeZone, setActiveZone] = useState<string>(selectedZoneId || 'ALL');
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLeafletReady, setIsLeafletReady] = useState(false);

  const isCritical = state.mode === 'CRITICAL';
  const isWarning = state.mode === 'WARNING';

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically import Leaflet to prevent SSR window reference errors
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
        center: mineCenter,
        zoom: 16,
        minZoom: 14,
        maxZoom: 19,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Define Tile Layers (Sentinel / ESRI Satellite, CartoDB Dark, OpenTopoMap)
      const satelliteTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        { maxZoom: 19 }
      );

      const darkTile = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      );

      const topoTile = L.tileLayer(
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        { maxZoom: 17 }
      );

      layersRef.current = {
        satellite: satelliteTile,
        dark: darkTile,
        topo: topoTile,
      };

      // Add default tile layer
      satelliteTile.addTo(map);

      // Create Sentinel-1 InSAR Subsidence Heatmap Overlay Layer
      const insarHeatmapGroup = L.layerGroup();
      insarLayerRef.current = insarHeatmapGroup;

      // Add InSAR Subsidence Heatmap contours & deformation circles
      const insarPoints = [
        { lat: 23.7975, lng: 86.4320, rate: isCritical ? -14.8 : isWarning ? -7.2 : -1.8, radius: 110, zone: 'Zone 01' },
        { lat: 23.7960, lng: 86.4305, rate: isCritical ? -12.4 : isWarning ? -5.9 : -1.2, radius: 90, zone: 'Zone 01' },
        { lat: 23.7925, lng: 86.4325, rate: isCritical ? -8.6 : isWarning ? -4.1 : -0.9, radius: 80, zone: 'Zone 02' },
        { lat: 23.7915, lng: 86.4300, rate: isCritical ? -6.2 : isWarning ? -3.0 : -0.6, radius: 70, zone: 'Zone 02' },
        { lat: 23.7948, lng: 86.4312, rate: isCritical ? -10.5 : isWarning ? -5.4 : -1.1, radius: 85, zone: 'Zone 03' },
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
            <strong>Sentinel-1 InSAR LOS Shift</strong><br/>
            Zone: ${pt.zone}<br/>
            Subsidence Rate: <strong style="color:${color}">${pt.rate} mm/yr</strong><br/>
            Coherence: <strong>0.92</strong>
          </div>`,
          { permanent: false, direction: 'top' }
        );

        insarHeatmapGroup.addLayer(circle);
      });

      insarHeatmapGroup.addTo(map);

      // Add Multi-Zone Polygons
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
          map.flyToBounds(polygon.getBounds(), { padding: [40, 40], duration: 1 });
          setActiveZone(zone.id);
        });

        polygon.addTo(map);
        zonePolygonsRef.current[zone.id] = polygon;
      });

      // Add Evacuation Path Polyline
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

      evacPolyline.bindTooltip('<strong>Safe Evacuation Route (Ramp 2 → Muster Point A)</strong>', {
        sticky: true,
      });

      evacPolyline.addTo(map);

      // Add Muster Point A Marker
      const musterIcon = L.divIcon({
        className: 'custom-muster-marker',
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-700 text-white border-2 border-emerald-300 shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const musterMarker = L.marker([23.7905, 86.4275], { icon: musterIcon });
      musterMarker.bindTooltip('<strong>Assembly Point A (Safe Shelter)</strong>', {
        permanent: true,
        direction: 'right',
        className: 'bg-slate-900 text-emerald-300 border border-emerald-600 text-xs px-2 py-1 rounded shadow-md',
      });
      musterMarker.addTo(map);

      setIsLeafletReady(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when State/Nodes change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLeafletReady) return;

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current;
      if (!map) return;

      // Filter nodes based on active zone tab
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
              <div class="relative w-7 h-7 rounded-full ${bgColor} text-white font-bold text-[10px] flex items-center justify-center border-2 ${borderColor} shadow-xl transform transition-transform group-hover:scale-125">
                ${node.id.replace('N', '')}
              </div>
              <div class="absolute -bottom-4 bg-slate-950/90 text-[9px] font-mono px-1 py-0.2 rounded border border-slate-700 text-slate-200 whitespace-nowrap shadow-sm">
                ${node.id}
              </div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([node.latitude, node.longitude], { icon: customIcon });

        // Bind interactive rich telemetry popup
        const popupContent = `
          <div class="p-2.5 font-sans min-w-[240px] text-slate-900">
            <div class="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
              <div>
                <strong class="text-xs font-extrabold text-slate-900">${node.name}</strong>
                <span class="block text-[10px] text-slate-500 font-mono">${node.zoneName}</span>
              </div>
              <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${
                isNodeCrit ? 'bg-rose-100 text-rose-800' : isNodeWarn ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }">
                ${isNodeCrit ? 'CRITICAL' : isNodeWarn ? 'WARNING' : 'NORMAL'}
              </span>
            </div>
            
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between bg-slate-50 p-1 rounded border border-slate-100">
                <span class="text-slate-600 text-[11px]">VL53L0X Laser Disp:</span>
                <strong class="font-mono ${isNodeCrit ? 'text-rose-600' : 'text-slate-900'}">${node.displacement.toFixed(2)} mm</strong>
              </div>
              <div class="flex justify-between bg-slate-50 p-1 rounded border border-slate-100">
                <span class="text-slate-600 text-[11px]">BNO055 Tilt X / Y:</span>
                <strong class="font-mono text-slate-900">${node.tiltX.toFixed(2)}° / ${node.tiltY.toFixed(2)}°</strong>
              </div>
              <div class="flex justify-between bg-slate-50 p-1 rounded border border-slate-100">
                <span class="text-slate-600 text-[11px]">ADXL-345 Vibration:</span>
                <strong class="font-mono text-slate-900">${node.vibration.toFixed(2)} g</strong>
              </div>
              <div class="flex justify-between text-[10px] text-slate-500 pt-1">
                <span>LoRa RSSI: <strong class="font-mono text-emerald-600">${node.signalRssi} dBm</strong></span>
                <span>Bat: <strong class="font-mono">${node.batteryLevel}%</strong></span>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, { maxWidth: 280, className: 'custom-leaflet-popup' });
        marker.on('click', () => setSelectedNode(node));

        marker.addTo(map);
        markersRef.current[node.id] = marker;
      });
    });
  }, [state.nodes, state.mode, activeZone, isLeafletReady]);

  // Handle Layer Switching
  const handleLayerChange = (layer: 'satellite' | 'insar' | 'dark' | 'topo') => {
    setActiveLayer(layer);
    if (!mapInstanceRef.current || !layersRef.current) return;

    const map = mapInstanceRef.current;

    // Remove existing tile layers
    Object.values(layersRef.current).forEach((l: any) => {
      if (map.hasLayer(l)) map.removeLayer(l);
    });

    if (layer === 'satellite' || layer === 'insar') {
      layersRef.current.satellite.addTo(map);
    } else if (layer === 'dark') {
      layersRef.current.dark.addTo(map);
    } else if (layer === 'topo') {
      layersRef.current.topo.addTo(map);
    }

    // Toggle InSAR Heatmap overlay visibility
    if (insarLayerRef.current) {
      if (layer === 'insar' || layer === 'satellite') {
        if (!map.hasLayer(insarLayerRef.current)) {
          insarLayerRef.current.addTo(map);
        }
      } else {
        if (map.hasLayer(insarLayerRef.current)) {
          map.removeLayer(insarLayerRef.current);
        }
      }
    }
  };

  // Handle Zone Fly-To
  const handleZoneSelect = (zoneId: string) => {
    setActiveZone(zoneId);
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    if (zoneId === 'ALL') {
      map.flyTo([23.7945, 86.4315], 16, { duration: 1 });
    } else {
      const polygon = zonePolygonsRef.current[zoneId];
      if (polygon) {
        map.flyToBounds(polygon.getBounds(), { padding: [50, 50], duration: 1.2 });
      }
    }
  };

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () => mapInstanceRef.current?.flyTo([23.7945, 86.4315], 16, { duration: 1 });

  return (
    <div
      className={`bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col relative select-none ${
        fullHeight ? 'h-full min-h-[600px]' : 'h-[480px]'
      }`}
    >
      {/* Top HUD Toolbar */}
      <div className="absolute top-0 left-0 right-0 z-[400] px-4 py-3 bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-mineguard-800 text-white flex items-center justify-center border border-mineguard-600/40 shadow-sm">
            <Satellite className="w-4 h-4 text-rose-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-white tracking-wide uppercase">
                Sentinel-1 InSAR & Satellite Digital Twin
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold">
                Sentinel-1B Radar • LOS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Interferometric SAR Subsidence Heatmap • 9 Nodes (BNO055 + ADXL-345 + VL53L0X)
            </p>
          </div>
        </div>

        {/* Zone Selector Pills */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs shadow-md">
            <button
              onClick={() => handleZoneSelect('ALL')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                activeZone === 'ALL'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Zones
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-01')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                activeZone === 'ZONE-01'
                  ? 'bg-mineguard-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Zone 01 (Highwall)
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-02')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                activeZone === 'ZONE-02'
                  ? 'bg-mineguard-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Zone 02 (Haulage)
            </button>
            <button
              onClick={() => handleZoneSelect('ZONE-03')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition ${
                activeZone === 'ZONE-03'
                  ? 'bg-mineguard-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Zone 03 (Pit Sump)
            </button>
          </div>

          {/* Layer Selector & Map Actions */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 p-0.5 text-xs shadow-md">
            <button
              onClick={() => handleLayerChange('satellite')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                activeLayer === 'satellite'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Sentinel Satellite Imagery"
            >
              <Satellite className="w-3 h-3" />
              Satellite
            </button>
            <button
              onClick={() => handleLayerChange('insar')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition flex items-center gap-1 ${
                activeLayer === 'insar'
                  ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="InSAR Subsidence Heatmap"
            >
              <Flame className="w-3 h-3 text-rose-400" />
              InSAR Heatmap
            </button>
            <button
              onClick={() => handleLayerChange('dark')}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                activeLayer === 'dark'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dark Base
            </button>
          </div>

          {/* Zoom & Reset Buttons */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-md rounded-lg border border-slate-800 shadow-md">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition rounded-l"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition border-l border-r border-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition rounded-r"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Leaflet SDK Map Container */}
      <div className="relative flex-1 w-full h-full bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px] z-[100]" />
      </div>

      {/* InSAR Heatmap Color Scale Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-white shadow-2xl pointer-events-auto max-w-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <Satellite className="w-3 h-3 text-sky-400" />
            Sentinel-1 InSAR LOS Subsidence
          </span>
          <span className="text-[9px] font-mono text-slate-500">Coherence: &gt;0.88</span>
        </div>

        {/* Subsidence Gradient Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 via-emerald-500 to-cyan-400 shadow-inner"></div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400">
            <span className="text-rose-400 font-bold">&lt; -15 mm/yr (Severe)</span>
            <span className="text-amber-400 font-bold">-6 mm/yr</span>
            <span className="text-emerald-400 font-bold">0 mm/yr (Stable)</span>
          </div>
        </div>

        <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>Orbital Track: <strong>Pass 127 (Ascending)</strong></span>
          <span className="text-sky-400 font-bold">Sentinel-1B</span>
        </div>
      </div>

      {/* Map Nodes Quick Status HUD Overlay */}
      <div className="absolute bottom-3 right-3 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 text-[11px] text-slate-300 shadow-2xl pointer-events-auto">
        <div className="font-bold text-[10px] uppercase text-slate-400 mb-1.5 tracking-wider flex items-center gap-1.5">
          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
          IoT Field Nodes (9 Active)
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>Zone 01 (N01-N03)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zone 02 (N04-N06)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Zone 03 (N07-N09)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
