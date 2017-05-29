import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './main.css';
import logo from '../../../public/Spotify_Icon_RGB_White.png';

class SideNavbar extends Component {
  render() {
    return (
      <nav className="SideNavbar-nav">
        <img src={logo} alt="spotify logo"/>
        <hr/>
        <p style={{cursor: "not-allowed"}}>Search</p>
        <hr/>
        <NavLink to="/browse" className="SideNavbar__link" activeClassName="selected">Browse</NavLink>
        <hr/>
      </nav>
    )
  }
}

export default SideNavbar;
