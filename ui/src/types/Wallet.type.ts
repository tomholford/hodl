/**
 * Schema for the backend's `wallet` record.
 *
 * See desk/sur/wallet.hoon
 */
export interface Wallet {
  id: string;
  name: string;
  note: string;
}
