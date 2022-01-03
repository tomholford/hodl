import { BN } from "bn.js";
import { useCallback, useEffect } from "react";
import { abbreviatedAddress, balanceWithDecimal } from "../../lib/presenters";
import { getBalance } from "../../services/Avalanche.service";
import { Account } from "../../types/Account.type";

export const AccountRow = ({ account }: { account: Account }) => {

  useEffect(() => {
    console.log(account);
  }, [account]);

  const fetchBalance = useCallback(async () => {
    const response = await getBalance(account.address!);
    const foundBalance = response.balances.find(b => b.asset === 'AVAX');
    if(foundBalance) {
      account.balance = new BN(foundBalance.balance);
    } else {
      account.balance = new BN(0);
    }
  }, [account]);

  // useEffect(() => {
  //   if(account.balance) { return };

  //   fetchBalance();
  // }, [account.balance, fetchBalance]);

  return (<>
    <div className="account-row">
      <div className="address">{account.address ? abbreviatedAddress(account.address) : 'custodian'}</div>
      <div className="currency">{account.currency}</div>
      <div className="balance">{account.balance ? balanceWithDecimal(account.balance) : 0}</div>
    </div>
  </>);
}
