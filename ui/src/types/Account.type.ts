/**
 * Schema for the backend's `account` record.
 *
 * See desk/sur/account.hoon
 */
export interface Account {
  id: string;
  "wallet-id": string;
  name: string;
  note: string;
}
