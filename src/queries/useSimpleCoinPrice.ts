import { useQuery } from "react-query";
import { getSimpleCoinPrice } from "../services/CoinGecko.service";

export default function useSimpleCoinPrice(coinId: string) {
  return useQuery(["getSimpleCoinPrice", coinId], () => getSimpleCoinPrice(coinId));
}
