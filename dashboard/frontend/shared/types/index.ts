export type RiskLevel = 'SAFE' | 'WARNING' | 'CRITICAL';

export type NodeStatus = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export type SystemMode = 'SAFE' | 'WARNING' | 'CRITICAL' | 'RECOVERED';

export type AlertSeverity = 'Critical' | 'Warning' | 'Info' | 'Normal';

export type AlertCategory = 'Subsidence' | 'LaserDisplacement' | 'TiltOrientation' | 'VibrationAcceleration' | 'SatelliteInSAR' | 'System';

// BNO055 9-DOF Absolute Orientation & Tilt
export interface BNO055Telemetry {
  pitchDeg: number; // Pitch angle (X-axis tilt) in °
  rollDeg: number; // Roll angle (Y-axis tilt) in °
  yawDeg: number; // Heading / Yaw in °
  tiltVelocityDegHr: number; // Tilt rate in °/hour
}

// ADXL-345 3-Axis Digital Accelerometer & Vibration Sensor
export interface ADXL345Telemetry {
  accelX: number; // Linear acceleration X in g
  accelY: number; // Linear acceleration Y in g
  accelZ: number; // Linear acceleration Z in g
  vibrationG: number; // Dynamic vibration amplitude in g (micro-seismic rumble)
  frequencyHz: number; // Dominant frequency in Hz
}

// VL53L0X Time-of-Flight (ToF) Laser Distance / Relative Displacement Sensor
export interface VL53L0XTelemetry {
  relativeDisplacementMm: number; // Measured subsidence / displacement in mm
  subsidenceVelocityMmDay: number; // Subsidence rate in mm/day
  crackApertureMm: number; // Fissure opening width in mm
  distanceRawMm: number; // Raw ToF laser distance in mm
}

export interface SensorNode {
  id: string;
  name: string;
  sensorStack: string; // 'BNO055 + ADXL-345 + VL53L0X'
  zoneId: string;
  zoneName: string;
  status: NodeStatus;
  
  // Dedicated Sensor Readings
  bno055: BNO055Telemetry;
  adxl345: ADXL345Telemetry;
  vl53l0x: VL53L0XTelemetry;

  // Flattened convenient getters for fast UI binding
  displacement: number; // VL53L0X relative displacement in mm
  tiltX: number; // BNO055 pitch
  tiltY: number; // BNO055 roll
  vibration: number; // ADXL-345 vibration in g
  accelerationZ: number; // ADXL-345 Z-axis

  // Hardware health
  batteryLevel: number; // %
  signalRssi: number; // dBm LoRa RSSI
  lastHeartbeat: string;
  latitude: number;
  longitude: number;
  elevation: number; // meters
}

export interface RiskZone {
  id: string;
  name: string;
  section: string;
  description: string;
  status: RiskLevel;
  riskScore: number; // 0 to 100%
  maxSubsidenceMm: number; // Maximum subsidence depth recorded in zone
  subsidenceRateMmDay: number; // Velocity
  activeWorkers: number;
  nodeIds: string[]; // 3 nodes assigned per zone
  primaryRiskFactor: string;
  evacuationRouteName: string;
  assemblyPoint: string;
  coordinates: [number, number][]; // Polygon coordinates
  center: [number, number];
}

export interface AlertRecord {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeName: string;
  zoneId: string;
  zoneName: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  message: string;
  sensorTrigger: string; // e.g. 'VL53L0X Laser Displacement (14.8 mm)'
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

export interface AIInsight {
  id: string;
  generatedAt: string;
  zoneId: string;
  summary: string;
  technicalAnalysis: string;
  recommendedActions: string[];
  confidenceScore: number;
  riskScore: number;
  disclaimer: string;
}

export interface InSARDeformationPoint {
  id: string;
  timestamp: string;
  satellite: 'Sentinel-1' | 'NISAR' | 'TerraSAR-X';
  cumulativeSubsidenceMm: number;
  velocityMmPerYear: number;
  coherence: number;
  zone: string;
}

export interface HistoricalTelemetryPoint {
  time: string;
  vl53l0xDisplacementZ1: number; // Zone 01 Laser Subsidence
  vl53l0xDisplacementZ2: number; // Zone 02 Laser Subsidence
  vl53l0xDisplacementZ3: number; // Zone 03 Laser Subsidence
  bno055TiltPitch: number; // BNO055 Pitch
  bno055TiltRoll: number; // BNO055 Roll
  adxl345Vibration: number; // ADXL-345 Vibration
  riskScore: number;
  safeThreshold: number; // 3.0 mm
  warningThreshold: number; // 8.0 mm
  criticalThreshold: number; // 12.0 mm
}

export interface WorkerProfile {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  department: string;
  assignedMine: string;
  assignedZone: string;
  contactNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  language: 'en' | 'ta' | 'hi';
  notificationsEnabled: boolean;
  smsAlertsEnabled: boolean;
}

export interface SystemKPIs {
  totalNodes: number;
  totalZones: number;
  activeAlerts: number;
  warningAlertsCount: number;
  criticalAlertsCount: number;
  systemStatus: 'Online' | 'Degraded' | 'Offline';
  systemStatusMessage: string;
  overallSubsidenceMaxMm: number;
  overallRiskScore: number;
  overallRiskLevel: RiskLevel;
  lastUpdated: string;
}
