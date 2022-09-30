import { useQuery } from "@tanstack/react-query";
import { CoinGeckoClient, CoinListResponseItem } from 'coingecko-api-v3';

const getCoinsList = async (): Promise<CoinListResponseItem[]> => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.coinList({ include_platform: false });
  return response;
};

export default function useCoinsList() {
  return useQuery(["getCoinsList"], getCoinsList, { cacheTime: Infinity });
}
