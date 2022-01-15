import CurrencyFormat from 'react-currency-format';
import { useMemo } from "react";
import { CURRENCY_SYMBOLS } from "../../constants";
import { useSettings } from "../../store/Settings";

export const Balance = ({ balance }: { balance: number }) => {
  const { isPrivacyMode, vsCurrency } = useSettings();

  const symbol = useMemo(() => {
    if(vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

  const presentedBalance = useMemo(() => {
    if(isPrivacyMode) { return 'hidden' };

    return (
      <CurrencyFormat displayType={'text'} thousandSeparator={true} prefix={symbol} value={balance.toFixed(2)} />
    )
  }, [balance, isPrivacyMode, symbol]);

  return (<>
    <span>{presentedBalance}</span>
  </>);
};
