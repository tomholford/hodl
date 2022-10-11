import useCoin from "../queries/useCoin";

export const useCoinData = (coinId: string) => {
  const coinQuery = useCoin(coinId);

  return coinQuery.isSuccess ? {
    image: coinQuery.data.image,
    name: coinQuery.data.name,
    symbol: coinQuery.data.symbol,
  } : {
    image: null,
    name: coinId,
    symbol: coinId,
  }
}
