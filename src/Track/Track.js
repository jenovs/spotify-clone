import React, { Component } from 'react';
// import { Redirect, Route, NavLink } from 'react-router-dom';

import './Track.css';

class Track extends Component {
  render() {
    return (
      <div className="Track__container">
        <div className="Track__number">
          {this.props.nr}.
        </div>
        <div className="Track__description">
          <div className="Track__name">
            {this.props.name}
          </div>
          <div>Album</div>
        </div>
        <div>99:99</div>
      </div>
    )
  }
}

export default Track;
