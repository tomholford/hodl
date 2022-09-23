import React from 'react';
import { Route, Routes } from "react-router-dom"
import { TransactionsIndex } from "./TransactionsIndex"


export const Transactions = () => {
  return (<>
    <Routes>
      <Route path="/" element={<TransactionsIndex />} />
      {/* <Route path="/new" element={<AssetsNew />} />
      <Route path="/edit/:uuid" element={<AssetsEdit />} /> */}
    </Routes>
  </>)
}
