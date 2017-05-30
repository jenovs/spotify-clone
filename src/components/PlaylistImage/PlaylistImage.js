import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistImage = ({ src, alt }) => (
  <div className="playlist-image">
    <img src={src} alt={alt}/><br/>
  </div>
);

PlaylistImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default PlaylistImage;
