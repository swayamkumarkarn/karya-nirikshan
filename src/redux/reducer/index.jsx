// import { combineReducers } from 'redux';
// import { authReducer } from './auth';

// const rootReducer = combineReducers({
//   auth: authReducer, // Use `auth` instead of `authReducer`
// });

// export default rootReducer;

import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { alertReducer } from "./alertReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer, // Add global alert state
});

export default rootReducer;
