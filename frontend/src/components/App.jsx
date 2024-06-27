import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./react-router/routes/MainPage";
import Login from "./react-router/routes/Login";
import SignUp from "./react-router/routes/SignUp";
import { Provider as ReduxProvider } from "react-redux";
import store from "./react-router/redux/loginStore";
import Testi18n from "../components/react-router/redux/Components/Testi18n";
import { errorOnRequest } from "../toast/notify";
import leoProfanity from "leo-profanity";
import { Provider as RollbarProvider, ErrorBoundary } from "@rollbar/react"; // Provider imports 'rollbar'
import rollbarConfig from "./rollbarConfig/RollBarConfig";




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    leoProfanity.loadDictionary("en");
    leoProfanity.loadDictionary("ru");
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (!navigator.onLine) {
      errorOnRequest();
    }
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
