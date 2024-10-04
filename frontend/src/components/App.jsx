import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import store from '@store/store';
import { errorOnRequest } from '@utils/toast/notify';
import rollbarConfig from '@utils/rollbarConfig/RollBarConfig';
import { ToastContainer } from 'react-toastify';
import '@styles/general.scss';
import routes from '@data/routes';
// import MainPage from './pages/ChatPage';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import Testi18n from './Testi18n';
import Layout from './Layout';
import ChatPage from './pages/ChatPage';
import Home from './homePage/Home';

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
          <BrowserRouter>
            <Routes>
              <Route element={<Home />} path="/home" />
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
                  }
                />
                {routes.map((item) => (
                  <Route
                    key={item.id}
                    path={`/${item.path}`}
                    element={item.component}
                  />
                ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </ReduxProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
