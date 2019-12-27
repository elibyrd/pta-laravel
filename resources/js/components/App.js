import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import {SignInPage, RegisterPage} from './Auth.js';
import PlayerdexPage from './Playerdex.js';

import {
  BrowserRouter,
  Link,
  Route
} from 'react-router-dom';

let LandingPage = (props) => {
  return <h1 className="">Landing Page</h1>;
};
let PokedexPage = (props) => {
  return <h1 className="">Pokedex Page</h1>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: base_user,
    };

    this.setUser = this.setUser.bind(this);
  }

  setUser(value) {
    this.setState({user: value});
  }

  render() {
      return (
        <BrowserRouter>
          <div>
            <Header user={this.state.user} setUser={this.setUser} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={(props) => <SignInPage {...props} setUser={this.setUser} />} />
            <Route path="/register" component={(props) => <RegisterPage {...props} setUser={this.setUser} />} />
            <Route path="/pokedex" component={PlayerdexPage} />
          </div>
        </BrowserRouter>
      );
  }
};

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
