//class component, so it can have life cycle methods
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {renderInput} from '../helpers';
import {signin} from '../actions'

class Signin extends Component {

    handleSignin(vals){
        console.log('Sign In Vals:', vals.email, 'password hidden');

        this.props.signin(vals);
    }

    render(){

        const {handleSubmit} = this.props;

        return(
            <form onSubmit={handleSubmit((vals) => this.handleSignin(vals))}>
                <Field name="email" label="Email" type="email" component={renderInput}/>
                <Field name="password" label="Password" type="password" component={renderInput}/>
                <button className="btn btn-large">Sign In</button>
            </form>
        )
    }
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

export default connect(null, {signin})(Signin);