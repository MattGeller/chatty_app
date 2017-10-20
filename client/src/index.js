import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import App from './components/app';

//thunk is the middleware that we're applying
const store = createStore(rootReducer, applyMiddleware(thunk));

//above line is alternative to:
// const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
