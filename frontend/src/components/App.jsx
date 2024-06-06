import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./react-router/MainPage";
import Login from "./react-router/Login";
import { Provider } from "react-redux";
import store from "./react-router/redux/loginStore";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем наличие токена при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div> 404 (not found)</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
