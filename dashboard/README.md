# MineGuard AI — Industrial Mining Safety & Early Warning Platform

> **"Safer Mines. Smarter Tomorrow."**  
> *Prototype Demonstration for Smart India Hackathon (SIH) 2026*

---

## 📖 Executive Summary

**MineGuard AI** is a geotechnical monitoring and early-warning safety platform designed to prevent open-cast mine slope collapses and highwall failures. The platform connects IoT field sensing (physical ESP32 Node 01, simulated Nodes 02 & 03, BNO055 triaxial tilt sensor, displacement transducer, LoRa wireless transmission, Raspberry Pi Gateway) through Machine Learning risk analysis and an LLM contextual explanation layer into two purpose-built frontends:

1. **Admin Dashboard (Port 3000)**: Desktop-first analytical command center for geotechnical engineers, site supervisors, and mine administrators.
2. **Worker Safety PWA (Port 3001)**: Mobile-first safety companion answering **"AM I SAFE?"** and providing instant evacuation guidance along **Ramp 2 → Assembly Point A** for field personnel.

---

## 🏛 System Architecture & Data Pipeline

```
ESP32 (Physical Node 01)  +  Simulated Nodes (02 & 03)
            │
            ▼ (LoRa Wireless Telemetry 868MHz)
Raspberry Pi Gateway 01
            │
            ▼ (MQTT Broker: mineguard/dhanbad/zone01)
Backend Ingestion & Database (FastAPI + TimescaleDB)
            │
            ▼
Machine Learning Risk Engine (XGBoost / Isolation Forest)
            │
            ├──────────────────────────────────────────┐
            ▼                                          ▼
LLM Contextual Explanation Layer             Admin & Worker Frontends
(Natural Language Mitigations)          (Admin Dashboard & Worker PWA)
```

> [!IMPORTANT]
> **Data Provenance Rule**:
> - **Node 01**: REAL physical ESP32 hardware + BNO055 tilt sensor + displacement transducer.
> - **Nodes 02 & 03**: SIMULATED synthetic telemetry.
> - **ML vs LLM Rule**: The ML system calculates geotechnical risk probability; the LLM only generates natural-language explanations and mitigation recommendations.

---

## 📂 Repository Directory Structure

```
dashboard/
│
├── frontend/
│   │
│   ├── shared/                # Shared types, mock datasets, simulation engine, i18n
│   │   ├── types/             # TypeScript interfaces
│   │   ├── mock/              # Baseline sensor & InSAR telemetry
│   │   ├── store/             # Synchronized simulation state engine
│   │   ├── constants/         # Thresholds & zone coordinates
│   │   ├── utils/             # Formatters, color mappers, translation helpers
│   │   └── messages/          # en.json, ta.json, hi.json
│   │
│   ├── admin/                 # Desktop-First Admin Dashboard (Port 3000)
│   │   ├── app/               # Next.js App Router subpages
│   │   ├── components/        # Sidebar, Header, GIS Map, Recharts, Risk Gauge, AI Insight
│   │   ├── services/          # API/Service abstraction
│   │   ├── styles/            # Tailwind globals
│   │   ├── prd.md             # Admin Product Requirements Document
│   │   └── README.md
│   │
│   └── user/                  # Mobile-First Worker Safety PWA (Port 3001)
│       ├── app/               # Home (Safe/Warning/Critical), Updates, Safety Tips, Profile
│       ├── components/        # Mobile Nav, Desktop Sidebar, Status Heroes, Evacuation Modal
│       ├── public/            # manifest.json, sw.js
│       ├── services/          # API/Service abstraction
│       ├── prd.md             # Worker PWA Product Requirements Document
│       └── README.md
│
├── package.json               # Root scripts & dependencies
├── tailwind.config.js         # Design system & Deep Maroon color palette
├── tsconfig.json              # Strict TypeScript config with path aliases
└── README.md                  # This file
```

---

## 🎨 Global Design System

- **Brand Primary**: Deep Maroon / MineGuard Red (`#7F1D1D` / `#991B1B`)
- **Status Safe**: Soft Emerald Green (`#F0FDF4`, `#10B981`)
- **Status Warning**: Soft Amber (`#FFFBEB`, `#F59E0B`)
- **Status Critical**: Emergency Red (`#FEF2F2`, `#DC2626`)
- **Typography**: Inter / Modern Sans-Serif font hierarchy
- **Iconography**: Lucide React icons

---

## 🌐 Multilingual Localization

The entire platform is 100% dictionary-driven with zero hardcoded English strings:
- 🇬🇧 **English (EN)**
- 🇮🇳 **Tamil (தமிழ் - TA)**
- 🇮🇳 **Hindi (हिन्दी - HI)**

---

## 🚀 Quickstart & Running Locally

### 1. Install Dependencies
```bash
cd dashboard
yarn install
# or
npm install
```

### 2. Launch Applications

To run the **Admin Dashboard** (Port 3000):
```bash
npm run dev:admin
# or
yarn next dev frontend/admin -p 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run the **Worker Safety PWA** (Port 3001):
```bash
npm run dev:user
# or
yarn next dev frontend/user -p 3001
```
Open [http://localhost:3001](http://localhost:3001) in your browser (or inspect with mobile responsive emulation).

### 3. Production Build
```bash
npm run build
```

---

## 🎮 SIH Demo Controller Modes

The evaluation controller in the header allows judges to test the reactive data pipeline:

| Mode | Risk Score | Displacement (N01) | Tilt (N01) | System Reaction |
|---|---|---|---|---|
| **NORMAL (SAFE)** | **18%** | 1.25 mm (Nominal) | 0.42° | Green safe cards, all operations normal |
| **SIMULATE WARNING** | **76%** | 4.82 mm (>3.0mm limit) | 2.31° | Amber advisory card, bench creep alert |
| **SIMULATE CRITICAL** | **91%** | 12.40 mm (>12mm limit) | 3.82° | Red emergency alert banner, evacuation siren, safe route corridor Ramp 2 → Assembly Point A |
| **RESET** | **18%** | Baseline | Baseline | Restores nominal parameters |

---

## 🔌 Future Backend Integration

When integrating live hardware:
1. Replace `services/dashboardService.ts` and `services/nodeService.ts` with FastAPI REST calls (`GET /api/v1/telemetry/live`).
2. Connect WebSocket/MQTT subscribers to the Raspberry Pi LoRa broker topic: `mineguard/dhanbad/zone01/telemetry`.
3. Ingest automated satellite InSAR GeoTIFF products from Sentinel-1 & NISAR open science portals into the GIS layer.

---

**MineGuard AI Team**  
*Smart India Hackathon 2026*
