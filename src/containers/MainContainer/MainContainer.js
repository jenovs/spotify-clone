import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import FeaturedContainer from '../FeaturedContainer';
import GenresContainer from '../GenresContainer';

import './main.css';

class MainContainer extends Component {
  render() {
    return (
      <div className="Main-container">
        <nav>
          <ul className="Main-nav-ul">
            <li>
              <NavLink to="/browse/featured" className="Main-nav" activeClassName="Main-nav--selected">FEATURED</NavLink>
            </li>
            <li>
              <NavLink to="/browse/genres" className="Main-nav" activeClassName="Main-nav--selected">GENRES & MOODS</NavLink>
            </li>
            <li>
              <NavLink to="/browse/newreleases" className="Main-nav" activeClassName="Main-nav--selected">NEW RELEASES</NavLink>
            </li>
            <li>
              <NavLink to="/browse/discover" className="Main-nav" activeClassName="Main-nav--selected">DISCOVER</NavLink>
            </li>
          </ul>
        </nav>
        <Route
          path="/browse/featured"
          render={routeProps => <FeaturedContainer {...routeProps} handlePlay={this.props.handlePlay} />}
        />
        <Route path="/browse/genres" component={GenresContainer} />
      </div>
    )
  }
}

export default MainContainer;
