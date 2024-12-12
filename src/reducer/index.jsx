import { combineReducers } from 'redux';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  auth: authReducer, // Use `auth` instead of `authReducer`
});

export default rootReducer;