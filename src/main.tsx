import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import App from "./App";
import Home from "./components/Home";
import React from "react";
import ReactDOM from "react-dom/client";
import Studio from "./components/Studio";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
