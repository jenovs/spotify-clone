import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-regular/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-regular/faPauseCircle';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';

import { Container, Controls, PlayButton, SkipButton } from './styled';
import { Play } from '../CoverArt/PlayButton/styled';

const playButton = <FontAwesomeIcon icon={faPlayCircle} />;
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />;
const prevButton = <FontAwesomeIcon icon={faStepBackward} />;
const nextButton = <FontAwesomeIcon icon={faStepForward} />;

const PlayerControls = props => (
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
