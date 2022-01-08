import { useQueries } from "react-query";
import { getSimpleCoinPrice } from "../services/CoinGecko.service";

export default function useSimpleCoinPrices(coinIds: string[]) {
  return useQueries(coinIds.map(coinId => {
    return {
      queryKey: ['getSimpleCoinPrice', coinId],
      queryFn: () => getSimpleCoinPrice(coinId)
    }
  }));
}
