import React, { Component } from 'react';

import TrackControlButton from '../../components/TrackControlButton';

import { Artist, Description, TrackName, Wrapper } from './styled';

const formatDuration = ms => {
  let sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  sec = `${sec % 60}`;
  sec = sec.length < 2 ? 0 + sec : sec;
  return `${min}:${sec}`;
};

class TrackContainer extends Component {
  state = {
    showPlayButton: false,
  };

  handleMouseEnter = () => {
    this.setState(() => ({
      cursor: this.props.track.preview_url ? 'pointer' : 'default',
      showPlayButton: this.props.track.preview_url,
    }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({
      cursor: 'default',
      showPlayButton: false,
    }));
  };

  render() {
    const {
      artists,
      isActiveTrack,
      track,
      nr,
      playTrack,
      pauseTrack,
      isPlaying,
    } = this.props;
    const { showPlayButton } = this.state;

    return (
      <Wrapper
        active={isActiveTrack}
        title={track.preview_url ? '' : 'No preview available'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        hasPreview={track.preview_url}
      >
        <TrackControlButton
          isHovered={!!showPlayButton}
          isPlaying={isActiveTrack && isPlaying}
          hasPreview={track.preview_url}
          nr={nr}
          handlePlay={() => track.preview_url && playTrack()}
          handlePause={() => pauseTrack()}
          unpause={this.props.unpause}
          isActive={isActiveTrack}
        />
        <Description>
          <TrackName>{track.name}</TrackName>
          <Artist>
            {artists && artists.map(artist => artist.name).join(', ')}
            {track.album && track.album.name && ` • ${track.album.name}`}
          </Artist>
        </Description>
        <div>{formatDuration(track.duration_ms)}</div>
      </Wrapper>
    );
  }
}

export default TrackContainer;
