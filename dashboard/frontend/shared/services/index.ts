import {
  getSimulationState,
  setSystemMode,
  acknowledgeAlert,
  dismissBanner,
  setWorkerSeenAlert,
  setLanguage,
  setOnlineStatus,
  updateWorkerProfile,
  subscribeToSimulation,
} from '../store/simulationStore';
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
import { Language } from '../utils';

export const dashboardService = {
  getKPIs: async (): Promise<SystemKPIs> => {
    return getSimulationState().kpis;
  },
  getAIInsight: async (): Promise<AIInsight> => {
    return getSimulationState().aiInsight;
  },
  getHistoricalTelemetry: async (): Promise<HistoricalTelemetryPoint[]> => {
    return getSimulationState().historicalTelemetry;
  },
  getInSARData: async (): Promise<InSARDeformationPoint[]> => {
    return getSimulationState().insarData;
  },
};

export const alertService = {
  getAlerts: async (): Promise<AlertRecord[]> => {
    return getSimulationState().alerts;
  },
  acknowledge: async (alertId: string, userName?: string): Promise<{ success: boolean; acknowledgedAt: string }> => {
    acknowledgeAlert(alertId, userName);
    return {
      success: true,
      acknowledgedAt: new Date().toISOString(),
    };
  },
  dismissTopBanner: (): void => {
    dismissBanner();
  },
};

export const nodeService = {
  getNodes: async (): Promise<SensorNode[]> => {
    return getSimulationState().nodes;
  },
  getNodeById: async (id: string): Promise<SensorNode | undefined> => {
    return getSimulationState().nodes.find((n) => n.id === id);
  },
  getZones: async (): Promise<RiskZone[]> => {
    return getSimulationState().zones;
  },
};

export const userService = {
  getProfile: async (): Promise<WorkerProfile> => {
    return getSimulationState().workerProfile;
  },
  updateProfile: async (profile: Partial<WorkerProfile>): Promise<WorkerProfile> => {
    updateWorkerProfile(profile);
    return getSimulationState().workerProfile;
  },
  markAlertSeen: (): void => {
    setWorkerSeenAlert();
  },
};

export const monitoringService = {
  subscribe: (callback: (state: ReturnType<typeof getSimulationState>) => void) => {
    return subscribeToSimulation(callback);
  },
  setSimulationMode: (mode: SystemMode) => {
    setSystemMode(mode);
  },
  setAppLanguage: (lang: Language) => {
    setLanguage(lang);
  },
  setNetworkStatus: (isOnline: boolean) => {
    setOnlineStatus(isOnline);
  },
};
