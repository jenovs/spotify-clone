import React from 'react';
import PropTypes from 'prop-types';

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
    if (name === 'play') {
      this.setState(({ showPlay }) => ({
        showPlay: !showPlay,
      }));
    }
    const { handleClick, id } = this.props;
    handleClick(id);
  };

  render() {
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
              hover && (
                <PlayButton dataName="play" showPlay={this.state.showPlay} />
              )}
          </ClipartWrapper>
          <Title>{name}</Title>
        </Card>
      </Wrapper>
    );
  }
}

CoverArt.propTypes = propTypes;
CoverArt.defaultProps = defaultProps;

export default CoverArt;
