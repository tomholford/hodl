import React, { createContext, useContext } from 'react';
import { useWalletsStore } from './useWalletsStore';

const initialContext = {
  wallets: null,
  addWallet: () => {},
  setWallets: () => {}
}

export const WalletsContext = createContext<ReturnType<typeof useWalletsStore>>(initialContext);

export const WalletsProvider = ({ children }: { children: React.ReactNode }) => {

  const walletsStore = useWalletsStore();

  return (
    <WalletsContext.Provider value={walletsStore}>
      {children}
    </WalletsContext.Provider>
  );
}

export const useWallets = () => {
  return useContext(WalletsContext);
}
