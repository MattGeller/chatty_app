import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = props => {
    // console.log(props);

    let greeting = '';

    if(props.user){
        //style object
        const userStyle = {
            color: props.user.color
        };
        greeting = <span>Hello, <span style={userStyle}>{props.user.username}</span></span>;
    }

    return(
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Chatty App</Link>
                <ul className="right">
                    <li>{greeting}</li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
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

export default connect(mapStateToProps)(Nav);
