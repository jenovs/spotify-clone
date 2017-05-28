import React, { Component } from 'react';
import { connect } from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import Player from '../../components/Player';
import PlayerControls from '../../components/PlayerControls';
import VolumeControl from '../../components/VolumeControl';

import logo from '../../../public/Spotify_Icon_RGB_White.png';

import * as actions from '../../actions';

import './main.css';

class PlayerContainer extends Component {
  audioEl = new Audio();
  volumeTimeout = null;

  componentDidMount() {
    this.audioEl.addEventListener('ended', this.handleEnded.bind(this));
  }
  componentWillUnmount() {
    this.audioEl.removeEventListener('ended', this.handleEnded.bind(this));
  }

  playTrack() {
    const { currSongPos, playlist, songInd, volume } = this.props;

    if (!~songInd) return this.pauseTrack();

    this.audioEl.src = playlist.tracks.items[songInd].track.preview_url;
    this.audioEl.volume = volume;
    this.audioEl.currentTime = currSongPos;
    this.audioEl.play();
  }

  pauseTrack() {
    this.audioEl.pause();
    this.props.updateTrackTime(this.audioEl.currentTime);
  }

  handleEnded() {
    const { playlist, songInd, playNextTrack } = this.props;
    playNextTrack(playlist, songInd);
  }

  handlePlay() {
    const { playlistId, startPlaying } = this.props;
    if (!playlistId) return;
    startPlaying(playlistId, playlistId);
  }

  handlePause() {
    this.props.setPause();
  }

  handleVolumeChange(e) {
    if (this.volumeTimeout) return;
    const value = e.target.value;

    this.volumeTimeout = setTimeout(() => {
      this.props.changeVolume(value, this.audioEl.currentTime);
      this.volumeTimeout = null;
    }, 100);
  }

  componentWillReceiveProps(p) {
    if (this.audioEl.src && !p.isPlaying) this.pauseTrack();
  }

  render() {
    const { isPlaying, playlist, songInd, volume } = this.props;

    if (playlist && isPlaying) this.playTrack();

    const currentTrack = (playlist && ~songInd) ? playlist.tracks.items[songInd].track : null;

    return (
      <Player>
        <NowPlaying
          artist={currentTrack ? currentTrack.artists[0].name : ''}
          title={currentTrack ? currentTrack.name : 'Nothing selected'}
          src={currentTrack ? currentTrack.album.images[2].url : logo}
        />
        <PlayerControls
          isPlaying={isPlaying}
          handlePlay={this.handlePlay.bind(this)}
          handlePause={this.handlePause.bind(this)}
          handleNext={this.handleEnded.bind(this)}
        />
        <VolumeControl
          volume={volume}
          handleChange={this.handleVolumeChange.bind(this)}
        />
      </Player>
    )
  }
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  playlist: state.playlist,
  songInd: state.songInd,
  currSongPos: state.currSongPos,
  playlistId: state.fetchedPlaylistId,
  volume: state.volume,
});

const mapDispatchToProps = dispatch => ({
  startPlaying: (id, playlistId) => {
    dispatch(actions.startPlaying(id, playlistId));
  },
  setPause: () => {
    dispatch(actions.setPause());
  },
  playNextTrack: (playlist, songInd) => {
    dispatch(actions.playNextTrack(playlist, songInd));
  },
  changeVolume: (volume, currSongPos) => {
    dispatch(actions.changeVolume(volume, currSongPos));
  },
  updateTrackTime: time => {
    dispatch(actions.updateTrackTime(time));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
