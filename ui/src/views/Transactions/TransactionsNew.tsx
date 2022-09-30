import React from 'react';
import { isDevelopment } from "../../flags"
// import { AddFakeTransactionButton } from "./AddFakeTransactionButton"
import TransactionsForm from "./TransactionsForm"

export const TransactionsNew = () => {
  return (<>
    <h2><span className="subdued">Transactions</span> / Add a Transaction</h2>
    {
      isDevelopment &&
        <>
          <p>[development] add a fake asset</p>
          {/* <AddFakeTransactionButton /> */}
          <button>TODO</button>
        </>
    }

    <TransactionsForm />
  </>)
}
