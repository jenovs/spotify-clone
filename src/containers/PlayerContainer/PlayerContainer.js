import React, { Component } from 'react';
import { connect } from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import Player from '../../components/Player';
import PlayerControls from '../../components/PlayerControls';
import VolumeControl from '../../components/VolumeControl';

import logo from '../../images/Spotify_Icon_RGB_White.png';

import * as actions from '../../actions';

class PlayerContainer extends Component {
  audioEl = new Audio();

  componentDidMount() {
    this.audioEl.addEventListener('ended', this.handleEnded.bind(this));
  }

  componentWillUnmount() {
    this.audioEl.removeEventListener('ended', this.handleEnded.bind(this));
  }

  playTrack = () => {
    const { currSongPos, playlist, songInd } = this.props;

    if (!~songInd) return this.pauseTrack();

    this.audioEl.src = playlist[songInd].track.preview_url;
    this.audioEl.volume = 0.3;
    this.audioEl.currentTime = currSongPos;
    const playPromise = this.audioEl.play();
    playPromise.catch(noop => noop);
  };

  pauseTrack() {
    this.audioEl.pause();
    this.props.setPause();
    this.props.updateTrackTime(this.audioEl.currentTime);
  }

  handleEnded = () => {
    const { playlist, songInd, playNextTrack } = this.props;
    playNextTrack(playlist, songInd);
  };

  handlePlay() {
    if (!this.props.playlist) return;
    this.props.unpause();
  }

  handlePause = () => {
    const { isPaused, setPause, unpause } = this.props;
    isPaused ? unpause() : setPause();
  };

  handlePrev() {
    const { playlist, songInd, playPrevTrack } = this.props;
    playPrevTrack(playlist, songInd);
  }

  handleVolumeChange = value => {
    this.audioEl.volume = value;
  };

  componentWillReceiveProps(p) {
    if (this.audioEl.src && !p.isPlaying) this.pauseTrack();
  }

  componentDidUpdate() {
    const { isPlaying, isPaused, playlist } = this.props;
    if (playlist && isPlaying) {
      isPaused ? this.pauseTrack() : this.playTrack();
    }
  }

  render() {
    const { isPlaying, isPaused, playlist, songInd } = this.props;
    const currentTrack = playlist && ~songInd ? playlist[songInd].track : null;

    return (
      <Player>
        <NowPlaying
          artist={currentTrack ? currentTrack.artists[0].name : ''}
          title={currentTrack ? currentTrack.name : 'Nothing selected'}
          src={currentTrack ? currentTrack.album.images[0].url : logo}
        />
        <PlayerControls
          isPlaying={!isPaused && isPlaying}
          handlePlay={this.handlePlay.bind(this)}
          handlePause={this.handlePause}
          handleNext={this.handleEnded}
          handlePrev={this.handlePrev.bind(this)}
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
  currSongPos: state.currSongPos,
});

const mapDispatchToProps = dispatch => ({
  unpause: () => {
    dispatch(actions.unpause());
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
  playNextTrack: (playlist, songInd) => {
    dispatch(actions.playNextTrack(playlist, songInd));
  },
  playPrevTrack: (playlist, songInd) => {
    dispatch(actions.playPrevTrack(playlist, songInd));
  },
  updateTrackTime: time => {
    dispatch(actions.updateTrackTime(time));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
