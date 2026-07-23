import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import InactivityDetector from "./InactivityDetector";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Swal from "sweetalert2";
import { basename } from "./routing";

// ── Global SweetAlert2 defaults ──
(function() {
  const origFire = Swal.fire.bind(Swal);
  Swal.fire = function(...args) {
    const opts = args[0];
    if (typeof opts === "object" && !opts.confirmButtonColor) {
      opts.confirmButtonColor = "#DD0201";
    }
    return origFire(opts, ...args.slice(1));
  };
})();

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
