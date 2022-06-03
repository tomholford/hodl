import { useEffect } from "react";
import { currencyToCoinId } from "../lib/currencyToCoinId";
import { useAssets } from "../store/Assets";

// TODO: remove this in a future release
export const MigrateCoinID = () => {
  const { assets, setAssets } = useAssets();

  useEffect(() => {
    if(!assets) {
      return;
    }

    const newAssets = assets.slice();

    newAssets.forEach(a => {
      if(a.coinId) {
        return;
      }

      a.coinId = currencyToCoinId(a.currency);       
    })

    setAssets(newAssets);

  // Only want to migrate data once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}