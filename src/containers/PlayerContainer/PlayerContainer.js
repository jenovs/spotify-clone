import React, { Component } from 'react';
import { connect } from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import Player from '../../components/Player';
import PlayerControls from '../../components/PlayerControls';
import VolumeControl from '../../components/VolumeControl';

import logo from '../../images/Spotify_Icon_RGB_White.png';

import * as actions from '../../actions';

import searchPrevTrack from '../../utils/searchPrevTrack';
import skipUnavailableTracks from '../../utils/skipUnavailableTracks';

class PlayerContainer extends Component {
  audioEl = new Audio();
  state = {
    currentTime: 0,
    paused: false,
    playing: false,
    hasNextTrack: false,
    hasPrevTrack: false,
    totalTime: 0,
  };

  componentDidMount() {
    this.audioEl.addEventListener('ended', this.handleEnded);
    this.audioEl.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audioEl.addEventListener('loadeddata', this.handleDataLoaded);
  }

  componentWillUnmount() {
    this.audioEl.removeEventListener('ended', this.handleEnded);
    this.audioEl.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.audioEl.removeEventListener('loadeddata', this.handleDataLoaded);
  }

  handleDataLoaded = () => {
    if (this.setState.totalTime !== this.audioEl.duration) {
      this.setState(() => ({
        totalTime: this.audioEl.duration,
      }));
    }
  };

  handleTimeUpdate = () => {
    const { currentTime } = this.audioEl;
    if (currentTime !== this.state.currentTime) {
      this.setState(() => ({ currentTime }));
    }
  };

  playTrack = () => {
    const { playlist, songInd } = this.props;
    const { currentTime } = this.state;

    if (!~songInd) return this.pauseTrack();

    const hasNextTrack = !!~skipUnavailableTracks(playlist, songInd + 1);
    const hasPrevTrack = !!~searchPrevTrack(playlist, songInd);

    this.setState(() => ({
      hasNextTrack,
      hasPrevTrack,
    }));

    this.audioEl.src = playlist[songInd].track.preview_url;
    this.audioEl.volume = 0.3;
    this.audioEl.currentTime = currentTime;
    const playPromise = this.audioEl.play();
    // Don't console log error
    playPromise.catch(noop => noop);
  };

  stopTrack = () => {
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  };

  pauseTrack = () => {
    this.audioEl.pause();
    this.props.pause();
  };

  handleEnded = () => {
    if (!this.state.hasNextTrack) return this.props.stop();
    const { playlist, songInd, playNextTrack } = this.props;
    playNextTrack(playlist, songInd);
  };

  handlePlay = () => {
    if (!this.props.playlist) return;
    this.props.unpause();
  };

  handlePause = () => {
    const { isPaused, pause, unpause } = this.props;
    isPaused ? unpause() : pause();
  };

  handlePrev = () => {
    const { playlist, songInd, playPrevTrack } = this.props;
    if (!this.state.hasPrevTrack) return;
    playPrevTrack(playlist, songInd);
  };

  handleVolumeChange = value => {
    this.audioEl.volume = value;
  };

  componentWillReceiveProps({ isPlaying, isPaused }) {
    const { playing, paused } = this.state;
    if (isPlaying !== playing || isPaused !== paused) {
      this.setState(({ currentTime }) => ({
        playing: isPlaying,
        paused: isPaused,
        currentTime: !isPlaying && !isPaused ? 0 : currentTime,
      }));
    }
  }

  componentDidUpdate() {
    const { paused, playing } = this.state;
    if (playing && !paused && this.audioEl.paused) return this.playTrack();
    if (playing && paused) return this.pauseTrack();
    if (!playing && !paused) {
      this.stopTrack();
    }
  }

  render() {
    const { isPlaying, isPaused, playlist, songInd } = this.props;
    const { hasNextTrack, hasPrevTrack } = this.state;
    const currentTrack = playlist && ~songInd ? playlist[songInd].track : null;

    return (
      <Player>
        <NowPlaying
          artist={currentTrack ? currentTrack.artists[0].name : ''}
          title={currentTrack ? currentTrack.name : ''}
          src={currentTrack ? currentTrack.album.images[0].url : logo}
        />
        <PlayerControls
          isPlaying={!isPaused && isPlaying}
          hasNextTrack={hasNextTrack}
          hasPrevTrack={hasPrevTrack}
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleNext={this.handleEnded}
          handlePrev={this.handlePrev}
        />
        <VolumeControl handleChange={this.handleVolumeChange} />
      </Player>
    );
  }
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  isPaused: state.isPaused,
  playlist: state.tracklist,
  songInd: state.activeTrackId,
});

const mapDispatchToProps = dispatch => ({
  unpause: () => {
    dispatch(actions.unpause());
  },
  pause: () => {
    dispatch(actions.setPause());
  },
  playNextTrack: (playlist, songInd) => {
    dispatch(actions.playNextTrack(playlist, songInd));
  },
  playPrevTrack: (playlist, songInd) => {
    dispatch(actions.playPrevTrack(playlist, songInd));
  },
  stop: () => dispatch(actions.stopPlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
