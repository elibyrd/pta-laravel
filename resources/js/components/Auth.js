import React, { Component } from 'react';
import axios from 'axios'

const FormField = ({
  label,
  input,
  type,
  name,
  className,
  onChange,
  touched,
  error
}) => (
  <div className={"form-group "+className}>
    {
      label &&
      <label htmlFor={name}>{label}</label>
    }
    <input {...input } id={name} name={name} type={type} onChange={onChange} className={
      `${
        (error && 'has-error')
      }`
    } />
    {
      (error && <span className="error">{error}</span>)
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
        this.props.setUser(response.data.user);
        this.props.history.push("/");
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="mdl-single-column">
        <form className="mdl-card" onSubmit={this.handleSubmit}>
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
            className="checkbox" 
            onChange={this.myChangeHandler}
          />
          <div className="form-control">
            <button type="submit" className="mdl-button main">Continue</button>
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
        this.props.setUser(response.data.user);
        this.props.history.push("/");
      }
      else{
        if(response.data.errors){
          this.setState({errors: response.data.errors});
        }
      }
    })
    .catch( (err) => {
      console.log(err);
    });
  }

  render() {
    let fields = [
      {label: "Name", name: "name", type: "text", className: ""},
      {label: "Email Address", name: "email", type: "email", className: ""},
      {label: "Password", name: "password", type: "password", className: ""},
      {label: "Confirm Password", name: "password_confirmation", type: "password", className: ""},
    ];

    if(this.state.errors){
      fields = fields.map((field)=>{
        if(this.state.errors[field.name]){
          field.error = this.state.errors[field.name][0];   
        }
        return field;
      })
    }

    return (
      <div className="mdl-single-column">
        <form className="mdl-card" onSubmit={this.handleSubmit}>
          {fields.map((field)=>(
            <FormField
              label={field.label}
              name={field.name}
              component={FormField}
              id={field.name}
              type={field.type}
              className={field.className}
              onChange={this.myChangeHandler}
              key={field.name}
              error={field.error}
            />
          ))}
          <div className="form-control">
            <button type="submit" className="mdl-button main">Continue</button>
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