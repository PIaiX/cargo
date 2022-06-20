import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/fonts.css';
import './styles/style.min.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import { Footer } from './components/Footer';
import { Dropdown } from 'bootstrap';
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
      <Header />
      <AppRouter/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
