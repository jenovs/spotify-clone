import React from 'react';
// import PropTypes from 'prop-types';

import './main.css';

const PlaylistWrapper = props => (
  <div className="playlist-wrapper">
    {props.children}
  </div>
);

export default PlaylistWrapper;
