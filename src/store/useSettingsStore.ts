import { useState } from "react";
import { useBoolean, useDarkMode } from "usehooks-ts";
import { DEFAULT_VS_CURRENCY } from "../constants";

export const useSettingsStore = () => {
  const [vsCurrency, setVsCurrency] = useState<string>(DEFAULT_VS_CURRENCY);
  const { value: isPrivacyMode, setValue: setIsPrivacyMode } = useBoolean(false);
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();

  return {
    isDarkMode,
    isPrivacyMode,
    setIsPrivacyMode,
    toggleDarkMode,
    vsCurrency,
    setVsCurrency,
  };
}
