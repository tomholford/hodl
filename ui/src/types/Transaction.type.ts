/**
 * Schema for the backend's `transaction` record.
 * 
 * See desk/lib/transaction.hoon
 */
export interface Transaction {
  id: string;
  "coin-id": string;
  date: number;
  note: string;
  amount: string;
  "cost-basis": string;
  type: string;
  "account-id": string;
}
