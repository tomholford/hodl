import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.scss';
import { QueryProvider } from './queries/QueryProvider';
import { AccountsProvider } from './store/Accounts';
import { AssetsProvider } from './store/Assets';
import { SettingsProvider } from './store/Settings';
import { WalletsProvider } from './store/Wallets';
import Accounts from './views/Accounts/Accounts';
import { Footer } from './views/App/Footer';
import { Header } from './views/App/Header';
import { Assets } from './views/Assets/Assets';
import { Home } from './views/Home/Home';
import { Settings } from './views/Settings/Settings';
import Wallets from './views/Wallets/Wallets';

function App() {
  return (
    <SettingsProvider>
      <QueryProvider>
        <WalletsProvider>
          <AccountsProvider>
            <AssetsProvider>
              <Router>
                <div className="App">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/assets/*" element={<Assets />} />
                    <Route path="/accounts/*" element={<Accounts />} />
                    <Route path="/wallets" element={<Wallets />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                  <Footer />
                </div>
              </Router>
            </AssetsProvider>
          </AccountsProvider>
        </WalletsProvider>
      </QueryProvider>
    </SettingsProvider>
  );
}

export default App;
