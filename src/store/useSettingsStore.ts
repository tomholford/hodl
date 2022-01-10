import { useState } from "react";
import { DEFAULT_VS_CURRENCY } from "../constants";

export const useSettingsStore = () => {
  const [vsCurrency, setVsCurrency] = useState<string>(DEFAULT_VS_CURRENCY);

  return {
    vsCurrency,
    setVsCurrency,
  };
}
