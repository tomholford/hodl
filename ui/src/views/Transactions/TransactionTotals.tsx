import React from 'react';
import { useMemo } from 'react';
import useSimpleCoinPrices from '../../queries/useSimpleCoinPrices';
import { useSettings } from '../../store/Settings';
import { pluralize } from '../../lib/presenters';
import { TotalCell } from './TotalCell';
import { useGroupedTransactions, useTransactionCoins } from '../../state/transactions';
import './TransactionTotals.scss';

export const TransactionTotals = () => {
  const groupedTransactions = useGroupedTransactions();
  const transactionCoins = useTransactionCoins();
  const { vsCurrency } = useSettings();
  const priceQueries = useSimpleCoinPrices(transactionCoins, vsCurrency);

  type PriceMap = Record<string, number>;
  const priceMap: PriceMap | null = useMemo(() => {
    if(!priceQueries && transactionCoins) return null;
    if(!priceQueries.every(q => q.isSuccess)) return null;

    return transactionCoins.reduce((memo, c) => {
      const priceQuery = priceQueries.find(p => Object.keys(p?.data || {}).includes(c));
      if(priceQuery && priceQuery.data) {
        memo[c] = priceQuery.data[c][vsCurrency];
      }

      return memo;
    }, {} as PriceMap);
  }, [transactionCoins, priceQueries, vsCurrency]);

  const totalCurrentValue = useMemo(() => {
    if(!(priceMap && transactionCoins && groupedTransactions)) { return 0 };
  
    return transactionCoins.reduce((total, c) => {
      const transactions = groupedTransactions[c];

      return transactions.reduce((transactionTotal, a) => transactionTotal + (a.amount * priceMap[c]), total)
    }, 0);
  }, [transactionCoins, groupedTransactions, priceMap]);

  const totalInitialValue = useMemo(() => {
    if(!(transactionCoins && groupedTransactions)) { return 0 };
  
    return transactionCoins.reduce((total, c) => {
      const transactions = groupedTransactions[c];

      return transactions.reduce((transactionTotal, t) => transactionTotal + (t.amount * (t['cost-basis'] || 1)), total)
    }, 0);
  }, [transactionCoins, groupedTransactions]);

  const totalPnl = useMemo(() => {
    if(!(totalCurrentValue && totalInitialValue)) { return 0 };

    return totalCurrentValue - totalInitialValue;
  }, [totalCurrentValue, totalInitialValue]);

  const totalTransactionCount = useMemo(() => {
    if(!(groupedTransactions && transactionCoins)) { return 0 };

    return transactionCoins.reduce((total, c) => {
      const transactions = groupedTransactions[c];
      return transactions.length + total;
    }, 0);  
  }, [transactionCoins, groupedTransactions])

  return (<>
    <div className="transaction-totals">
      <div className="total-value">
        <TotalCell balance={totalCurrentValue} label='balance' />
      </div>
      <div className="total-pnl">
        <TotalCell balance={totalPnl} label='P / L' />
      </div>
      <div className="total-transactions">{totalTransactionCount} {pluralize('transaction', totalTransactionCount)} across {transactionCoins.length} {pluralize('asset', transactionCoins.length)}</div>
    </div>
  </>);
}
