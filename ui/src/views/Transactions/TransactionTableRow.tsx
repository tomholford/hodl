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
  const { vsCurrency } = useSettings();
  const symbol = useMemo(() => {
    if (vsCurrency in CURRENCY_SYMBOLS) {
      return CURRENCY_SYMBOLS[vsCurrency as keyof typeof CURRENCY_SYMBOLS];
    } else {
      return vsCurrency.toUpperCase();
    }
  }, [vsCurrency]);

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

  const coinIdLabel = useMemo(() => {
    return 'todo';
    // return CURRENCIES[coinId as keyof typeof CURRENCIES].label;
  }, [coinId]);

  const apiCoinImage = useCoinImage(coinId);
  const transactionIcon = useMemo(() => {
    if(!apiCoinImage) { return coinId };
    
    return <img src={apiCoinImage.thumb} alt={symbol} />
  }, [apiCoinImage, coinId, symbol]);

  return (<>
    <tr className="transaction-table-row" onClick={handleShowDetailsClick}>
      <td>{transactionIcon}</td>
      <td className="">{coinIdLabel} <small>{coinId}</small></td>
      <td className="align-right">{exchangeRate ? `${symbol} ${exchangeRate}` : 'Loading...'}</td>
      <td className="align-right">{presentedBalance} <small>{coinId}</small></td>
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
                  {transactions.map(a => <TransactionRow transaction={a} key={a.id} />)}
                </table>
              )
            }
          </td>
        </tr>
      )
    }
  </>)
}
