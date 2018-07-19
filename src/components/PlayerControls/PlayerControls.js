import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlayCircle from '@fortawesome/fontawesome-free-regular/faPlayCircle';
import faPauseCircle from '@fortawesome/fontawesome-free-regular/faPauseCircle';
import faStepBackward from '@fortawesome/fontawesome-free-solid/faStepBackward';
import faStepForward from '@fortawesome/fontawesome-free-solid/faStepForward';

import './main.css';

const playButton = <FontAwesomeIcon icon={faPlayCircle} />;
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />;
const prevButton = <FontAwesomeIcon icon={faStepBackward} />;
const nextButton = <FontAwesomeIcon icon={faStepForward} />;

const PlayerControls = props => (
  <div className="player-controls__container">
    <div className="player-controls__buttons">
      <button
        className="player-controls__buttons--skip"
        onClick={props.handlePrev}
        disabled={!props.hasPrevTrack}
      >
        {prevButton}
      </button>
      {!props.isPlaying ? (
        <button
          className="player-controls__buttons--play"
          onClick={props.handlePlay}
        >
          {playButton}
        </button>
      ) : (
        <button
          className="player-controls__buttons--play"
          onClick={props.handlePause}
        >
          {pauseButton}
        </button>
      )}
      <button
        className="player-controls__buttons--skip"
        onClick={props.handleNext}
        disabled={!props.hasNextTrack}
      >
        {nextButton}
      </button>
    </div>
  </div>
);

export default PlayerControls;
