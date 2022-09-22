import { TransactionTableRow } from "./TransactionTableRow";
import { useGroupedTransactions, useTransactionCoins } from "../../state/transactions";
import './TransactionsTable.scss';

export const TransactionsTable = () => {
  // const { groupedTransactions, transactionCurrencies } = useTransactions();

  const groupedTransactions = useGroupedTransactions();
  const transactionCoins = useTransactionCoins();

  return (<>
    <div className="transaction-summary-table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th colSpan={2}>transaction</th>
            <th>price</th>
            <th>balance</th>
            <th>value</th>
            <th>P / L</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactionCoins.map(c => <TransactionTableRow coinId={c} transactions={groupedTransactions[c]} key={c} />)}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  </>);
};
