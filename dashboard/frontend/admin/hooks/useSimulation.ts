'use client';

import { useEffect, useState } from 'react';
import {
  getSimulationState,
  subscribeToSimulation,
  setSystemMode,
  acknowledgeAlert,
  dismissBanner,
  setLanguage,
  simulateLiveTick,
  MineGuardState,
} from '../../shared/store/simulationStore';
import { translate, Language } from '../../shared/utils';
import { SystemMode } from '../../shared/types';

export function useSimulation() {
  const [state, setState] = useState<MineGuardState>(getSimulationState());

  useEffect(() => {
    const unsubscribe = subscribeToSimulation((newState) => {
      setState({ ...newState });
    });

    // Run realistic periodic heartbeat tick every 3.5 seconds
    const interval = setInterval(() => {
      simulateLiveTick();
    }, 3500);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const t = (path: string, params: Record<string, string | number> = {}) => {
    return translate(path, state.language, params);
  };

  const setMode = (mode: SystemMode) => {
    setSystemMode(mode);
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

  return {
    state,
    t,
    setMode,
    ackAlert,
    dismiss,
    changeLanguage,
  };
}
