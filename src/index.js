import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { muiTheme } from "./components/Utils/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";
import GlobalAlert from "./components/Common/GlobalAlert/alert";
// import store from "./store";

// Calculate true height and set as CSS variable
function updateTrueHeight() {
  const scaleFactor = 0.9; // Your scaling factor
  const trueViewportHeight = window.innerHeight / scaleFactor;
  document.documentElement.style.setProperty(
    "--true-vh",
    `${trueViewportHeight}px`
  );
}

// Attach listeners
window.addEventListener("resize", updateTrueHeight);
window.addEventListener("load", updateTrueHeight);

// Call once during initial load
updateTrueHeight();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router>
      {/* <ThemeProvider theme={muiTheme}> */}
      {/* <CssBaseline />  */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <GlobalAlert/>
          <App />
        </PersistGate>
      </Provider>
      {/* </ThemeProvider> */}
    </Router>
  // </React.StrictMode>
);
