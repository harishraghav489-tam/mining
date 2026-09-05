import {
  SensorNode,
  RiskZone,
  AlertRecord,
  AIInsight,
  InSARDeformationPoint,
  HistoricalTelemetryPoint,
  WorkerProfile,
  SystemKPIs,
  SystemMode,
} from '../types';
import {
  INITIAL_NODES,
  INITIAL_ZONES,
  INITIAL_KPIS,
  INITIAL_ALERTS,
  INITIAL_AI_INSIGHT,
  INITIAL_INSAR_DATA,
  INITIAL_HISTORICAL_TELEMETRY,
  INITIAL_WORKER_PROFILE,
} from '../mock';
import { Language } from '../utils';

export interface MineGuardState {
  mode: SystemMode;
  selectedZoneId: string; // 'ALL' or 'ZONE-01' | 'ZONE-02' | 'ZONE-03'
  nodes: SensorNode[];
  zones: RiskZone[];
  kpis: SystemKPIs;
  alerts: AlertRecord[];
  aiInsight: AIInsight;
  insarData: InSARDeformationPoint[];
  historicalTelemetry: HistoricalTelemetryPoint[];
  workerProfile: WorkerProfile;
  language: Language;
  isOnline: boolean;
  activeBannerDismissed: boolean;
  seenAlertAcknowledged: boolean;
  lastUpdated: string;
}

let globalState: MineGuardState = {
  mode: 'SAFE',
  selectedZoneId: 'ZONE-01',
  nodes: JSON.parse(JSON.stringify(INITIAL_NODES)),
  zones: JSON.parse(JSON.stringify(INITIAL_ZONES)),
  kpis: JSON.parse(JSON.stringify(INITIAL_KPIS)),
  alerts: JSON.parse(JSON.stringify(INITIAL_ALERTS)),
  aiInsight: JSON.parse(JSON.stringify(INITIAL_AI_INSIGHT)),
  insarData: JSON.parse(JSON.stringify(INITIAL_INSAR_DATA)),
  historicalTelemetry: JSON.parse(JSON.stringify(INITIAL_HISTORICAL_TELEMETRY)),
  workerProfile: JSON.parse(JSON.stringify(INITIAL_WORKER_PROFILE)),
  language: 'en',
  isOnline: true,
  activeBannerDismissed: false,
  seenAlertAcknowledged: false,
  lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const listeners = new Set<(state: MineGuardState) => void>();

function notify() {
  const stateCopy = { ...globalState };
  listeners.forEach((listener) => listener(stateCopy));
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mineguard_mode', globalState.mode);
      localStorage.setItem('mineguard_lang', globalState.language);
    } catch {}
  }
}

export function getSimulationState(): MineGuardState {
  return globalState;
}

export function subscribeToSimulation(listener: (state: MineGuardState) => void) {
  listeners.add(listener);
  listener(globalState);
  return () => {
    listeners.delete(listener);
  };
}

export function setSelectedZone(zoneId: string) {
  globalState.selectedZoneId = zoneId;
  notify();
}

export function setSystemMode(mode: SystemMode) {
  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const nowDate = '03 Sep 2026';
  const timestamp = `${nowDate}, ${nowTime}`;

  globalState.mode = mode;
  globalState.activeBannerDismissed = false;
  globalState.seenAlertAcknowledged = false;
  globalState.lastUpdated = timestamp;

  if (mode === 'SAFE' || mode === 'RECOVERED') {
    // Reset all 9 nodes to nominal baseline
    globalState.nodes = JSON.parse(JSON.stringify(INITIAL_NODES));
    globalState.zones = JSON.parse(JSON.stringify(INITIAL_ZONES));
    globalState.kpis = {
      totalNodes: 9,
      totalZones: 3,
      activeAlerts: 0,
      warningAlertsCount: 0,
      criticalAlertsCount: 0,
      systemStatus: 'Online',
      systemStatusMessage: 'All 3 mining zones active • 9 sensor nodes streaming LoRa telemetry',
      overallSubsidenceMaxMm: 1.25,
      overallRiskScore: 18,
      overallRiskLevel: 'SAFE',
      lastUpdated: timestamp,
    };

    globalState.aiInsight = {
      id: `INSIGHT-${Date.now()}`,
      generatedAt: nowTime,
      zoneId: 'ZONE-01',
      summary: 'Mining subsidence parameters across all 3 zones are within allowable safety limits. VL53L0X laser relative displacement remains below 3.0 mm safe threshold.',
      technicalAnalysis: 'Zone 01 crest Node 01 records stable ToF laser distance (1.25 mm relative drop). BNO055 pitch tilt is nominal at 0.42°. ADXL-345 triaxial acceleration indicates no micro-seismic fissure tremors. Multi-zone correlation indicates overall rock mass equilibrium.',
      recommendedActions: [
        'Maintain continuous 1Hz LoRa telemetry ingestion across all 9 nodes.',
        'Continue routine visual inspection of Zone 01 extraction tier.',
        'Standard mining and haulage operations approved.',
      ],
      confidenceScore: 97,
      riskScore: 18,
      disclaimer: 'Subsidence risk probability is computed mathematically by the ML Risk Engine (XGBoost / Isolation Forest). The LLM synthesizes natural-language geotechnical operational context.',
    };
  } else if (mode === 'WARNING') {
    // Elevate Zone 01 Nodes (N01, N02, N03)
    globalState.nodes[0] = {
      ...globalState.nodes[0],
      status: 'WARNING',
      displacement: 4.82,
      tiltX: 2.31,
      tiltY: 1.14,
      vibration: 0.45,
      vl53l0x: { ...globalState.nodes[0].vl53l0x, relativeDisplacementMm: 4.82, subsidenceVelocityMmDay: 2.4, crackApertureMm: 1.8 },
      bno055: { ...globalState.nodes[0].bno055, pitchDeg: 2.31, rollDeg: 1.14, tiltVelocityDegHr: 0.85 },
      adxl345: { ...globalState.nodes[0].adxl345, vibrationG: 0.45, accelZ: 1.15 },
    };
    globalState.nodes[1] = {
      ...globalState.nodes[1],
      status: 'WARNING',
      displacement: 2.45,
      tiltX: 1.12,
      vibration: 0.28,
      vl53l0x: { ...globalState.nodes[1].vl53l0x, relativeDisplacementMm: 2.45, subsidenceVelocityMmDay: 1.1 },
    };

    globalState.zones[0] = {
      ...globalState.zones[0],
      status: 'WARNING',
      riskScore: 76,
      maxSubsidenceMm: 4.82,
      subsidenceRateMmDay: 2.4,
    };

    globalState.kpis = {
      totalNodes: 9,
      totalZones: 3,
      activeAlerts: 1,
      warningAlertsCount: 1,
      criticalAlertsCount: 0,
      systemStatus: 'Online',
      systemStatusMessage: 'Warning: Accelerated subsidence and bench tilt detected in Zone 01',
      overallSubsidenceMaxMm: 4.82,
      overallRiskScore: 76,
      overallRiskLevel: 'WARNING',
      lastUpdated: timestamp,
    };

    globalState.aiInsight = {
      id: `INSIGHT-${Date.now()}`,
      generatedAt: nowTime,
      zoneId: 'ZONE-01',
      summary: 'Moderate subsidence acceleration detected along Zone 01 North-East Highwall crest. Laser displacement reached 4.82 mm.',
      technicalAnalysis: 'VL53L0X ToF laser sensor on Node 01 recorded rapid relative bench drop. BNO055 9-DOF orientation confirms pitch shift of 2.31°. ADXL-345 detects elevated 0.45 g micro-vibrations indicative of overburden tension fracture.',
      recommendedActions: [
        'Restrain heavy machinery haulage within 30 meters of Zone 01 crest.',
        'Dispatch field geotechnical supervisor for physical fissure inspection.',
        'Set sensor polling rate to high-frequency continuous mode.',
      ],
      confidenceScore: 94,
      riskScore: 76,
      disclaimer: 'Subsidence risk probability is computed mathematically by the ML Risk Engine (XGBoost / Isolation Forest). The LLM synthesizes natural-language geotechnical operational context.',
    };

    const exists = globalState.alerts.some((a) => a.id === 'ALT-WARN-CURRENT');
    if (!exists) {
      globalState.alerts = [
        {
          id: 'ALT-WARN-CURRENT',
          timestamp: `03 Sep ${nowTime}`,
          nodeId: 'N01',
          nodeName: 'Node 01 (Highwall Crest)',
          zoneId: 'ZONE-01',
          zoneName: 'Zone 01',
          severity: 'Warning',
          category: 'Subsidence',
          title: 'Accelerated subsidence & tilt detected (4.82 mm)',
          message: 'VL53L0X Laser ToF relative displacement exceeded 3.0 mm safe boundary.',
          sensorTrigger: 'VL53L0X Laser (4.82 mm) + BNO055 (2.31°)',
          acknowledged: false,
        },
        ...globalState.alerts,
      ];
    }
  } else if (mode === 'CRITICAL') {
    // Critical Ground Subsidence Breach in Zone 01
    globalState.nodes[0] = {
      ...globalState.nodes[0],
      status: 'CRITICAL',
      displacement: 14.8,
      tiltX: 4.25,
      tiltY: 2.85,
      vibration: 1.25,
      vl53l0x: { ...globalState.nodes[0].vl53l0x, relativeDisplacementMm: 14.8, subsidenceVelocityMmDay: 8.2, crackApertureMm: 5.4 },
      bno055: { ...globalState.nodes[0].bno055, pitchDeg: 4.25, rollDeg: 2.85, tiltVelocityDegHr: 2.8 },
      adxl345: { ...globalState.nodes[0].adxl345, vibrationG: 1.25, accelZ: 1.65 },
    };
    globalState.nodes[1] = {
      ...globalState.nodes[1],
      status: 'WARNING',
      displacement: 6.4,
      tiltX: 2.45,
      vibration: 0.65,
      vl53l0x: { ...globalState.nodes[1].vl53l0x, relativeDisplacementMm: 6.4, subsidenceVelocityMmDay: 3.5 },
    };
    globalState.nodes[2] = {
      ...globalState.nodes[2],
      status: 'WARNING',
      displacement: 4.1,
      tiltX: 1.8,
      vibration: 0.42,
      vl53l0x: { ...globalState.nodes[2].vl53l0x, relativeDisplacementMm: 4.1, subsidenceVelocityMmDay: 2.1 },
    };

    globalState.zones[0] = {
      ...globalState.zones[0],
      status: 'CRITICAL',
      riskScore: 92,
      maxSubsidenceMm: 14.8,
      subsidenceRateMmDay: 8.2,
    };

    globalState.kpis = {
      totalNodes: 9,
      totalZones: 3,
      activeAlerts: 2,
      warningAlertsCount: 1,
      criticalAlertsCount: 1,
      systemStatus: 'Online',
      systemStatusMessage: 'CRITICAL SUBSIDENCE COLLAPSE ALERT - EVACUATION DIRECTIVE',
      overallSubsidenceMaxMm: 14.8,
      overallRiskScore: 92,
      overallRiskLevel: 'CRITICAL',
      lastUpdated: timestamp,
    };

    globalState.aiInsight = {
      id: `INSIGHT-${Date.now()}`,
      generatedAt: nowTime,
      zoneId: 'ZONE-01',
      summary: 'CRITICAL SUBSIDENCE: Node 01 in Zone 01 shows catastrophic ground displacement (14.8 mm ToF laser drop). Imminent highwall shear failure.',
      technicalAnalysis: 'Triaxial correlation: VL53L0X ToF laser displacement (14.8 mm) breached the 12.0 mm critical evacuation threshold. BNO055 tilt reached 4.25° pitch. ADXL-345 recorded sustained 1.25 g seismic vibration shockwaves along highwall fault line. ML Risk Engine indicates 92% collapse probability.',
      recommendedActions: [
        'Sound immediate acoustic mine siren for Zone 01 extraction pit.',
        'Evacuate all 14 personnel via designated corridor: Ramp 2 -> Assembly Point A.',
        'Cut high-voltage feeder cables along North-East highwall perimeter.',
      ],
      confidenceScore: 99,
      riskScore: 92,
      disclaimer: 'Subsidence risk probability is computed mathematically by the ML Risk Engine (XGBoost / Isolation Forest). The LLM synthesizes natural-language geotechnical operational context.',
    };

    const exists = globalState.alerts.some((a) => a.id === 'ALT-CRIT-CURRENT');
    if (!exists) {
      globalState.alerts = [
        {
          id: 'ALT-CRIT-CURRENT',
          timestamp: `03 Sep ${nowTime}`,
          nodeId: 'N01',
          nodeName: 'Node 01 (Highwall Crest)',
          zoneId: 'ZONE-01',
          zoneName: 'Zone 01',
          severity: 'Critical',
          category: 'Subsidence',
          title: 'CRITICAL SUBSIDENCE: Laser displacement exceeded 14.8 mm',
          message: 'Severe highwall ground drop detected. Immediate pit evacuation protocol triggered.',
          sensorTrigger: 'VL53L0X (14.8 mm) • BNO055 (4.25°) • ADXL345 (1.25 g)',
          acknowledged: false,
        },
        ...globalState.alerts,
      ];
    }
  }

  // Add historical telemetry point
  const newHistPoint: HistoricalTelemetryPoint = {
    time: nowTime,
    vl53l0xDisplacementZ1: globalState.nodes[0].displacement,
    vl53l0xDisplacementZ2: globalState.nodes[3].displacement,
    vl53l0xDisplacementZ3: globalState.nodes[6].displacement,
    bno055TiltPitch: globalState.nodes[0].tiltX,
    bno055TiltRoll: globalState.nodes[0].tiltY,
    adxl345Vibration: globalState.nodes[0].vibration,
    riskScore: globalState.zones[0].riskScore,
    safeThreshold: 3.0,
    warningThreshold: 8.0,
    criticalThreshold: 12.0,
  };
  globalState.historicalTelemetry = [...globalState.historicalTelemetry.slice(-15), newHistPoint];

  notify();
}

export function acknowledgeAlert(alertId: string, acknowledgedBy: string = 'Mine Administrator') {
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  globalState.alerts = globalState.alerts.map((a) => {
    if (a.id === alertId) {
      return {
        ...a,
        acknowledged: true,
        acknowledgedBy,
        acknowledgedAt: `03 Sep ${now}`,
      };
    }
    return a;
  });

  const unackedCrit = globalState.alerts.filter((a) => a.severity === 'Critical' && !a.acknowledged).length;
  const unackedWarn = globalState.alerts.filter((a) => a.severity === 'Warning' && !a.acknowledged).length;
  globalState.kpis.activeAlerts = unackedCrit + unackedWarn;
  globalState.kpis.criticalAlertsCount = unackedCrit;
  globalState.kpis.warningAlertsCount = unackedWarn;

  notify();
}

export function dismissBanner() {
  globalState.activeBannerDismissed = true;
  notify();
}

export function setWorkerSeenAlert() {
  globalState.seenAlertAcknowledged = true;
  notify();
}

export function setLanguage(lang: Language) {
  globalState.language = lang;
  globalState.workerProfile.language = lang;
  notify();
}

export function setOnlineStatus(isOnline: boolean) {
  globalState.isOnline = isOnline;
  notify();
}

export function updateWorkerProfile(profile: Partial<WorkerProfile>) {
  globalState.workerProfile = {
    ...globalState.workerProfile,
    ...profile,
  };
  notify();
}

export function simulateLiveTick() {
  if (!globalState.isOnline) return;

  // Add realistic micro-variations across all 9 active field nodes
  globalState.nodes = globalState.nodes.map((node) => {
    const jitterDisp = (Math.random() - 0.5) * 0.02;
    const jitterTilt = (Math.random() - 0.5) * 0.01;
    const jitterVib = (Math.random() - 0.5) * 0.005;
    return {
      ...node,
      displacement: Math.max(0.1, Number((node.displacement + jitterDisp).toFixed(2))),
      tiltX: Number((node.tiltX + jitterTilt).toFixed(2)),
      vibration: Math.max(0.01, Number((node.vibration + jitterVib).toFixed(3))),
      lastHeartbeat: 'Just now (live)',
    };
  });
  notify();
}
