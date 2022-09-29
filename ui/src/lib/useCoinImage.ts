import { useMemo } from "react";
import useCoin from "../queries/useCoin";

export const useCoinImage = (coinId: string) => {
  const coinQuery = useCoin(coinId);

  const image = useMemo(() => {
    if(!(coinQuery.data && coinQuery.isSuccess)) { return null };

    return coinQuery.data.image;
  }, [coinQuery.data, coinQuery.isSuccess]);

  return image;
}
