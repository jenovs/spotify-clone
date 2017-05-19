import React from 'react';

import './main.css';

const playButton = <i id="play" className="fa fa-play-circle-o" aria-hidden="true" title="Play"></i>
const pauseButton = <i id="pause" className="fa fa-pause-circle-o" aria-hidden="true" title="Pause"></i>
const prevButton = <i className="fa fa-step-backward" aria-hidden="true" title="Previous"></i>
const nextButton = <i className="fa fa-step-forward" aria-hidden="true" title="Next"></i>

const PlayerControls = props => (
  <div className="player-controls__container">
    <div className="player-controls__buttons">
      <button
        className="player-controls__buttons--skip"
      >
        {prevButton}
      </button>
      {!props.isPlaying
        ?
          <button
            className="player-controls__buttons--play"
            onClick={props.handlePlay}
          >
            {playButton}
          </button>
        :
        <button
          className="player-controls__buttons--play"
          onClick={props.handlePause}
        >
          {pauseButton}
        </button>
      }
      <button
        className="player-controls__buttons--skip"
        onClick={props.handleNext}
      >
        {nextButton}
      </button>
    </div>
    <div>
      <div>
        _____
      </div>
    </div>
  </div>
);

export default PlayerControls;
