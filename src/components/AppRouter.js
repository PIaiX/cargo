import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
        </Routes>
    )
}
