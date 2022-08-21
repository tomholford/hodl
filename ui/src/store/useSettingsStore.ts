import { useState } from "react";
import { useDarkMode, useLocalStorage } from "usehooks-ts";
import { DEFAULT_VS_CURRENCY } from "../constants";

export const useSettingsStore = () => {
  const [vsCurrency, setVsCurrency] = useState<string>(DEFAULT_VS_CURRENCY);
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const [isPrivacyMode, setIsPrivacyMode] = useLocalStorage('hodl:isPrivacyMode', false);

  return {
    isDarkMode,
    isPrivacyMode,
    setIsPrivacyMode,
    toggleDarkMode,
    vsCurrency,
    setVsCurrency,
  };
}
