import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import CargoSearch from './CargoSearch';
import CarSearch from './CarSearch';

export default function Search() {
   
    return (
        <main>
            <section id="sec-7" className="py-5 container">
                <nav>
                    <NavLink to="cargo">Найти груз</NavLink>
                    <NavLink to="car">Найти машину</NavLink>
                </nav>
                <Routes>
                    <Route path="/" element={<CargoSearch />} />
                    <Route path="cargo" element={<CargoSearch />} />
                    <Route path="car" element={<CarSearch />} />
                </Routes>
            </section>
        </main>
    )
}
