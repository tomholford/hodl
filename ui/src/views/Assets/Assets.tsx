import React from 'react';
import { Route, Routes } from "react-router-dom"
import { AssetsEdit } from "./AssetsEdit"
import { AssetsIndex } from "./AssetsIndex"
import { AssetsNew } from "./AssetsNew"

export const Assets = () => {
  return (<>
    <Routes>
      <Route path="/" element={<AssetsIndex />} />
      <Route path="/new" element={<AssetsNew />} />
      <Route path="/edit/:uuid" element={<AssetsEdit />} />
    </Routes>
  </>)
}
