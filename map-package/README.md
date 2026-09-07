# MineGuard AI — Geotechnical Satellite GIS Map Package

This package contains the complete, production-ready **Sentinel-1 InSAR Satellite GIS Map Component** extracted from MineGuard AI, featuring ultra-fast Google Satellite CDN streaming, interactive multi-zone heatmaps, sensor beacons, evacuation routing, and window control (Minimize & Maximize / Fullscreen) options.

---

## 📦 Package Contents

```
map-package/
├── components/
│   ├── GisMineMap.tsx           # Primary interactive Leaflet InSAR Satellite Map component
│   ├── SimpleMineMap.tsx        # Mobile-first Worker Safety PWA map wrapper
│   └── AdminGisMineMap.tsx      # Admin map component export
├── pages/
│   └── AdminMapPage.tsx         # Full-height dedicated Map View page
├── types/
│   └── index.ts                 # TypeScript interfaces (SensorNode, RiskZone, Geotechnical telemetry)
├── constants/
│   └── index.ts                 # Zone coordinates, alert thresholds, initial telemetry
├── hooks/
│   └── useSimulation.ts         # Hook for reactive telemetry state & i18n
├── store/
│   └── simulationStore.ts       # Synchronized simulation state engine
├── messages/
│   ├── en.json                  # English translations
│   ├── ta.json                  # Tamil translations
│   └── hi.json                  # Hindi translations
└── README.md                    # This guide
```

---

## 🚀 Key Features

1. **Window Control Actions**:
   - **Maximize (Fullscreen)**: Toggles full-viewport fixed overlay (`fixed inset-0 z-[99999]`), `[ESC]` key handler, body scroll locking, and automated Leaflet canvas resize invalidation (`map.invalidateSize()`).
   - **Minimize (Collapse)**: Smoothly collapses map into a sleek summary bar with active zone indicator and instant 1-click **Expand Map** button.
2. **Ultra-Fast Google Satellite Global CDN**:
   - 4-way subdomain sharding (`mt0`, `mt1`, `mt2`, `mt3`) for up to 24 parallel download streams.
   - High-resolution imagery with sub-30ms tile load times.
   - Native zoom up to level 20/21 with zero missing data / grey tiles.
3. **Geotechnical Overlays**:
   - Sentinel-1 InSAR Subsidence Heatmap (Line-of-Sight deformation).
   - Multi-Zone Delineation Polygons (Zones 01, 02, 03) with interactive fly-to bounds on click.
   - Safe Evacuation Corridor (Ramp 2 → Assembly Point A Shelter).
   - 9 IoT Sensor Beacons (BNO055 Tilt, ADXL-345 Vibration, VL53L0X Laser Displacement) with telemetry popup cards.
4. **Multilingual (i18n)**:
   - English, Tamil, and Hindi dictionary integration.

---

## 💻 Installation & Dependencies

Ensure the following dependencies are installed in your Next.js / React project:

```bash
npm install leaflet lucide-react clsx tailwind-merge
npm install -D @types/leaflet
```

---

## 🛠️ Usage Example

```tsx
import { GisMineMap } from './components/GisMineMap';

export default function MyMapPage() {
  return (
    <div className="w-full h-[600px]">
      <GisMineMap fullHeight={true} />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `fullHeight` | `boolean` | `false` | When true, map takes 100% container height (`min-h-[500px]`) |
| `isUserView` | `boolean` | `false` | Mobile-first worker view mode with current worker GPS beacon |
| `selectedZoneId` | `string` | `'ALL'` | Pre-selected zone filter (`'ALL'`, `'ZONE-01'`, `'ZONE-02'`, `'ZONE-03'`) |

---

*MineGuard AI Team • Smart India Hackathon 2026*
