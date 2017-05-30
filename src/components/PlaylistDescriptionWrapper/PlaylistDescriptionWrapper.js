import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistDescriptionWrapper = ({ children }) => (
  <div className="playlist-description-wrapper">
    {children}
  </div>
);

PlaylistDescriptionWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default PlaylistDescriptionWrapper;
