import React from 'react';
import PropTypes from 'prop-types';

import PlayButton from './PlayButton';
import { Card, Clipart, ClipartWrapper, Title, Wrapper } from './styled';

const propTypes = {
  bigTitle: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  playBtn: PropTypes.bool,
};

const defaultProps = {
  bigTitle: false,
  playBtn: true,
};

class CoverArt extends React.Component {
  state = {
    hover: this.props.showPlayBtn,
    showPlay: true,
    showPlayBtn: this.props.showPlayBtn,
    shrink: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.showPlayBtn !== nextProps.showPlayBtn) {
      this.setState(s => ({
        hover: nextProps.showPlayBtn,
        showPlayBtn: nextProps.showPlayBtn,
      }));
    }
  }

  handleMouseOver = () => {
    this.setState(() => ({ hover: true }));
  };

  handleMouseLeave = () => {
    this.setState(s => ({ hover: false || s.showPlayBtn }));
  };

  handleMouseDown = () => {
    this.setState(() => ({ shrink: true }));
  };

  handleMouseUp = () => {
    this.setState(() => ({ shrink: false }));
  };

  handleClick = e => {
    const { href, handleClick } = this.props;
    const dataName = e.target.dataset.name;
    let playClicked = false;
    if (dataName === 'play') {
      playClicked = true;
    }
    handleClick(href, playClicked);
  };

  render() {
    const { showPlayBtn, shrink, hover } = this.state;
    const { bigTitle, icon, name, playBtn } = this.props;

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
              (hover || showPlayBtn) && (
                <PlayButton dataName="play" showPlay={!showPlayBtn} />
              )}
          </ClipartWrapper>
          <Title bigTitle={bigTitle}>{name}</Title>
        </Card>
      </Wrapper>
    );
  }
}

CoverArt.propTypes = propTypes;
CoverArt.defaultProps = defaultProps;

export default CoverArt;
