import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import './main.css';

const formatDuration = ms => {
  let sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  sec = (sec - min * 60) + '';
  sec = sec.length < 2 ? 0 + sec : sec;
  return `${min}:${sec}`
}

const playButton = <i id="play" className="fa fa-play-circle-o" aria-hidden="true" title="Play"></i>
// const pauseButton = <i id="pause" className="fa fa-pause-circle-o" aria-hidden="true" title="Pause"></i>

class TrackContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cursor: 'default',
      showPlayButton: false,
    }

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
    }))
  }

  render() {
    const props = this.props;
    const { cursor, showPlayButton } = this.state;

    return (
      <div
        className="track-container"
        title={props.track.preview_url ? '' : 'No preview'}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div
          className="track-container__number"
          style={{cursor}}
          >
          {showPlayButton ? playButton : props.nr + 1 + '.'}
        </div>
        <div className="track-container__description">
         <div className="track-container__name">
         {props.track.name}
        </div>
        <div>{props.track.album.name}</div>
        </div>
        <div>{formatDuration(props.track.duration_ms)}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // activePlaylist: (state.playlist !== null) && state.playlist.id,
});

const mapDispatchToProps = (dispatch, getState) => ({
  startPlaying: (id, playlistId) => {
    dispatch(actions.startPlaying(id, playlistId));
  },
  // setPause: () => {
  //   dispatch(actions.setPause());
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackContainer);
