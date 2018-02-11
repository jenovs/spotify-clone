import React from 'react';
import PropTypes from 'prop-types';

import { Pause, Play, Wrapper } from './styled';

const propTypes = {
  dataName: PropTypes.string,
  showPlay: PropTypes.bool,
};

const defaultProps = {
  dataName: 'play',
  showPlay: true,
};

const PlayButton = ({ dataName, showPlay }) => (
  <Wrapper data-name={dataName}>{showPlay ? <Play /> : <Pause />}</Wrapper>
);

PlayButton.propTypes = propTypes;
PlayButton.defaultProps = defaultProps;

export default PlayButton;
