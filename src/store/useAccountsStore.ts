import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Account } from "../types/Account.type";

export const useAccountsStore = () => {
  const [localAccounts, setLocalAccounts] = useLocalStorage('hodl:accounts', [] as Account[]);
  const [accounts, setAccounts] = useState<Account[] | null>(null);

  const addAccount = (account: Account) => {
    accounts ? setAccounts([...accounts, account]) : setAccounts([account]);
  }

  // Restore from localStorage if available
  useEffect(() => {
    if(localAccounts && localAccounts.length > 0) {
      setAccounts(localAccounts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep it up to date
  useEffect(() => {
    if(accounts) {
      setLocalAccounts(accounts);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return {
    accounts,
    addAccount,
    setAccounts
  };
}
