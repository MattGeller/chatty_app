//put vendor css above our own css
import 'materialize-css/dist/css/materialize.min.css';
import './app.css';

import React from 'react';
import {Route} from 'react-router-dom';
import Home from './home';
import Signup from './signup';
import Signin from './signin';
import Nav from './nav';


const App = () => (
    <div className="container">
        <Nav/>
        <Route exact path="/" component={Home}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
    </div>
);

export default App;
