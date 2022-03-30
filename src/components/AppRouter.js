import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddCargo from '../pages/AddCargo';
import AddCar from '../pages/AddCar';
import CargoPage from '../pages/CargoPage';
import CarPage from '../pages/CarPage';
import Home from '../pages/Home';
import Search from '../pages/Search';
import AllNews from '../pages/AllNews';
import ArticleFull from '../pages/ArticleFull';

export default function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cargo-page" element={<CargoPage />} />
            <Route path="/car-page" element={<CarPage />} />
            <Route path="/add-cargo" element={<AddCargo />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/all-news" element={<AllNews />} />
            <Route path="/news" element={<ArticleFull />} />
        </Routes>
    )
}
