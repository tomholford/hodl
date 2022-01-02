import { useState } from "react";
import Account from "../types/Account.type";

export const useAccountsStore = () => {
  const [accounts, setAccounts] = useState<Account[] | null>(null);

  const addAccount = (account: Account) => {
    accounts ? setAccounts([...accounts, account]) : setAccounts([account]);
  }

  return {
    accounts,
    addAccount,
    setAccounts
  };
}
