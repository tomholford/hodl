import { useQuery } from "@tanstack/react-query";
import { CoinGeckoClient } from 'coingecko-api-v3';

const getSupportedVsCurrencies = async (): Promise<string[]> => {
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.simpleSupportedCurrencies();
  return response;
};

export default function useSupportedVsCurrencies() {
  return useQuery(["getSupportedVsCurrencies"], getSupportedVsCurrencies, { cacheTime: Infinity });
}
