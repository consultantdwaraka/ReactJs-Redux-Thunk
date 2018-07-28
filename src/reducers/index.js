import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
export default combineReducers({projectReducer, userReducer,taskReducer, form: formReducer});