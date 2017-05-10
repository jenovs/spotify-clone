import React, { Component } from 'react';
// import { Redirect, Route, NavLink } from 'react-router-dom';

import './Track.css';

class Track extends Component {
  render() {
    return (
      <div className="Track__container">
        {this.props.nr} - {this.props.name}
      </div>
    )
  }
}

export default Track;
