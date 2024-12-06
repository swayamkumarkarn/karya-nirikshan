import { createTheme } from "@mui/material";

export const bgColor = {
  primary: "#000",
  white: "#ffffff",
  yellow: "#EAB308",
};

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: bgColor.primary,
    },
    white: {
      main: bgColor.white,
      contrastText: "#000",
    },
    yellow: {
      main: bgColor.yellow,
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "'Fira Sans'",
      "'Droid Sans'",
      "'Helvetica Neue'",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
  },
});
