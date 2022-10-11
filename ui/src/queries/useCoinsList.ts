import { useQuery } from "@tanstack/react-query";
import { getCoinsList } from "../services/CoinGecko.service";

export default function useCoinsList(options: any) {
  return useQuery(["getCoinsList"], getCoinsList, { cacheTime: Infinity, ...options });
}
