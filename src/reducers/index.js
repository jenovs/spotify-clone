import * as types from '../actions/action-types';

const initState = {
  playing: false,
  isPlaying: false,
  isPaused: false,
  playlistId: null,
  songInd: 0,
  currSongPos: 0,
  paused: false,
}

const playReducer = (state = initState, action) => {
  switch (action.type) {

    case types.SET_PLAYING:
      return {...state, isPlaying: true, playlistId: action.id};

    case types.SET_PAUSE:
      // return {...state, isPlaying: false, playlistId: action.id};
      return {...state, isPlaying: false, isPaused: true};

    case types.SAVE_PLAYER_STATUS:
      return {
        ...state,
        currSongPos: action.currSongPos,
        songInd: action.songInd,
      };

    case types.SAVE_CURRENT_TIME:
      return {
        ...state,
        currSongPos: action.currSongPos,
      }

    default:
      return state;
  }
}

export default playReducer;
