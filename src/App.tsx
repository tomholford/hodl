import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.scss';
import { AccountsProvider } from './store/Accounts';
import { WalletsProvider } from './store/Wallets';
import Accounts from './views/Accounts/Accounts';
import { Header } from './views/App/Header';
import { Home } from './views/Home/Home';
import Wallets from './views/Wallets/Wallets';

function App() {
  return (
    <WalletsProvider>
      <AccountsProvider>
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/wallets" element={<Wallets />} />
            </Routes>
          </Router>
        </div>
      </AccountsProvider>
    </WalletsProvider>
  );
}

export default App;
