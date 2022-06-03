import { useMemo } from "react";
import useSimpleCoinPrice from "../queries/useSimpleCoinPrice";
import { useSettings } from "../store/Settings";

export const useExchangeRate = (coinId: string) => {
  const { vsCurrency } = useSettings();
  const simpleCoinPriceQuery = useSimpleCoinPrice(coinId, vsCurrency);

  const exchangeRate = useMemo(() => {
    if(!(simpleCoinPriceQuery.data && vsCurrency)) { return null };

    return simpleCoinPriceQuery.data[coinId][vsCurrency];
  }, [coinId, simpleCoinPriceQuery.data, vsCurrency]);

  return exchangeRate;
}
