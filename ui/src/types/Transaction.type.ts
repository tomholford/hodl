/**
 * Schema for the backend's `transaction` record.
 * 
 * See desk/lib/transaction.hoon
 */
export interface Transaction {
  id: number;
  "coin-id": number;
  date: string;
  note: string;
  amount: number;
  "cost-basis": number;
  type: string;
}
