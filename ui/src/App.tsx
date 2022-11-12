import classNames from 'classnames';
import cookies from 'browser-cookies';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.scss';
import { QueryProvider } from './queries/QueryProvider';
import { SettingsProvider, useSettings } from './store/Settings';
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
function authRedirect() {
  document.location = `${document.location.protocol}//${document.location.host}`;
}

function checkIfLoggedIn() {
  if (!('ship' in window)) {
    authRedirect();
  }

  const session = cookies.get(`urbauth-~${window.ship}`);
  if (!session) {
    authRedirect();
  }
}

const RoutedApp = () => {
  const handleError = useErrorHandler();

  useEffect(() => {
    checkIfLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subscribeTransactions = useCallback(async () => {
    await useTransactionsState.getState().start();
  }, []);

  useEffect(() => {
    handleError(() => {
      subscribeTransactions();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ErrorBoundary
      FallbackComponent={ErrorAlert}
      onReset={() => window.location.reload()}
    >
      <SettingsProvider>
        <QueryProvider>
          <Router basename={import.meta.env.VITE_BASENAME as string}>
            <AppContainer>
              <div className="app-inner">
                <Header />
                <Routes>
                  <Route path="/about" element={<About />} />
                  <Route path="/transactions/*" element={<Transactions />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to={'/transactions'} />} />
                </Routes>
                <Footer />
              </div>
            </AppContainer>
          </Router>
        </QueryProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

const SSLApp = () => {
  const handleClick = useCallback(() => {
    window.location.href = window.location.href.replace(
      /^http(?!s)/,
      'https'
    );
  }, []);

  return document.location.protocol === 'http:' ?
    <div className="app-inner">
      <div className="http-container">
        <h3>⚠️ Heads Up</h3>
        <p>hodl requires a secure connection (https)</p>
        <button onClick={handleClick}>upgrade connection</button>
        <p><small>(if this doesn't work, contact your hosting provider)</small></p>
      </div>
    </div>
    :
    <RoutedApp />
}

export default SSLApp;
