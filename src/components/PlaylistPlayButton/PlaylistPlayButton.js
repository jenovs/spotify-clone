import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistPlayButton = ({ isPlaying, onClick }) => {
  return (
    <div>
      <button className="playlist-play-button" onClick={onClick}>
        {isPlaying ? 'PAUSE' : 'PLAY'}
      </button>
    </div>
  );
};

PlaylistPlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

export default PlaylistPlayButton;
