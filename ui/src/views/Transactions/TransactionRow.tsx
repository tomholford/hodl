import React from 'react';
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useExchangeRate } from "../../lib/useExchangeRate";
import { useTransactionsState } from '../../state/transactions';
import { Transaction } from "../../types/Transaction.type";
import { Balance } from "../Shared/Balance";
import './TransactionRow.scss';

export const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
  const navigate = useNavigate();

  const del = (id: any) => { console.log(`TODO: remove ${id}`) };

  const exchangeRate = useExchangeRate(transaction['coin-id']);

  const currentValue = useMemo(() => {
    if(!exchangeRate) { return 0 };

    return exchangeRate * transaction.amount;
  }, [transaction.amount, exchangeRate]);

  const initialValue = useMemo(() => {
    if(!(transaction.amount && transaction['cost-basis'])) { return null };

    return transaction.amount * transaction['cost-basis'];
  }, [transaction]);

  const pnl = useMemo(() => {
    if(!(initialValue && currentValue)) { return 0 };

    return currentValue - initialValue;
  }, [currentValue, initialValue]);

  const handleEditClick = useCallback(() => {
    navigate(`/transactions/edit/${transaction.id}`)
  }, [transaction.id, navigate]);

  const handleRemoveClick = useCallback(async () => {
    // TODO: disable button / gray out row
    await useTransactionsState.getState().del(transaction.id);
  }, [transaction.id, del]);

  return (
      <tr className="transaction-row">
        <td className="transaction-balance">
          {transaction.amount} {transaction['coin-id']}
        </td>
        <td className="transaction-value">{<Balance balance={currentValue} />}</td>
        <td className="transaction-pnl">{<Balance balance={pnl} />}</td>
        <td className="transaction-cost-basis">{transaction['cost-basis'] ? `$ ${transaction['cost-basis']} / unit` : null}</td>
        <td className="transaction-acquired-date">{transaction.date}</td>
        <td className="transaction-note">{transaction.note}</td>
        <td className="transaction-action">
          <button title="edit" onClick={handleEditClick}>✏️</button>
          <button title="remove" onClick={handleRemoveClick}>💣</button>
        </td>
      </tr>
  )
}
