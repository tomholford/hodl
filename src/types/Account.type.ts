import BN from "bn.js";
import { Currency } from "./Currency.type";
import Wallet from "./Wallet.type";

export interface Account {
  address?: string;
  currency?: Currency;
  balance?: BN;
  // wallet?: Wallet;
  uuid?: string;
  custodial?: boolean;
}
