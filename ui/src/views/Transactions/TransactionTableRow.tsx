import React, { useCallback, useMemo, useState } from "react";
import { CURRENCIES, CURRENCY_SYMBOLS } from "../../constants";
import { useCoinImage } from "../../lib/useCoinImage";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useSettings } from "../../store/Settings";
import { Transaction } from "../../types/Transaction.type";
import { Balance } from "../Shared/Balance";
import { TransactionHeaderRow } from "./TransactionHeaderRow";
import { TransactionRow } from "./TransactionRow";
import { ReactComponent as ChevronDown } from '../../images/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../images/chevron-up.svg';
import './TransactionTableRow.scss';
import { useCoinName } from "../../lib/useCoinName";
import { useCoinData } from "../../lib/useCoinData";

export const TransactionTableRow = ({ transactions, coinId }: { transactions: Transaction[], coinId: string }) => {
  const balance = transactions.reduce((memo, t) => memo + Number(t.amount), 0);
  const presentedBalance = useMemo(() => {
    if(balance === 0) { return 0.0 };

    return balance.toFixed(5).replace(/[0]+$/g,"");
  }, [balance]);

  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetailsClick = useCallback((event: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>) => {
    event.stopPropagation();
    setShowDetails(state => !state);
  }, []);

  const exchangeRate = useExchangeRate(coinId);

  const currentValue = useMemo(() => {
    if (!exchangeRate) { return 0 };

    return exchangeRate * balance;
  }, [balance, exchangeRate]);

  const initialValue = useMemo(() => {
    if (!transactions) { return 0 };

    return transactions.reduce((memo, a) => memo + Number(a["cost-basis"]) * a.amount, 0)
  }, [transactions]);

  const pnl = useMemo(() => {
    return currentValue - initialValue;
  }, [currentValue, initialValue]);

  const { image, name, symbol } = useCoinData(coinId);

  const transactionIcon = useMemo(() => {
    if(!image) { return coinId };
    
    return <img src={image.thumb} alt={symbol} />
  }, [image, coinId, symbol]);

  const { vsCurrency } =  useSettings();
  const currencySymbol = useMemo(() => {
    if(vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

  return (<>
    <tr className="transaction-table-row" onClick={handleShowDetailsClick}>
      <td>{transactionIcon}</td>
      <td className="">{name}</td>
      <td className="align-right">{exchangeRate ? `${currencySymbol}${exchangeRate}` : 'Loading...'}</td>
      <td className="align-right">{presentedBalance} <small>{symbol}</small></td>
      <td className="align-right">{<Balance balance={currentValue} />}</td>
      <td className="align-right">{<Balance balance={pnl} />}</td>
      <td className="align-right">
        <span className="details-button" onClick={handleShowDetailsClick}>{showDetails ? <ChevronUp/> : <ChevronDown/>}</span>
      </td>
    </tr>
    {
      showDetails && (
        <tr className="transaction-table-details">
          <td colSpan={8}>
            {transactions && transactions.length > 0 &&
              (
                <table className="transaction-transactions">
                  <TransactionHeaderRow />
                  <tbody>
                    {transactions.map(a => <TransactionRow transaction={a} key={a.id} />)}
                  </tbody>
                </table>
              )
            }
          </td>
        </tr>
      )
    }
  </>)
}
