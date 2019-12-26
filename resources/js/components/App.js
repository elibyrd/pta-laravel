import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import {SignInPage, RegisterPage} from './Auth.js';

import {
    BrowserRouter,
    Link,
    Route
} from 'react-router-dom';
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { Provider} from 'react-redux'

const rootReducer = combineReducers({
    form: formReducer,
    // my other reducers come here
});
const store = createStore(rootReducer);

let LandingPage = (props) => {
    return <h1 className="">Landing Page</h1>;
};
let CreateAccountPage = (props) => {
    return <h1 className="">Create Account Page</h1>;
};
let DashboardPage = (props) => {
    return <h1 className="">Dashboard Page</h1>;
};

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/signin" component={SignInPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/dashboard" component={DashboardPage} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
