import React from 'react';

import { Wrapper } from './styled';

class VolumeControl extends React.Component {
  state = {
    volume: this.props.volume,
  };

  handleChange = e => {
    const volume = e.target.value;
    this.setState(() => ({
      volume,
    }));
  };

  updateVolume = () => {
    this.props.handleChange(this.state.volume);
  };

  render() {
    const { volume } = this.state;
    return (
      <Wrapper>
        <input
          onChange={this.handleChange}
          onMouseUp={this.updateVolume}
          type="range"
          min="0.0"
          max="1.0"
          step="0.01"
          value={volume}
        />
      </Wrapper>
    );
  }
}

export default VolumeControl;
