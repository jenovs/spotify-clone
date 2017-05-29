import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './main.css';

class TopNavbar extends Component {
  render() {
    return (
      <nav className="TopNavbar">
        <ul>
          <li>
            FEATURED
          </li>
          <li>
            GENRES & MOODS
          </li>
          <li>
            NEW RELEASES
          </li>
          <li>
            DISCOVER
          </li>
        </ul>
      </nav>
    );
  }
}

export default TopNavbar;
