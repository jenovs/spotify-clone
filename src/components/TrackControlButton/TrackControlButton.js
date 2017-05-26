import React from 'react';

import './main.css';

const TrackControlButton = ({isHovered, isPlaying, hasPreview, nr}) => {
  let btn = ++nr + '.';

  if (hasPreview) {
    if (isHovered && isPlaying) btn = 'Pause';
    else if (isHovered && !isPlaying) btn = 'Play';
    else if (isPlaying) btn = 'Spkr';
  }

  return (
    <div className="track-control-button">
      {btn}
    </div>
  )
};

export default TrackControlButton;
