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
          <i className="far fa-sign-in-alt"></i>
          <div className="card-label">Sign In</div>
        </Link>
      </div>
      <div className="mdl-card mdl-card-link">
        <Link className="" to="/register">
          <i className="far fa-user-edit"></i>
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
      menuOpen: false,
    };

    this.setUser = this.setUser.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.menuClose = this.menuClose.bind(this);
  }

  setUser(value) {
    this.setState({user: value});
  }

  setTitle(title){
    this.setState({pageTitle: title});
  }

  menuClick(){
    this.setState({menuOpen: !this.state.menuOpen});
  }

  menuClose(){
    this.setState({menuOpen: false});
  }

  render() {
      return (
        <BrowserRouter>
          <div className={'layoutContainer'+(this.state.menuOpen?" menuOpen":"")}>
            <Sidebar user={this.state.user} setUser={this.setUser} menuClick={this.menuClick} menuClose={this.menuClose} />
            <Route 
              exact path="/" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Home" component={(props) => <LandingPage {...props} user={this.state.user} />} {...props} menuClick={this.menuClick} />
              )}
            />
            <Route 
              exact path="/signin" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Sign In" component={(props) => <SignInPage {...props} setUser={this.setUser} />} {...props} menuClick={this.menuClick} />
              )}
            />
            <Route 
              exact path="/register" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Register" component={(props) => <RegisterPage {...props} setUser={this.setUser} />} {...props} menuClick={this.menuClick} />
              )}
            />
            <Route 
              exact path="/pokedex" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Player Pokedex" component={PlayerdexPage} {...props} menuClick={this.menuClick} />
              )}
            />
            <Route 
              exact path="/trainers" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Trainer List" component={TrainerListPage} {...props} menuClick={this.menuClick} />
              )}
            />
            <Route 
              path="/trainers/:id" 
              menuClick={this.menuClick}
              render={(props) => (
                <Page title="Trainer" component={(props) => <TrainerProfile {...props} />} {...props} menuClick={this.menuClick} />
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
