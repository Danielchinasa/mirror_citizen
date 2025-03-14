import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import InactivityDetector from "./InactivityDetector";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <GoogleOAuthProvider clientId="312014294888-de4ut5p7dv36ll00gml3gma6cuaks759.apps.googleusercontent.com">
          {/* <InactivityDetector /> */}
          <App />
        </GoogleOAuthProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
