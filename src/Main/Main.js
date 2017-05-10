import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import Featured from '../Featured';
import Genres from '../Genres';

import './Main.css';

class Main extends Component {
  render() {
    console.log('Main', this.props);
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
        <Route path="/browse/featured" component={Featured} props={{...this.props}}/>
        <Route path="/browse/genres" component={Genres} />
      </div>

    )
  }
}

export default Main;
