import { useCallback } from "react";
import { useAccountsState } from "../../state/accounts";
import { Account } from "../../types/Account.type";
import './AccountRow.scss';

export const AccountRow = ({ account }: { account: Account }) => {
  const handleRemoveClick = useCallback(async () => {
    await useAccountsState.getState().del(account.id);
  }, [account.id]);

  return (
    <div className="account-row">
      <div className="name">{account.name}</div>
      <div className="note">{account.note}</div>
      <div className="account-action">
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  );
}
