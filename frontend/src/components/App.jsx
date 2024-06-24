import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./react-router/routes/MainPage";
import Login from "./react-router/routes/Login";
import SignUp from "./react-router/routes/SignUp";
import { Provider } from "react-redux";
import store from "./react-router/redux/loginStore";
import Testi18n from '../components/react-router/redux/Components/Testi18n'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/test" element={<Testi18n/>} />
          <Route path="*" element={<div> 404 (not found)</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
