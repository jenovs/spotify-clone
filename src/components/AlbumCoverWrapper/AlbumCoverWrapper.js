import React from 'react';

import './main.css';

const AlbumCoverWrapper = (props) => (
  <div
    className="album-cover-wrapper"
    onMouseLeave={props.onMouseLeave}
    onMouseOver={props.onMouseOver}
  >
    {props.children}
  </div>
);

export default AlbumCoverWrapper;
