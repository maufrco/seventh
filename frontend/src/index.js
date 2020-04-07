import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './app/scenes/Home';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {reduce} from "./app/reducers";

const store = createStore(reduce,{}, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
      </Router>
    </Provider>,
    document.getElementById('root')
);