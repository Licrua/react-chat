import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import store from '@slices/loginStore';
import { errorOnRequest } from '@utils/toast/notify';
import rollbarConfig from '@utils/rollbarConfig/RollBarConfig';
import { ToastContainer } from 'react-toastify';
import '@styles/general.scss';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Testi18n from './Testi18n';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    leoProfanity.loadDictionary('en');
    leoProfanity.loadDictionary('ru');
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    if (!navigator.onLine) {
      errorOnRequest();
    }
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ToastContainer />
        <ReduxProvider store={store}>
          {!navigator.onLine ? (
            errorOnRequest()
          ) : (
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <MainPage /> : <Navigate to="/login" />
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/test" element={<Testi18n />} />
                <Route path="*" element={<div> 404 (not found)</div>} />
              </Routes>
            </BrowserRouter>
          )}
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
