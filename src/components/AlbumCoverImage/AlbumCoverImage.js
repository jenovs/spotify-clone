import React from 'react';

import './main.css';

const AlbumCoverImage = (props) => (
  <div
    className="AlbumCoverImage"
    >
    <img
      src={props.image}
      alt={props.name}
    />
    {props.children}
  </div>
);

export default AlbumCoverImage;
