import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import config from '../../config';

import PlaylistSelectorView from '../../components/PlaylistSelectorView';
import GenresView from '../../components/GenresView';

import { Container, ListWrapper, NavItem } from './styled';

class MainContainer extends Component {
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
          render={routeProps => (
            <PlaylistSelectorView
              windowWidth={this.props.windowWidth}
              {...routeProps}
              config={config.featured}
            />
          )}
        />
        <Route
          path="/browse/genres"
          render={routeProps => (
            <GenresView windowWidth={this.props.windowWidth} {...routeProps} />
          )}
        />
        <Route
          path="/browse/newreleases"
          render={routeProps => (
            <PlaylistSelectorView
              windowWidth={this.props.windowWidth}
              {...routeProps}
              config={config.albums}
            />
          )}
        />
      </Container>
    );
  }
}

export default MainContainer;
