
import { USER_DATA, LOGOUT } from "../actions/auth";

const initialState = {
    user: null, 
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null 
            };
        default:
            return state;
    }
};
