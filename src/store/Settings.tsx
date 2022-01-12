import React, { createContext, useContext } from 'react';
import { DEFAULT_VS_CURRENCY } from '../constants';
import { useSettingsStore } from './useSettingsStore';

const initialContext = {
  isDarkMode: true,
  isPrivacyMode: false,
  setIsPrivacyMode: () => {},
  toggleDarkMode: () => {},
  vsCurrency: DEFAULT_VS_CURRENCY,
  setVsCurrency: () => {},
}

export const SettingsContext = createContext<ReturnType<typeof useSettingsStore>>(initialContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {

  const settingsStore = useSettingsStore();

  return (
    <SettingsContext.Provider value={settingsStore}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  return useContext(SettingsContext);
}
