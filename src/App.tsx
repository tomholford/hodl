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
import { About } from './views/About/About';
import { Footer } from './views/App/Footer';
import { Header } from './views/App/Header';
import { Assets } from './views/Assets/Assets';
import { MigrateCoinID } from './views/MigrateCoinID';
import { Settings } from './views/Settings/Settings';

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
              <Router basename={process.env.REACT_APP_BASENAME}>
                <AppContainer>
                  <MigrateCoinID/>
                  <div className="app-inner">
                    <Header />
                    <Routes>
                      <Route path="/about" element={<About />} />
                      <Route path="/assets/*" element={<Assets />} />
                      {/* <Route path="/accounts/*" element={<Accounts />} />
                    <Route path="/wallets" element={<Wallets />} /> */}
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to={'/assets'} />} />
                    </Routes>
                    <Footer />
                  </div>
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
