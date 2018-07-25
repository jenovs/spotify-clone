import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
            Search<FontAwesomeIcon icon={faSearch} />
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
