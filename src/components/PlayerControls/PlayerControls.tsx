import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';

import { Container, Controls, PlayButton, SkipButton } from './styled';

const playButton = <FontAwesomeIcon icon={faPlayCircle} />;
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />;
const prevButton = <FontAwesomeIcon icon={faStepBackward} />;
const nextButton = <FontAwesomeIcon icon={faStepForward} />;

export interface IProps {
  handleNext: (() => void);
  handlePause: (() => void);
  handlePlay: (() => void);
  handlePrev: (() => void);
  hasPrevTrack: boolean;
  hasNextTrack: boolean;
  isPlaying: boolean;
}

const PlayerControls: React.SFC<IProps> = ({
  handleNext,
  handlePause,
  handlePlay,
  handlePrev,
  hasPrevTrack,
  hasNextTrack,
  isPlaying,
}) => (
  <Container>
    <Controls>
      <SkipButton onClick={handlePrev} disabled={!hasPrevTrack}>
        {prevButton}
      </SkipButton>
      {!isPlaying ? (
        <PlayButton onClick={handlePlay}>{playButton}</PlayButton>
      ) : (
        <PlayButton onClick={handlePause}>{pauseButton}</PlayButton>
      )}
      <SkipButton onClick={handleNext} disabled={!hasNextTrack}>
        {nextButton}
      </SkipButton>
    </Controls>
  </Container>
);

export default PlayerControls;
