import React, { useEffect } from 'react';
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/fonts.css';
import './styles/style.min.css';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import { Footer } from './components/Footer';
import { Dropdown } from 'bootstrap';

function App() {
  useEffect(() => {
    //init dropdown
    Array.from(document.querySelectorAll('.dropdown-toggle'))
    .forEach(dropdownNode => new Dropdown(dropdownNode))
  });

  return (
    <HashRouter>
      <Header />
      <AppRouter/>
      <Footer />
    </HashRouter>
  );
}

export default App;
