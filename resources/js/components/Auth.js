import React, { Component } from 'react';
import axios from 'axios';

import {
    reducer as formReducer,
    reduxForm,
    Field
} from 'redux-form'

const FormField = ({
    label,
    input,
    type,
    name,
    className,
    meta: { touched, error, warning }
}) => (
    <div className="form-group">
        {
            label &&
            <label htmlFor={name}>{label}</label>
        }
        <input {...input } name={name} type={type} className={
            `${className} ${
                touched && (
                    (error && 'is-invalid')
                )
            }`
        } />
        {
            touched &&
                (error && <span className="invalid-feedback">{error}</span>)
        }
    </div>
);

class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    processSubmit(values) {
        axios
        .post('/ajax/login', values)
        .then( (response) => {
            console.log(response.data);
            if(response.data.success){
                window.location.reload(true);
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="">
                <h2 className="">Sign into your account</h2>
                <form onSubmit={handleSubmit(this.processSubmit)}>
                    <Field
                        label="Email Address"
                        name="email"
                        component={FormField}
                        id="email"
                        type="text"
                        className=""
                    />
                    <Field 
                        label="Password" 
                        name="password" 
                        component={FormField} 
                        id="password" 
                        type="password" 
                        className="" 
                    />
                    <div className="form-check">
                        <label className="">
                            <Field 
                                name="remember" 
                                component="input" 
                                type="checkbox" 
                                className="" 
                                value="1" 
                            />
                            Remember me
                        </label>
                    </div>
                    <div className="">
                        <button type="submit" className="" disabled={submitting}>Continue</button>
                    </div>
                </form>
            </div>
        );
    }
};

SignInPage = reduxForm({
    form: 'signin',
})(SignInPage);

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.processSubmit = this.processSubmit.bind(this);
    }

    processSubmit(values) {
        axios
        .post(routes.register, values)
        .then( (response) => {
            console.log(response.data);
            if(response.data.success){
                window.location.reload(true);
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <div className="">
                <h2 className="">Register a new account</h2>
                <form onSubmit={handleSubmit(this.processSubmit)}>
                    <Field
                        label="Name"
                        name="name"
                        component={FormField}
                        id="text"
                        type="name"
                        className=""
                    />
                    <Field
                        label="Email Address"
                        name="email"
                        component={FormField}
                        id="email"
                        type="email"
                        className=""
                    />
                    <Field 
                        label="Password" 
                        name="password" 
                        component={FormField} 
                        id="password" 
                        type="password" 
                        className="" 
                    />
                    <Field 
                        label="Confirm Password" 
                        name="password_confirmation" 
                        component={FormField} 
                        id="password-confirm" 
                        type="password" 
                        className="" 
                    />
                    <div className="">
                        <button type="submit" className="" disabled={submitting}>Continue</button>
                    </div>
                </form>
            </div>
        );
    }
};

RegisterPage = reduxForm({
    form: 'register',
})(RegisterPage);

export {
    SignInPage,
    RegisterPage,
};