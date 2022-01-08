import { useQuery } from "react-query";
import { CoinGeckoClient, CoinListResponseItem } from 'coingecko-api-v3';

const getCoinsList = async (): Promise<CoinListResponseItem[]> => {
  // const response = await fetch("https://api.coingecko.com/api/v3/coins/list?include_platform=false");
  // if(!response.ok) { throw new Error('Coin list API call failed') };
  // return await response.json();
  const client = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
  const response = await client.coinList({ include_platform: false });
  return response;
};

export default function useCoinsList() {
  return useQuery("getCoinsList", getCoinsList, { cacheTime: Infinity });
}
