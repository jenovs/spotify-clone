import React, { Component } from 'react';

import { Group, GroupHeader, Navbar, NavItem } from './styled';
import logo from '../../images/Spotify_Icon_RGB_White.png';

class SideNavbar extends Component {
  render() {
    return (
      <Navbar>
        <GroupHeader>
          <img src={logo} alt="spotify logo" />
        </GroupHeader>
        <Group>
          <NavItem to="/search" style={{ pointerEvents: 'none' }}>
            Search<i className="fas fa-search" />
          </NavItem>
        </Group>
        <Group>
          <NavItem to="/browse">Home</NavItem>
        </Group>
      </Navbar>
    );
  }
}

export default SideNavbar;
