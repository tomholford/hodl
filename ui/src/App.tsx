import classNames from 'classnames';
import React, { useEffect } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
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
import { Settings } from './views/Settings/Settings';
import { useTransactionsState } from './state/transactions';
import { Transactions } from './views/Transactions/Transactions';
import ErrorAlert from './components/ErrorAlert';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useSettings();
  return (<>
    <div className={classNames('App', { darkMode: isDarkMode })}>
      {children}
    </div>
  </>)
}

const App = () => {
  const handleError = useErrorHandler();

  useEffect(() => {
    // @ts-ignore TODO: why does this err in hodl, but not homestead?
    // handleError(() => {
      useTransactionsState.getState().start();
    // })();
  }, [handleError]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorAlert}
      onReset={() => window.location.reload()}
    >
      {/* TODO: Remove provider stack */}
      <SettingsProvider>
        <QueryProvider>
          <WalletsProvider>
            <AccountsProvider>
              <AssetsProvider>
                <Router basename={import.meta.env.VITE_BASENAME as string}>
                  <AppContainer>
                    <div className="app-inner">
                      <Header />
                      <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/transactions/*" element={<Transactions />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<Navigate to={'/transactions'} />} />
                        {/* <Route path="/accounts/*" element={<Accounts />} />
                      <Route path="/wallets" element={<Wallets />} /> */}
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
    </ErrorBoundary>
  );
}

export default App;
