import * as types from '../actions/action-types';

const initState = {
  activeTrackId: -1,
  categoryPlaylist: null,
  currSongPos: 0,
  featured: null,
  genres: [],
  isPaused: false,
  isPlaying: false,
  newReleases: null,
  noPreview: false,
  playlist: {},
  playlistView: {},
  token: null,
  tracklist: null,
  tracklistView: null,
};

const playReducer = (state = initState, action) => {
  switch (action.type) {
    case types.PLAY_NEXT_TRACK:
      return {
        ...state,
        activeTrackId: action.songInd,
        songInd: action.songInd,
        currSongPos: 0,
        isPlaying: true,
        isPaused: false,
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
        tracklist: action.tracklist,
      };

    case types.GENRES_SET:
      return {
        ...state,
        genres: action.genres,
      };

    case types.NEW_RELEASES_SET:
      return {
        ...state,
        newReleases: action.albums,
      };

    case types.CATEGORY_PLAYLIST_SET:
      return {
        ...state,
        categoryPlaylist: action.categoryPlaylist,
      };

    case types.CATEGORY_PLAYLIST_CLEAR:
      return {
        ...state,
        categoryPlaylist: null,
      };

    case types.TRACK_TIME_UPDATE:
      return {
        ...state,
        currSongPos: action.time,
      };

    case types.ALBUM_UPDATE:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: action.tracks,
        activeTrackId: action.activeTrackId,
        isPlaying: true,
        isPaused: false,
        currSongPos: 0,
      };

    case types.PLAYLIST_SET:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          ...action.playlist,
        },
        tracklist: action.tracks,
      };

    case types.PLAY_TRACK:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        activeTrackId: action.trackId,
        currSongPos: 0,
      };

    case types.SET_PAUSE:
      return {
        ...state,
        isPlaying: true,
        isPaused: true,
      };

    case types.COPY_TO_VIEW:
      return {
        ...state,
        playlistView: { ...state.playlist },
        tracklistView: [...state.tracklist],
      };

    case types.COPY_FROM_VIEW:
      return {
        ...state,
        playlist: { ...state.playlistView },
        tracklist: [...state.tracklistView],
      };

    case types.CLEAR_PLAYLIST_VIEW:
      return {
        ...state,
        playlistView: {},
        tracklistView: null,
      };

    case types.UNPAUSE:
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
      };

    case types.SET_PLAYLIST_VIEW:
      return {
        ...state,
        playlistView: action.playlist,
        tracklistView: action.tracks,
      };

    case types.STOP_PLAY:
      return {
        ...state,
        activeTrackId: -1,
        currSongPos: 0,
        isPlaying: false,
        isPaused: false,
        playlist: {},
        tracklist: null,
        noPreview: true,
      };

    case types.RESET_NO_PREVIEW:
      return {
        ...state,
        noPreview: false,
      };

    default:
      return state;
  }
};

export default playReducer;
