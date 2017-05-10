import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';

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
      console.log('album clicked', this.props.playlistId);
    } else if (e.target.nodeName === 'I') {
      console.log('play clicked');
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

    return (
      <div
        className="AlbumCover__container"
        onMouseEnter={this.showPlayBtn.bind(this)}
        onMouseLeave={this.hidePlayBtn.bind(this)}
      >
        <img
          className="AlbumCover__image"
          src={this.props.image}/>
        <div>
          {this.state.showPlayBtn && (
            <div
              style={{width, height}}
              className="AlbumCover__play-button"
              onClick={this.handleClick.bind(this)}
            >
              <i className="fa fa-play-circle-o" aria-hidden="true" title="PLAY"></i>
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

export default AlbumCover;
