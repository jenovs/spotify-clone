import * as types from '../actions/action-types';

import searchPrevTrack from '../utils/searchPrevTrack';
import skipUnavailableTracks from '../utils/skipUnavailableTracks';

export const stopPlay = () => ({
  type: types.STOP_PLAY,
});

export const playNextTrack = (playlist, songInd) => dispatch => {
  if (!~songInd) return;

  const nextSongInd = skipUnavailableTracks(playlist, songInd + 1);

  if (!~nextSongInd) return dispatch(stopPlay());

  dispatch({ type: types.STOP_TRACK });

  setTimeout(() => {
    dispatch({
      type: types.PLAY_NEXT_TRACK,
      activeTrackId: skipUnavailableTracks(playlist, songInd + 1),
    });
  }, 0);
};

export const playPrevTrack = (playlist, songInd) => dispatch => {
  if (!~songInd) return;
  const prevSongInd = searchPrevTrack(playlist, songInd);
  if (!~prevSongInd) return { type: 'NOOP' };
  dispatch({ type: types.STOP_TRACK });
  setTimeout(() => {
    dispatch({
      type: types.PLAY_NEXT_TRACK,
      activeTrackId: prevSongInd,
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
