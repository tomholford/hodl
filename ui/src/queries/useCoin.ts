import { useQuery } from "@tanstack/react-query";
import { getCoin } from "../services/CoinGecko.service";

export default function useCoin(coinId: string, options?: {}) {
  return useQuery(["getCoin", coinId], () => getCoin(coinId), { cacheTime: Infinity, ...options });
}
