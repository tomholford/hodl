import { useMemo } from "react";
import useSimpleCoinPrice from "../queries/useSimpleCoinPrice";
import { currencyToCoinId } from "./currencyToCoinId";

export const useExchangeRate = (currency: string, vsCurrency: string = 'usd') => {
  const coinId = currencyToCoinId(currency);
  const simpleCoinPriceQuery = useSimpleCoinPrice(coinId);

  const exchangeRate = useMemo(() => {
    if(!simpleCoinPriceQuery.data) { return null };

    return simpleCoinPriceQuery.data[coinId][vsCurrency];
  }, [coinId, simpleCoinPriceQuery.data, vsCurrency]);

  return exchangeRate;
}
