import classNames from 'classnames';
import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.scss';
import { QueryProvider } from './queries/QueryProvider';
import { AccountsProvider } from './store/Accounts';
import { AssetsProvider } from './store/Assets';
import { SettingsProvider, useSettings } from './store/Settings';
import { WalletsProvider } from './store/Wallets';
import Accounts from './views/Accounts/Accounts';
import { Footer } from './views/App/Footer';
import { Header } from './views/App/Header';
import { Assets } from './views/Assets/Assets';
import { Home } from './views/Home/Home';
import { Settings } from './views/Settings/Settings';
import Wallets from './views/Wallets/Wallets';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useSettings();
  return (<>
    <div className={classNames('App', { darkMode: isDarkMode })}>
      {children}
    </div>
  </>)
}

const App = () => {
  return (
    <SettingsProvider>
      <QueryProvider>
        <WalletsProvider>
          <AccountsProvider>
            <AssetsProvider>
              <Router>
                <AppContainer>
                  <Header />
                  <div className="app-inner">
                    <Routes>
                      <Route path="/assets/*" element={<Assets />} />
                      {/* <Route path="/accounts/*" element={<Accounts />} />
                    <Route path="/wallets" element={<Wallets />} /> */}
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to={'/assets'} />} />
                    </Routes>
                  </div>
                  <Footer />
                </AppContainer>
              </Router>
            </AssetsProvider>
          </AccountsProvider>
        </WalletsProvider>
      </QueryProvider>
    </SettingsProvider>
  );
}

export default App;
