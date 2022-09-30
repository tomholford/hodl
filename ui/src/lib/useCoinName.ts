import { useMemo } from "react";
import useCoin from "../queries/useCoin";

export const useCoinName = (coinId: string) => {
  const coinQuery = useCoin(coinId);

  const name = useMemo(() => {
    if(!(coinQuery.data && coinQuery.isSuccess)) { return coinId };

    return coinQuery.data.name;
  }, [coinQuery.data, coinQuery.isSuccess]);

  return name;
}
