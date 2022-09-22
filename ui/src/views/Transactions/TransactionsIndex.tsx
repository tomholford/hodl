import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTransactions } from '../../state/transactions';
import { TransactionsTable } from './TransactionsTable';
import './TransactionsIndex.scss';
import { TransactionTotals } from './TransactionTotals';

export const TransactionsIndex = () => {
  const transactions = useTransactions();

  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate('/transactions/new');
  }, [navigate]);

  return (
    <>
      <h2>Transactions</h2>
      {
        transactions.length > 0 ?
        (
        <>
          <div className="transactions-actions">
            <button title="add another transaction" onClick={handleAddClick}>💲</button>
          </div>
          <TransactionTotals />
          <TransactionsTable />
        </>
        ) :
        (
          <div>
            <p>No transactions available, <Link to={'/transactions/new'}>add one here</Link></p>
          </div>
        )
      }
    </>
  );
}
