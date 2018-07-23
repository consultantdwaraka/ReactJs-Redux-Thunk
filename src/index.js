import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const createStore1 = configureStore();
const router = (<Provider store={createStore1}>
                    <BrowserRouter> 
                        <App /> 
                    </BrowserRouter> 
                </Provider>);

ReactDOM.render( router, document.getElementById('root'));
registerServiceWorker();
