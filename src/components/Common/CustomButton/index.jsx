import React from "react";
import { Button, IconButton, ThemeProvider } from "@mui/material";
import { muiTheme } from "../../Utils/theme";

export default function CustomButton({
  text,
  disabled,
  fullWidth,
  size,
  type,
  onClick,
  variant = "contained",
  color = "primary", // Default to "primary"
  loading = false,
  startIcon,
  className,
  sx,
  onlyIcon,
}) {
  if (onlyIcon) {
    return (
      <ThemeProvider theme={muiTheme}>
        <IconButton
          disableElevation
          disabled={disabled}
          fullWidth={fullWidth}
          size={size}
          onClick={onClick}
          type={type}
          variant={variant}
          color={color}
          className={className}
          sx={sx}
        >
          {startIcon}
        </IconButton>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <Button
        disableElevation
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        type={type}
        variant={variant}
        color={color} // Use "white" to get a white button
        startIcon={startIcon}
        className={className}
        sx={sx}
      >
        <div>{loading ? "Loading..." : text}</div>
      </Button>
    </ThemeProvider>
  );
}