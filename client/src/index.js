import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Theme from './Theme';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Theme>
    <App />
    </Theme>
  </Router>
);
