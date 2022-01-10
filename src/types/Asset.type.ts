// An Asset represents a coin, token, or NFT associated with an Account

import { Currency } from "./Currency.type";

type AssetType = 'NFT' | 'COIN'

export interface Asset {
  type: AssetType;
  currency: Currency;
  balance: number;
  uuid: string;
  note?: string;
  acquiredAt?: string;
  accountId?: string;
}
