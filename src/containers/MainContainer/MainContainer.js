import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import FeaturedContainer from '../FeaturedContainer';
import GenresView from '../../components/GenresView';

import { Container, ListWrapper, NavItem } from './styled';

class MainContainer extends Component {
  state = {
    windowWidth: window.innerWidth - 220,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = e => {
    const windowWidth = e.target.innerWidth - 220; // magic number 220 is sidebar width
    this.setState(() => ({ windowWidth }));
  };

  render() {
    return (
      <Container>
        <nav>
          <ListWrapper>
            <li>
              <NavItem to="/browse/featured">FEATURED</NavItem>
            </li>
            <li>
              <NavItem to="/browse/genres">GENRES & MOODS</NavItem>
            </li>
            <li>
              <NavItem to="/browse/newreleases">NEW RELEASES</NavItem>
            </li>
            <li>
              <NavItem to="/browse/discover">DISCOVER</NavItem>
            </li>
          </ListWrapper>
        </nav>
        <Route
          path="/browse/featured"
          render={routeProps => <FeaturedContainer {...routeProps} />}
        />
        <Route
          path="/browse/genres"
          render={routeProps => (
            <GenresView windowWidth={this.state.windowWidth} />
          )}
        />
      </Container>
    );
  }
}

export default MainContainer;
