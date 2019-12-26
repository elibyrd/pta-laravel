import React, { useState } from 'react';
import axios from 'axios';

import {
    Link
} from 'react-router-dom';

let Header = (props) => {
    if(props.user){
        function logout(e) {
            e.preventDefault();
            axios
            .post(routes.logout)
            .then( (response) => {
                console.log(response.data);
                if(response.data.success){
                    props.setUser(false);
                    window.location.reload(true);
                }
            })
            .catch( (err) => {
                console.log(err);
            });
        }
        return (
            <nav className="">
                <Link className="" to="/">Home</Link>
                <ul className="">
                    <li className="">
                        {props.user}
                    </li>
                    <li className="">
                        <Link className="" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="">
                        <a href='#' className="" onClick={logout}>Log Out</a>
                    </li>
                </ul>
            </nav>
        );
    }
    else {
        return (
            <nav className="">
                <Link className="" to="/">Home</Link>
                <ul className="">
                    <li className="">
                        <Link className="" to="/signin">Sign In</Link>
                    </li>
                    <li className="">
                        <Link className="" to="/register">Create Account</Link>
                    </li>
                </ul>
            </nav>
        );
    }
};

export default Header;