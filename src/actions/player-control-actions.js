import * as types from '../actions/action-types';

import searchPrevTrack from '../utils/searchPrevTrack';
import skipUnavailableTracks from '../utils/skipUnavailableTracks';

export const stopPlay = () => ({
  type: types.STOP_PLAY,
});

export const playNextTrack = (playlist, songInd) => dispatch => {
  if (songInd === -1) {
    return;
  }

  const nextSongInd = skipUnavailableTracks(playlist, songInd + 1);

  if (nextSongInd === -1) {
    return dispatch(stopPlay());
  }

  dispatch({ type: types.STOP_TRACK });

  setTimeout(() => {
    dispatch({
      activeTrackId: skipUnavailableTracks(playlist, songInd + 1),
      type: types.PLAY_NEXT_TRACK,
    });
  }, 0);
};

export const playPrevTrack = (playlist, songInd) => dispatch => {
  if (songInd === -1) {
    return;
  }
  const prevSongInd = searchPrevTrack(playlist, songInd);
  if (prevSongInd === -1) {
    return { type: 'NOOP' };
  }
  dispatch({ type: types.STOP_TRACK });
  setTimeout(() => {
    dispatch({
      activeTrackId: prevSongInd,
      type: types.PLAY_NEXT_TRACK,
    });
  }, 0);
};

export const setPause = () => {
  return {
    type: types.SET_PAUSE,
  };
};

export const unpause = () => ({
  type: types.UNPAUSE,
});
