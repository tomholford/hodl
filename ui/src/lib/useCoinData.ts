import { useMemo } from "react";
import useCoin from "../queries/useCoin";

export const useCoinData = (coinId: string) => {
  const coinQuery = useCoin(coinId);

  const name = useMemo(() => {
    if(!(coinQuery.data && coinQuery.isSuccess)) { return coinId };

    return coinQuery.data.name;
  }, [coinQuery.data, coinQuery.isSuccess]);

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
