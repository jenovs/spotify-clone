import React from 'react';

import { Button } from './styled';

export interface IProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlaylistPlayButton: React.SFC<IProps> = ({ isPlaying, onClick }) => {
  return (
    <div>
      <Button onClick={onClick}>{isPlaying ? 'PAUSE' : 'PLAY'}</Button>
    </div>
  );
};

export default PlaylistPlayButton;
