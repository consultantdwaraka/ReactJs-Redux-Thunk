import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
export default combineReducers({projectReducer, userReducer, form: formReducer});