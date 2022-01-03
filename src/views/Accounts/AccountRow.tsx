import { BN } from "bn.js";
import { useCallback, useEffect } from "react";
import { abbreviatedAddress } from "../../lib/presenters";
import { getBalance } from "../../services/Avalanche.service";
import { useAccounts } from "../../store/Accounts";
import { Account } from "../../types/Account.type";

export const AccountRow = ({ account }: { account: Account }) => {

  useEffect(() => {
    console.log(account);
  }, [account]);

  const { removeAccount } = useAccounts();

  // const fetchBalance = useCallback(async () => {
  //   const response = await getBalance(account.address!);
  //   const foundBalance = response.balances.find(b => b.asset === 'AVAX');
  //   if(foundBalance) {
  //     account.balance = new BN(foundBalance.balance);
  //   } else {
  //     account.balance = new BN(0);
  //   }
  // }, [account]);

  // useEffect(() => {
  //   if(account.balance) { return };

  //   fetchBalance();
  // }, [account.balance, fetchBalance]);

  const handleRemoveClick = useCallback(() => {
    removeAccount(account.uuid!);
  }, [account.uuid, removeAccount]);

  return (<>
    <div className="account-row">
      <div className="address">{account.address ? abbreviatedAddress(account.address) : 'custodian'}</div>
      <div className="currency">{account.currency}</div>
      {/* <div className="balance">{account.balance ? balanceWithDecimal(account.balance) : 0}</div> */}
      <div className="balance">{account.balance ? account.balance : 0}</div>
      <div className="account-action">
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  </>);
}
