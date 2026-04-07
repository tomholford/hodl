import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Transaction } from '../types/Transaction.type';
import api from '../services/API';
import { groupBy } from 'lodash';

export type TransactionUpdate =
  | { add: Transaction }
  | { edit: Transaction }
  | { del: string };

function txAction(diff: Record<string, unknown>) {
  return {
    app: 'hodl',
    mark: 'transaction-action',
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
  init: () => Promise<void>;
  handleUpdate: (update: TransactionUpdate) => void;
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
      txAction({ add: transaction })
    );
  },
  edit: async (transaction) => {
    await api.poke(
      txAction({ edit: transaction })
    );
  },
  del: async (id) => {
    await api.poke(
      txAction({ del: { id } })
    );
  },
  init: async () => {
    const transactions = await api.scry<Record<string, Transaction>>({
      app: 'hodl',
      path: '/transactions',
    });

    set((s) => ({
      ...s,
      transactions: Object.values(transactions),
      initialized: true,
    }));
  },
  handleUpdate: (update: TransactionUpdate) => {
    if ('add' in update) {
      get().batchSet((draft) => {
        draft.transactions = [...draft.transactions, update.add];
      });
    }
    if ('edit' in update) {
      get().batchSet((draft) => {
        draft.transactions = [
          ...draft.transactions.filter((t) => t.id !== update.edit.id),
          update.edit,
        ];
      });
    }
    if ('del' in update) {
      get().batchSet((draft) => {
        draft.transactions = draft.transactions.filter((t) => t.id !== update.del);
      });
    }
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
