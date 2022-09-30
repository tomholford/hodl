import React from 'react';
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useTransactions } from "../../state/transactions";
import TransactionsForm from "./TransactionsForm";

export const TransactionsEdit = () => {
  const navigate = useNavigate();
  const transactions = useTransactions();
  const { id } = useParams<{id: string}>();
  const editingTransaction = useMemo(() => {
    if(!transactions) { return };

    return transactions.find(t => t.id === id); // TODO: use string / uuid
  }, [transactions, id]);

  useEffect(() => {
    if(!editingTransaction) {
      navigate('/transactions');
    }
  }, [editingTransaction, navigate]);

  return (<>
    <h2><span className="subdued">Transactions</span> / Edit</h2>
    <TransactionsForm transaction={editingTransaction} />
  </>)
}
