import { useMemo } from "react";
import { CURRENCY_SYMBOLS } from "../../constants";

export const Balance = ({ balance, vsCurrency = 'usd' }: { balance: number, vsCurrency?: string }) => {
  const presentedBalance = useMemo(() => {
    return balance.toFixed(2);
  }, [balance]);

  const symbol = useMemo(() => {
    return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
  }, [vsCurrency]);
  
  return (<>
    <span>{symbol} {presentedBalance}</span>
  </>);
};
