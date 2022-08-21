import { useState } from "react";
import Wallet from "../types/Wallet.type";

export const useWalletsStore = () => {
  const [wallets, setWallets] = useState<Wallet[] | null>(null);

  const addWallet = (wallet: Wallet) => {
    wallets ? setWallets([...wallets, wallet]) : setWallets([wallet]);
  }

  return {
    wallets,
    addWallet,
    setWallets
  };
}
