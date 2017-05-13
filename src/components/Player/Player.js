import React, { Component } from 'react';
import { connect } from 'react-redux';

import { savePlayerStatus, saveCurrentTime } from '../../actions';

import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: null,
      audioSrc: null,
    }
  }

  // playlistId, songInd, currSongPos


  componentDidMount() {
    const { playing, playlistId } = this.props;
    if (playing && playlistId) {
      this.fetchPlaylist(playlistId);
    }
  }

  componentWillReceiveProps(p) {
    console.log('componentWillReceiveProps', p);
    const { playing, playlistId } = p;
    if (playing && playlistId) {
      this.fetchPlaylist(playlistId);
    } else if (!playing) {
      this.pauseSong();
    }
  }

  fetchPlaylist(playlistId) {
    const token = JSON.parse(localStorage.getItem('token')).access_token;

    fetch(`https://api.spotify.com/v1/users/spotify/playlists/${playlistId}`, {
      headers: {Authorization: "Bearer " + token}
    })
    .then(res => res.json())
    .then(json => {
      this.setState(() => ({playlist: json}), this.playSong)
    })
    .catch(err => console.log('>>>>>Error', err));
  }

  playSong() {
    // console.log('playSong, state.playing', this.props.playing);
    // if (this.props.playing) {
    //   console.log('in if');
    //   return this.pauseSong();
    // }
    let trackNumber = 0;
    const audioEl = document.getElementsByTagName('audio')[0];

    while (!this.state.playlist.tracks.items[trackNumber].track.preview_url) trackNumber++;

    audioEl.src = this.state.playlist.tracks.items[trackNumber].track.preview_url;

    audioEl.volume = 0.1;
    audioEl.currentTime = this.props.currSongPos;

    audioEl.play();
    // this.props.savePlayerStatus(0, trackNumber);
  }

  pauseSong() {
    console.log('pauseSong');
    const audioEl = document.getElementsByTagName('audio')[0];
    // console.log(audioEl.currentTime);
    this.props.saveCurrentTime(audioEl.currentTime);
    // console.log(audioEl);
    audioEl.pause();
  }

  render() {
    // console.log('Player', this.props);
    return (
      <footer className="Player__container">
        Playing: {this.props.playing.toString()}
        <br/>
        Playlist ID: {this.props.playlistId}
        <br/>
        Playlist length: {this.state.playlist && this.state.playlist.tracks.items.length}
        <audio src={null}/>
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  playing: state.isPlaying,
  playlistId: state.playlistId,
  currSongPos: state.currSongPos,
});

const mapDispatchToProps = dispatch => ({
  savePlayerStatus: (currSongPos, songInd) => {
    dispatch(savePlayerStatus(currSongPos, songInd));
  },
  saveCurrentTime: currSongPos => {
    dispatch(saveCurrentTime(currSongPos));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
