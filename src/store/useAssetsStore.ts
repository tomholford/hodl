import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Asset } from "../types/Asset.type";

export const useAssetsStore = () => {
  const [localAssets, setLocalAssets] = useLocalStorage('hodl:assets', [] as Asset[]);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  const addAsset = (asset: Asset) => {
    assets ? setAssets([...assets, asset]) : setAssets([asset]);
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
    addAsset,
    removeAsset,
    setAssets,
    updateAsset,
  };
}
