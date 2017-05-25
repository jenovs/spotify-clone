import React from 'react';

import './main.css';

const VolumeControl = props => (
  <div
    className="volume-control"
  >
    <input
      onChange={props.handleChange}
      type="range"
      min="0.0"
      max="1.0"
      step="0.05"
      value={props.volume}/>
  </div>
);

export default VolumeControl;
