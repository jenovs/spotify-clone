import React from 'react';

import './main.css';

const playIcon = <i className="fa fa-play" aria-hidden="true"></i>
const pauseIcon = <i className="fa fa-pause" aria-hidden="true"></i>
const speakerIcon = <i className="fa fa-volume-up" aria-hidden="true"></i>

const TrackControlButton = ({isHovered, isPlaying, hasPreview, nr, handlePlay, handlePause}) => {
  let btn = ++nr + '.';
  let cursorStyle = 'default';

  if (hasPreview) {
    cursorStyle = 'pointer';
    if (isHovered && isPlaying) btn = pauseIcon;
    else if (isHovered && !isPlaying) btn = playIcon;
    else if (isPlaying) btn = speakerIcon;
  }

  return (
    <div
      className="track-control-button"
      style={{cursor: cursorStyle}}
      onClick={isPlaying ? handlePause : handlePlay}
      >
      {btn}
    </div>
  )
};

export default TrackControlButton;
