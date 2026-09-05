# MineGuard AI — Field Worker Safety Companion (PWA)

> **"Safer Mines. Smarter Tomorrow."**  
> *Smart India Hackathon (SIH) 2026 Prototype*

The **Worker Safety PWA** is a mobile-first, zero-clutter safety companion designed for field workers, heavy machinery operators, and haulage crew members in open-cast mines. It immediately answers: **"AM I SAFE?"** and guides workers along clear evacuation corridors during emergency situations.

---

## 🌟 Key Features

1. **Prominent "AM I SAFE?" Hero Status**:
   - **SAFE Mode**: White + Soft Green (`#F0FDF4`, `#15803D`) — "MINE SAFE - All monitored zones are currently stable."
   - **WARNING Mode**: White + Soft Amber (`#FFFBEB`, `#B45309`) — "BE AWARE - Ground movement detected near Zone 01."
   - **CRITICAL Mode**: White + Emergency Red (`#FEF2F2`, `#DC2626`) — "CRITICAL ALERT - Ground instability detected in Zone 01."
2. **Emergency Evacuation Route Modal**: Interactive schematic displaying the worker's location in Zone 01, the red highwall hazard area, and the green designated safe evacuation corridor (Ramp 2) to **Assembly Point A**.
3. **"I Have Seen This Alert" Confirmation**: Instant worker acknowledgment button logging receipt and calming tension during drills.
4. **Safety Updates Timeline**: Chronological bulletins categorized into All, Alerts, Safety Advisories, and System Checks.
5. **Safety Tips & 6-Step Protocol**: 3 pillars (BE ALERT, BE RESPONSIBLE, BE SAFE), PPE rules, and emergency evacuation guidelines.
6. **Worker Profile (Karthik S, MW1025)**: Assigned mine, assigned zone, direct emergency contact hotline trigger, and editable information.
7. **PWA Offline Resilience**: Integrated service worker (`sw.js`) and offline warning banner displaying the last verified status timestamp.
8. **Trilingual Language Switching**: One-tap switching between English, Tamil (தமிழ்), and Hindi (हिन्दी).

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **PWA**: Web App Manifest (`manifest.json`) + Service Worker (`sw.js`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript (Strict Mode)

---

## 🚀 Getting Started

### Development Mode (Port 3001)
```bash
cd /home/jarvis/mine/dashboard
npm run dev:user
# or
yarn next dev frontend/user -p 3001
```
Open [http://localhost:3001](http://localhost:3001) in your mobile browser or desktop browser.

### Production Build
```bash
npm run build:user
# or
yarn next build frontend/user
```

---

## 📂 Directory Structure

```
frontend/user/
├── app/
│   ├── layout.tsx         # Root layout + PWA Meta
│   ├── page.tsx           # Home ("AM I SAFE?" + Hero States)
│   ├── updates/           # Safety Bulletins Timeline
│   ├── safety/            # Safety Tips & 6-Step Protocol
│   └── profile/           # Worker Profile & Contacts
├── components/            # Mobile Nav, Sidebar, Hero Cards, Modal
├── hooks/                 # useSimulation custom hook
├── messages/              # en.json, ta.json, hi.json
├── public/                # manifest.json, sw.js, icons
├── services/              # API/Service abstraction
├── styles/                # globals.css
├── types/                 # TypeScript interfaces
├── prd.md                 # Product Requirements Document
└── README.md
```
