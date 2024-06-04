import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./react-router/MainPage";
import Login from "./react-router/Login";
import { Provider } from "react-redux";
import store from "./react-router/redux/loginStore";


const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {localStorage.getItem("token") ? (
            <Route path="/" element={<MainPage />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
            <Route path="/login" element={<Login />} />
          <Route path="*" element={<div> 404 (not found)</div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
