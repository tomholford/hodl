// An Asset represents a coin, token, or NFT associated with an Account

import { Currency } from "./Currency.type";

type AssetType = 'NFT' | 'COIN'

export interface Asset {
  accountId?: string;
  acquiredAt?: string;
  balance: number;
  currency: Currency;
  costBasis?: number;
  note?: string;
  type: AssetType;
  uuid: string;
}
