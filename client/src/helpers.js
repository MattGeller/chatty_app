import React from 'react';

//this is kind of a functional component inside of another component
export function renderInput({input, label, type, meta: {error, touched}}){

    return (
        <div className="input-field col s12">
            <input className="active" {...input} type={type} placeholder={label}/>
            {/*<label htmlFor={input.name}>{label}</label>*/}
            <p className="red-text">{touched && error}</p>
        </div>
    )
}