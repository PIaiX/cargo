import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/fonts.css';
import './styles/style.css';
import AppRouter from './routes/AppRouter';
import {Dropdown} from 'bootstrap';
import {useInitialData} from "./hooks/loadInitialData"

function App() {
    useEffect(() => {
        //init dropdown
        Array.from(document.querySelectorAll('.dropdown-toggle'))
            .forEach(dropdownNode => new Dropdown(dropdownNode))
    });

    //Fetch initial data
    useInitialData()

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
