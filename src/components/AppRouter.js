import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddCargo from '../pages/AddCargo';
import CargoPage from '../pages/CargoPage';
import CarPage from '../pages/CarPage';
import Home from '../pages/Home';
import Search from '../pages/Search';

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cargo-page" element={<CargoPage />} />
            <Route path="/car-page" element={<CarPage />} />
            <Route path="/add-cargo" element={<AddCargo />} />
        </Routes>
    )
}
