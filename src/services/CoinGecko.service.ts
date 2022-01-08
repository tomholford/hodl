import { CoinGeckoClient } from "coingecko-api-v3";

// TODO: map coin symbol ID to API
export const getSimpleCoinPrice = async (coinId: string) => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.simplePrice({ ids: coinId, vs_currencies: 'usd' });
  return response;
};
