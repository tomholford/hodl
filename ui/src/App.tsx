import classNames from 'classnames';
import cookies from 'browser-cookies';
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

const App = () => {
  const handleError = useErrorHandler();

  useEffect(() => {
    handleError(() => {
      checkIfLoggedIn();
    });
  }, [handleError]);  

  useEffect(() => {
    handleError(() => {
      useTransactionsState.getState().start();
    });
  }, [handleError]);

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

export default App;
