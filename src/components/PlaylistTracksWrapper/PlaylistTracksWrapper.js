import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistTracksWrapper = ({ children }) => (
  <div className="playlist-tracks-wrapper">
    {children}
  </div>
);

PlaylistTracksWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default PlaylistTracksWrapper;
