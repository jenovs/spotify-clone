import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setPause,
  playNextTrack,
} from '../../actions';

import './Player.css';

class Player extends Component {
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

  render() {
    const { isPlaying, playlist, songInd } = this.props;

    if (playlist && isPlaying) this.playTrack();
    if (this.audioEl.src && !isPlaying) this.pauseTrack();

    return (
      <footer className="Player__container">
        Playing: {isPlaying.toString()}
        <br/>
        Playlist length: {playlist && playlist.tracks.items.length}
        <br/>
        Song: {playlist && ~songInd && playlist.tracks.items[songInd].track.name}
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  playlist: state.playlist,
  songInd: state.songInd,
  currSongPos: state.currSongPos,
});

const mapDispatchToProps = dispatch => ({
  setPause: () => {
    dispatch(setPause());
  },
  playNextTrack: (playlist, songInd) => {
    dispatch(playNextTrack(playlist, songInd));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
