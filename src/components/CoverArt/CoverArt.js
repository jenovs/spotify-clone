import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import PlayButton from './PlayButton';
import { Card, Clipart, ClipartWrapper, Title, Wrapper } from './styled';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  playBtn: PropTypes.bool,
};

const defaultProps = {
  playBtn: true,
};

class CoverArt extends React.Component {
  state = {
    hover: false,
    showPlay: true,
    shrink: false,
  };

  handleMouseOver = () => {
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({ hover: false }));
  };

  handleMouseDown = () => {
    this.setState(() => ({ shrink: true }));
  };

  handleMouseUp = () => {
    this.setState(() => ({ shrink: false }));
  };

  handleClick = e => {
    const name = e.target.dataset.name;
    const {
      fetchedPlaylistId,
      handleClick,
      id,
      isPlaying,
      startPlaying,
      setPause,
    } = this.props;
    if (name === 'play') {
      console.log(id);
      if (isPlaying && fetchedPlaylistId === id) {
        return setPause(id);
      } else {
        return startPlaying(id);
      }
    }

    if (this.props.history) {
      return this.props.history.push('/playlist', id);
    }
    handleClick(id);
  };

  render() {
    const { isPlaying, fetchedPlaylistId, id } = this.props;
    const showPlayBtn = fetchedPlaylistId === id && isPlaying;
    const { shrink, hover } = this.state;
    const { icon, name, playBtn } = this.props;

    return (
      <Wrapper>
        <Card
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          <ClipartWrapper
            shrink={shrink}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            <Clipart hover={hover} icon={icon} />
            {playBtn &&
              hover && <PlayButton dataName="play" showPlay={!showPlayBtn} />}
          </ClipartWrapper>
          <Title>{name}</Title>
        </Card>
      </Wrapper>
    );
  }
}

CoverArt.propTypes = propTypes;
CoverArt.defaultProps = defaultProps;

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  fetchedPlaylistId: state.fetchedPlaylistId,
});

const mapDispatchToProps = dispatch => ({
  startPlaying: (id, playlistId) => {
    dispatch(actions.startPlaying(id, playlistId));
  },
  setPause: id => {
    dispatch(actions.setPause(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CoverArt);
