import * as types from '../actions/action-types';

const initState = {
  isPlaying: false,
  fetchedPlaylistId: null,
  songInd: 0,
  prevTracks: [],
  currSongPos: 0,
  paused: false,
  playlist: null,
  token: null,
  featured: null,
  playlistShow: null,
  volume: 0.3,
};

const playReducer = (state = initState, action) => {
  switch (action.type) {
    case types.PLAY_TRACKS:
      return { ...state, isPlaying: true };

    case types.SET_PAUSE:
      return { ...state, isPlaying: false };

    case types.UPDATE_PLAYLIST_AND_PLAY:
      return {
        ...state,
        playlist: action.playlist,
        songInd: action.songInd,
        fetchedPlaylistId: action.id,
        isPlaying: true,
      };

    case types.PLAY_NEXT_TRACK:
      return {
        ...state,
        songInd: action.songInd,
        currSongPos: 0,
        isPlaying: true,
      };

    case types.TOKEN_SET:
      return {
        ...state,
        token: action.token,
      };

    case types.FEATURED_SET:
      return {
        ...state,
        featured: action.featured,
      };

    case types.PLAYLIST_SET:
      return {
        ...state,
        playlistShow: action.playlist,
      };

    case types.VOLUME_CHANGE:
      return {
        ...state,
        volume: action.volume,
        currSongPos: action.currSongPos,
      };

    case types.TRACK_TIME_UPDATE:
      return {
        ...state,
        currSongPos: action.time,
      };

    default:
      return state;
  }
};

export default playReducer;
