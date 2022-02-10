import { useMemo } from "react";
import useCoin from "../queries/useCoin";
import { currencyToCoinId } from "./currencyToCoinId";

export const useCoinImage = (currency: string) => {
  const coinId = currencyToCoinId(currency);
  const coinQuery = useCoin(coinId);

  const image = useMemo(() => {
    if(!(coinQuery.data && coinQuery.isSuccess)) { return null };

    return coinQuery.data.image;
  }, [coinQuery.data, coinQuery.isSuccess]);

  return image;
}
