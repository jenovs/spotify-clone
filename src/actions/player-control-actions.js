import * as types from '../actions/action-types';

export const changeVolume = (volume, currSongPos) => ({
  type: types.VOLUME_CHANGE,
  volume,
  currSongPos,
});
