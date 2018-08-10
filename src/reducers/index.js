import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import modalReducer from './modalReducer';

export default combineReducers({projectReducer, userReducer,taskReducer, modalReducer, form: formReducer});