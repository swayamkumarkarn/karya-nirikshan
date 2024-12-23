import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleClose = () => {
    dispatch({ type: "CLEAR_ALERT" });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={alert.severity}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;
