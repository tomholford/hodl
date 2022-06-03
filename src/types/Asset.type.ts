// An Asset represents a coin, token, or NFT associated with an Account

import { Currency } from "./Currency.type";
export interface Asset {
  accountId?: string;
  acquiredAt?: string;
  balance: number;
  currency: Currency;
  costBasis?: number;
  note?: string;
  uuid: string;
  coinId?: string; // the Coingecko API coinID
}
