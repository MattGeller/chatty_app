import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
//wrap the subcomponents (in this case, App) in Provider to allow communication between the store and the components
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//this rootReducer has a whole team of reducers which report to it (in this case, two: the chat_reducer and the users_reducer
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
