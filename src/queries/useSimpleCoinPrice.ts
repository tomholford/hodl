import { CoinGeckoClient } from "coingecko-api-v3";
import { useQuery } from "react-query";

// TODO: map coin symbol ID to API
const getSimpleCoinPrice = async (coinId: string) => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.simplePrice({ ids: coinId, vs_currencies: 'usd' });
  return response;
};

export default function useCoinsList(coinId: string) {
  return useQuery(["getSimpleCoinPrice", coinId], () => getSimpleCoinPrice(coinId));
}
