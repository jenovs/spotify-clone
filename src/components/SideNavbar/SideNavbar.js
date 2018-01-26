import React, { Component } from 'react';

import { Navbar, NavItem } from './styled';
import logo from '../../images/Spotify_Icon_RGB_White.png';

class SideNavbar extends Component {
  render() {
    return (
      <Navbar>
        <img src={logo} alt="spotify logo" />
        <hr />
        <p style={{ cursor: 'not-allowed' }}>Search</p>
        <hr />
        <NavItem to="/browse">Browse</NavItem>
        <hr />
      </Navbar>
    );
  }
}

export default SideNavbar;
