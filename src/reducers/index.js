import * as types from '../actions/action-types';

const initState = {
  isPlaying: false,
  fetchedPlaylistId: null,
  songInd: 0,
  currSongPos: 25,
  paused: false,
  playlist: null,
  token: null,
  featured: null,
  tokenFetchCount: 0,
  playlistShow: null,
}

const playReducer = (state = initState, action) => {
  switch (action.type) {

    case types.PLAY_TRACKS:
      return {...state, isPlaying: true};

    case types.SET_PAUSE:
      return {...state, isPlaying: false};

    case types.UPDATE_PLAYLIST_AND_PLAY:
      return {
        ...state,
        playlist: action.playlist,
        songInd: action.songInd,
        fetchedPlaylistId: action.id,
        isPlaying: true,
      }

    case types.PLAY_NEXT_TRACK:
      return {
        ...state,
        songInd: action.songInd,
        currSongPos: 25,
        isPlaying: true,
      }

    case types.TOKEN_SET:
      return {
        ...state,
        token: action.token,
        tokenFetchCount: 0,
      }

    case types.TOKEN_FETCH_COUNT:
      return {
        ...state,
        tokenFetchCount: 1,
      }

    case types.FEATURED_SET:
      return {
        ...state,
        featured: action.featured,
      }

    case types.PLAYLIST_SET:
      return {
        ...state,
        playlistShow: action.playlist,
      }

    default:
      return state;
  }
}

export default playReducer;
