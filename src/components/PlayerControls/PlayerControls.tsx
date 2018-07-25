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

const PlayerControls = (props: any) => (
  <Container>
    <Controls>
      <SkipButton onClick={props.handlePrev} disabled={!props.hasPrevTrack}>
        {prevButton}
      </SkipButton>
      {!props.isPlaying ? (
        <PlayButton onClick={props.handlePlay}>{playButton}</PlayButton>
      ) : (
        <PlayButton onClick={props.handlePause}>{pauseButton}</PlayButton>
      )}
      <SkipButton onClick={props.handleNext} disabled={!props.hasNextTrack}>
        {nextButton}
      </SkipButton>
    </Controls>
  </Container>
);

export default PlayerControls;
