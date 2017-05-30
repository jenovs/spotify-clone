import React from 'react';
import PropTypes from 'prop-types';

const PlaylistDescription = props => (
  <div className="playlist-description">
    <h2>{props.name}</h2>
    <p>{props.description}</p>
    <p>{props.length} songs</p>
    {props.children}
  </div>
);

PlaylistDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  length: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default PlaylistDescription;
