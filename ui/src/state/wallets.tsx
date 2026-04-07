import { unstable_batchedUpdates as batchUpdates } from 'react-dom';
import produce from 'immer';
import create from 'zustand';
import { Wallet } from '../types/Wallet.type';
import api from '../services/API';

type WalletUpdate =
  | { add: Wallet }
  | { edit: Wallet }
  | { del: string };

function walletAction(diff: Record<string, unknown>) {
  return {
    app: 'hodl',
    mark: 'wallet-action',
    json: diff,
  };
}

export interface WalletsState {
  set: (fn: (sta: WalletsState) => void) => void;
  batchSet: (fn: (sta: WalletsState) => void) => void;
  initialized: boolean;
  wallets: Wallet[];
  add: (wallet: Wallet) => Promise<void>;
  edit: (wallet: Wallet) => Promise<void>;
  del: (id: string) => Promise<void>;
  init: () => Promise<void>;
  handleUpdate: (update: WalletUpdate) => void;
}

export const useWalletsState = create<WalletsState>((set, get) => ({
  set: (fn) => {
    set(produce(get(), fn));
  },
  batchSet: (fn) => {
    batchUpdates(() => {
      get().set(fn);
    });
  },
  initialized: false,
  wallets: [],
  add: async (wallet) => {
    await api.poke(
      walletAction({ add: wallet })
    );
  },
  edit: async (wallet) => {
    await api.poke(
      walletAction({ edit: wallet })
    );
  },
  del: async (id) => {
    await api.poke(
      walletAction({ del: { id } })
    );
  },
  init: async () => {
    const wallets = await api.scry<Record<string, Wallet>>({
      app: 'hodl',
      path: '/wallets',
    });

    set((s) => ({
      ...s,
      wallets: Object.values(wallets),
      initialized: true,
    }));
  },
  handleUpdate: (update: WalletUpdate) => {
    if ('add' in update) {
      get().batchSet((draft) => {
        draft.wallets = [...draft.wallets, update.add];
      });
    }
    if ('edit' in update) {
      get().batchSet((draft) => {
        draft.wallets = [
          ...draft.wallets.filter((w) => w.id !== update.edit.id),
          update.edit,
        ];
      });
    }
    if ('del' in update) {
      get().batchSet((draft) => {
        draft.wallets = draft.wallets.filter((w) => w.id !== update.del);
      });
    }
  },
}));

const selWalletsInitialized = (s: WalletsState) => s.initialized;
export function useWalletsInitialized() {
  return useWalletsState(selWalletsInitialized);
}

const selWallets = (s: WalletsState) => s.wallets;
export function useWallets() {
  return useWalletsState(selWallets);
}
