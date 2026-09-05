# MineGuard AI — Admin Geotechnical & Safety Dashboard

> **"Safer Mines. Smarter Tomorrow."**  
> *Smart India Hackathon (SIH) 2026 Prototype*

The **Admin Dashboard** is a desktop-first industrial geotechnical monitoring center designed for mine engineers, site supervisors, and safety officers. It provides real-time visualization of wireless sensor telemetry, Machine Learning risk analysis, satellite InSAR interferometry, and incident audit logging.

---

## 🌟 Key Features

1. **Persistent Industrial Sidebar**: Quick access to Dashboard, Live Monitoring, Map View, Alerts, Analytics, Reports, Satellite/InSAR, User Management, and Settings.
2. **Top Emergency Alert Banner**: Highlights critical displacement and tilt threshold breaches with inline `[ACKNOWLEDGE]`, `[VIEW DETAILS]`, and `[DISMISS]` actions.
3. **Four Real-Time KPI Cards**:
   - **TOTAL NODES**: 9 Active IoT Nodes across 3 Mining Sectors
   - **ACTIVE ALERTS**: Dynamic count with status severity badge
   - **MAX SUBSIDENCE**: Live mm measurement & velocity
   - **MINING SECTORS**: Multi-zone stability overview
4. **3D Satellite Digital Twin Map**: Interactive 3D terraced open-cast pit with 10m DEM contours, volumetric risk zone boundaries, 9 node beacons, and live telemetry HUD.
5. **Live Sensor Telemetry Table**: Real-time tabular data showing VL53L0X Laser Displacement, BNO055 Tilt X/Y, ADXL-345 Dynamic Vibration, Status, Battery %, and LoRa RSSI.
6. **Multi-Threshold Analytics (Recharts)**: Historical trends with visible Safe (3.0mm), Warning (8.0mm), and Critical (12.0mm) engineering threshold reference lines.
7. **ML Risk Gauge**: Semi-circular meter reflecting risk percentage (0-40% Safe, 41-80% Warning, 81-100% Critical) computed by the ML Risk Engine.
8. **AI Geotechnical Insight Panel**: Natural-language LLM explanations of ML detections with clear architectural transparency disclaimers.
9. **SIH Evaluation Demo Controller**: Instant scenario switching (`NORMAL 18%` → `WARNING 76%` → `CRITICAL 91%` → `RESET`) for hackathon evaluators.
10. **Full Trilingual Localization**: Complete native translations for English, Tamil (தமிழ்), and Hindi (हिन्दी).

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Visualizations**: Recharts
- **Mapping**: Interactive GIS SVG/Canvas with Leaflet layer support
- **State Management**: Centralized reactive Simulation Store

---

## 🚀 Getting Started

### Development Mode (Port 3000)
```bash
cd /home/jarvis/mine/dashboard
npm run dev:admin
# or
yarn next dev frontend/admin -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build:admin
# or
yarn next build frontend/admin
```

---

## 📂 Directory Structure

```
frontend/admin/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main Dashboard
│   ├── monitoring/        # Live Sensor Network
│   ├── map/               # Full GIS Mine Map
│   ├── alerts/            # Incident & Audit Log
│   ├── analytics/         # Multi-Threshold Trends
│   ├── reports/           # Compliance Reports
│   ├── satellite/         # Satellite InSAR Radar
│   ├── users/             # Worker PWA Management
│   └── settings/          # Hardware & ML Config
├── components/            # Reusable UI components
├── hooks/                 # useSimulation custom hook
├── messages/              # en.json, ta.json, hi.json
├── mock/                  # Telemetry mock data
├── services/              # API/Service abstraction
├── styles/                # globals.css
├── types/                 # TypeScript interfaces
├── prd.md                 # Product Requirements Document
└── README.md
```

---

## 🔗 Sensor Stack & Architecture Rule

- **BNO055**: 9-DOF absolute orientation & triaxial tilt (pitch, roll, yaw, angular velocity).
- **ADXL-345**: 3-axis digital acceleration & dynamic vibration amplitude (g).
- **VL53L0X**: Time-of-Flight (ToF) laser relative displacement & crack aperture (mm).
- **Multi-Zone Layout**: 3 monitored mining sectors (Zone 01: North-East Highwall, Zone 02: South Haulage Crest, Zone 03: Central Deep Pit Sump), each containing 3 dedicated IoT sensor nodes (9 nodes total).
- **ML vs LLM**: The ML engine computes risk scores; the LLM provides contextual explanation without deciding risk itself.
