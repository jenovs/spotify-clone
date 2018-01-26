import React from 'react';

import { Wrapper } from './styled';

const VolumeControl = props => (
  <Wrapper>
    <input
      onChange={props.handleChange}
      type="range"
      min="0.0"
      max="1.0"
      step="0.05"
      value={props.volume}
    />
  </Wrapper>
);

export default VolumeControl;
