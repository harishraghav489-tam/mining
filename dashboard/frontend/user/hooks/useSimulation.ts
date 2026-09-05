'use client';

import { useEffect, useState } from 'react';
import {
  getSimulationState,
  subscribeToSimulation,
  setSystemMode,
  setLanguage,
  setWorkerSeenAlert,
  updateWorkerProfile,
  setOnlineStatus,
  MineGuardState,
} from '../../shared/store/simulationStore';
import { translate, Language } from '../../shared/utils';
import { SystemMode, WorkerProfile } from '../../shared/types';

export function useSimulation() {
  const [state, setState] = useState<MineGuardState>(getSimulationState());

  useEffect(() => {
    const unsubscribe = subscribeToSimulation((newState) => {
      setState({ ...newState });
    });

    // Offline / online browser detection
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = (path: string, params: Record<string, string | number> = {}) => {
    return translate(path, state.language, params);
  };

  const setMode = (mode: SystemMode) => {
    setSystemMode(mode);
  };

  const markSeen = () => {
    setWorkerSeenAlert();
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
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
    markSeen,
    changeLanguage,
    updateProfile,
    toggleNetwork,
  };
}
