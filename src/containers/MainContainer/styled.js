import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { spotifyGray, spotifyGreen } from '../../css-variables/colors';

const activeClassName = 'selected';

export const Container = styled.div`
  font-size: 12.8px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: auto;
  width: 100%;
  & nav {
    min-width: 515px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const ListWrapper = styled.ul`
  font-weight: bold;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;

  & li {
    margin: 10px;
    margin-top: 0;
    padding: 10px;
    padding-top: 0;
  }
`;

export const NavItem = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${spotifyGray};
  transition-duration: 0.2s;
  transition-property: color;

  &.${activeClassName} {
    color: white;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 35%;
      bottom: -5px;
      height: 1px;
      width: 20px;
      padding-bottom: 5px;
      border-bottom: 2px solid ${spotifyGreen};
    }
  }
`;
