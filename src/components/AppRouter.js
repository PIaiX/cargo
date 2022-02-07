import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Search from './Search';

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/search/*" element={<Search />} />
        </Routes>
    )
}
