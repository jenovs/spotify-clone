import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import TrackControlButton from '../../components/TrackControlButton';

import { Artist, Description, TrackName, Wrapper } from './styled';

const formatDuration = ms => {
  let sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  sec = sec - min * 60 + '';
  sec = sec.length < 2 ? 0 + sec : sec;
  return `${min}:${sec}`;
};

class TrackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: 'default',
      showPlayButton: false,
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState(() => ({
      cursor: this.props.track.preview_url ? 'pointer' : 'default',
      showPlayButton: this.props.track.preview_url,
    }));
  }

  handleMouseLeave() {
    this.setState(() => ({
      cursor: 'default',
      showPlayButton: false,
    }));
  }

  render() {
    const {
      isActivePlaylist,
      songInd,
      isPlaying,
      track,
      nr,
      startPlaying,
      playlistShow,
      setPause,
    } = this.props;
    const { showPlayButton } = this.state;

    const activeTrack = isActivePlaylist ? songInd : null;

    return (
      <Wrapper
        active={activeTrack === nr}
        title={track.preview_url ? '' : 'No preview available'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <TrackControlButton
          isHovered={showPlayButton}
          isPlaying={isPlaying}
          hasPreview={track.preview_url}
          nr={nr}
          handlePlay={startPlaying.bind(this, playlistShow.id, 0, nr)}
          handlePause={setPause}
        />
        <Description>
          <TrackName>{track.name}</TrackName>
          <Artist>
            {track.artists.map(artist => artist.name).join(', ')} •{' '}
            {track.album.name}
          </Artist>
        </Description>
        <div>{formatDuration(track.duration_ms)}</div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  songInd: state.songInd,
  isPlaying:
    state.isPlaying && props.isActivePlaylist && state.songInd === props.nr,
  playlistShow: state.playlistShow,
});

const mapDispatchToProps = (dispatch, getState) => ({
  startPlaying: (id, playlistId, songInd) => {
    dispatch(actions.startPlaying(id, playlistId, songInd));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
