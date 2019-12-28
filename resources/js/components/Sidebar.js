import React, { useState } from 'react';
import axios from 'axios';

import {
  Link
} from 'react-router-dom';

let logout = (e) => {
  e.preventDefault();
  axios
  .post(routes.logout)
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

let Sidebar = (props) => {
  let user = (<React.Fragment></React.Fragment>);
  let links = [];
  if(props.user){
    user = (
      <React.Fragment>
        <div className="username">{props.user}</div>
        <div className="logout"><a href='#' className="" onClick={logout}>Log Out</a></div>
      </React.Fragment>
    )
    links = [
      {to: "/", label: "Home", icon: "fa-home-lg-alt"},
      {to: "/pokedex", label: "Pokedex", icon: "fa-tablet-android-alt"},
      {to: "/trainers", label: "Trainers", icon: "fa-users"},
    ];
  }
  else{
    links = [
      {to: "/", label: "Home", icon: "fa-home-lg-alt"},
      {to: "/signin", label: "Sign in", icon: "fa-sign-in-alt"},
      {to: "/register", label: "Register", icon: "fa-user-edit"},
    ];
  }
  links = links.map((link, key)=>(
    <li className="" key={key}>
      <Link className="" to={link.to}><span className='iconContainer'><i className={"fas "+link.icon}></i></span>{link.label}</Link>
    </li>
  ));
  return (
    <div className="l-sidebar">
      <div className='s-container'>
        <div className="s-user">{user}</div>
        <nav className="s-links"><ul>{links}</ul></nav>
      </div>
    </div>
  );
};

export default Sidebar;