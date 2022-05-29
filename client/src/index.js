import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Loading } from "./Components";

import store from "./Store";
import Theme from "./Theme";

const AppPage = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Theme>
    <Router>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <AppPage />
        </Suspense>
      </Provider>
    </Router>
  </Theme>
);
