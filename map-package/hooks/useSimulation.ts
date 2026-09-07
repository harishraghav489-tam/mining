'use client';

import { useEffect, useState } from 'react';
import {
  getSimulationState,
  subscribeToSimulation,
  setSystemMode,
  setSelectedZone,
  acknowledgeAlert,
  dismissBanner,
  setLanguage,
  simulateLiveTick,
  setWorkerSeenAlert,
  updateWorkerProfile,
  setOnlineStatus,
  MineGuardState,
} from '../store/simulationStore';
import { translate, Language } from '../utils';
import { SystemMode, WorkerProfile } from '../types';

export function useSimulation() {
  const [state, setState] = useState<MineGuardState>(getSimulationState());

  useEffect(() => {
    const unsubscribe = subscribeToSimulation((newState) => {
      setState({ ...newState });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const t = (path: string, params: Record<string, string | number> = {}) => {
    return translate(path, state.language, params);
  };

  const setMode = (mode: SystemMode) => {
    setSystemMode(mode);
  };

  const selectZone = (zoneId: string) => {
    setSelectedZone(zoneId);
  };

  const ackAlert = (alertId: string, userName?: string) => {
    acknowledgeAlert(alertId, userName);
  };

  const dismiss = () => {
    dismissBanner();
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const markSeen = () => {
    setWorkerSeenAlert();
  };

  const updateProfile = (profile: Partial<WorkerProfile>) => {
    updateWorkerProfile(profile);
  };

  const toggleNetwork = (online?: boolean) => {
    setOnlineStatus(online !== undefined ? online : !state.isOnline);
  };

  return {
    state,
    t,
    setMode,
    selectZone,
    ackAlert,
    dismiss,
    changeLanguage,
    markSeen,
    updateProfile,
    toggleNetwork,
  };
}
