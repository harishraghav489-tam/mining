# Product Requirements Document (PRD): MineGuard AI Worker Safety PWA

**Platform**: MineGuard AI  
**Sub-Application**: Field Worker Safety Portal & Evacuation Companion (PWA)  
**Tagline**: "Safer Mines. Smarter Tomorrow."  
**Target Event**: Smart India Hackathon (SIH) 2026 Prototype  

---

## 1. Product Name
**MineGuard AI — Worker Safety Companion & Evacuation Guide (Progressive Web App)**

## 2. Product Purpose
The MineGuard AI Worker PWA is a mobile-first, zero-clutter safety application designed for field workers, heavy machinery operators, and haul truck drivers inside or near the open-cast mining pit. It instantly answers the single most important question a worker has: **"AM I SAFE?"** and provides immediate, unmistakable evacuation corridor instructions during emergency conditions without overwhelming workers with complex geotechnical sensor matrices.

## 3. Target Users
- **Heavy Machinery & Excavator Operators**: Operating in open pit extraction tiers requiring immediate emergency warnings.
- **Haulage & Dumper Truck Drivers**: Navigating haul roads and needing clear evacuation corridor routes (Ramp 2).
- **Blasting & Pit Field Crew**: Working in direct proximity to highwall benches.
- **Shift Supervisors & Wardens**: Responsible for muster roll calls at Assembly Point A.

## 4. User Problems
- **Cognitive Overload**: Existing engineering dashboards display raw telemetry, angles, and ML scores that confuse field workers under emergency stress.
- **Delayed Warning Reception**: Acoustic sirens can be drowned out by heavy diesel machinery and ear protection.
- **Unclear Evacuation Paths**: Workers in changing pit conditions often lack real-time visual clarity on which ramps remain safe and which are compromised.
- **Language Barriers**: In multilingual mining regions (e.g. Jharkhand, Tamil Nadu, Chhattisgarh), instructions must be provided in local languages (English, Tamil, Hindi).
- **Intermittent Connectivity**: Mobile signals in deep pits can drop, requiring robust offline caching of last known safety states.

## 5. Goals
- Deliver instant "AM I SAFE?" clarity within 2 seconds of opening the application.
- Implement 3 distinct visual themes:
  - **SAFE**: White + Soft Emerald Green (`#F0FDF4`, `#15803D`)
  - **WARNING**: White + Soft Amber (`#FFFBEB`, `#B45309`)
  - **CRITICAL**: White + Emergency Red (`#FEF2F2`, `#DC2626`)
- Provide a clean interactive Safe Evacuation Route modal showing the green corridor along Ramp 2 to Assembly Point A.
- Support complete trilingual language switching (English, தமிழ், हिन्दी).
- Provide reliable PWA offline behavior with Service Worker caching and prominent offline mode indicator.

## 6. Non-Goals
- Does NOT display technical ML hyperparameters (XGBoost weights, isolation forest anomalies) or raw triaxial sensor arrays.
- Does NOT provide admin hardware calibration controls.
- Does NOT allow workers to override safety wardens or cancel alarms.

## 7. Features
1. **Dynamic Safety Status Hero**: Adaptive status card communicating Safe, Warning, or Critical state with clear iconography and plain-language directives.
2. **3D Satellite Perspective Mine Schematic**: High-contrast, clean 3D isometric terrain highlighting the worker's sector, the hazard perimeter, active IoT sensor stations, and green evacuation path.
3. **Emergency Evacuation Route Modal**: Step-by-step 4-point protocol guiding workers safely along Ramp 2 to Assembly Point A.
4. **"I Have Seen This Alert" Quick Acknowledgment**: Allows workers to confirm alert receipt, providing peace of mind and logging acknowledgment.
5. **Safety Updates Timeline**: Filterable feed (All, Alerts, Safety Advisories, System Checks) written in plain language.
6. **Safety Tips & Protocols**: 3 core pillars (BE ALERT, BE RESPONSIBLE, BE SAFE), PPE rules, crack reporting advice, and 6-step emergency procedure.
7. **Worker Profile & Emergency Contacts**: Karthik S (MW1025), assigned mine, assigned zone, direct emergency hotline trigger, and language selector.
8. **Mobile Bottom Navigation & Desktop Sidebar**: Smooth responsive navigation across mobile (320px+) and desktop viewports.
9. **Offline Resilience**: Service worker caching and offline warning banner displaying last verified state.

## 8. User Stories
- *As an Excavator Operator*, when ground instability is detected in my pit, I want my phone to immediately display a prominent red emergency screen so I know to halt machinery and evacuate without second-guessing.
- *As a Field Worker*, I want to view my evacuation route on a simple map so I know exactly which ramp leads to Assembly Point A.
- *As a Worker speaking Tamil or Hindi*, I want to toggle the entire application to my native language with one tap so I can read safety rules comfortably.
- *As a Worker in an area with poor signal*, I want the app to inform me that I am offline while showing the last verified safety status.

## 9. Admin Requirements
- Admin dashboard triggers automatically broadcast critical states down to the Worker PWA.

## 10. User PWA Requirements
- Standalone installable PWA with web app manifest and service worker.
- Touch-friendly tap targets (minimum 44x44px).
- Zero complicated engineering jargon.

## 11. Risk States
- **SAFE**: Shield icon, "MINE SAFE - All monitored zones are currently stable", Zone 01, green theme.
- **WARNING**: Warning icon, "BE AWARE - Ground movement detected near Zone 01", Moderate risk, amber theme.
- **CRITICAL**: Siren icon, "CRITICAL ALERT - Ground instability detected in Zone 01", High risk, red theme, evacuation CTA.
- **OFFLINE**: Connection lost indicator displaying last verified timestamp.

## 12. Alert Behavior
- Critical alerts immediately overtake the Home hero section.
- "I HAVE SEEN THIS ALERT" button confirms receipt and changes to a reassuring green confirmation badge.

## 13. Multilingual Requirements
- Fully translated into English, Tamil (தமிழ்), and Hindi (हिन्दी) via `messages/*.json`.
- Switching language updates all buttons, cards, emergency steps, and navigation items.

## 14. Accessibility Requirements
- High contrast emergency color combinations (WCAG AAA for critical text).
- Large readable typography and prominent icon indicators.
- VoiceOver / TalkBack compatible labels.

## 15. Responsive Requirements
- Mobile-first (320px - 768px): Bottom navigation bar, vertical cards.
- Tablet / Desktop (768px+): Clean left sidebar and centered safety container.

## 16. PWA Requirements
- Valid `manifest.json` with theme color `#991b1b`.
- Service worker `sw.js` for offline asset caching.
- Add to Home Screen installable support.

## 17. Mock Data Behavior
- Reflects worker Karthik S (MW1025) assigned to Zone 01.
- State is synchronized with the central simulation store.

## 18. Future Backend Integration
- Web Push Notifications API via FastAPI push server.
- WebSocket live emergency broadcast channel.
- GPS Geofencing for automated zone entry/exit alerts.

## 19. Acceptance Criteria
- [x] Clear "AM I SAFE?" status answer on first load.
- [x] Smooth visual transitions across Safe (Green), Warning (Amber), and Critical (Red) states.
- [x] Interactive evacuation modal with simple schematic map.
- [x] Trilingual language switching (EN, TA, HI) tested and verified.
- [x] Offline mode banner with last verified timestamp.
- [x] PWA manifest and service worker configuration.

## 20. Future Improvements
- Multi-lingual audio voice broadcast of emergency alerts.
- Offline mesh-networking between worker phones via Bluetooth Low Energy (BLE).
- Wearable smartwatch haptic vibration integration.
