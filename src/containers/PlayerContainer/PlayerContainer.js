import React, { Component } from 'react';
import { connect } from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import Player from '../../components/Player';

import logo from '../../../public/Spotify_Icon_RGB_White.png';

import {
  setPause,
  playNextTrack,
} from '../../actions';

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
        {/* Playing: {isPlaying.toString()}
        <br/> */}
        {/* <img src={playlist && ~songInd && playlist.tracks.items[songInd].track.album.images[2].url}/> */}
        {/* <div>
          Playlist length: {playlist && playlist.tracks.items.length}
          <br/>
          Artist: {playlist && ~songInd && playlist.tracks.items[songInd].track.artists[0].name}
          <br/>
          Song: {playlist && ~songInd && playlist.tracks.items[songInd].track.name}
        </div> */}
      </Player>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
