import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./react-router/redux/Components/MainPage";
import Login from "./react-router/redux/Components/Login";
import { Provider } from "react-redux";
import store from "./react-router/redux/loginStore";
import Trial from "./react-router/Trial";
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
          <Route path="*" element={<div> 404 (not found)</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
