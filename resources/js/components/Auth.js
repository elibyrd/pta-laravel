import React, { Component } from 'react';
import axios from 'axios'

const FormField = ({
    label,
    input,
    type,
    name,
    className,
    onChange,
    //meta: { touched, error, warning }
}) => (
    <div className="form-group">
        {
            label &&
            <label htmlFor={name}>{label}</label>
        }
        <input {...input } name={name} type={type} onChange={onChange} className=""/*{
            `${className} ${
                /*meta.touched && (
                    (meta.error && 'is-invalid')
                )
            }`
        }*/ />
        {
            //meta.touched &&
            //    (meta.error && <span className="invalid-feedback">{meta.error}</span>)
        }
    </div>
);

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        if(event.target.type == "checkbox")
            val = event.target.checked;
        this.setState({[nam]: val});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
        .post(routes.login, this.state)
        .then( (response) => {
            console.log(response.data);
            if(response.data.success){
                this.props.history.push("/");
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="">
                <h2 className="">Sign into your account</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormField
                        label="Email Address"
                        name="email"
                        id="email"
                        type="text"
                        className=""
                        onChange={this.myChangeHandler}
                    />
                    <FormField 
                        label="Password" 
                        name="password" 
                        id="password" 
                        type="password" 
                        className="" 
                        onChange={this.myChangeHandler}
                    />
                    <FormField 
                        label="Remember me"
                        name="remember" 
                        id="remember"
                        type="checkbox" 
                        className="" 
                        onChange={this.myChangeHandler}
                    />
                    <div className="">
                        <button type="submit" className="">Continue</button>
                    </div>
                </form>
            </div>
        );
    }
};

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.myChangeHandler = this.myChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    myChangeHandler(event) {
        let nam = event.target.name;
        let val = event.target.value;
        if(event.target.type == "checkbox")
            val = event.target.checked;
        this.setState({[nam]: val});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
        .post(routes.register, this.state)
        .then( (response) => {
            console.log(response.data);
            if(response.data.success){
                this.props.history.push("/");
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="">
                <h2 className="">Register a new account</h2>
                <form onSubmit={this.handleSubmit}>
                    <FormField
                        label="Name"
                        name="name"
                        component={FormField}
                        id="text"
                        type="name"
                        className=""
                        onChange={this.myChangeHandler}
                    />
                    <FormField
                        label="Email Address"
                        name="email"
                        component={FormField}
                        id="email"
                        type="email"
                        className=""
                        onChange={this.myChangeHandler}
                    />
                    <FormField 
                        label="Password" 
                        name="password" 
                        component={FormField} 
                        id="password" 
                        type="password" 
                        className="" 
                        onChange={this.myChangeHandler}
                    />
                    <FormField 
                        label="Confirm Password" 
                        name="password_confirmation" 
                        component={FormField} 
                        id="password-confirm" 
                        type="password" 
                        className="" 
                        onChange={this.myChangeHandler}
                    />
                    <div className="">
                        <button type="submit" className="">Continue</button>
                    </div>
                </form>
            </div>
        );
    }
};

export {
    SignInPage,
    RegisterPage,
};