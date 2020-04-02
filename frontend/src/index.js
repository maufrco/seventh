import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Home from './app/scenes/Home';
import * as serviceWorker from './utils/service-worker';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./app/reducers";

const store = createStore(rootReducer,{}, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
      </Router>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
