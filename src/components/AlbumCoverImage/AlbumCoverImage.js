import React from 'react';

import './main.css';

const AlbumCoverImage = (props) => (
  <img
    className="AlbumCoverImage"
    src={props.image}
    alt={props.name}
  />
);

export default AlbumCoverImage;
