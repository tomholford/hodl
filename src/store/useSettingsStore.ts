import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import { DEFAULT_VS_CURRENCY } from "../constants";

export const useSettingsStore = () => {
  const [vsCurrency, setVsCurrency] = useState<string>(DEFAULT_VS_CURRENCY);
  const { value: isPrivacyMode, setValue: setIsPrivacyMode } = useBoolean(false);

  return {
    isPrivacyMode,
    setIsPrivacyMode,
    vsCurrency,
    setVsCurrency,
  };
}
