import React from 'react';

import './main.css';

const AlbumCoverContainer = (props) => (
  <div
    className="AlbumCoverContainer"
    // className="AlbumCover__container"
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
  >
    {props.children}
  </div>
);

export default AlbumCoverContainer;
