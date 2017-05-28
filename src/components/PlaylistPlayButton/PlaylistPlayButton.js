import React from 'react';

const PlaylistPlayButton = ({
  isPlaying,
  isActivePlaylist,
  handlePlay,
  handlePause,
}) => (
  <div>
    <button
      onClick={isActivePlaylist && isPlaying ? handlePause : handlePlay}
      >
      {isActivePlaylist && isPlaying ? 'PAUSE' : 'PLAY'}
    </button>
  </div>
)

export default PlaylistPlayButton;
