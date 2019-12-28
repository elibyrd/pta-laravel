import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';

import Page from './Page.js';
import Sidebar from './Sidebar.js';
import {SignInPage, RegisterPage} from './Auth.js';
import PlayerdexPage from './Playerdex.js';
import {TrainerListPage, TrainerProfile} from './Trainers.js';

let LandingPage = (props) => {
  if(props.user){
    return (
      <div className="mdl-multi-column">
        <div className="mdl-card mdl-card-link">
          <Link className="" to="/pokedex">
          <i className="far fa-tablet-android-alt"></i>
            <div className="card-label">Pokedex</div>
          </Link>
        </div>
        <div className="mdl-card mdl-card-link">
          <Link className="" to="/trainers">
            <i className="far fa-users"></i>
            <div className="card-label">Trainers</div>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mdl-multi-column">
      <div className="mdl-card mdl-card-link">
        <Link className="" to="/signin">
          <i class="far fa-sign-in-alt"></i>
          <div className="card-label">Sign In</div>
        </Link>
      </div>
      <div className="mdl-card mdl-card-link">
        <Link className="" to="/register">
          <i class="far fa-user-edit"></i>
          <div className="card-label">Register</div>
        </Link>
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);;
    this.state = {
      user: base_user,
      title: "Pokemon Manager v3",
    };

    this.setUser = this.setUser.bind(this);
    this.setTitle = this.setTitle.bind(this);
  }

  setUser(value) {
    this.setState({user: value});
  }

  setTitle(title){
    this.setState({pageTitle: title});
  }

  render() {
      return (
        <BrowserRouter>
          <div className='layoutContainer'>
            <Sidebar user={this.state.user} setUser={this.setUser} />
            <Route 
              exact path="/" 
              render={(props) => (
                <Page title="Home" component={(props) => <LandingPage {...props} user={this.state.user} />} {...props} />
              )}
            />
            <Route 
              exact path="/signin" 
              render={(props) => (
                <Page title="Sign In" component={(props) => <SignInPage {...props} setUser={this.setUser} />} {...props} />
              )}
            />
            <Route 
              exact path="/register" 
              render={(props) => (
                <Page title="Register" component={(props) => <RegisterPage {...props} setUser={this.setUser} />} {...props} />
              )}
            />
            <Route 
              exact path="/pokedex" 
              render={(props) => (
                <Page title="Player Pokedex" component={PlayerdexPage} {...props} />
              )}
            />
            <Route 
              exact path="/trainers" 
              render={(props) => (
                <Page title="Trainer List" component={TrainerListPage} {...props} />
              )}
            />
            <Route 
              path="/trainers/:id" 
              render={(props) => (
                <Page title="Trainer" component={(props) => <TrainerProfile {...props} />} {...props} />
              )}
            />
          </div>
        </BrowserRouter>
      );
  }
};

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
