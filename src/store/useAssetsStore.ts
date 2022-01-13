import { groupBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Asset } from "../types/Asset.type";

export const useAssetsStore = () => {
  const [localAssets, setLocalAssets] = useLocalStorage('hodl:assets', [] as Asset[]);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  const groupedAssets = useMemo(() => {
    if(!assets) { return {} };

    return groupBy(assets, a => a.currency)
  }, [assets]);

  const assetCurrencies = useMemo(() => {
    if(!groupedAssets) { return [] };

    const currencies = Object.keys(groupedAssets);
    currencies.sort();

    return currencies;
  }, [groupedAssets]);

  const addAsset = (asset: Asset) => {
    setAssets(state => state ? [...state, asset] : [asset]);
  }

  const removeAsset = (uuid: string) => {
    if(!assets) {
      return;
    }

    setAssets([...assets.filter(a => a.uuid !== uuid)]);
  }

  const updateAsset = (uuid: string, asset: Partial<Asset>) => {
    if(!assets) { return };

    const foundAsset = assets.find(a => a.uuid === uuid);
    if(!foundAsset) { return };

    const dupedAsset = Object.assign({}, foundAsset);
    const updatedAsset = Object.assign(dupedAsset, asset);

    setAssets([...assets.map(a => a.uuid === uuid ? updatedAsset : a)]);
  }

  const _ensureBalance = (asset: Asset): Asset => {
    asset.balance = Number(asset.balance);
    return asset;
  }

  // Restore from localStorage if available
  useEffect(() => {
    if(localAssets && localAssets.length > 0) {
      setAssets(localAssets.map(_ensureBalance));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep it up to date
  useEffect(() => {
    if(assets) {
      setLocalAssets(assets);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets]);

  return {
    assets,
    assetCurrencies,
    groupedAssets,
    addAsset,
    removeAsset,
    setAssets,
    updateAsset,
  };
}
