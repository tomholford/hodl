import React, { createContext, useContext } from 'react';
import { useAccountsStore } from './useAccountsStore';

const initialContext = {
  accounts: null,
  addAccount: () => { console.log('add') },
  removeAccount: () => {},
  setAccounts: () => {},
}

export const AccountsContext = createContext<ReturnType<typeof useAccountsStore>>(initialContext);

export const AccountsProvider = ({ children }: { children: React.ReactNode }) => {

  const accountsStore = useAccountsStore();

  return (
    <AccountsContext.Provider value={accountsStore}>
      {children}
    </AccountsContext.Provider>
  );
}

export const useAccounts = () => {
  return useContext(AccountsContext);
}
