import React from 'react';

import './main.css';

const playButton = <i id="play" className="fa fa-play-circle-o" aria-hidden="true" title="PLAY"></i>
const pauseButton = <i id="pause" className="fa fa-pause-circle-o" aria-hidden="true" title="PAUSE"></i>

const AlbumActionButton = (props) => (
  <div
    style={{width: props.width, height: props.height}}
    className="AlbumActionButton"
    onClick={props.onClick}
  >
    {props.actionButton === 'play' && playButton}
    {props.actionButton === 'pause' && pauseButton}
  </div>
)

export default AlbumActionButton;
