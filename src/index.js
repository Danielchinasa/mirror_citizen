import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";
import InactivityDetector from "./InactivityDetector";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { lightTheme, darkTheme } from "./theme";

const ThemedApp = () => {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <App />
    </StyledThemeProvider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        {/* <InactivityDetector /> */}
        {/* <App /> */}
        <ThemeProvider>
          <ThemedApp />
        </ThemeProvider>,
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
