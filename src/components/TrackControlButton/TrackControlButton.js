import React from 'react';

import './main.css';

const playIcon = <i className="fa fa-play" aria-hidden="true" />;
const pauseIcon = <i className="fa fa-pause" aria-hidden="true" />;
const speakerIcon = <i className="fa fa-volume-up" aria-hidden="true" />;

const TrackControlButton = ({
  isActive,
  isHovered,
  isPlaying,
  hasPreview,
  nr,
  handlePlay,
  handlePause,
  unpause,
}) => {
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
      style={{ cursor: cursorStyle }}
      onClick={!isActive ? handlePlay : isPlaying ? handlePause : unpause}
    >
      {btn}
    </div>
  );
};

export default TrackControlButton;
