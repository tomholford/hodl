import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Account } from '../types/Account.type';
import api from '../services/API';

type AccountUpdate =
  | { add: Account }
  | { edit: Account }
  | { del: string };

function accountAction(diff: Record<string, unknown>) {
  return {
    app: 'hodl',
    mark: 'account-action',
    json: diff,
  };
}

export interface AccountsState {
  set: (fn: (sta: AccountsState) => void) => void;
  batchSet: (fn: (sta: AccountsState) => void) => void;
  initialized: boolean;
  accounts: Account[];
  add: (account: Account) => Promise<void>;
  edit: (account: Account) => Promise<void>;
  del: (id: string) => Promise<void>;
  init: () => Promise<void>;
  handleUpdate: (update: AccountUpdate) => void;
}

export const useAccountsState = create<AccountsState>((set, get) => ({
  set: (fn) => {
    set(produce(get(), fn));
  },
  batchSet: (fn) => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  initialized: false,
  accounts: [],
  add: async (account) => {
    await api.poke(
      accountAction({ add: account })
    );
  },
  edit: async (account) => {
    await api.poke(
      accountAction({ edit: account })
    );
  },
  del: async (id) => {
    await api.poke(
      accountAction({ del: { id } })
    );
  },
  init: async () => {
    const accounts = await api.scry<Record<string, Account>>({
      app: 'hodl',
      path: '/accounts',
    });

    set((s) => ({
      ...s,
      accounts: Object.values(accounts),
      initialized: true,
    }));
  },
  handleUpdate: (update: AccountUpdate) => {
    if ('add' in update) {
      get().batchSet((draft) => {
        draft.accounts = [...draft.accounts, update.add];
      });
    }
    if ('edit' in update) {
      get().batchSet((draft) => {
        draft.accounts = [
          ...draft.accounts.filter((a) => a.id !== update.edit.id),
          update.edit,
        ];
      });
    }
    if ('del' in update) {
      get().batchSet((draft) => {
        draft.accounts = draft.accounts.filter((a) => a.id !== update.del);
      });
    }
  },
}));

const selAccountsInitialized = (s: AccountsState) => s.initialized;
export function useAccountsInitialized() {
  return useAccountsState(selAccountsInitialized);
}

const selAccounts = (s: AccountsState) => s.accounts;
export function useAccounts() {
  return useAccountsState(selAccounts);
}
