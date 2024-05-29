import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './react-router/MainPage'
import Login from './react-router/Login'

const App = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path='*' element={<div> 404 (not found)</div> } />
        <Route path='login' element={<Login/>} />
        </Routes>
        </BrowserRouter>
    )
};

export default App;
