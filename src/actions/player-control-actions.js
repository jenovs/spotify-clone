import * as types from '../actions/action-types';

import { skipUnavailableTracks, searchPrevTrack } from '../utils';

export const updateTrackTime = time => ({
  type: types.TRACK_TIME_UPDATE,
  time,
});

export const playNextTrack = (playlist, songInd) => ({
  type: types.PLAY_NEXT_TRACK,
  songInd: skipUnavailableTracks(playlist, songInd + 1),
});

export const playPrevTrack = (playlist, songInd) => ({
  type: types.PLAY_NEXT_TRACK,
  songInd: searchPrevTrack(playlist, songInd),
});

export const setPause = () => ({
  type: types.SET_PAUSE,
});
