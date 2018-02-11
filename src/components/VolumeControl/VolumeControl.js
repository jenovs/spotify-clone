import React from 'react';

import { Wrapper } from './styled';

class VolumeControl extends React.Component {
  updateVolume = e => {
    this.props.handleChange(e.target.value);
  };

  render() {
    return (
      <Wrapper>
        <input
          onInput={this.updateVolume}
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          defaultValue="0.3"
        />
      </Wrapper>
    );
  }
}

export default VolumeControl;
