import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackbarNotification({
  showSnackbar,
  setShowSnackbar,
  snackbarMessage,
}) {
  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={3000}
      onClose={() => setShowSnackbar(false)}
    >
      <Alert
        onClose={() => setShowSnackbar(false)}
        severity="success"
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarNotification;
