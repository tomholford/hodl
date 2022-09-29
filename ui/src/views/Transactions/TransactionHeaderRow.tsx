import React from 'react';
import './TransactionHeaderRow.scss';

export const TransactionHeaderRow = () => {
  return (
    <thead>
      <tr>
        <th className="transaction-balance cell-label">
          balance
        </th>
        <th className="transaction-value cell-label">current value</th>
        <th className="transaction-pnl cell-label">P / L</th>
        <th className="transaction-cost-basis cell-label">cost basis</th>
        <th className="transaction-acquired-date cell-label">date acquired</th>
        <th className="transaction-note cell-label">note</th>
        <th className="transaction-action cell-label">actions</th>
      </tr>
    </thead>
  )
}
