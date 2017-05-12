import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setPlaying } from '../../actions';
import './AlbumCover.css';

class AlbumCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlayBtn: false,
    }
  }

  showPlayBtn() {
    this.setState(() => ({
      showPlayBtn: true,
    }))
  }

  hidePlayBtn() {
    this.setState(() => ({
      showPlayBtn: false,
    }))
  }

  handleClick(e) {
    if (e.target.nodeName === 'DIV') {
      console.log('album clicked', this.props);
      this.props.history.push('/playlist', this.props.playlistId);
    } else if (e.target.nodeName === 'I') {
      console.log('play clicked');
      // this.props.handlePlay(this.props.playlistId)
      this.props.setPlaying(this.props.playlistId);
      // console.log('props====', this.props);

    }
  }

  render() {
    const images = document.getElementsByClassName('AlbumCover__image');
    let width = 0;
    let height = 0;
    if (images.length) {
      width = images[0].width;
      height = images[0].height;
    }

    const playButton = <i className="fa fa-play-circle-o" aria-hidden="true" title="PLAY"></i>
    // const pauseButton = <i className="fa fa-pause-circle-o" aria-hidden="true" title="PAUSE"></i>

    const actionButton = playButton;

    return (
      <div
        className="AlbumCover__container"
        onMouseEnter={this.showPlayBtn.bind(this)}
        onMouseLeave={this.hidePlayBtn.bind(this)}
        onMouseOver={this.showPlayBtn.bind(this)}
      >
        <img
          className="AlbumCover__image"
          src={this.props.image}
          alt={this.props.name}
        />
        <div>
          {this.state.showPlayBtn && (
            <div
              style={{width, height}}
              className="AlbumCover__play-button"
              onClick={this.handleClick.bind(this)}
            >
              {/* <i className="fa fa-play-circle-o" aria-hidden="true" title="PLAY"></i> */}
              {actionButton}
            </div>
          )}
          <div className="AlbumCover__name">
            {this.props.name}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  playing: state.playing,
  playingPlaylistId: state.playlistId,
});

const mapDispatchToProps = dispatch => ({
  setPlaying: id => {
    dispatch(setPlaying(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCover);

// export default AlbumCover;
