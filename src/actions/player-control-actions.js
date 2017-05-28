import * as types from '../actions/action-types';

export const changeVolume = (volume, currSongPos) => ({
  type: types.VOLUME_CHANGE,
  volume,
  currSongPos,
});

export const updateTrackTime = time => ({
  type: types.TRACK_TIME_UPDATE,
  time,
})
