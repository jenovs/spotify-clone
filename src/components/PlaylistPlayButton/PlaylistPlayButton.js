import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistPlayButton = ({
  isPlaying,
  isActivePlaylist,
  handlePlay,
  handlePause,
}) => (
  <div>
    <button
      className="playlist-play-button"
      onClick={isActivePlaylist && isPlaying ? handlePause : handlePlay}
      >
      {isActivePlaylist && isPlaying ? 'PAUSE' : 'PLAY'}
    </button>
  </div>
);

PlaylistPlayButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isActivePlaylist: PropTypes.bool.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
}

export default PlaylistPlayButton;
