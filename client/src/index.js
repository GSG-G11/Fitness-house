import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./Store";
import Theme from "./Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Theme>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Theme>
);
