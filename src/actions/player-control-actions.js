import * as types from '../actions/action-types';

import searchPrevTrack from '../utils/searchPrevTrack';
import skipUnavailableTracks from '../utils/skipUnavailableTracks';

export const updateTrackTime = time => ({
  type: types.TRACK_TIME_UPDATE,
  time,
});

export const playNextTrack = (playlist, songInd) => {
  const nextSongInd = skipUnavailableTracks(playlist, songInd + 1);

  if (!~nextSongInd) return { type: types.STOP_PLAY };

  return {
    type: types.PLAY_NEXT_TRACK,
    songInd: skipUnavailableTracks(playlist, songInd + 1),
  };
};

export const playPrevTrack = (playlist, songInd) => {
  const prevSongInd = searchPrevTrack(playlist, songInd);
  if (!~prevSongInd) return { type: 'NOOP' };
  return {
    type: types.PLAY_NEXT_TRACK,
    songInd: prevSongInd,
  };
};

export const setPause = () => {
  return {
    type: types.SET_PAUSE,
  };
};
