import * as types from './action-types';

export const setPlaying = (id) => ({
  type: types.SET_PLAYING,
  id,
});

export const setPause = (id) => ({
  type: types.SET_PAUSE,
  id,
});

export const savePlayerStatus = (currSongPos, songInd) => ({
  type: types.SAVE_PLAYER_STATUS,
  currSongPos,
  songInd,
});

export const saveCurrentTime = currSongPos => ({
  type: types.SAVE_CURRENT_TIME,
  currSongPos,
});
