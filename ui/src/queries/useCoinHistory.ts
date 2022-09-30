import { useQuery } from "@tanstack/react-query";
import { CoinGeckoClient, CoinHistoryResponse } from 'coingecko-api-v3';

const getCoinHistory = async (coinId: string, date: string): Promise<CoinHistoryResponse> => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.coinIdHistory({ id: coinId, date });
  return response;
};

export default function useCoinHistory(coinId: string, date: string) {
  return useQuery(["getCoinHistory", coinId, date], () => getCoinHistory(coinId, date));
}
