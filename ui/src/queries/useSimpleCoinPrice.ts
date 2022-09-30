import { useQuery } from "@tanstack/react-query";
import { getSimpleCoinPrice } from "../services/CoinGecko.service";

export default function useSimpleCoinPrice(coinId: string, vsCurrency: string) {
  return useQuery(["getSimpleCoinPrice", coinId, vsCurrency], () => getSimpleCoinPrice(coinId, vsCurrency));
}
