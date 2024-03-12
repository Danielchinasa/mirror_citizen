import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import InactivityDetector from "./InactivityDetector";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <InactivityDetector />
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
