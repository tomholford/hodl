import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Transaction } from '../types/Transaction.type';
import api from '../services/API';
import { groupBy } from 'lodash';

interface TransactionAddDiff {
  add: Transaction;
}

interface TransactionEditDiff {
  edit: Transaction;
}

interface TransactionDelDiff {
  del: {
    id: string;
  }
}

type TransactionDiff =
  | TransactionAddDiff
  | TransactionEditDiff
  | TransactionDelDiff;

interface TransactionAddUpdate {
  add: Transaction;
} 
interface TransactionEditUpdate {
  edit: Transaction;
} 
interface TransactionDelUpdate {
  del: string;
}

type TransactionUpdate =
  | TransactionAddUpdate 
  | TransactionEditUpdate 
  | TransactionDelUpdate;

function txAction(diff: TransactionDiff) {
  console.log(diff);
  return {
    app: 'hodl',
    mark: 'hodl-action',
    json: diff,
  };
}

export interface TransactionsState {
  set: (fn: (sta: TransactionsState) => void) => void;
  batchSet: (fn: (sta: TransactionsState) => void) => void;
  initialized: boolean;
  transactions: Transaction[];
  add: (transaction: Transaction) => Promise<void>;
  edit: (transaction: Transaction) => Promise<void>;
  del: (id: string) => Promise<void>;
  start: () => Promise<number>;
}

export const useTransactionsState = create<TransactionsState>((set, get) => ({
  set: (fn) => {
    set(produce(get(), fn));
  },
  batchSet: (fn) => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  initialized: false,
  transactions: [],
  add: async (transaction) => {
    await api.poke(
      txAction({
        add: transaction
      })
    );
  },
  edit: async (transaction) => {
    await api.poke(
      txAction({
        edit: transaction
      })
    );
  },
  del: async (id) => {
    await api.poke(
      txAction({
        del: { id }
      })
    );
  },
  start: async () => {
    const transactions = await api.scry<Transaction[]>({
      app: 'hodl',
      path: '/transactions/all',
    });

    set((s) => ({
      ...s,
      transactions: Object.values(transactions), // TODO: scry returns list?
      initialized: true,
    }));

    return await api.subscribe({
      app: 'hodl',
      path: '/updates',
      event: (update: TransactionUpdate) => {
        if('add' in update) {
          get().batchSet((draft) => {
            draft.transactions = [...draft.transactions, update.add]
          })
        }
        if('edit' in update) {
          get().batchSet((draft) => {
            draft.transactions = [...draft.transactions.slice().filter(t => t.id !== update.edit.id), update.edit]
          })
        }
        if('del' in update) {
          get().batchSet((draft) => {
            draft.transactions = draft.transactions.slice().filter(t => t.id !== update.del)
          })
        }
      },
    });
  },
}));

const selTransactionsInitialized = (s: TransactionsState) => s.initialized;
export function useTransactionsInitialized() {
  return useTransactionsState(selTransactionsInitialized);
}

const selTransactions = (s: TransactionsState) => s.transactions;
export function useTransactions() {
  return useTransactionsState(selTransactions);
}

export function useGroupedTransactions() {
  const transactions = useTransactions();
  return groupBy(transactions, t => t['coin-id']);
};

export function useTransactionCoins() {
  const groupedTransactions = useGroupedTransactions();
  return Object.keys(groupedTransactions);
}
