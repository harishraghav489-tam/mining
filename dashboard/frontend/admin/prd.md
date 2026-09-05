# Product Requirements Document (PRD): MineGuard AI Admin Dashboard

**Platform**: MineGuard AI  
**Sub-Application**: Admin Safety & Geotechnical Monitoring Center  
**Tagline**: "Safer Mines. Smarter Tomorrow."  
**Target Event**: Smart India Hackathon (SIH) 2026 Prototype  

---

## 1. Product Name
**MineGuard AI — Admin Geotechnical & Safety Operations Dashboard**

## 2. Product Purpose
The MineGuard AI Admin Dashboard is a desktop-first industrial safety, mining subsidence, and early-warning center designed for geotechnical engineers, site supervisors, mine administrators, and DGMS safety officers. It aggregates telemetry from multi-zone wireless field IoT sensor nodes (equipped with BNO055 9-DOF tilt & orientation, ADXL-345 3-axis vibration & acceleration, and VL53L0X laser relative displacement/subsidence), ML risk engines, and satellite InSAR data into a unified, actionable control room interface to prevent catastrophic slope failures and open-cast highwall collapses.

## 3. Target Users
- **Geotechnical Engineers**: Monitoring slope subsidence velocity (mm/day), triaxial tilt vectors (pitch, roll, yaw), crack propagation, dynamic vibration amplitudes (g), and InSAR baseline trends.
- **Mine Site Supervisors**: Tracking active extraction zones (Zone 01, Zone 02, Zone 03), machine haul corridors, and live sensor heartbeats across all 9 field nodes.
- **Safety Officers / Mine Administrators**: Managing critical alert acknowledgements, emergency audio siren protocols, and evacuation clearances.
- **DGMS Regulators & Inspectors**: Auditing timestamped compliance logs and historical threshold incident charts.

## 4. User Problems
- **Slow Hazard Detection**: Traditional visual highwall surveys miss millimeter-scale subsurface creep until slope shear failure is imminent.
- **Fragmented Data**: Geotechnical tilt, crack meters, vibration, and satellite data exist in isolated silos with no unified risk scoring.
- **Multi-Zone Complexity**: Inability to isolate specific pit sectors (e.g. Highwall vs Haulage Crest vs Deep Pit Sump).
- **Delayed Evacuation Dispatch**: Lack of direct push integration between site control rooms and field personnel mobile devices.

## 5. Goals
- Provide real-time (1 Hz) visualization of field telemetry with sub-second responsiveness.
- Multi-Zone coverage across 3 distinct mining sectors, each equipped with 3 dedicated sensor nodes (9 nodes total).
- Dedicated sensor stack metrics: BNO055 (tilt/orientation), ADXL-345 (vibration/acceleration), VL53L0X (laser relative displacement/subsidence).
- 3D Satellite Digital Twin Map with 10m DEM contours, volumetric risk zones, and live telemetry HUD.
- Implement multi-threshold reference lines (Safe 3mm, Warning 8mm, Critical 12mm) across interactive Recharts graphs.
- Provide an interactive SIH Demo Controller to transition scenarios (Normal 18% → Warning 76% → Critical 91% → Reset).
- Support trilingual operational language switching (English, தமிழ், हिन्दी).

## 6. Non-Goals
- The browser frontend does NOT run the heavy machine learning model or compute mathematical XGBoost weights client-side.
- The browser frontend does NOT directly bind to physical ESP32 GPIOs or LoRa hardware radios; it ingests structured telemetry via service abstractions (`services/`).
- The LLM does NOT make safety-critical decisions; it only synthesizes natural-language explanations of ML risk outputs.

## 7. Features
1. **Persistent Deep Slate & Industrial Sidebar**: Quick navigation to Dashboard, Live Monitoring, Map View, Alerts, Analytics, Reports, Satellite/InSAR, Users, and Settings.
2. **Top Emergency Alert Banner**: Highlights critical threshold breaches with inline [ACKNOWLEDGE], [VIEW DETAILS], and [DISMISS] actions.
3. **Four Live KPI Cards**: Total Active Nodes (9 nodes across 3 zones), Active Alerts, Overall Subsidence Level, and Monitored Mining Sectors.
4. **3D Satellite Digital Twin Map**: Interactive 3D terraced open-cast terrain displaying 10m contour benches, haul roads, multi-zone boundaries, 3D node pins, and quick telemetry HUD card.
5. **Live Sensor Telemetry Table**: Real-time tabular metrics for VL53L0X Laser Displacement, BNO055 Tilt X/Y, ADXL-345 Dynamic Vibration, Status, Battery, and LoRa RSSI with multi-zone filtering.
6. **Multi-Threshold Recharts Analytics**: Laser displacement vs limits, triaxial tilt curves, ADXL-345 dynamic vibration, and satellite InSAR time series.
7. **Radial Risk Gauge**: Semi-circular meter illustrating probability score (0-40% Nominal, 41-80% Warning, 81-100% Critical).
8. **AI Geotechnical Insight Panel**: Contextual synthesis and recommended safety mitigations with explicit ML vs LLM architectural disclaimer.
9. **SIH Evaluation Demo Toolbar**: Instant state switcher to demonstrate live reactive UI transitions for hackathon judges.

## 8. User Stories
- *As a Geotechnical Engineer*, I want to inspect triaxial tilt vectors from BNO055 and laser displacement from VL53L0X so I can verify whether daylight thermal expansion or slope shear is occurring.
- *As a Mine Safety Admin*, when a critical displacement threshold (>12mm) is breached, I want to click Acknowledge to record my identity and timestamp in the audit log.
- *As an SIH Judge*, I want to switch between Normal, Warning, and Critical scenarios with one click to observe real-time reactive updates across the dashboard and worker PWA.

## 9. Admin Requirements
- Desktop-first layout optimized for 1280px+ control room displays.
- Persistent audit logs recording user, timestamp, and alert ID upon acknowledgement.

## 10. User PWA Requirements
- Independent mobile-first interface answering "AM I SAFE?" without technical jargon.
- Direct push synchronization with Admin critical state triggers.

## 11. Risk States
- **SAFE (0 - 40%)**: Normal operations approved; Node 01 displacement ~1.25mm; tilt <0.5°; all services nominal.
- **WARNING (41 - 80%)**: Accelerated bench creep; Node 01 displacement ~4.82mm; tilt ~2.31°; advisory alerts posted.
- **CRITICAL (81 - 100%)**: Imminent slope shear; Node 01 displacement >12.4mm; tilt ~3.82°; evacuation protocol initiated.
- **OFFLINE**: Connection lost; displays last verified status with prominent warning badge.
- **RECOVERED**: System stabilized following inspection; returns safely to nominal baseline.

## 12. Alert Behavior
- Critical alerts immediately surface in the top banner, increase sidebar badge count, trigger map radar pulse, update KPIs, and append to the incident log.
- Acknowledging an alert transitions state to acknowledged, records admin name and time, and updates active alert counts.

## 13. Multilingual Requirements
- 100% dictionary-based string resolution using `messages/en.json`, `messages/ta.json`, and `messages/hi.json`.
- Zero hardcoded English strings in UI components.
- Instant reactive language switching without page reloads.

## 14. Accessibility Requirements
- Semantic HTML tags (`<header>`, `<aside>`, `<main>`, `<nav>`).
- Multi-channel status signaling (color + icon + text label).
- High contrast ratios (WCAG AA compliant).
- Visible keyboard focus rings and ARIA live regions for critical alerts.

## 15. Responsive Requirements
- Large Desktop (1440px+): 12-column grid layout with simultaneous map, table, and charts.
- Tablet (768px - 1024px): Stacked responsive layout with collapsible sidebar.
- Mobile (320px+): Clean scrollable cards with horizontal table scrolling.

## 16. PWA Requirements
- Fast load times via static pre-rendering and code-splitting.
- Desktop installable experience via Web App Manifest.

## 17. Mock Data Behavior
- Initial state reflects realistic baseline mine measurements (Mine Site Alpha, Dhanbad).
- Periodic heartbeat generator simulates realistic live micro-drift (±0.01mm, ±0.005°) every 3.5 seconds.

## 18. Future Backend Integration
- FastAPI REST endpoints (`GET /api/v1/telemetry`, `POST /api/v1/alerts/ack`).
- MQTT / WebSocket broker streaming from Raspberry Pi Gateway at `mineguard/dhanbad/zone01/telemetry`.
- PostgreSQL / TimescaleDB for persistent geotechnical time-series retention.

## 19. Acceptance Criteria
- [x] Persistent industrial dark sidebar with active route indicator.
- [x] Real-time KPI cards reflecting dynamic 9 nodes across 3 zones and subsidence metrics.
- [x] 3D Satellite Digital Twin Map with multi-zone switcher and 3D node markers.
- [x] Multi-Sensor Telemetry (BNO055 tilt/orientation, ADXL-345 vibration, VL53L0X laser displacement/subsidence).
- [x] Recharts trends with visible Safe, Warning, and Critical threshold reference lines.
- [x] Alert acknowledgement logs stored with administrator name and timestamp.
- [x] Zero TypeScript errors with strict type definitions across the monorepo.

## 20. Future Improvements
- 3D WebGL point-cloud rendering of highwall photogrammetry.
- Integration with edge micro-controllers for sub-millisecond acoustic emission capture.
- Automated drone autonomous dispatch trigger for post-alert fissure inspection.
