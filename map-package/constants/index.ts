export const MINE_INFO = {
  name: 'Mine Site Alpha - Open Cast & Slope Section',
  location: 'Dhanbad Mining Sector, Block IV',
  coordinates: {
    lat: 23.7957,
    lng: 86.4304,
  },
  elevationMeters: 224,
  activeShift: 'Day Shift (06:00 - 18:00)',
  safetyOfficer: 'Rajesh Sharma (Safety Eng #4012)',
};

export const SENSOR_THRESHOLDS = {
  displacement: {
    safeMax: 3.0, // mm
    warningMax: 8.0, // mm
    criticalMin: 8.0, // mm
  },
  tilt: {
    safeMax: 1.5, // degrees
    warningMax: 3.0, // degrees
    criticalMin: 3.0, // degrees
  },
  crackGrowthRate: {
    safeMax: 1.0, // mm/day
    warningMax: 2.5, // mm/day
    criticalMin: 2.5, // mm/day
  },
  riskScore: {
    safeMax: 40, // %
    warningMax: 80, // %
    criticalMin: 80, // %
  },
};

export const MINE_ZONES = [
  {
    id: 'ZONE-01',
    name: 'Zone 01',
    section: 'North-East Highwall Section',
    description: 'Active extraction wall and overburden bench slope.',
    center: [23.7965, 86.4312] as [number, number],
    bounds: [
      [23.798, 86.4295],
      [23.7985, 86.433],
      [23.795, 86.4335],
      [23.7945, 86.43],
    ] as [number, number][],
    evacuationRouteName: 'Evacuation Corridor North-East -> Ramp 2 -> Assembly Point A',
    assemblyPoint: 'Assembly Point A (Safe Overburden Clearing)',
  },
];

export const SAFE_ASSEMBLY_POINTS = [
  {
    id: 'AP-01',
    name: 'Assembly Point A',
    description: 'Reinforced muster area outside slope failure radius',
    coordinates: [23.7935, 86.427] as [number, number],
    capacity: 250,
  },
  {
    id: 'AP-02',
    name: 'Assembly Point B',
    description: 'South gate main muster ground with medical shelter',
    coordinates: [23.792, 86.435] as [number, number],
    capacity: 400,
  },
];
