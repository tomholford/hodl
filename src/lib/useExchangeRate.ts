import { useMemo } from "react";
import useSimpleCoinPrice from "../queries/useSimpleCoinPrice";

export const useExchangeRate = (coinId: string, vsCurrency: string = 'usd') => {
  const simpleCoinPriceQuery = useSimpleCoinPrice(coinId);

  const exchangeRate = useMemo(() => {
    if(!simpleCoinPriceQuery.data) { return null };

    return simpleCoinPriceQuery.data[coinId][vsCurrency];
  }, [coinId, simpleCoinPriceQuery.data, vsCurrency]);

  return exchangeRate;
}
