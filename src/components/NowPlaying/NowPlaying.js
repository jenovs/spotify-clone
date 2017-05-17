import React from 'react';

import './main.css';

const NowPlaying = ({artist, title, src}) => (
  <div className="NowPlaying__container">
    <div className="NowPlaying__image">
      <img src={src} alt={`${artist} - ${title}`} />
    </div>
    <div className="NowPlaying__info">
      <div className="NowPlaying__title">
        <div>{title}</div>
      </div>
      <div className="NowPlaying__artist">
        {artist}
      </div>
    </div>
  </div>
);

export default NowPlaying;
