import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import projectReducer from '../reducers/projectReducer';
export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
