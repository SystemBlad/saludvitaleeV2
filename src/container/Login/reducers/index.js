
import { combineReducers } from 'redux';
import user from './user';
import ChatReducer from './ChatReducer'; 
const rootReducer = combineReducers({
  user,
  chat: ChatReducer
});
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
// para chat 
export const MESSAGE_RECIVED = 'MESSAGE_RECIVED';
export const FETCHING = 'FETCHING';
export default rootReducer;