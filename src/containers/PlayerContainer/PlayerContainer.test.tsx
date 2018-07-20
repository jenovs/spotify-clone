import React from 'react';
import ReactDOM from 'react-dom';

import {
  IDispatchProps,
  IPlaylist,
  IStateProps,
  PlayerContainer,
} from './PlayerContainer';

describe('PlayerContainer component', () => {
  it('renders without crashing', () => {
    const playlist: IPlaylist[] = [
      {
        track: {
          album: { images: [{ url: './foo' }] },
          artists: [{ name: 'Foo' }],
          name: 'Bar',
          preview_url: null,
        },
      },
    ];

    const stateProps: IStateProps = {
      isPaused: true,
      isPlaying: false,
      playlist,
      songInd: 0,
    };

    const dispatchProps: IDispatchProps = {
      pause: () => null,
      playNextTrack: (pl: IPlaylist[], s: number) => null,
      playPrevTrack: (pl: IPlaylist[], s: number) => null,
      stop: () => null,
      unpause: () => null,
    };

    const div = document.createElement('div');
    ReactDOM.render(
      <PlayerContainer {...stateProps} {...dispatchProps} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
