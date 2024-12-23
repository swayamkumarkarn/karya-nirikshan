export const SET_ALERT = "SET_ALERT";
export const CLEAR_ALERT = 'CLEAR_ALERT';
// Action to set an alert
export const setAlert = (severity, message) => ({
    type: "SET_ALERT",
    payload: { severity, message },
});

// Action to clear an alert
export const clearAlert = () => ({
    type: "CLEAR_ALERT",
});
