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
  amount: number;
  "cost-basis": number;
  type: string;
}
