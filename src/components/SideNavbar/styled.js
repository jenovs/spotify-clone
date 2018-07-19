import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { sidebarWidth } from '../../css-variables/layout';
import { spotifyGray, spotifyGreen } from '../../css-variables/colors';

const activeClassName = 'selected';

export const Group = styled.div`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.24px;
  line-height: 26px;
  padding: 13px 0 8px 0;
`;

export const GroupHeader = styled.div`
  border: none;
  padding-bottom: 10px;
`;

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
  align-items: center;
  color: ${spotifyGray};
  display: flex;
  justify-content: space-between;

  &.${activeClassName} {
    color: ${spotifyGreen};
  }

  & .fa-search {
    font-size: 1.25rem;
  }
`;
