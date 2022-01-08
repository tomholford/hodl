import React, { createContext, useContext } from 'react';
import { useAssetsStore } from './useAssetsStore';

const initialContext = {
  assets: null,
  assetCurrencies: [],
  groupedAssets: {},
  addAsset: () => {},
  removeAsset: () => {},
  setAssets: () => {},
  updateAsset: () => {},
}

export const AssetsContext = createContext<ReturnType<typeof useAssetsStore>>(initialContext);

export const AssetsProvider = ({ children }: { children: React.ReactNode }) => {

  const assetsStore = useAssetsStore();

  return (
    <AssetsContext.Provider value={assetsStore}>
      {children}
    </AssetsContext.Provider>
  );
}

export const useAssets = () => {
  return useContext(AssetsContext);
}
