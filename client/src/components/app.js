//put vendor css above our own css
import 'materialize-css/dist/css/materialize.min.css';
import './app.css';

import React, {Component} from 'react';
//if you have a component that has defined Routes in it, and you're using react-router-dom, and you put it in connect(), it will break the routes. Use withRouter to fix that problem
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {jwtSignin} from "../actions";
import Home from './home';
import Signup from './signup';
import Signin from './signin';
import Nav from './nav';
import ChatLobby from './chat_lobby';
import ChatRoom from './chat_room';

class App extends Component{

    componentWillMount(){
        //when the app mounts, check if there's a localy stored token with which we can log the user in
        if(localStorage.token) {
            this.props.jwtSignin();
        }
    }

    render() {
        return (
            <div className="container">
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/chat-lobby" component={ChatLobby}/>
                {/*:id is how we define what's in the url as id*/}
                <Route path="/chat/:id" component={ChatRoom}/>
            </div>
        );
    }
}

//if you have a component that has defined Routes in it, and you're using react-router-dom, and you put it in connect(), it will break the routes. Use withRouter to fix that problem
export default withRouter(connect(null, {jwtSignin})(App));