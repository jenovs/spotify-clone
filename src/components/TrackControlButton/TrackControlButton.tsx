import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

import { Wrapper } from './styled';

const playIcon = <FontAwesomeIcon icon={faPlay} />;
const pauseIcon = <FontAwesomeIcon icon={faPause} />;
const speakerIcon = <FontAwesomeIcon icon={faVolumeUp} />;

export interface IProps {
  handlePause: () => void;
  handlePlay: () => void;
  hasPreview: boolean;
  isActive: boolean;
  isHovered: boolean;
  isPlaying: boolean;
  nr: number;
  unpause: () => void;
}

const TrackControlButton: React.SFC<IProps> = ({
  handlePause,
  handlePlay,
  hasPreview,
  isActive,
  isHovered,
  isPlaying,
  nr,
  unpause,
}) => {
  let cursorStyle = 'default';
  const showIcon = hasPreview && (isHovered || isPlaying);
  let icon = null;

  if (hasPreview) {
    cursorStyle = 'pointer';
    if (isHovered && isPlaying) {
      icon = pauseIcon;
    } else if (isHovered && !isPlaying) {
      icon = playIcon;
    } else if (isPlaying) {
      icon = speakerIcon;
    }
  }

  return (
    <Wrapper
      style={{ cursor: cursorStyle }}
      onClick={!isActive ? handlePlay : isPlaying ? handlePause : unpause}
    >
      {showIcon ? icon : ++nr + '.'}
    </Wrapper>
  );
};

export default TrackControlButton;
