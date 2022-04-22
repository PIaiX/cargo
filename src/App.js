import React from 'react';
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
  // dropdown activation
  let dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  let dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl)
  })

  return (
    <HashRouter>
      <Header />
      <AppRouter/>
      <Footer />
    </HashRouter>
  );
}

export default App;
