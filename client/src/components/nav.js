import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signout} from '../actions';

const Nav = props => {
    // console.log(props);

    function updateNav(){
        if(props.user){

            return [
                <li key="0">
                    <Link to="/chat-lobby">Chat Lobby</Link>
                </li>,
                <li key="1">
                    <Link to="/" onClick={props.signout}>Sign Out</Link>
                </li>,
                <li key="2">{greeting}</li>
            ]

        }

        return [
            <li key="0">
                <Link to="/signin">Sign In</Link>
            </li>,
            <li key="1">
                <Link to="/signup">Signup</Link>
            </li>
        ]
    }

    let greeting = '';

    if (props.user) {
        //style object
        const userStyle = {
            color: props.user.color
        };
        greeting = <span style={{paddingLeft: '10px'}}>Hello, <span style={userStyle}>{props.user.username}</span></span>;
    }

    return(
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">Chatty App</Link>
                <ul className="right">
                    {updateNav()}

                </ul>
            </div>
        </nav>
    )
};

function mapStateToProps(state){
    return {
        user: state.user.auth
    }
}

export default connect(mapStateToProps, {signout})(Nav);
