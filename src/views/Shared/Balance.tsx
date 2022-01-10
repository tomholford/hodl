import { useMemo } from "react";
import { CURRENCY_SYMBOLS } from "../../constants";
import { useSettings } from "../../store/Settings";

export const Balance = ({ balance }: { balance: number }) => {
  const { isPrivacyMode, vsCurrency } = useSettings();
  const presentedBalance = useMemo(() => {
    if(isPrivacyMode) { return 'hidden' };

    return balance.toFixed(2);
  }, [balance, isPrivacyMode]);

  const symbol = useMemo(() => {
    if(vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

  return (<>
    <span>{symbol} {presentedBalance}</span>
  </>);
};
