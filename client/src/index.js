import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import store from "./Store";
import Theme from "./Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Theme>
    <CookiesProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </CookiesProvider>
  </Theme>
);
