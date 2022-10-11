import { CoinGeckoClient, CoinListResponseItem, SearchResponse } from "coingecko-api-v3";

const client = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

export const getSimpleCoinPrice = async (coinId: string, vsCurrency: string) => {
  return await client.simplePrice({ ids: coinId, vs_currencies: vsCurrency });
};

export const getCoinsList = async (): Promise<CoinListResponseItem[]> => {
  return await client.coinList({ include_platform: false });
};

export const coinSearch = async (query?: string): Promise<SearchResponse> => {
  return await client.search({ query });
}

export const getCoin = async (coinId: string) => {
  return await client.coinId({ id: coinId });
};
