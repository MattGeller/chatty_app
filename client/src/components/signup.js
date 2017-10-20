//class component, so it can have life cycle methods
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {signup} from '../actions';
import {renderInput} from '../helpers';

class Signup extends Component {

    renderColorPicker({input, label, color}){

        const inputStyle = {width: '100%'};
        const labelStyle = {position: 'relative'};


        return (
            <div className="input-field col s12">
                <input style={inputStyle} {...input} type="color"/>
                <label style={labelStyle} htmlFor={input.name}>{label}</label>
            </div>
        )
    }

    onSubmit(vals){
        console.log('Form Vals:',vals);

        this.props.signup(vals);
    }

    render(){

        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit((vals) => this.onSubmit(vals))}>
                <Field name="firstName" label="First Name" type="text" component={renderInput}/>
                <Field name="lastName" label="Last Name" type="text" component={renderInput}/>
                <Field name="username" label="Username" type="text" component={renderInput}/>
                <Field name="email" label="Email" type="email" component={renderInput}/>
                <Field name="password" label="Password" type="password" component={renderInput}/>
                <Field name="confirmPassword" label="Confirm Password" type="password" component={renderInput}/>
                <Field name="color" label="Favorite Color" color="#26a29a" component={this.renderColorPicker}/>
                <button style={{marginTop: '10px'}} className="btn btn-large">Signup</button>
            </form>
        )
    }
}

function validate(vals){
    const errors = {};

    if(!vals.firstName){
        errors.firstName = 'Please enter your first name';
    }
    if(!vals.lastName){
        errors.lastName = 'Please enter your last name';
    }
    if(!vals.username){
        errors.username = 'Please enter a username';
    }
    if(!vals.email){
        errors.email = 'Please enter your email';
    }
    if(!vals.password){
        errors.password = 'Please enter a password';
    }
    if(vals.password !== vals.confirmPassword){
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}

//this is so our component knows to use redux-form
Signup = reduxForm({
    form: 'signup',
    //pass in the validate function
    validate,
    initialValues: {
        color: '#ff0000'
    }
})(Signup);

//connect is going to use null and {signup} and return a function, and then call that function with Signup as an argument
export default connect(null, {signup})(Signup);