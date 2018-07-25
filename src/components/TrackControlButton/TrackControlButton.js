import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import './main.css';

const playIcon = <FontAwesomeIcon icon={faPlay} />;
const pauseIcon = <FontAwesomeIcon icon={faPause} />;
const speakerIcon = <FontAwesomeIcon icon={faVolumeUp} />;

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
    if (isHovered && isPlaying) {
      btn = pauseIcon;
    } else if (isHovered && !isPlaying) {
      btn = playIcon;
    } else if (isPlaying) {
      btn = speakerIcon;
    }
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
