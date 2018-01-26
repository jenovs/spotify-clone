import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { sidebarWidth } from '../../css-variables/layout';
import { spotifyGray, spotifyGreen } from '../../css-variables/colors';

const activeClassName = 'selected';

export const Navbar = styled.nav`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${spotifyGray};
  font-size: 16px;
  font-weight: bold;
  height: 100vh;
  padding: 24px 24px 95px 24px;
  position: fixed;
  width: 100%;
  max-width: ${sidebarWidth};
  min-width: ${sidebarWidth};

  & img {
    width: 32px;
  }

  & hr {
    color: ${spotifyGray};
  }
`;

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${spotifyGray};

  &.${activeClassName} {
    color: ${spotifyGreen};
  }
`;
