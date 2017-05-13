import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlbumActionButton from '../stateless/AlbumActionButton';
import AlbumCoverContainer from '../stateless/AlbumCoverContainer';
import AlbumCoverImage from '../stateless/AlbumCoverImage';
import AlbumCoverName from '../stateless/AlbumCoverName';

import { setPlaying, setPause } from '../../actions';

class AlbumCover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showActionBtn: false,
    }

    this.hidePlayBtn = this.hidePlayBtn.bind(this);
    this.showPlayBtn = this.showPlayBtn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const images = document.getElementsByClassName('AlbumCoverImage');
    if (images.length) {
      this.setState(() => ({
        width: images[0].width,
        height: images[0].width,
      }));
    }
  }

  showPlayBtn() {
    this.setState(() => ({
      showActionBtn: true,
    }));
  }

  hidePlayBtn() {
    this.setState(() => ({
      showActionBtn: false,
    }));
  }

  handleClick(e) {
    if (e.target.nodeName === 'DIV') {
      this.props.history.push('/playlist', this.props.playlistId);
    } else if (e.target.nodeName === 'I') {
      if (e.target.id === 'play') {
        this.props.setPlaying(this.props.playlistId);
      } else if (e.target.id === 'pause') {
        this.props.setPause();
      }
    }
  }

  render() {
    const { isPlaying, playingPlaylistId, playlistId } = this.props;
    const { showActionBtn, width, height } = this.state;
    const isThisPlaying = isPlaying && (playingPlaylistId === playlistId)
    const actionButton = isThisPlaying ? 'pause' : 'play';

    return (
      <AlbumCoverContainer
        onMouseLeave={this.hidePlayBtn}
        onMouseOver={this.showPlayBtn}
      >
        <AlbumCoverImage
          image={this.props.image}
          name={this.props.name}
        />
        {(showActionBtn || isThisPlaying) && (
          <AlbumActionButton
            width={width}
            height={height}
            onClick={this.handleClick}
            actionButton={actionButton}
          />
        )}
        <AlbumCoverName name={this.props.name} />
      </AlbumCoverContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  isPlaying: state.isPlaying,
  isPaused: state.isPaused,
  playingPlaylistId: state.playlistId,
});

const mapDispatchToProps = dispatch => ({
  setPlaying: id => {
    dispatch(setPlaying(id));
  },
  setPause: id => {
    dispatch(setPause(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumCover);
