import { useMemo } from "react";
import useSimpleCoinPrice from "../queries/useSimpleCoinPrice";
import { useSettings } from "../store/Settings";
import { currencyToCoinId } from "./currencyToCoinId";

export const useExchangeRate = (currency: string) => {
  const coinId = currencyToCoinId(currency);
  const { vsCurrency } = useSettings();
  const simpleCoinPriceQuery = useSimpleCoinPrice(coinId, vsCurrency);

  const exchangeRate = useMemo(() => {
    if(!(simpleCoinPriceQuery.data && vsCurrency)) { return null };

    return simpleCoinPriceQuery.data[coinId][vsCurrency];
  }, [coinId, simpleCoinPriceQuery.data, vsCurrency]);

  return exchangeRate;
}
