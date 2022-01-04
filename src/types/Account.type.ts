// An Account has one more Assets

import BN from "bn.js";
import { Currency } from "./Currency.type";

export interface Account {
  address?: string;
  currency?: Currency;
  balance?: number;
  balanceBN?: BN;
  // wallet?: Wallet;
  uuid?: string;
  custodial?: boolean;
}
