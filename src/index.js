import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { muiTheme } from "./components/Utils/theme";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      {/* <ThemeProvider theme={muiTheme}> */}
        {/* <CssBaseline />  */}
        <App />
      {/* </ThemeProvider> */}
    </Router>
  </React.StrictMode>
);
