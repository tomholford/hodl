import { useQuery } from "react-query";
import { CoinFullInfo, CoinGeckoClient } from 'coingecko-api-v3';

// ​/coins​/{id}
// Get current data (name, price, market, ... including exchange tickers) for a coin
const getCoin = async (coinId: string): Promise<CoinFullInfo> => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.coinId({ id: coinId });
  return response;
};

export default function useCoin(coinId: string) {
  return useQuery(["getCoin", coinId], () => getCoin(coinId));
}
