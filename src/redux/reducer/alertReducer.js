import { SET_ALERT, CLEAR_ALERT } from "../actions/alert";

const initialState = {
    open: false,
    severity: "info",
    message: "",
};

export const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                open: true,
                severity: action.payload.severity,
                message: action.payload.message,
            };
        case CLEAR_ALERT:
            return {
                ...state,
                open: false,
                message: "",
            };
        default:
            return state;
    }
};
