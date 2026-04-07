import api from '../services/API';
import { useWalletsState } from './wallets';
import { useAccountsState } from './accounts';
import { useTransactionsState } from './transactions';

export async function bootstrapStores() {
  await Promise.all([
    useWalletsState.getState().init(),
    useAccountsState.getState().init(),
    useTransactionsState.getState().init(),
  ]);

  await api.subscribe({
    app: 'hodl',
    path: '/updates',
    event: (data: any, mark: string) => {
      switch (mark) {
        case 'wallet-update':
          useWalletsState.getState().handleUpdate(data);
          break;
        case 'account-update':
          useAccountsState.getState().handleUpdate(data);
          break;
        case 'transaction-update':
          useTransactionsState.getState().handleUpdate(data);
          break;
        default:
          console.warn('Unknown subscription mark:', mark);
      }
    },
  });
}
