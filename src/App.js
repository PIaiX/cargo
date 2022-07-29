import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/fonts.css";
import "./styles/style.css";
import AppRouter from "./routes/AppRouter";
import { Dropdown } from "bootstrap";
import { useInitialData } from "./hooks/loadInitialData";
import fingerprint from "@fingerprintjs/fingerprintjs";
import useInitialAuth from "./hooks/initialAuth";


function App() {
  //iniaitial Auth
  useInitialAuth()

  useEffect(() => {
    //init dropdown
    Array.from(document.querySelectorAll(".dropdown-toggle")).forEach(
      (dropdownNode) => new Dropdown(dropdownNode)
    );
  });

  //Set fingerprint
  useEffect(() => {
    fingerprint
      .load()
      .then((fp) => fp.get())
      .then((result) => {
        localStorage.setItem("fingerprint", result.visitorId);
      });
  }, []);

  //Fetch initial data
  useInitialData();

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
