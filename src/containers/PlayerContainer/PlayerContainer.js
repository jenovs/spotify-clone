import React, { Component } from 'react';
import { connect } from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import Player from '../../components/Player';
import PlayerControls from '../../components/PlayerControls';

import logo from '../../../public/Spotify_Icon_RGB_White.png';

import * as actions from '../../actions';

import './main.css';

class PlayerContainer extends Component {
  audioEl = new Audio();

  componentDidMount() {
    this.audioEl.addEventListener('ended', this.handleEnded.bind(this));
  }

  componentWillUnmount() {
    this.audioEl.removeEventListener('ended', this.handleEnded.bind(this));
  }

  playTrack() {
    const { currSongPos, playlist, songInd } = this.props;

    if (!~songInd) return this.pauseTrack();

    this.audioEl.src = playlist.tracks.items[songInd].track.preview_url;
    this.audioEl.volume = 0.1;
    this.audioEl.currentTime = currSongPos;
    this.audioEl.play();
  }

  pauseTrack() {
    this.audioEl.pause();
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

  render() {
    const { isPlaying, playlist, songInd } = this.props;

    if (playlist && isPlaying) this.playTrack();
    if (this.audioEl.src && !isPlaying) this.pauseTrack();

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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
