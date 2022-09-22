import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Transaction } from '../types/Transaction.type';
import api from '../services/API';
import { groupBy } from 'lodash';

export interface TransactionsState {
  set: (fn: (sta: TransactionsState) => void) => void;
  batchSet: (fn: (sta: TransactionsState) => void) => void;
  transactions: Transaction[];
  add: (transaction: Transaction) => Promise<void>;
  edit: (id: number, transaction: Partial<Transaction>) => Promise<void>;
  del: (id: number) => Promise<void>;
  start: () => void;
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
  transactions: [],
  add: async (transaction) => {
    console.log(`TODO: add ${transaction.id}`);
  },
  edit: async (id, transaction) => {
    console.log(`TODO: edit ${id}`);
  },
  del: async (id) => {
    console.log(`TODO: del ${id}`);
  },
  start: async () => {
    console.log('start');
    const transactions = await api.scry<Transaction[]>({
      app: 'hodl',
      path: '/transactions/all',
    });

    set((s) => ({
      ...s,
      transactions,
    }));

    await api.subscribe({
      app: 'hodl',
      path: '/transactions/all',
      event: (data) => {
        console.log('update');
        console.log(data);
        get().batchSet((draft) => {

          draft.transactions = data;
        });
      },
    });
    // TODO: 
    // get().retrieve();
    // api.subscribe({
    //   app: 'hodl',
    //   path: '/ui', // TODO: updates path?
    //   event: (event: HarkAction) => {
    //     console.log(event, get().carpet);
    //     const { groupSubs, retrieve, retrieveGroup } = get();
    //     retrieve();

    //     groupSubs.forEach((g) => {
    //       retrieveGroup(g);
    //     });
    //   },
    // });
  },
}));


const selTransactions = (s: TransactionsState) => s.transactions;
export function useTransactions(): Transaction[] {
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
