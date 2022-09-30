import { useQueries } from "@tanstack/react-query";
import { getSimpleCoinPrice } from "../services/CoinGecko.service";

export default function useSimpleCoinPrices(coinIds: string[], vsCurrency: string) {
  return useQueries({ queries: coinIds.map(coinId => {
    return {
      queryKey: ['getSimpleCoinPrice', coinId, vsCurrency],
      queryFn: () => getSimpleCoinPrice(coinId, vsCurrency)
    }
  })});
}
