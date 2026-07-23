import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import InactivityDetector from "./InactivityDetector";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { basename } from "./routing";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router basename={basename}>
        <GoogleOAuthProvider clientId="652852723588-1j7ps2j4n3ub2dt8a9pm6f1vhp6di4lr.apps.googleusercontent.com">
          {/* <InactivityDetector /> */}
          <App />
        </GoogleOAuthProvider>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
