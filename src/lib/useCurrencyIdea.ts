import { useMemo } from "react"
import { CURRENCIES } from "../constants";
import { Currency } from "../types/Currency.type";

export const useCoinId = (currency: string) => {
  return useMemo(() => {
    return CURRENCIES[currency as Currency].id;
  }, [currency]);
}
